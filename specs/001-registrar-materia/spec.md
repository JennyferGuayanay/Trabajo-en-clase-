# Spec 001 — Registrar una materia

Estado: aprobada 
HU de origen: docs/historias/HU-001.md

## Contexto y objetivo
La aplicación debe permitir al estudiante registrar materias con la nota del primer bimestre y mantener ese registro disponible al volver a abrir la app. La historia busca una experiencia simple y fiable para guardar una materia nueva, evitar duplicados y manejar errores de entrada de forma clara.

## Usuarios
- Estudiante que necesita registrar materias y notas del primer bimestre.

## Historias de usuario
- El estudiante desea guardar una materia nueva junto con su nota del primer bimestre.
- El estudiante necesita que la app informe claramente cuando falta información o la nota no es válida.
- El estudiante quiere evitar duplicados al registrar la misma materia nuevamente.
- El estudiante quiere conservar la lista de materias tras cerrar y volver a abrir la aplicación.

## Definiciones
- Materia repetida: una asignatura es la misma si se compara ignorando variaciones de mayúsculas y espacios extra en el nombre.
- Nota válida del primer bimestre: un valor entero comprendido entre 0 y 20 inclusive.

## Requisitos funcionales
- RF-01: CUANDO el estudiante ingresa un nombre de materia y una nota válida del primer bimestre, EL SISTEMA debe guardar la materia y mostrarla en la lista con la nota registrada. Origen: Escenario: Guardar una materia.
- RF-02: SI el nombre de la materia está vacío, ENTONCES EL SISTEMA debe avisar qué corregir y no guardar la materia. Origen: Escenario: Datos incompletos o inválidos.
- RF-03: SI la nota del primer bimestre está vacía o fuera del rango permitido, ENTONCES EL SISTEMA debe avisar qué corregir, limpiar el formulario y no guardar la materia. Origen: Escenario: Datos incompletos o inválidos y Decisión 3.
- RF-04: SI el estudiante intenta guardar otra vez una materia con el mismo nombre, ignorando mayúsculas y espacios extra, ENTONCES EL SISTEMA debe detectar la duplicación y no crear una segunda entrada. Origen: Escenario: Materia repetida y Decisión 2.
- RF-05: CUANDO la materia queda guardada correctamente, EL SISTEMA debe conservarla para que siga disponible tras cerrar y volver a abrir la aplicación. Origen: Escenario: Conservar mis datos.
- RF-06: CUANDO la aplicación muestre la nota de la materia en la lista, EL SISTEMA debe presentarla como un número entero simple, sin escala adicional ni texto descriptivo. Origen: Decisión 4.
- RF-07: SI la nota ingresada incluye decimales, valores negativos o valores mayores a 20, ENTONCES EL SISTEMA debe considerarla inválida y requerir una corrección antes de guardar. Origen: Decisión 1 y Escenario: Datos incompletos o inválidos.

## Requisitos no funcionales
- RNF-01: La validación de nombre y nota debe ser consistente en toda la experiencia de registro, incluyendo el primer intento, los reintentos y la recuperación tras cerrar la aplicación. Origen: Escenario: Conservar mis datos y Escenario: Datos incompletos o inválidos.

## Casos límite
- Nombre de materia con espacios iniciales, finales o múltiples en el centro.
- Nombre de materia con letras en mayúsculas y minúsculas diferentes.
- Nota igual a 0.
- Nota igual a 20.
- Nota con valor 21, -1 o 12.5.
- Intento de guardar una materia repetida después de cerrar y volver a abrir la app.

## Fuera de alcance
- Calcular el resultado del segundo bimestre o del supletorio.
- Corregir o eliminar materias ya registradas.
- Permitir notas con decimales o escalas distintas a la del primer bimestre.

## Criterios de finalización
- La app permite guardar una materia nueva con su nota del primer bimestre.
- La app rechaza nombre o nota vacíos y no guarda ningún dato inválido.
- La app evita duplicados al registrar la misma materia con diferencias menores en formato.
- La app conserva la materia guardada después de cerrar y reabrir la aplicación.
- La nota se presenta en la interfaz como un número simple.

## Dudas abiertas
Ninguna.

## Revisión final de la spec
- [ ] Hay cobertura de cada escenario de la HU-001 en al menos un RF.
- [ ] Los RF son verificables y terminan con "Origen:".
- [ ] No hay contradicciones entre los requisitos funcionales.
- [ ] No hay conflicto con docs/constitution.md.
- [ ] La spec describe el qué y el por qué, sin incluir stack ni detalles de implementación.

Puntaje: 10/10
