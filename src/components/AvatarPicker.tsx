import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface AvatarPickerProps {
    avatarUri?: string | null;
    isEditing: boolean;
    onImageSelected: (uri: string) => void;
}

export const AvatarPicker = ({ avatarUri, isEditing, onImageSelected }: AvatarPickerProps) => {

    const seleccionarDeGaleria = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const tomarFoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
            ) : (
                <View style={[styles.avatar, styles.placeholder]}>
                    <Text style={styles.placeholderTxt}>Sin Foto</Text>
                </View>
            )}

            {isEditing && (
                <View style={styles.btnRow}>
                    <Pressable style={styles.btn} onPress={tomarFoto}>
                        <Text style={styles.btnTxt}>📷 Cámara</Text>
                    </Pressable>

                    <Pressable style={[styles.btn, styles.btnSecondary]} onPress={seleccionarDeGaleria}>
                        <Text style={styles.btnTxt}>🖼️ Galería</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginVertical: 16 },
    avatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 16 },
    placeholder: { backgroundColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    placeholderTxt: { color: '#475569', fontWeight: '600' },
    btnRow: { flexDirection: 'row', gap: 10 },
    btn: { backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
    btnSecondary: { backgroundColor: '#475569' },
    btnTxt: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
});