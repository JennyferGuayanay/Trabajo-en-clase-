# Plan de la spec 001 — Registrar una materia

## 1) Archivos y responsabilidades

- src/app/index.tsx
  - Pantalla principal del flujo de registro.
  - Contiene el formulario de materia y nota, la lista de materias, los mensajes de validación y el estado de carga/guardado.
  - RF cubierto: RF-01, RF-02, RF-03, RF-04, RF-05, RF-06, RF-07, RNF-01.

- src/features/materias/types.ts
  - Define el modelo `Materia` con `id`, `nombre` y `notaPrimerBimestre`.
  - RF cubierto: RF-01, RF-05, RF-06.

- src/features/materias/validators.ts
  - Encapsula la lógica pura de validación, comparación de duplicados y normalización del nombre.
  - RF cubierto: RF-02, RF-03, RF-04, RF-06, RF-07, RNF-01.

- src/features/materias/storage.ts
  - Persiste la colección de materias en almacenamiento local con AsyncStorage y expone la carga/guardado de la lista.
  - RF cubierto: RF-05, RNF-01.

- src/features/materias/validators.test.ts
  - Pruebas de Jest para la lógica pura: validación, normalización de nombre y detección de duplicados.
  - RF cubierto: RF-02, RF-03, RF-04, RF-06, RF-07, RNF-01.

- src/features/materias/storage.test.ts
  - Pruebas de Jest para la serialización persistente y la carga inicial de datos.
  - RF cubierto: RF-05.

## 2) Funciones puras de lógica

Se debe separar la lógica del dominio de la interfaz para mantener la regla de negocio verificable con Jest y reutilizable entre pantallas.

- `normalizeMateriaName(nombre: string): string`
  - Elimina espacios alrededor y compacta espacios internos para un patrón de comparación estable.
  - Criterio: una materia es la misma si difiere solo en mayúsculas y espacios extra. Decisión 2.

- `isValidNotaPrimerBimestre(valor: string | number): boolean`
  - Acepta solo enteros en el rango 0–20, sin decimales, negativos ni valores superiores a 20.
  - Decisión 1 y RF-07.

- `validateMateriaForm(nombre: string, nota: string): { ok: boolean; error?: string; normalizedNombre?: string; notaEntera?: number }`
  - Rechaza nombre vacío, nota vacía y notas no válidas con un mensaje claro para el usuario.
  - RF-02, RF-03, RF-07.

- `findDuplicateMateria(materias: Materia[], nombre: string): boolean`
  - Compara el nombre normalizado contra la colección para bloquear duplicados.
  - RF-04.

- `formatNotaParaLista(nota: number): number`
  - Devuelve el entero tal cual; nunca agrega texto ni escala.
  - RF-06.

## 3) Persistencia

La persistencia debe ser local, transparente para el usuario y consistente con la historia: el estudiante quiere que la materia siga disponible tras cerrar y volver a abrir la app.

- Tecnología: AsyncStorage del proyecto, ya presente en `package.json`.
- Clave: `@calculadora-epn/materias`.
- Estructura: arreglo serializable de objetos `Materia`.
- Reglas:
  - Al iniciar la pantalla, cargar la colección guardada.
  - Al guardar una materia válida, actualizar la colección y guardar la lista inmediatamente.
  - Si la validación falla, no mutar la colección ni persistir datos inválidos.
  - La normalización se aplica antes de comparar y guardar para una misma materia.
- RF cubierto: RF-05 y RNF-01.

## 4) Algoritmo en pseudocódigo

```
function onGuardarMateria(nombreIngresado, notaIngresada):
    nombreNormalizado = normalizeMateriaName(nombreIngresado)
    resultado = validateMateriaForm(nombreNormalizado, notaIngresada)

    if resultado.ok is false:
        limpiarFormulario()
        mostrarError(resultado.error)
        return

    if existeMateriaDuplicada(materiasActuales, nombreNormalizado):
        limpiarFormulario()
        mostrarError("La materia ya existe")
        return

    nuevaMateria = {
        id: generatedId(),
        nombre: nombreNormalizado,
        notaPrimerBimestre: Number(resultado.notaEntera)
    }

    materiasActuales = [...materiasActuales, nuevaMateria]
    guardarEnStorage(materiasActuales)
    limpiarFormulario()
    mostrarListaActualizada(materiasActuales)
```

