import { describe, expect, it } from '@jest/globals';

import {
  findDuplicateMateria,
  formatNotaParaLista,
  isValidNotaPrimerBimestre,
  normalizeMateriaName,
  validateMateriaForm,
} from './validators';
import type { Materia } from './types';

describe('materias validators', () => {
  describe('normalizeMateriaName', () => {
    it('trims surrounding whitespace and collapses internal whitespace', () => {
      expect(normalizeMateriaName('  Álgebra   Lineal  ')).toBe('Álgebra Lineal');
    });

    it('treats differences in capitalization and extra spaces as equivalent', () => {
      const materias: Materia[] = [
        { id: 'materia-1', nombre: 'Álgebra Lineal', notaPrimerBimestre: 16 },
      ];

      expect(findDuplicateMateria(materias, '  áLGEBRA   lINEAL ')).toBe(true);
    });

    it('does not report a duplicate when the normalized names differ', () => {
      const materias: Materia[] = [
        { id: 'materia-1', nombre: 'Álgebra Lineal', notaPrimerBimestre: 16 },
      ];

      expect(findDuplicateMateria(materias, 'Álgebra')).toBe(false);
    });
  });

  describe('isValidNotaPrimerBimestre', () => {
    it.each([0, 20, '0', '20'])('accepts valid boundary value %s', (nota) => {
      expect(isValidNotaPrimerBimestre(nota)).toBe(true);
    });

    it.each([-1, 21, 12.5, '-1', '21', '12.5', ''])(
      'rejects invalid value %s',
      (nota) => {
        expect(isValidNotaPrimerBimestre(nota)).toBe(false);
      },
    );
  });

  describe('validateMateriaForm', () => {
    it('rejects a blank or whitespace-only name', () => {
      expect(validateMateriaForm('   ', '10')).toEqual({
        ok: false,
        error: 'Ingresa el nombre de la materia.',
      });
    });

    it('rejects an empty note', () => {
      expect(validateMateriaForm('Matemáticas', '  ')).toEqual({
        ok: false,
        error: 'Ingresa una nota entera entre 0 y 20.',
      });
    });

    it('rejects decimal, negative, and out-of-range notes', () => {
      for (const nota of ['12.5', '-1', '21']) {
        expect(validateMateriaForm('Matemáticas', nota)).toEqual({
          ok: false,
          error: 'Ingresa una nota entera entre 0 y 20.',
        });
      }
    });

    it.each([
      ['0', 0],
      ['20', 20],
    ])('accepts a valid note at boundary %s', (nota, notaEntera) => {
      expect(validateMateriaForm('  Matemáticas  ', nota)).toEqual({
        ok: true,
        normalizedNombre: 'Matemáticas',
        notaEntera,
      });
    });
  });

  it('returns the note as a plain number for list display', () => {
    expect(formatNotaParaLista(12)).toBe(12);
  });
});
