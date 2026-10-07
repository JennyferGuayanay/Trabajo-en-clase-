import { describe, expect, it, jest } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadMaterias, saveMaterias, MATERIAS_STORAGE_KEY } from '../features/materias/storage';
import type { Materia } from '../features/materias/types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Materia model persistence contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('serializes and restores a materia with the planned fields', async () => {
    const materias: Materia[] = [
      {
        id: 'materia-1',
        nombre: 'Física I',
        notaPrimerBimestre: 19,
      },
    ];
    const serialized = JSON.stringify(materias);

    jest.mocked(AsyncStorage.getItem).mockResolvedValue(serialized);

    await saveMaterias(materias);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      MATERIAS_STORAGE_KEY,
      serialized,
    );
    expect(Object.keys(JSON.parse(serialized)[0]).sort()).toEqual([
      'id',
      'nombre',
      'notaPrimerBimestre',
    ]);
    await expect(loadMaterias()).resolves.toEqual(materias);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(MATERIAS_STORAGE_KEY);
  });
});
