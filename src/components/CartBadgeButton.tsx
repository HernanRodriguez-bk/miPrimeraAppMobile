import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { APP_THEME } from '../constants/theme';
import { useCart } from '../context/CartContext';

export function CartBadgeButton() {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <Pressable
      style={({ pressed }) => [styles.cartBadge, pressed && styles.pressed]}
      onPress={() => router.push('/cart')}
    >
      <Text style={styles.cartBadgeText}>🛒 {totalItems}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartBadge: {
    backgroundColor: APP_THEME.colors.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: APP_THEME.radius.pill,
    borderWidth: 1,
    borderColor: APP_THEME.colors.primaryBorder,
  },
  pressed: {
    opacity: 0.8,
  },
  cartBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: APP_THEME.colors.primary,
  },
});
