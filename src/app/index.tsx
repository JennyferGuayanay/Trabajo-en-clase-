import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Materia } from '@/features/materias/types';
import { prepareMateriaSubmission } from '@/features/materias/registration';

const colors = {
  header: '#001F3F',
  primary: '#357ca5',
  background: '#e2e4e9',
  surface: '#FFFFFF',
  text: '#111111',
  secondaryText: '#5a6e82',
  border: '#b5bbc8',
  error: '#d33724',
};

export default function HomeScreen() {
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const nextId = useRef(0);
  const notaInput = useRef<TextInput>(null);

  function handleSubmit() {
    const result = prepareMateriaSubmission(nombre, nota, materias);

    if (result.status !== 'valid') {
      setError(result.error);
      setMensaje('');
      setNombre('');
      setNota('');
      return;
    }

    setMaterias((currentMaterias) => [
      ...currentMaterias,
      {
        id: `${Date.now()}-${nextId.current++}`,
        nombre: result.nombre,
        notaPrimerBimestre: result.notaPrimerBimestre,
      },
    ]);
    setNombre('');
    setNota('');
    setError('');
    setMensaje('Materia registrada en esta sesión.');
  }

  function clearFeedback() {
    setError('');
    setMensaje('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.eyebrow}>CALCULADORA DE SUPLETORIO</Text>
            <Text style={styles.title}>Registrar materia</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.description}>
              Ingresa el nombre de la materia y la nota del primer bimestre.
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>Nombre de la materia</Text>
              <TextInput
                accessibilityLabel="Nombre de la materia"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={(value) => {
                  setNombre(value);
                  clearFeedback();
                }}
                onSubmitEditing={() => notaInput.current?.focus()}
                placeholder="Ej. Matemáticas"
                placeholderTextColor={colors.secondaryText}
                returnKeyType="next"
                style={styles.input}
                value={nombre}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Nota del primer bimestre</Text>
              <TextInput
                accessibilityLabel="Nota del primer bimestre"
                keyboardType="decimal-pad"
                ref={notaInput}
                onChangeText={(value) => {
                  setNota(value);
                  clearFeedback();
                }}
                onSubmitEditing={handleSubmit}
                placeholder="Entre 0 y 20"
                placeholderTextColor={colors.secondaryText}
                returnKeyType="done"
                style={styles.input}
                value={nota}
              />
              <Text style={styles.helperText}>Ingresa un número entero de 0 a 20.</Text>
            </View>

            {error ? (
              <Text accessibilityLiveRegion="polite" style={styles.errorMessage}>
                {error}
              </Text>
            ) : null}
            {mensaje ? (
              <Text accessibilityLiveRegion="polite" style={styles.successMessage}>
                {mensaje}
              </Text>
            ) : null}

            <Pressable
              accessibilityLabel="Guardar materia"
              accessibilityRole="button"
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
              ]}>
              <Text style={styles.submitButtonText}>Guardar materia</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    minHeight: 142,
    justifyContent: 'center',
    backgroundColor: colors.header,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  eyebrow: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    margin: 20,
    padding: 20,
    gap: 18,
  },
  description: {
    color: colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    minHeight: 52,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
  },
  helperText: {
    color: colors.secondaryText,
    fontSize: 13,
    lineHeight: 18,
  },
  errorMessage: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  successMessage: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  submitButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
