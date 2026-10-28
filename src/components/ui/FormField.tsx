import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { APP_THEME } from '../../constants/theme';

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /**
   * Si es false, muestra el valor en modo solo lectura (ideal para Perfil).
   * Por defecto es true (modo formulario editable como Checkout).
   */
  editableMode?: boolean;
  emptyFallback?: string;
  variant?: 'boxed' | 'underlined';
  showDivider?: boolean;
}

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editableMode = true,
  emptyFallback = 'No especificado',
  variant = 'boxed',
  showDivider = false,
}: FormFieldProps) {
  const isUnderlined = variant === 'underlined';

  return (
    <>
      <View style={isUnderlined ? styles.underlinedContainer : styles.boxedContainer}>
        <Text style={isUnderlined ? styles.underlinedLabel : styles.boxedLabel}>{label}</Text>
        {editableMode ? (
          <TextInput
            style={isUnderlined ? styles.underlinedInput : styles.boxedInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={APP_THEME.colors.textPlaceholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
        ) : (
          <Text style={styles.readOnlyValue}>{value?.trim() ? value : emptyFallback}</Text>
        )}
      </View>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  boxedContainer: {
    marginTop: 10,
  },
  boxedLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: APP_THEME.colors.textSecondary,
    marginBottom: 6,
  },
  boxedInput: {
    backgroundColor: APP_THEME.colors.surfaceMuted,
    borderRadius: APP_THEME.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: APP_THEME.colors.textPrimary,
    borderWidth: 1,
    borderColor: APP_THEME.colors.borderStrong,
  },
  underlinedContainer: {
    marginVertical: 6,
  },
  underlinedLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8294B0',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  underlinedInput: {
    borderBottomWidth: 1,
    borderBottomColor: APP_THEME.colors.primaryDark,
    fontSize: 16,
    color: APP_THEME.colors.textDark,
    paddingVertical: 8,
  },
  readOnlyValue: {
    fontSize: 16,
    color: APP_THEME.colors.textDark,
    fontWeight: '500',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: APP_THEME.colors.primaryTint,
    marginVertical: 8,
  },
});
