import { StyleSheet, Text, View } from 'react-native';
import { APP_THEME, formatPriceARS } from '../constants/theme';
import { CartItem } from '../services/storage';

export interface OrderSummaryCardProps {
  items: CartItem[];
  totalPrice: number;
}

export function OrderSummaryCard({ items, totalPrice }: OrderSummaryCardProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📦 Resumen del Pedido</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.quantity}x {item.title}
          </Text>
          <Text style={styles.itemPrice}>{formatPriceARS(item.price * item.quantity)}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total a pagar:</Text>
        <Text style={styles.totalValue}>{formatPriceARS(totalPrice)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.md,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_THEME.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: APP_THEME.colors.border,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: APP_THEME.colors.textSecondary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: APP_THEME.colors.primary,
  },
});
