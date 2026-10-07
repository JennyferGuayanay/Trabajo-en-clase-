import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Materia } from './types';

export const MATERIAS_STORAGE_KEY = '@calculadora-epn/materias';

export async function loadMaterias(): Promise<Materia[]> {
  const raw = await AsyncStorage.getItem(MATERIAS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Materia =>
        item !== null &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.nombre === 'string' &&
        typeof item.notaPrimerBimestre === 'number',
    );
  } catch {
    return [];
  }
}

export async function saveMaterias(materias: Materia[]): Promise<void> {
  await AsyncStorage.setItem(MATERIAS_STORAGE_KEY, JSON.stringify(materias));
}
