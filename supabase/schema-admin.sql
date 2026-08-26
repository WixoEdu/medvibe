-- MedVibe — panel de administrador y sistema de comentarios/reportes
--
-- Corre este archivo completo en el SQL Editor de tu proyecto de Supabase,
-- DESPUÉS de haber corrido schema.sql. Es aditivo: no toca ni borra nada de
-- lo que ya existe (quiz_attempts, flashcard_progress, game_scores).
--
-- Qué agrega:
--   - profiles:      una fila por usuario, con nombre, correo y rol
--                     ('user' | 'admin'). Se llena solo con un trigger
--                     cuando alguien se registra.
--   - login_events:  una fila por cada inicio de sesión real (no por cada
--                     refresco de token), para medir frecuencia de uso.
--   - feedback:       comentarios, reportes de error y sugerencias que los
--                     propios usuarios envían desde la app.
--   - Políticas RLS que permiten a un usuario con role='admin' leer (y en
--     feedback, actualizar el estado de) los datos de TODOS los usuarios,
--     además de las políticas existentes de "solo mis propios datos".
--   - Dos vistas (admin_user_overview, admin_topic_stats) que resumen todo
--     lo anterior para el panel de administrador en una sola consulta.
--
-- IMPORTANTE — cómo te conviertes en administrador:
-- Este script NO vuelve admin a nadie automáticamente (por seguridad). Una
-- vez que hayas corrido este archivo Y te hayas registrado/iniciado sesión
-- normalmente en la app al menos una vez, ejecuta en el SQL Editor:
--
--   update public.profiles set role = 'admin' where email = 'tu-correo@ejemplo.com';
--
-- Ningún usuario puede hacerse admin a sí mismo desde la app: la tabla
-- profiles no permite que un usuario normal cambie su propio "role" (ver
-- el trigger protect_profile_role más abajo), solo se puede cambiar
-- manualmente desde el SQL Editor o por otro administrador ya existente.

-- ─────────────────────────────────────────────────────────────────────────
-- profiles
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Función security definer: evalúa si el usuario autenticado actual es
-- admin, sin disparar recursión de RLS (las políticas de abajo la llaman).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Crea automáticamente la fila de perfil cuando alguien se registra,
-- copiando el nombre que se haya enviado en options.data.full_name durante
-- el signUp (ver src/app/(auth)/registro/page.tsx).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Mantiene profiles.email sincronizado si el usuario cambia su correo.
create or replace function public.handle_user_email_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles set email = new.email where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.handle_user_email_update();

-- Evita que un usuario normal se autopromueva a admin actualizando su
-- propia fila (la política de UPDATE de abajo permite editar tu propio
-- full_name, pero este trigger revierte cualquier cambio de "role" que no
-- venga de alguien que YA es admin).
--
-- La condición `auth.uid() is not null` es clave: solo se aplica esta
-- protección cuando el cambio viene de una sesión de usuario autenticada
-- vía la API (el navegador, con la anon key). Cuando corres SQL
-- directamente en el SQL Editor de Supabase (o una migración, o el propio
-- rol "postgres"), no hay sesión de auth — auth.uid() es NULL — así que el
-- trigger no interfiere y el cambio de "role" se aplica normalmente. Sin
-- esta condición, ni siquiera tú podrías promoverte a admin desde el SQL
-- Editor.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role_trigger on public.profiles;
create trigger protect_profile_role_trigger
  before update on public.profiles
  for each row execute function public.protect_profile_role();

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- Perfiles de usuarios que ya existían antes de correr este script (si
-- los hay): se completan una sola vez a partir de auth.users.
insert into public.profiles (id, email, full_name)
select id, email, raw_user_meta_data ->> 'full_name'
from auth.users
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────────────────
-- login_events (una fila por cada inicio de sesión real del usuario)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.login_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists login_events_user_id_idx on public.login_events (user_id, created_at desc);

alter table public.login_events enable row level security;

