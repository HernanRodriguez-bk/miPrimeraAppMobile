import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';
import { getProductById, ProductoAPI } from '../../services/api';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { addToCart } = useCart();

    const [producto, setProducto] = useState<ProductoAPI | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);

    useEffect(() => {
        if (id) {
            cargarDetalle(Number(id));
        }
    }, [id]);

    const cargarDetalle = async (productId: number) => {
        try {
            setCargando(true);
            setError(null);
            const data = await getProductById(productId);
            setProducto(data);
        } catch (e) {
            setError('No se pudo cargar el detalle del producto.');
        } finally {
            setCargando(false);
        }
    };

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
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.loadingText}>Cargando detalle...</Text>
            </SafeAreaView>
        );
    }

    if (error || !producto) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.errorText}>{error || 'Producto no encontrado'}</Text>
                <Pressable style={styles.btnBack} onPress={() => router.back()}>
                    <Text style={styles.btnBackText}>Volver</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backBtn}>&larr; Volver</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Detalle</Text>
                <View style={{ width: 50 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: producto.image }} style={styles.image} resizeMode="contain" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.category}>{producto.category.toUpperCase()}</Text>
                    {producto.rating && (
                        <Text style={{ fontSize: 13, color: '#D97706', fontWeight: '700' }}>
                            ⭐ {producto.rating.rate} ({producto.rating.count} opiniones)
                        </Text>
                    )}
                </View>
                <Text style={styles.title}>{producto.title}</Text>
                <Text style={styles.price}>$ {producto.price.toLocaleString('es-AR')}</Text>
                <Text style={styles.description}>{producto.description}</Text>

                {/* Control de cantidad */}
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>Cantidad:</Text>
                    <View style={styles.counterRow}>
                        <Pressable
                            style={styles.counterBtn}
                            onPress={() => setCantidad(Math.max(1, cantidad - 1))}
                        >
                            <Text style={styles.counterBtnText}>-</Text>
                        </Pressable>
                        <Text style={styles.quantityValue}>{cantidad}</Text>
                        <Pressable
                            style={styles.counterBtn}
                            onPress={() => setCantidad(cantidad + 1)}
                        >
                            <Text style={styles.counterBtnText}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={styles.addToCartBtn} onPress={handleAgregar}>
                    <Text style={styles.addToCartText}>Agregar al Carrito</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 20 },
    loadingText: { marginTop: 12, color: '#64748B', fontSize: 14 },
    errorText: { fontSize: 15, color: '#EF4444', textAlign: 'center', marginBottom: 16 },
    btnBack: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    btnBackText: { color: '#FFFFFF', fontWeight: '600' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backBtn: { color: '#2563EB', fontSize: 16, fontWeight: '600' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    content: { padding: 20 },
    image: { width: '100%', height: 280, backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 20 },
    category: { fontSize: 12, fontWeight: '700', color: '#64748B', marginBottom: 6, letterSpacing: 0.5 },
    title: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 10 },
    price: { fontSize: 22, fontWeight: '800', color: '#2563EB', marginBottom: 16 },
    description: { fontSize: 14, color: '#475569', lineHeight: 22, marginBottom: 24 },
    quantityContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 20 },
    quantityLabel: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
    counterRow: { flexDirection: 'row', alignItems: 'center' },
    counterBtn: { width: 36, height: 36, backgroundColor: '#E2E8F0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    counterBtnText: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    quantityValue: { marginHorizontal: 16, fontSize: 16, fontWeight: '700', color: '#0F172A' },
    footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
    addToCartBtn: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
    addToCartText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});