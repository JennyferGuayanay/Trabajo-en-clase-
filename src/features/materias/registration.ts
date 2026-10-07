import type { Materia } from './types';
import { findDuplicateMateria, validateMateriaForm } from './validators';

export type MateriaSubmissionResult =
  | { status: 'invalid'; error: string }
  | { status: 'duplicate'; error: string }
  | { status: 'valid'; nombre: string; notaPrimerBimestre: number };

export function prepareMateriaSubmission(
  nombre: string,
  nota: string,
  materias: Materia[],
): MateriaSubmissionResult {
  const validation = validateMateriaForm(nombre, nota);

  if (!validation.ok) {
    return { status: 'invalid', error: validation.error };
  }

  if (findDuplicateMateria(materias, validation.normalizedNombre)) {
    return { status: 'duplicate', error: 'La materia ya existe.' };
  }

  return {
    status: 'valid',
    nombre: validation.normalizedNombre,
    notaPrimerBimestre: validation.notaEntera,
  };
}
