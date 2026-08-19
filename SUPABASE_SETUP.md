# Configurar cuentas de usuario (Supabase)

MedVibe usa [Supabase](https://supabase.com) para dos cosas a la vez:
**autenticación** (registro, login, recuperación de contraseña por correo) y
**base de datos** (guardar el progreso de cada usuario: historial de quiz,
cajas de flashcards y puntajes de juegos).

Sin configurar esto, la app **sigue funcionando normalmente en modo
invitado**: cualquiera puede usar el quiz, las flashcards, los juegos, etc.,
y su progreso se guarda en `localStorage` (solo en ese navegador), igual que
antes de agregar cuentas. Configurar Supabase es lo que habilita el registro
real y la sincronización entre dispositivos.

## 1. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita (con
   GitHub es lo más rápido).
2. **New Project** → elige un nombre (ej. `medvibe`), una contraseña para la
   base de datos (guárdala, no la necesitarás seguido) y la región más
   cercana a tus usuarios (ej. `us-east-1` para Guatemala).
3. Espera 1-2 minutos a que aprovisione el proyecto.

## 2. Crear las tablas

1. En el panel del proyecto, ve a **SQL Editor** → **New query**.
2. Copia y pega el contenido completo de [`supabase/schema.sql`](./supabase/schema.sql)
   de este repositorio.
3. Dale **Run**. Deberías ver "Success. No rows returned".

Esto crea 3 tablas (`quiz_attempts`, `flashcard_progress`, `game_scores`),
todas con Row Level Security activado: cada usuario solo puede leer y
escribir sus propias filas.

## 3. Obtener las claves de API

1. Ve a **Project Settings** (ícono de engranaje) → **API**.
2. Copia:
   - **Project URL** → esta es tu `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key (bajo "Project API keys") → esta es tu
     `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   ⚠️ Usa la clave **anon/public**, nunca la `service_role` (esa es secreta y
   no debe usarse en el navegador).

## 4. Configurar las variables de entorno

**En desarrollo local:**

```bash
cp .env.example .env.local
```

Y completa `.env.local` con las dos claves del paso anterior.

**En Vercel** (producción):

1. Ve a tu proyecto en Vercel → **Settings** → **Environment Variables**.
2. Agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con
   los mismos valores.
3. Vuelve a desplegar (Redeploy) para que tomen efecto.

## 5. Configurar las URLs de redirección (importante)

Los correos de confirmación de registro y de recuperación de contraseña
necesitan saber a qué dominio redirigir. Sin este paso, los enlaces de los
correos no van a funcionar en producción.

1. En Supabase, ve a **Authentication** → **URL Configuration**.
2. **Site URL**: pon la URL de tu app en producción (ej.
   `https://medvibe.vercel.app`).
3. **Redirect URLs**: agrega (una por línea):
   ```
   https://medvibe.vercel.app/**
   http://localhost:3000/**
   ```
   (ajusta el dominio de producción al tuyo real; la línea de `localhost`
   es para que también funcione en desarrollo).

## 6. (Opcional) Confirmación de correo

Por defecto, Supabase requiere que el usuario confirme su correo antes de
poder iniciar sesión (recomendado para producción). Si quieres desactivarlo
mientras pruebas:

**Authentication** → **Providers** → **Email** → desactiva "Confirm email".

## Listo

Con esto, en tu app desplegada:

- `/registro` crea cuentas reales (con correo de confirmación).
- `/login` inicia sesión.
- `/recuperar-contrasena` envía el correo de recuperación.
- `/actualizar-contrasena` es donde el usuario define su nueva contraseña
  (a donde lo lleva el enlace del correo).
- El progreso de quiz, flashcards y juegos de un usuario con sesión iniciada
  se guarda en Supabase en vez de `localStorage`, y lo verá igual en
  cualquier dispositivo donde inicie sesión.

## Notas de seguridad

- La `anon key` es pública por diseño (viaja al navegador); la protección
  real viene de las políticas de Row Level Security en `supabase/schema.sql`,
  que impiden que un usuario lea o escriba filas de otro usuario aunque
  tenga esa clave.
- Nunca expongas la `service_role key` en el código del frontend ni la
  subas al repositorio.
