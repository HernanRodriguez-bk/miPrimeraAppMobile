import { useRouter } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

export function HeroBanner() {
    const router = useRouter();

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80' }}
            style={styles.banner}
            imageStyle={styles.backgroundImage}
        >
            {/* Capa oscura para mejorar la legibilidad del texto */}
            <View style={styles.overlay}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>🔥 OFERTAS ESPECIALES</Text>
                </View>
                <Text style={styles.title}>Tecnología y Moda{'\n'}al mejor precio</Text>
                <Text style={styles.subtitle}>Envíos gratis en compras superiores a $ 10.000</Text>
                <Pressable style={styles.ctaBtn} onPress={() => router.push('/cart')}>
                    <Text style={styles.ctaBtnText}>Ver mi Carrito 🛒</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    banner: {
        borderRadius: 16,
        overflow: 'hidden', // Importante para que respete el borde redondeado con la imagen
        marginBottom: 16,
    },
    backgroundImage: {
        borderRadius: 16,
    },
    overlay: {
        backgroundColor: 'rgba(11, 31, 58, 0.75)',
        padding: 20,
        width: '100%',
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28,
        marginBottom: 6,
    },
    subtitle: {
        color: '#E0E7FF',
        fontSize: 13,
        marginBottom: 16,
    },
    ctaBtn: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    ctaBtnText: {
        color: '#1357C5',
        fontSize: 13,
        fontWeight: '700',
    },
});