```
function loadMateriasFromStorage():
    raw = AsyncStorage.getItem(KEY)
    if raw is null:
        return []
    return parse(raw)
```

## 5) Interfaz

La interfaz debe ser simple, clara y mobile-first, siguiendo las convenciones del proyecto y la spec.

- Pantalla principal en la vista de inicio del app.
- Bloque superior:
  - Campo de texto para nombre de materia.
  - Campo numérico para la nota del primer bimestre con teclado numérico.
  - Botón "Guardar materia" con objetivo táctil mínimo de 44x44.
- Bloque de mensajes:
  - Error visible con texto que indique qué corregir.
  - Mensaje de duplicado si la materia ya existe.
- Bloque inferior:
  - Lista de materias guardadas.
  - Cada elemento muestra el nombre y la nota como número entero simple, según RF-06.
- Comportamiento del teclado:
  - El formulario debe ajustarse para no quedar tapado por el teclado.
  - Se usa contenedor desplazable o ajustado para evitar bloqueos.
- Persistencia visual:
  - Al cerrar la app y volver a abrirla, la lista debe recuperarse sin intervención del usuario.
- Requisitos de accesibilidad:
  - Los mensajes de estado deben leerse con texto y no depender solo del color.
  - La confirmación de eliminación no aplica a esta historia; si se incorpora más adelante, deberá pedirse confirmación.

## 6) Decisiones técnicas justificadas

- Decisión 1, decisiones.md: nota 0–20 sin decimales.
  - Justificación: la historia exige una regla simple, consistente y verificable; esta decisión evita ambigüedades en validación y en la presentación en lista.
  - Alternativa descartada: aceptar decimales o valores fuera del rango, lo que complica la validación y contradice la definición de nota válida del primer bimestre.

- Decisión 2, decisiones.md: normalización de nombre para comparaciones de duplicado.
  - Justificación: evita duplicados accidentales por mayúsculas o espacios extra sin cambiar la intención del usuario.
  - Alternativa descartada: comparar el nombre literal, lo que generaría duplicados por diferencias de formato triviales.

- Decisión 3, decisiones.md: limpiar el formulario tras error de validación.
  - Justificación: el usuario recibe un estado claro y no queda con datos ambiguos; mejora la recuperación tras un intento fallido.
  - Alternativa descartada: conservar los campos llenados, lo que puede hacer más difícil detectar qué valor era inválido.

- Decisión 4, decisiones.md: nota mostrada como número entero simple.
  - Justificación: la interfaz se mantiene clara en la lista y refleja la regla de negocio sin texto extra.
  - Alternativa descartada: mostrar "12/20" o una escala textual, que sobrecarga la vista y no se corresponde con el objetivo de la historia.

## 7) Estrategia de pruebas con Jest

La lógica debe probarse con Jest siguiendo la constitución; la interfaz se valida manualmente en Expo Go con la lista de verificación de la convención de RN.

- Pruebas puras (Jest):
  - validación de nombre vacío, nota vacía y nota fuera de rango
  - nota válida en el límite 0 y 20
  - rechazo de decimales, negativos y valores > 20
  - normalización de mayúsculas y espacios extra
  - detección de duplicados y no duplicación cuando el nombre es equivalente
  - formato de salida de la nota para la lista

- Pruebas de persistencia (Jest):
  - carga de una colección vacía
  - carga de una colección serializada válida
  - guardado de una nueva materia válida
  - rechazo de persistir una materia inválida o duplicada

- Cobertura esperada por RF:
  - RF-01: validación + persistencia + visualización de la lista
  - RF-02: validación de nombre vacío
  - RF-03: validación de nota vacía y fuera de rango
  - RF-04: comparación de duplicado con nombre normalizado
  - RF-05: carga/guardado en AsyncStorage
  - RF-06: presentación de nota simple
  - RF-07: rechazo de decimales, negativos y >20
  - RNF-01: consistencia de validación en distintos estados del flujo

## 8) Riesgos y control

- Riesgo principal: inconsistencias entre validación y almacenamiento si se compara el nombre antes de normalizar.
  - Mitigación: centralizar la lógica de validación y normalización en una sola función pura.
- Riesgo secundario: mostrar la nota en formato no compatible con la spec.
  - Mitigación: usar una función de presentación con salida entera y prueba unitaria.
- Riesgo de UX: teclado tapa el formulario.
  - Mitigación: usar contenedor scrollable/ajustado con flecos de seguridad y validación visual.
