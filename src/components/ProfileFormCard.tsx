import { KeyboardTypeOptions, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../constants/theme';
import { FormField } from './ui/FormField';

export interface ProfileFormValues {
  nombre: string;
  email: string;
  telefono: string;
}

export interface ProfileFormCardProps {
  isEditing: boolean;
  values: ProfileFormValues;
  onChangeField: (field: keyof ProfileFormValues, value: string) => void;
}

const PROFILE_FIELDS: ReadonlyArray<{
  key: keyof ProfileFormValues;
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words';
}> = [
    {
      key: 'nombre',
      label: 'Nombre completo',
      placeholder: 'Tu nombre',
      autoCapitalize: 'words',
    },
    {
      key: 'email',
      label: 'Correo Electrónico',
      placeholder: 'tu@email.com',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      placeholder: 'Tu número',
      keyboardType: 'phone-pad',
    },
  ];

export function ProfileFormCard({
  isEditing,
  values,
  onChangeField,
}: ProfileFormCardProps) {
  return (
    <View style={[styles.card, isEditing && styles.cardEditing]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {isEditing ? 'Editar Información' : 'Datos Personales'}
        </Text>
      </View>

      {PROFILE_FIELDS.map((field, idx) => (
        <FormField
          key={field.key}
          label={field.label}
          value={values[field.key]}
          onChangeText={(txt) => onChangeField(field.key, txt)}
          placeholder={field.placeholder}
          keyboardType={field.keyboardType}
          autoCapitalize={field.autoCapitalize}
          editableMode={isEditing}
          variant="underlined"
          showDivider={idx < PROFILE_FIELDS.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: APP_THEME.colors.surface,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: APP_THEME.radius.lg,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardEditing: {
    marginTop: 20,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: APP_THEME.colors.textDark,
  },
});
