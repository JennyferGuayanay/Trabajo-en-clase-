# Decisiones de la historia - Registrar una materia

1. Pregunta: ¿Cuál es el rango válido para la nota del primer bimestre y debe aceptar decimales?
   Respuesta: La nota válida va de 0 a 20, sin decimales.
   Motivo: La historia requiere un valor numérico claro y consistente, y el usuario necesita una regla simple para saber cuándo una nota es válida. Un rango de 0 a 20 sin decimales evita ambigüedades y mantiene la experiencia de ingreso predecible.

2. Pregunta: Si el usuario intenta guardar otra vez una materia con el mismo nombre pero distinta capitalización o espacios extra, ¿debe considerarse la misma materia?
   Respuesta: Sí, se considera la misma materia si difiere solo en mayúsculas o espacios extra; el nombre se normaliza al comparar.
   Motivo: Esto evita duplicados accidentales por diferencias visuales menores y mejora la experiencia del usuario sin cambiar la intención real de la materia.

3. Pregunta: Si el usuario deja vacío el nombre o la nota, o ingresa un valor fuera de rango, ¿la app debe conservar los datos ya escritos para corregirlos o limpiar el formulario al mostrar el error?
   Respuesta: La aplicación limpia el formulario al mostrar el error.
   Motivo: Cuando la validación falla, el usuario debe ver que el intento no fue guardado y poder reingresar datos sin quedarse con un estado ambiguo. Limpiar el formulario hace el error más evidente y reduce confusión.

4. Pregunta: ¿Cómo debe verse la nota guardada en la lista para el usuario: como un número entero simple o con la escala explícita?
   Respuesta: La nota se muestra como un número simple, por ejemplo 12.
   Motivo: La interfaz se vuelve más clara y directa para el usuario, especialmente en una lista de materias, y mantiene la presentación consistente con la idea de registrar una nota de primer bimestre sin sobrecargar la vista.
