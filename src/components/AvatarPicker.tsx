import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../constants/theme';
import { AppButton } from './ui/AppButton';

export interface AvatarPickerProps {
  avatarUri?: string | null;
  fallbackInitial?: string;
  isEditing: boolean;
  onImageSelected: (uri: string) => void;
}

const IMAGE_PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
};

export const AvatarPicker = ({
  avatarUri,
  fallbackInitial = 'U',
  isEditing,
  onImageSelected,
}: AvatarPickerProps) => {
  const seleccionarDeGaleria = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para elegir un avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_OPTIONS);
    if (!result.canceled && result.assets[0]?.uri) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para tomar la foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync(IMAGE_PICKER_OPTIONS);
    if (!result.canceled && result.assets[0]?.uri) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]}>
          <Text style={styles.placeholderInitial}>{fallbackInitial}</Text>
        </View>
      )}

      {isEditing ? (
        <View style={styles.btnRow}>
          <AppButton label="📷 Cámara" size="sm" variant="primary" onPress={tomarFoto} />
          <AppButton
            label="🖼️ Galería"
            size="sm"
            variant="secondary"
            onPress={seleccionarDeGaleria}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: APP_THEME.colors.surface,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
  placeholder: {
    backgroundColor: APP_THEME.colors.primaryTint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderInitial: {
    color: APP_THEME.colors.primaryDark,
    fontWeight: '800',
    fontSize: 38,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
});
