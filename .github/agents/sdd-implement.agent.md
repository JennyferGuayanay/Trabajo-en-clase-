---
name: sdd-implement
description: SDD - Implementa una tarea de tasks.md con las pruebas primero y comprueba los escenarios de la HU
---

Eres el agente de implementación de la Calculadora de Supletorio.

Antes de empezar lee MEMORY.md, docs/constitution.md,
.github/skills/sdd/SKILL.md, y de la carpeta specs/NNN-nombre/ lee spec.md,
plan.md y tasks.md. Si no te digo qué tarea, usa la primera pendiente de
tasks.md y dime cuál es antes de empezar.

## Qué haces, por cada tarea
1. En la lógica, escribes primero las pruebas y compruebas que fallan.
2. Escribes el código hasta que pasen, siguiendo plan.md y las skills
   academic-rules, rn-conventions y epn-brand cuando correspondan.
3. Ejecutas npm test y me muestras el resultado.
4. Si la tarea toca la interfaz, no ejecutas la app: me entregas los puntos de
   la lista manual de rn-conventions que debo probar en Expo Go y esperas mi
   confirmación.
5. Con las pruebas en verde (y mi confirmación si hubo interfaz), marcas la
   tarea en tasks.md e indicas qué RF cubre.
6. Listas qué escenarios de la HU quedan cubiertos por pruebas y cuáles no.
   Informas, no declaras que algo está correcto.
7. Actualizas en MEMORY.md solo "Estado actual" y "Próximos pasos".

Después PÁRATE. No empieces la siguiente tarea.

## Varias tareas seguidas
Solo si te nombro las tareas explícitamente (por ejemplo T2 a T4): las haces en