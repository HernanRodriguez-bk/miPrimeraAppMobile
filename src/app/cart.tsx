import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CART_CARD_TOTAL_HEIGHT, CartItemCard } from '../components/CartItemCard';
import { AppButton } from '../components/ui/AppButton';
import { ScreenContainer } from '../components/ui/ScreenContainer';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { EmptyState } from '../components/ui/StateFeedback';
import { SwipeableDraggableRow } from '../components/ui/SwipeableDraggableRow';
import { APP_THEME, formatPriceARS } from '../constants/theme';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, reorderCart, updateQuantity, totalPrice } = useCart();

  const handleMoveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      const updated = [...cart];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      void reorderCart(updated);
    },
    [cart, reorderCart]
  );

  return (
    <ScreenContainer mode="stack">
      <ScreenHeader
        title="Mi Carrito"
        subtitle={cart.length > 0 ? 'Deslizá un ítem para quitarlo' : undefined}
        showBack
      />

      {cart.length === 0 ? (
        <EmptyState
          emoji="🛒"
          title="Tu carrito está vacío"
          subtitle="Agregá productos desde el catálogo para comenzar tu pedido."
          actionLabel="Explorar Productos"
          onAction={() => router.back()}
        />
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <SwipeableDraggableRow
                index={index}
                totalItems={cart.length}
                itemHeight={CART_CARD_TOTAL_HEIGHT}
                onSwipeDelete={() => void removeFromCart(item.id)}
                onMoveItem={handleMoveItem}
              >
                <CartItemCard
                  item={item}
                  onDecrement={() => void updateQuantity(item.id, -1)}
                  onIncrement={() => void updateQuantity(item.id, 1)}
                  onRemove={() => void removeFromCart(item.id)}
                />
              </SwipeableDraggableRow>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a pagar:</Text>
              <Text style={styles.totalValue}>{formatPriceARS(totalPrice)}</Text>
            </View>
            <AppButton
              label="Ir a Pagar"
              size="lg"
              variant="success"
              onPress={() => router.push('/checkout')}
            />
          </View>
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: APP_THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: APP_THEME.colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: APP_THEME.colors.textMuted,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: APP_THEME.colors.textPrimary,
  },
});
