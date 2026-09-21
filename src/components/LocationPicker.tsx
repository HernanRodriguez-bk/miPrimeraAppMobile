import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export const LocationPicker = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const obtenerUbicacion = async () => {
        setLoading(true);
        try {
            // 1. Solicitar permisos de ubicación
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación para calcular envíos.');
                setLoading(false);
                return;
            }

            // 2. Obtener posición GPS
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
                <ActivityIndicator color="#2563EB" />
            ) : location ? (
                <View style={styles.coordsBox}>
                    <Text style={styles.coordText}>Latitud: {location.coords.latitude.toFixed(4)}</Text>
                    <Text style={styles.coordText}>Longitud: {location.coords.longitude.toFixed(4)}</Text>
                </View>
            ) : (
                <Text style={styles.subtext}>Ubicación no seleccionada.</Text>
            )}

            <Pressable style={styles.btn} onPress={obtenerUbicacion}>
                <Text style={styles.btnText}>Detectar Ubicación GPS</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        marginVertical: 12,
    },
    title: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
    subtext: { fontSize: 13, color: '#64748B', marginBottom: 12 },
    coordsBox: { marginBottom: 12 },
    coordText: { fontSize: 14, fontWeight: '600', color: '#2563EB' },
    btn: {
        backgroundColor: '#2563EB',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
});