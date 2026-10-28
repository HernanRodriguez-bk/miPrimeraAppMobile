import { AvatarPicker } from '@/components/AvatarPicker';
import { LocationPicker } from '@/components/LocationPicker';
import { ProfileFormCard, ProfileFormValues } from '@/components/ProfileFormCard';
import { AppButton } from '@/components/ui/AppButton';
import { LoadingState } from '@/components/ui/StateFeedback';
import { APP_THEME } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '../../context/ProfileContext';

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { profile, updateProfile, isLoading } = useProfile();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<ProfileFormValues>({
    nombre: '',
    email: '',
    telefono: '',
  });
  const [avatarUri, setAvatarUri] = useState<string | null | undefined>(null);

  useEffect(() => {
    setFormValues({
      nombre: profile.nombre,
      email: profile.email,
      telefono: profile.telefono,
    });
    setAvatarUri(profile.avatarUri);
  }, [profile]);

  const handleFieldChange = (field: keyof ProfileFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formValues.nombre.trim() || !formValues.email.trim()) {
      Alert.alert('Datos incompletos', 'El nombre y el correo electrónico son obligatorios.');
      return;
    }
    await updateProfile({
      ...formValues,
      avatarUri,
    });
    setIsEditing(false);
    Alert.alert('¡Listo!', 'Tu perfil ha sido actualizado.');
  };

  const handleCancel = () => {
    setFormValues({
      nombre: profile.nombre,
      email: profile.email,
      telefono: profile.telefono,
    });
    setAvatarUri(profile.avatarUri);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LoadingState message="Cargando perfil..." />
      </View>
    );
  }

  const fallbackInitial = profile.nombre ? profile.nombre.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Cabecera full-bleed adaptada con useSafeAreaInsets para Expo SDK 58 Edge-to-Edge */}
        <View
          style={[
            styles.headerBackground,
            { paddingTop: insets.top, height: 136 + insets.top },
          ]}
        />

        {/* Avatar con captura por Cámara y selección desde Galería */}
        <View style={styles.avatarWrapper}>
          <AvatarPicker
            avatarUri={avatarUri}
            fallbackInitial={fallbackInitial}
            isEditing={isEditing}
            onImageSelected={setAvatarUri}
          />
        </View>

        {!isEditing ? (
          <View style={styles.mainInfo}>
            <Text style={styles.nameTitle}>{profile.nombre}</Text>
            <Text style={styles.emailSubtitle}>{profile.email}</Text>
          </View>
        ) : null}

        {/* Formulario componentizado de Datos Personales */}
        <ProfileFormCard
          isEditing={isEditing}
          values={formValues}
          onChangeField={handleFieldChange}
        />

        {/* Geolocalización GPS reutilizable */}
        <View style={styles.locationWrapper}>
          <LocationPicker />
        </View>

        {/* Acciones de Edición */}
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <AppButton
                label="Guardar Cambios"
                size="lg"
                variant="primary"
                onPress={handleSave}
              />
              <AppButton
                label="Cancelar"
                size="lg"
                variant="outline"
                onPress={handleCancel}
              />
            </>
          ) : (
            <AppButton
              label="Editar Perfil"
              size="lg"
              variant="soft"
              onPress={() => setIsEditing(true)}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_THEME.colors.backgroundAlt,
  },
  scroll: {
    paddingBottom: 40,
  },
  headerBackground: {
    backgroundColor: APP_THEME.colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 1,
  },
  avatarWrapper: {
    marginTop: -64,
    zIndex: 10,
  },
  mainInfo: {
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: APP_THEME.colors.textDark,
  },
  emailSubtitle: {
    fontSize: 15,
    color: '#506079',
    marginTop: 4,
  },
  locationWrapper: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  actions: {
    marginHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
});
