- [x] **T1. Definir el modelo y la persistencia local de materias.** RF-05, RNF-01
  - Hecho cuando: la colección de materias queda representada como un arreglo serializable con `id`, `nombre` y `notaPrimerBimestre`, y la carga/guardado en AsyncStorage se prueba con Jest para el caso vacío y el caso con datos.

- [x] **T2. Crear la lógica pura de validación y normalización.** RF-02, RF-03, RF-04, RF-06, RF-07, RNF-01
  - Hecho cuando: `npx jest --runInBand src/features/materias/validators.test.ts` pasa y cubre nombre vacío, nota vacía, nota fuera de rango, decimales/negativos, rangos 0 y 20, mayúsculas y espacios, y duplicados equivalentes.

- [ ] **T3. Integrar la pantalla de registro con formulario y mensajes de error.** RF-01, RF-02, RF-03, RF-04, RF-07
  - Hecho cuando: en la interfaz, el usuario puede escribir nombre y nota, el formulario limpia el estado al fallar la validación y se muestra un texto claro indicando qué corregir; la acción no guarda nada inválido.

- [ ] **T4. Mostrar la lista de materias con nota simple.** RF-01, RF-05, RF-06
  - Hecho cuando: la lista muestra cada materia con su nombre y la nota como un número entero simple, sin escala ni texto adicional, y se actualiza al guardar una materia válida.

- [ ] **T5. Conservar los datos al cerrar y reabrir la app.** RF-05, RNF-01
  - Hecho cuando: al recargar la pantalla con una materia guardada, la lista se restaura automáticamente desde almacenamiento local y se mantiene tras reiniciar la app; la verificación se valida con la lista manual de Expo Go.

- [ ] **T6. Validación manual de interfaz en Expo Go.** RF-01, RF-02, RF-03, RF-04, RF-05, RF-06, RF-07, RNF-01
  - Hecho cuando: se cumplen los puntos de la lista manual de rn-conventions: vertical/giro, teclado no tapa el campo ni botón, la nota usa el separador del teléfono y el comportamiento coincide con la spec, la app conserva los datos al cerrarla, y los textos de estado se leen sin depender del color.
