# MedVibe

App de estudio para el **Examen de Oposición Nacional de Primera Especialidad
de Medicina** (Guatemala), pensada para quienes se preparan para optar a una
residencia médica. Organiza el repaso por las áreas troncales del examen —
Medicina Interna, Cirugía, Pediatría, Ginecología-Obstetricia y Salud
Pública — con quiz, flashcards, juegos, nemotecnias y tablas de valores.

Construida con **Next.js (App Router)**, **TypeScript** y **CSS Modules**.

## Características

- **📝 Quiz estilo caso clínico** — preguntas de opción múltiple con
  retroalimentación y la fuente de cada respuesta, en modo práctica (feedback
  inmediato) o examen (contrarreloj, feedback al final). Guarda tu historial
  de intentos.
- **🃏 Flashcards con repetición espaciada** — sistema de cajas Leitner: lo
  que menos dominas se repasa más seguido.
- **🎮 Juegos de estudio** — Memoria (parejas concepto-definición),
  Contrarreloj (quiz rápido con vidas) y Ahorcado médico (términos clínicos
  a partir de una pista).
- **🧠 Nemotecnias** — las reglas mnemotécnicas más usadas, organizadas por
  área, con su fuente.
- **📊 Tablas de valores importantes** — escalas, clasificaciones y valores
  normales listos para consulta rápida.
- **📚 Todo con fuente citada** — cada pregunta, flashcard, nemotecnia y
  tabla indica de dónde se obtuvo la información.
- **👤 Cuentas de usuario opcionales** — regístrate para que tu progreso
  (historial de quiz, cajas de flashcards, puntajes de juegos) se sincronice
  en la nube y lo veas igual en cualquier dispositivo. Sin cuenta, la app
  funciona igual de bien en modo invitado, guardando el progreso solo en
  ese navegador (localStorage).

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

La app funciona de inmediato en modo invitado. Para habilitar cuentas de
usuario reales (registro, login, recuperación de contraseña, progreso
sincronizado en la nube), sigue **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** —
toma unos minutos y es gratis.

## Scripts

| Script                     | Qué hace                                                        |
| --------------------------- | ----------------------------------------------------------------|
| `npm run dev`                | Levanta el servidor de desarrollo                               |
| `npm run build`              | Compila la app para producción                                  |
| `npm run start`              | Sirve el build de producción                                    |
| `npm run lint`                | Corre ESLint                                                     |
| `npm run validate-content`   | Valida que todo el contenido de estudio esté completo y en el temario oficial |

## Actualizar contenido

Todo el banco de preguntas, flashcards, nemotecnias y tablas vive en
[`src/content/`](./src/content), organizado por área del examen. Antes de
agregar o editar contenido, lee **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** —
explica el temario cerrado (las 5 áreas oficiales), dónde va cada tipo de
contenido y cómo validarlo con `npm run validate-content` para asegurarte de
que no te saliste del temario y que cada dato tiene su fuente.

## Sobre la distribución del examen

La distribución de preguntas por área que se muestra en la app (Inicio y
página de cada tema) es una **referencia orientativa**, basada en la
estructura típica de exámenes nacionales de residencia con áreas
equivalentes (clínico-médicas, clínico-quirúrgicas y transversales).
Confírmala siempre contra la guía oficial del año en curso publicada por la
Facultad de Ciencias Médicas de la USAC antes de tu examen real.

## Stack técnico

- [Next.js](https://nextjs.org) (App Router, Server Components)
- TypeScript
- CSS Modules (sin frameworks de utilidades)
- [Supabase](https://supabase.com) para autenticación y base de datos
  (opcional — ver [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)); sin
  configurarlo, la app usa `localStorage` como modo invitado

## Aviso

Este proyecto es material de apoyo para el estudio y **no sustituye** las
guías oficiales de la Facultad de Ciencias Médicas – USAC, ni la bibliografía
de tu programa de estudio. Verifica siempre la información contra fuentes
primarias actualizadas antes de tu examen.
