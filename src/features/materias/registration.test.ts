import { describe, expect, it } from '@jest/globals';

import { prepareMateriaSubmission } from './registration';
import type { Materia } from './types';

describe('prepareMateriaSubmission', () => {
  it('rejects a blank name and returns the correction message', () => {
    expect(prepareMateriaSubmission('   ', '10', [])).toEqual({
      status: 'invalid',
      error: 'Ingresa el nombre de la materia.',
    });
  });

  it.each(['', '12.5', '-1', '21'])(
    'rejects an empty or invalid note: %s',
    (nota) => {
      expect(prepareMateriaSubmission('Matemáticas', nota, [])).toEqual({
        status: 'invalid',
        error: 'Ingresa una nota entera entre 0 y 20.',
      });
    },
  );

  it('rejects a duplicate even when case and spacing differ', () => {
    const materias: Materia[] = [
      { id: 'materia-1', nombre: 'Álgebra Lineal', notaPrimerBimestre: 16 },
    ];

    expect(prepareMateriaSubmission('  áLGEBRA   lINEAL ', '18', materias)).toEqual({
      status: 'duplicate',
      error: 'La materia ya existe.',
    });
  });

  it('returns normalized data only for a valid submission', () => {
    expect(prepareMateriaSubmission('  Física   I ', '20', [])).toEqual({
      status: 'valid',
      nombre: 'Física I',
      notaPrimerBimestre: 20,
    });
  });
});
