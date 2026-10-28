import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CartBadgeButton } from '../../components/CartBadgeButton';
import { CatalogFilterBar } from '../../components/CatalogFilterBar';
import { HeroBanner } from '../../components/HeroBanner';
import ProductCard from '../../components/ProductCard';
import { Toast } from '../../components/Toast';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { EmptyState, ErrorState, LoadingState } from '../../components/ui/StateFeedback';
import { useProducts } from '../../hooks/useProducts';
import { useToast } from '../../hooks/useToast';

export default function HomeScreen() {
  const {
    productos,
    productosFiltrados,
    cargando,
    error,
    searchQuery,
    setSearchQuery,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    recargarProductos,
  } = useProducts();

  const { toastMessage, toastVisible, showToast, hideToast } = useToast();

  // Elemento JSX memoizado para conservar el foco del TextInput en cada pulsación
  const listHeaderElement = useMemo(
    () => (
      <View>
        <HeroBanner />
        <CatalogFilterBar
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
          selectedCategory={categoriaSeleccionada}
          onSelectCategory={setCategoriaSeleccionada}
        />
      </View>
    ),
    [searchQuery, setSearchQuery, categoriaSeleccionada, setCategoriaSeleccionada]
  );

  if (cargando && productos.length === 0) {
    return (
      <ScreenContainer mode="tab">
        <LoadingState message="Cargando catálogo desde FakeStore API..." />
      </ScreenContainer>
    );
  }

  if (error && productos.length === 0) {
    return (
      <ScreenContainer mode="tab">
        <ErrorState message={error} onAction={recargarProductos} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer mode="tab">
      <ScreenHeader
        title="La Tienda"
        subtitle="Catálogo API en vivo"
        rightAccessory={<CartBadgeButton />}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={listHeaderElement}
        refreshing={cargando}
        onRefresh={recargarProductos}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyState
            compact
            emoji="🔎"
            subtitle="No se encontraron productos para esta búsqueda."
          />
        }
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            nombre={item.title}
            precio={item.price}
            categoria={item.category}
            imagen={item.image}
            rating={item.rating}
            onActionToast={showToast}
          />
        )}
      />

      <Toast visible={toastVisible} message={toastMessage} onDismiss={hideToast} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
});
