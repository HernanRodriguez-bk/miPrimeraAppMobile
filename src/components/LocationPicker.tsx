import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../constants/theme';
import { AppButton } from './ui/AppButton';

export const LocationPicker = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const obtenerUbicacion = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Se requiere acceso a la ubicación para calcular envíos.'
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Envíos a tu ubicación</Text>

      {loading ? (
        <ActivityIndicator color={APP_THEME.colors.primary} style={styles.loader} />
      ) : location ? (
        <View style={styles.coordsBox}>
          <Text style={styles.coordText}>
            Latitud: {location.coords.latitude.toFixed(4)}
          </Text>
          <Text style={styles.coordText}>
            Longitud: {location.coords.longitude.toFixed(4)}
          </Text>
        </View>
      ) : (
        <Text style={styles.subtext}>Ubicación GPS aún no detectada.</Text>
      )}

      <AppButton
        label="Detectar Ubicación GPS"
        size="md"
        variant="primary"
        disabled={loading}
        onPress={obtenerUbicacion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
    marginBottom: 8,
  },
  loader: {
    marginVertical: 12,
  },
  subtext: {
    fontSize: 13,
    color: APP_THEME.colors.textMuted,
    marginBottom: 14,
  },
  coordsBox: {
    marginBottom: 14,
    padding: 10,
    borderRadius: APP_THEME.radius.sm,
    backgroundColor: APP_THEME.colors.primarySoft,
  },
  coordText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_THEME.colors.primary,
  },
});
