import { useRouter } from 'expo-router';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { APP_THEME } from '../constants/theme';

export function HeroBanner() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const heroMinHeight = Math.max(185, Math.min(260, Math.round(width * 0.45)));

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
      }}
      style={[styles.banner, { minHeight: heroMinHeight }]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 OFERTAS ESPECIALES</Text>
        </View>
        <Text style={styles.title}>Tecnología y Moda{'\n'}al mejor precio</Text>
        <Text style={styles.subtitle}>Envíos gratis en compras superiores a $ 10.000</Text>
        <Pressable
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaPressed]}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.ctaBtnText}>Ver mi Carrito 🛒</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: APP_THEME.radius.lg,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    borderRadius: APP_THEME.radius.lg,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 31, 58, 0.75)',
    padding: 20,
    width: '100%',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: APP_THEME.radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: APP_THEME.colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    color: APP_THEME.colors.white,
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
    backgroundColor: APP_THEME.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: APP_THEME.radius.sm,
    alignSelf: 'flex-start',
  },
  ctaPressed: {
    opacity: 0.88,
  },
  ctaBtnText: {
    color: APP_THEME.colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
});