drop policy if exists "login_events_insert_own" on public.login_events;
create policy "login_events_insert_own" on public.login_events
  for insert with check (auth.uid() = user_id);

drop policy if exists "login_events_select_own_or_admin" on public.login_events;
create policy "login_events_select_own_or_admin" on public.login_events
  for select using (auth.uid() = user_id or public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- feedback (comentarios, reportes de error y sugerencias de los usuarios)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (
    type in ('comentario', 'reporte_error_contenido', 'reporte_error_app', 'sugerencia_contenido')
  ),
  -- Referencia opcional en texto libre: a qué tema/pregunta/pantalla aplica.
  reference text,
  message text not null,
  status text not null default 'abierto' check (status in ('abierto', 'revisado', 'resuelto')),
  created_at timestamptz not null default now()
);

create index if not exists feedback_user_id_idx on public.feedback (user_id, created_at desc);
create index if not exists feedback_status_idx on public.feedback (status, created_at desc);

alter table public.feedback enable row level security;

drop policy if exists "feedback_select_own_or_admin" on public.feedback;
create policy "feedback_select_own_or_admin" on public.feedback
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "feedback_insert_own" on public.feedback;
create policy "feedback_insert_own" on public.feedback
  for insert with check (auth.uid() = user_id);

drop policy if exists "feedback_update_admin" on public.feedback;
create policy "feedback_update_admin" on public.feedback
  for update using (public.is_admin())
  with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- Visibilidad de administrador sobre el progreso de TODOS los usuarios
-- (las políticas "select_own" que ya existían en schema.sql se mantienen;
-- Postgres combina varias políticas permisivas de SELECT con OR).
-- ─────────────────────────────────────────────────────────────────────────
drop policy if exists "quiz_attempts_select_admin" on public.quiz_attempts;
create policy "quiz_attempts_select_admin" on public.quiz_attempts
  for select using (public.is_admin());

drop policy if exists "flashcard_progress_select_admin" on public.flashcard_progress;
create policy "flashcard_progress_select_admin" on public.flashcard_progress
  for select using (public.is_admin());

drop policy if exists "game_scores_select_admin" on public.game_scores;
create policy "game_scores_select_admin" on public.game_scores
  for select using (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- Vistas de resumen para el panel de administrador.
--
-- `security_invoker = true` es clave: hace que la vista respete el RLS de
-- quien la consulta (el administrador que inició sesión), en vez de los
-- permisos del dueño de la vista. Así, un usuario normal que por curiosidad
-- consulte estas vistas solo verá SUS PROPIAS filas (las políticas "select
-- own" siguen aplicando), nunca las de otros usuarios.
-- ─────────────────────────────────────────────────────────────────────────
create or replace view public.admin_user_overview
with (security_invoker = true) as
select
  p.id,
  p.email,
  p.full_name,
  p.role,
  p.created_at as signed_up_at,
  (select count(*) from public.login_events le where le.user_id = p.id) as login_count,
  (select max(le.created_at) from public.login_events le where le.user_id = p.id) as last_login_at,
  (select count(*) from public.quiz_attempts qa where qa.user_id = p.id) as quiz_attempts_count,
  (select coalesce(sum(qa.correct), 0) from public.quiz_attempts qa where qa.user_id = p.id) as quiz_correct_total,
  (select coalesce(sum(qa.total), 0) from public.quiz_attempts qa where qa.user_id = p.id) as quiz_questions_total,
  (select count(*) from public.flashcard_progress fp where fp.user_id = p.id and fp.box = 5) as flashcards_mastered,
  (select count(*) from public.flashcard_progress fp where fp.user_id = p.id) as flashcards_reviewed
from public.profiles p;

create or replace view public.admin_topic_stats
with (security_invoker = true) as
select
  topic_id,
  count(*) as attempts_count,
  coalesce(sum(correct), 0) as correct_total,
  coalesce(sum(total), 0) as questions_total
from public.quiz_attempts
group by topic_id;
