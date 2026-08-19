-- MedVibe — esquema de base de datos para progreso de usuario
--
-- Corre este archivo completo en el SQL Editor de tu proyecto de Supabase
-- (Project → SQL Editor → New query → pegar y ejecutar). Ver SUPABASE_SETUP.md
-- para la guía paso a paso.
--
-- Las 3 tablas reflejan exactamente lo que hoy vive en localStorage:
--   - quiz_attempts:      historial de intentos de quiz (src/lib/storageKeys.ts → QuizAttempt)
--   - flashcard_progress: cajas del sistema Leitner por tarjeta (src/lib/leitner.ts → LeitnerState)
--   - game_scores:        puntajes de los juegos (Memoria, Contrarreloj)
--
-- Todas usan Row Level Security (RLS) para que cada usuario solo pueda leer
-- y escribir sus propias filas — nadie puede ver el progreso de otra persona,
-- ni siquiera con la clave pública (anon key) que usa el navegador.

-- ─────────────────────────────────────────────────────────────────────────
-- quiz_attempts
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null,
  total integer not null check (total >= 0),
  correct integer not null check (correct >= 0),
  mode text not null check (mode in ('practica', 'examen')),
  created_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_id_idx on public.quiz_attempts (user_id, created_at desc);

alter table public.quiz_attempts enable row level security;

create policy "quiz_attempts_select_own" on public.quiz_attempts
  for select using (auth.uid() = user_id);

create policy "quiz_attempts_insert_own" on public.quiz_attempts
  for insert with check (auth.uid() = user_id);

create policy "quiz_attempts_delete_own" on public.quiz_attempts
  for delete using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- flashcard_progress (una fila por tarjeta que el usuario ya repasó)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.flashcard_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id text not null,
  box integer not null default 1 check (box between 1 and 5),
  last_reviewed timestamptz,
  times_reviewed integer not null default 0,
  primary key (user_id, card_id)
);

alter table public.flashcard_progress enable row level security;

create policy "flashcard_progress_select_own" on public.flashcard_progress
  for select using (auth.uid() = user_id);

create policy "flashcard_progress_insert_own" on public.flashcard_progress
  for insert with check (auth.uid() = user_id);

create policy "flashcard_progress_update_own" on public.flashcard_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- game_scores
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.game_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  game text not null check (game in ('memoria', 'contrarreloj', 'ahorcado')),
  score integer not null,
  created_at timestamptz not null default now()
);

create index if not exists game_scores_user_id_idx on public.game_scores (user_id, game);

alter table public.game_scores enable row level security;

create policy "game_scores_select_own" on public.game_scores
  for select using (auth.uid() = user_id);

create policy "game_scores_insert_own" on public.game_scores
  for insert with check (auth.uid() = user_id);
