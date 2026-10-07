import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadMaterias, saveMaterias, MATERIAS_STORAGE_KEY } from './storage';
import type { Materia } from './types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('materias storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads an empty list when storage has no saved materias', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    await expect(loadMaterias()).resolves.toEqual([]);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(MATERIAS_STORAGE_KEY);
  });

  it('loads previously stored materias', async () => {
    const materias: Materia[] = [
      {
        id: 'materia-1',
        nombre: 'Matemáticas',
        notaPrimerBimestre: 10,
      },
      {
        id: 'materia-2',
        nombre: 'Física',
        notaPrimerBimestre: 18,
      },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(materias));

    await expect(loadMaterias()).resolves.toEqual(materias);
  });

  it('saves a materias collection as JSON', async () => {
    const materias: Materia[] = [
      {
        id: 'materia-1',
        nombre: 'Inglés',
        notaPrimerBimestre: 15,
      },
    ];

    await saveMaterias(materias);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      MATERIAS_STORAGE_KEY,
      JSON.stringify(materias),
    );
  });
});
