import type { Materia } from './types';

type MateriaFormValidationResult =
  | { ok: true; normalizedNombre: string; notaEntera: number }
  | { ok: false; error: string };

const EMPTY_NAME_ERROR = 'Ingresa el nombre de la materia.';
const INVALID_GRADE_ERROR = 'Ingresa una nota entera entre 0 y 20.';

export function normalizeMateriaName(nombre: string): string {
  return nombre.trim().replace(/\s+/g, ' ');
}

export function isValidNotaPrimerBimestre(valor: string | number): boolean {
  if (typeof valor === 'number') {
    return Number.isInteger(valor) && valor >= 0 && valor <= 20;
  }

  const trimmedValue = valor.trim();
  if (!/^\d+$/.test(trimmedValue)) {
    return false;
  }

  const nota = Number(trimmedValue);
  return Number.isInteger(nota) && nota >= 0 && nota <= 20;
}

export function validateMateriaForm(
  nombre: string,
  nota: string,
): MateriaFormValidationResult {
  const normalizedNombre = normalizeMateriaName(nombre);

  if (!normalizedNombre) {
    return { ok: false, error: EMPTY_NAME_ERROR };
  }

  if (!isValidNotaPrimerBimestre(nota)) {
    return { ok: false, error: INVALID_GRADE_ERROR };
  }

  return {
    ok: true,
    normalizedNombre,
    notaEntera: Number(nota.trim()),
  };
}

export function findDuplicateMateria(materias: Materia[], nombre: string): boolean {
  const normalizedNombre = normalizeMateriaName(nombre).toLowerCase();

  return materias.some(
    (materia) => normalizeMateriaName(materia.nombre).toLowerCase() === normalizedNombre,
  );
}

export function formatNotaParaLista(nota: number): number {
  return nota;
}
