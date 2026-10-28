import { APP_THEME, formatPriceARS } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'expo-router';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppButton } from './ui/AppButton';
import { RatingBadge } from './ui/RatingBadge';

export interface ProductoData {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string | { uri: string };
  rating?: { rate: number; count: number };
}

export type ProductCardProps =
  | (ProductoData & { onActionToast?: (msg: string) => void })
  | { producto: ProductoData; onActionToast?: (msg: string) => void };

export function ProductCard(props: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const data = 'producto' in props ? props.producto : props;
  const { id, nombre, precio, categoria, imagen, rating } = data;
  const onActionToast = props.onActionToast;

  const imageSource = typeof imagen === 'string' ? { uri: imagen } : imagen;
  const imageUrl = typeof imagen === 'string' ? imagen : imagen.uri;
  const isFav = isFavorite(id);

  const abrirDetalle = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id: String(id) },
    });
  };

  const handleAddToCart = (e: GestureResponderEvent) => {
    e.stopPropagation();
    void addToCart({
      id,
      title: nombre,
      price: precio,
      image: imageUrl,
      quantity: 1,
    });
    onActionToast?.(`🛒 ¡${nombre} agregado al carrito!`);
  };

  const handleToggleFavorite = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (isFav) {
      void removeFavorite(id);
      onActionToast?.('💔 Quitado de favoritos');
    } else {
      void addFavorite({
        id,
        title: nombre,
        price: precio,
        image: imageUrl,
        category: categoria,
      });
      onActionToast?.('❤️ ¡Guardado en favoritos!');
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={abrirDetalle}
    >
      <Image source={imageSource} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {nombre}
        </Text>
        <Text style={styles.price}>{formatPriceARS(precio)}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.category} numberOfLines={1}>
            {categoria}
          </Text>
          {rating ? <RatingBadge rate={rating.rate} count={rating.count} /> : null}
        </View>

        <View style={styles.actionsRow}>
          <AppButton label="+ Agregar" size="sm" variant="primary" onPress={handleAddToCart} />

          <Pressable style={styles.btnFav} onPress={handleToggleFavorite}>
            <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: APP_THEME.colors.primaryTint,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.92,
  },
  image: {
    width: 116,
    height: 116,
    backgroundColor: APP_THEME.colors.surface,
    margin: 8,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 14,
    paddingLeft: 6,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: APP_THEME.colors.textDark,
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: APP_THEME.colors.primaryDark,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  category: {
    color: '#506079',
    fontSize: 12,
    flex: 1,
    textTransform: 'capitalize',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  btnFav: {
    backgroundColor: APP_THEME.colors.surface,
    width: 36,
    height: 36,
    borderRadius: APP_THEME.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: APP_THEME.colors.borderStrong,
  },
  favIcon: {
    fontSize: 16,
  },
});
