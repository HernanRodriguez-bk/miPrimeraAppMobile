import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { APP_THEME, formatPriceARS } from '../constants/theme';
import { FavoriteItem } from '../context/FavoritesContext';

export const FAVORITE_CARD_TOTAL_HEIGHT = 116; // 104px alto + 12px margen inferior

export interface FavoriteCardProps {
  item: FavoriteItem;
  onPress: () => void;
}

export function FavoriteCard({ item, onPress }: FavoriteCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatPriceARS(item.price)}</Text>
        <Text style={styles.gestureHint}>⬅️ Deslizá para borrar • ⠿ Mantené para mover</Text>
      </View>

      <View style={styles.dragHandle}>
        <Text style={styles.dragHandleIcon}>⠿</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 104,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: APP_THEME.radius.md,
    backgroundColor: APP_THEME.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: APP_THEME.radius.sm,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: APP_THEME.colors.textDark,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_THEME.colors.primaryDark,
    marginBottom: 4,
  },
  gestureHint: {
    fontSize: 11,
    color: APP_THEME.colors.textMuted,
  },
  dragHandle: {
    paddingHorizontal: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandleIcon: {
    fontSize: 20,
    color: APP_THEME.colors.textPlaceholder,
    fontWeight: '700',
  },
});
