import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { APP_THEME, formatPriceARS } from '../constants/theme';
import { CartItem } from '../services/storage';
import { QuantitySelector } from './ui/QuantitySelector';

export const CART_CARD_TOTAL_HEIGHT = 112;

export interface CartItemCardProps {
  item: CartItem;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export function CartItemCard({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CartItemCardProps) {
  return (
    <View style={styles.cartCard}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>{formatPriceARS(item.price)} c/u</Text>

        <View style={styles.counterRow}>
          <QuantitySelector
            size="sm"
            value={item.quantity}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />
          <Text style={styles.subtotal}>{formatPriceARS(item.price * item.quantity)}</Text>
        </View>
      </View>

      <Pressable onPress={onRemove} style={styles.removeBtn} hitSlop={8}>
        <Text style={styles.removeBtnText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cartCard: {
    flexDirection: 'row',
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.md,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: APP_THEME.radius.sm,
    backgroundColor: APP_THEME.colors.surfaceMuted,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_THEME.colors.textPrimary,
  },
  itemPrice: {
    fontSize: 12,
    color: APP_THEME.colors.textMuted,
    marginTop: 2,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '700',
    color: APP_THEME.colors.primary,
  },
  removeBtn: {
    padding: 8,
    marginLeft: 4,
  },
  removeBtnText: {
    color: APP_THEME.colors.danger,
    fontSize: 16,
    fontWeight: '700',
  },
});
