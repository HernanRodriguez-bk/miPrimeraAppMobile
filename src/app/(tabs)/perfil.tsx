import { AvatarPicker } from '@/components/AvatarPicker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../context/ProfileContext';

export default function PerfilScreen() {
    const { profile, updateProfile, isLoading } = useProfile();
    const [isEditing, setIsEditing] = useState(false);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [avatarUri, setAvatarUri] = useState<string | null | undefined>(null); // <-- Nuevo estado

    useEffect(() => {
        if (profile) {
            setNombre(profile.nombre);
            setEmail(profile.email);
            setTelefono(profile.telefono);
            setAvatarUri(profile.avatarUri); // <-- Cargamos la foto guardada
        }
    }, [profile]);

    const handleSave = async () => {
        await updateProfile({ nombre, email, telefono, avatarUri }); // <-- Guardamos la foto
        setIsEditing(false);
        Alert.alert('¡Listo!', 'Tu perfil ha sido actualizado.');
    };

    const handleCancel = () => {
        // Restauramos los valores originales si cancela
        setNombre(profile?.nombre || '');
        setEmail(profile?.email || '');
        setTelefono(profile?.telefono || '');
        setAvatarUri(profile?.avatarUri); // <-- Restauramos la foto original
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#1357C5" />
            </SafeAreaView>
        );
    }

    // Obtenemos la inicial para el Avatar
    const inicial = profile?.nombre ? profile.nombre.charAt(0).toUpperCase() : 'U';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Cabecera */}
                <View style={styles.headerBackground} />

                {/* Selector de Avatar */}
                <View style={{ marginTop: -80, zIndex: 10 }}>
                    <AvatarPicker
                        avatarUri={avatarUri}
                        isEditing={isEditing}
                        onImageSelected={setAvatarUri}
                    />
                </View>

                {/* Información Principal (Solo visible en modo lectura) */}
                {!isEditing && (
                    <View style={styles.mainInfo}>
                        <Text style={styles.nameTitle}>{profile.nombre}</Text>
                        <Text style={styles.emailSubtitle}>{profile.email}</Text>
                    </View>
                )}

                {/* Tarjeta de Datos Personales */}
                <View style={[styles.card, isEditing ? { marginTop: 60 } : null]}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>
                            {isEditing ? 'Editar Información' : 'Datos Personales'}
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre completo</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={nombre}
                                onChangeText={setNombre}
                                placeholder="Tu nombre"
                            />
                        ) : (
                            <Text style={styles.valueText}>{profile.nombre}</Text>
                        )}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo Electrónico</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="tu@email.com"
                            />
                        ) : (
                            <Text style={styles.valueText}>{profile.email}</Text>
                        )}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Teléfono</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={telefono}
                                onChangeText={setTelefono}
                                keyboardType="phone-pad"
                                placeholder="Tu número"
                            />
                        ) : (
                            <Text style={styles.valueText}>
                                {profile.telefono || 'No especificado'}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Botones de Acción */}
                <View style={styles.actions}>
                    {isEditing ? (
                        <>
                            <Pressable style={[styles.btn, styles.btnSave]} onPress={handleSave}>
                                <Text style={styles.btnSaveText}>Guardar Cambios</Text>
                            </Pressable>
                            <Pressable style={[styles.btn, styles.btnCancel]} onPress={handleCancel}>
                                <Text style={styles.btnCancelText}>Cancelar</Text>
                            </Pressable>
                        </>
                    ) : (
                        <Pressable style={[styles.btn, styles.btnEdit]} onPress={() => setIsEditing(true)}>
                            <Text style={styles.btnEditText}>Editar Perfil</Text>
                        </Pressable>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6F8' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scroll: { paddingBottom: 40 },

    // Diseño de la Cabecera
    headerBackground: {
        backgroundColor: '#1357C5', // Azul corporativo
        height: 140,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        zIndex: 1,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -50, // Efecto de superposición
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    avatarText: { fontSize: 36, fontWeight: '800', color: '#1357C5' },

    // Textos debajo del Avatar
    mainInfo: { marginTop: 60, alignItems: 'center', paddingHorizontal: 20 },
    nameTitle: { fontSize: 24, fontWeight: '800', color: '#0B1F3A' },
    emailSubtitle: { fontSize: 16, color: '#506079', marginTop: 4 },

    // Tarjeta de Formulario
    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    cardHeader: { marginBottom: 16 },
    cardTitle: { fontSize: 18, fontWeight: '700', color: '#0B1F3A' },
    inputContainer: { marginVertical: 6 },
    label: { fontSize: 12, fontWeight: '600', color: '#8294B0', textTransform: 'uppercase', marginBottom: 4 },
    valueText: { fontSize: 16, color: '#0B1F3A', fontWeight: '500', paddingVertical: 8 },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#1357C5',
        fontSize: 16,
        color: '#0B1F3A',
        paddingVertical: 8,
    },
    divider: { height: 1, backgroundColor: '#EAF3FF', marginVertical: 8 },

    // Botones
    actions: { marginHorizontal: 20, marginTop: 30, gap: 12 },
    btn: { padding: 16, borderRadius: 12, alignItems: 'center' },
    btnEdit: { backgroundColor: '#EAF3FF' },
    btnEditText: { color: '#1357C5', fontSize: 16, fontWeight: '700' },
    btnSave: { backgroundColor: '#1357C5' },
    btnSaveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
    btnCancel: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#CBD5E1' },
    btnCancelText: { color: '#64748B', fontSize: 16, fontWeight: '700' },
});