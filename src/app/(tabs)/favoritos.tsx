import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FAVORITE_CARD_TOTAL_HEIGHT, FavoriteCard } from '../../components/FavoriteCard';
import { Toast } from '../../components/Toast';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { EmptyState, LoadingState } from '../../components/ui/StateFeedback';
import { SwipeableDraggableRow } from '../../components/ui/SwipeableDraggableRow';
import { APP_THEME } from '../../constants/theme';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../hooks/useToast';

export default function FavoritosScreen() {
  const { favorites, removeFavorite, reorderFavorites, isLoading } = useFavorites();
  const { toastMessage, toastVisible, showToast, hideToast } = useToast();
  const router = useRouter();

  const handleMoveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      const updated = [...favorites];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      void reorderFavorites(updated);
      showToast('✨ Orden de favoritos actualizado');
    },
    [favorites, reorderFavorites, showToast]
  );

  const handleSwipeRemove = useCallback(
    (id: number, title: string) => {
      void removeFavorite(id);
      showToast(`🗑️ "${title}" eliminado de favoritos`);
    },
    [removeFavorite, showToast]
  );

  const handleOpenDetail = useCallback(
    (id: number) => {
      router.push({ pathname: '/product/[id]', params: { id: String(id) } });
    },
    [router]
  );

  if (isLoading) {
    return (
      <ScreenContainer mode="tab" backgroundColor={APP_THEME.colors.backgroundAlt}>
        <LoadingState message="Cargando favoritos..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer mode="tab" backgroundColor={APP_THEME.colors.backgroundAlt}>
      <ScreenHeader
        title="Mis Favoritos"
        subtitle={
          favorites.length > 0
            ? 'Deslizá para eliminar o mantené presionado para reordenar'
            : undefined
        }
      />

      {favorites.length === 0 ? (
        <EmptyState
          emoji="❤️"
          title="Mis Favoritos"
          subtitle="Aún no tienes productos guardados."
          actionLabel="Explorar Catálogo"
          onAction={() => router.push('/')}
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <SwipeableDraggableRow
              index={index}
              totalItems={favorites.length}
              itemHeight={FAVORITE_CARD_TOTAL_HEIGHT}
              onSwipeDelete={() => handleSwipeRemove(item.id, item.title)}
              onMoveItem={handleMoveItem}
            >
              <FavoriteCard item={item} onPress={() => handleOpenDetail(item.id)} />
            </SwipeableDraggableRow>
          )}
        />
      )}

      <Toast visible={toastVisible} message={toastMessage} onDismiss={hideToast} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});
