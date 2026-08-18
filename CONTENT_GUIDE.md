# Guía para actualizar el contenido de MedVibe

MedVibe está diseñado para que puedas **agregar o corregir contenido de estudio
sin tocar la lógica de la aplicación** y sin riesgo de que el contenido se
salga del temario del Examen de Oposición Nacional de Primera Especialidad
de Medicina (Guatemala).

## 1. El temario es cerrado

Todo el contenido pertenece a una de estas 5 áreas, definidas en
[`src/types/content.ts`](./src/types/content.ts):

| `topicId`             | Área                                    |
| ---------------------- | ---------------------------------------- |
| `medicina-interna`     | Medicina Interna                         |
| `cirugia`               | Cirugía General                          |
| `pediatria`             | Pediatría                                |
| `gineco-obstetricia`    | Ginecología y Obstetricia                |
| `salud-publica`         | Salud Pública y Medicina Preventiva      |

**No inventes un `topicId` nuevo.** Si sientes que un tema no encaja en
ninguna de las 5 áreas, probablemente encaje como `subtopic` dentro de una de
ellas (ej. "Cardiología" es un `subtopic` de `medicina-interna`, no un área
nueva). Si de verdad crees que falta un área completa del temario oficial,
discútelo antes de modificar `TOPIC_IDS` — cambiar esa lista afecta toda la
app (navegación, quiz, distribución de examen, etc.).

## 2. Dónde vive cada tipo de contenido

```
src/content/
├── topics.ts                  # Las 5 áreas y su peso aproximado en el examen
├── index.ts                   # Agregador único: importa aquí cualquier archivo nuevo
├── questions/<tema>.ts        # Preguntas de quiz (QuizQuestion[])
├── flashcards/<tema>.ts       # Flashcards (Flashcard[])
├── mnemonics/<tema>.ts        # Nemotecnias (Mnemonic[])
├── tables/<tema>.ts           # Tablas de valores (ReferenceTable[])
└── games/hangmanWords.ts      # Banco de palabras del Ahorcado médico
```

Cada colección es un arreglo tipado según `src/types/content.ts`. Para
agregar contenido:

1. Abre el archivo del tema correspondiente (ej.
   `src/content/questions/pediatria.ts`).
2. Copia un objeto existente como plantilla y edítalo.
3. Usa un `id` único con el prefijo del archivo (ej. `ped-009`, `fc-ped-007`,
   `nm-ped-004`, `tb-ped-004`, `hw-016`).
4. **Siempre incluye `source`** — de dónde sacaste el dato (libro de texto,
   guía clínica, OMS, MSPAS, etc.). Es un requisito, no un opcional: así el
   usuario siempre sabe de dónde salió cada respuesta.
5. Si creas un archivo nuevo (por ejemplo, separar `pediatria.ts` en dos
   partes), impórtalo y agrégalo al arreglo correspondiente en
   `src/content/index.ts`.

## 3. Validar antes de subir cambios

```bash
npm run validate-content
```

Este script revisa que:

- Todo `topicId` esté dentro del temario oficial.
- Todo ítem tenga `source.label`.
- No haya IDs duplicados dentro de cada colección.
- Las preguntas de quiz tengan exactamente 4 opciones y un `correctIndex`
  válido.
- Las filas de las tablas tengan el mismo número de celdas que columnas.
- Las palabras del Ahorcado estén en mayúsculas sin tildes/espacios.

Corre este comando después de cualquier edición de contenido, y antes de
`npm run build`. El build de producción no ejecuta esta validación
automáticamente, así que es responsabilidad de quien edita contenido
correrla (considera agregarla a tu pipeline de CI si lo automatizas).

## 4. Buenas prácticas de contenido médico

- **Cita la fuente a nivel de libro/guía, no de página específica**, salvo
  que estés 100% seguro del número de edición y página (evita inventar
  citas).
- Prefiere fuentes reconocidas: Harrison's, Schwartz's, Sabiston, Nelson,
  Williams Obstetrics, guías de OMS/OPS, ACOG, ADA, KDIGO, CDC, guías del
  MSPAS Guatemala.
- Los datos específicos de Guatemala (esquema de vacunación, estructura del
  sistema de salud) deben verificarse contra la fuente oficial vigente del
  MSPAS o la Facultad de Ciencias Médicas – USAC, ya que pueden actualizarse
  año con año.
- Las preguntas de quiz deben tener **una sola respuesta claramente
  correcta** y distractores razonables (no absurdos), al estilo de los
  reactivos de caso clínico del examen real.

## 5. Ejemplo mínimo de una pregunta nueva

```ts
{
  id: "mi-011",
  topicId: "medicina-interna", // debe existir en TOPIC_IDS
  subtopic: "Cardiología",
  difficulty: "intermedio",
  stem: "Enunciado o caso clínico breve...",
  options: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correctIndex: 2, // índice 0-3
  explanation: "Por qué es correcta esa opción y no las demás.",
  source: { label: "Harrison's Principles of Internal Medicine, 21.ª ed." },
},
```
