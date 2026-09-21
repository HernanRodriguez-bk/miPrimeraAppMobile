import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useRouter } from 'expo-router';
import { GestureResponderEvent, Image, Pressable, StyleSheet, Text, View } from 'react-native';

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

    function abrirDetalle() {
        router.push({
            pathname: '/product/[id]',
            params: { id: String(id) },
        });
    }

    function handleAddToCart(e: GestureResponderEvent) {
        e.stopPropagation();
        addToCart({
            id,
            title: nombre,
            price: precio,
            image: imageUrl,
            quantity: 1,
        });
        if (onActionToast) {
            onActionToast(`🛒 ¡${nombre} agregado al carrito!`);
        }
    }

    function handleToggleFavorite(e: GestureResponderEvent) {
        e.stopPropagation();
        if (isFav) {
            removeFavorite(id);
            if (onActionToast) {
                onActionToast(`💔 Quitado de favoritos`);
            }
        } else {
            addFavorite({
                id,
                title: nombre,
                price: precio,
                image: imageUrl,
                category: categoria
            });
            if (onActionToast) {
                onActionToast(`❤️ ¡Guardado en favoritos!`);
            }
        }
    }

    return (
        <Pressable style={styles.card} onPress={abrirDetalle}>
            <Image source={imageSource} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{nombre}</Text>
                <Text style={styles.price}>$ {precio.toLocaleString('es-AR')}</Text>
                <View style={styles.metaRow}>
                    <Text style={styles.category}>{categoria}</Text>
                    {rating && (
                        <Text style={styles.ratingText}>⭐ {rating.rate} ({rating.count})</Text>
                    )}
                </View>

                {/* Contenedor en fila para alinear el botón de Agregar y el Corazón */}
                <View style={styles.actionsRow}>
                    <Pressable style={styles.btnCart} onPress={handleAddToCart}>
                        <Text style={styles.btnCartText}>+ Agregar</Text>
                    </Pressable>

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
        backgroundColor: '#EAF3FF',
        borderRadius: 14,
        overflow: 'hidden',
    },
    image: { width: 120, height: 120 },
    info: { flex: 1, padding: 14, justifyContent: 'center' },
    name: { fontSize: 20, fontWeight: '700', color: '#0B1F3A' },
    price: { fontSize: 18, fontWeight: '700', color: '#1357C5', marginTop: 6 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
    category: { color: '#506079', fontSize: 12, flex: 1 },
    ratingText: { color: '#D97706', fontSize: 11, fontWeight: '700', marginLeft: 4 },

    // Fila para los botones
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 8, // Espacio entre el botón de agregar y el corazón
    },
    btnCart: {
        backgroundColor: '#1357C5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    btnCartText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },

    // Nuevo diseño del botón de favorito al lado del carrito
    btnFav: {
        backgroundColor: '#FFFFFF',
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    favIcon: {
        fontSize: 16,
    },
});