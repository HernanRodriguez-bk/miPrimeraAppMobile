import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../components/ui/AppButton';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { RatingBadge } from '../../components/ui/RatingBadge';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { ErrorState, LoadingState } from '../../components/ui/StateFeedback';
import { APP_THEME, formatPriceARS } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useProductDetail } from '../../hooks/useProducts';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const { producto, cargando, error } = useProductDetail(id);
  const [cantidad, setCantidad] = useState<number>(1);

  const handleAgregar = async () => {
    if (!producto) return;
    await addToCart({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      quantity: cantidad,
    });
    router.push('/cart');
  };

  if (cargando) {
    return (
      <ScreenContainer mode="stack">
        <LoadingState message="Cargando detalle..." />
      </ScreenContainer>
    );
  }

  if (error || !producto) {
    return (
      <ScreenContainer mode="stack">
        <ErrorState
          message={error || 'Producto no encontrado'}
          actionLabel="Volver"
          onAction={() => router.back()}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer mode="stack">
      <ScreenHeader title="Detalle" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: producto.image }} style={styles.image} resizeMode="contain" />

        <View style={styles.metaHeader}>
          <Text style={styles.category}>{producto.category.toUpperCase()}</Text>
          {producto.rating ? (
            <RatingBadge rate={producto.rating.rate} count={producto.rating.count} showLabel />
          ) : null}
        </View>

        <Text style={styles.title}>{producto.title}</Text>
        <Text style={styles.price}>{formatPriceARS(producto.price)}</Text>
        <Text style={styles.description}>{producto.description}</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad:</Text>
          <QuantitySelector
            size="md"
            value={cantidad}
            minDisabled={cantidad <= 1}
            maxDisabled={cantidad >= 50}
            onDecrement={() => setCantidad((prev) => Math.max(1, prev - 1))}
            onIncrement={() => setCantidad((prev) => Math.min(50, prev + 1))}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton label="Agregar al Carrito" size="lg" variant="primary" onPress={handleAgregar} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.md,
    marginBottom: 20,
  },
  metaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: APP_THEME.colors.textMuted,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: APP_THEME.colors.textPrimary,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: APP_THEME.colors.primary,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: APP_THEME.colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: APP_THEME.colors.surface,
    padding: 16,
    borderRadius: APP_THEME.radius.md,
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: APP_THEME.colors.textPrimary,
  },
  footer: {
    padding: 16,
    backgroundColor: APP_THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: APP_THEME.colors.border,
  },
});
