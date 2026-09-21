import { useRouter } from 'expo-router';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backBtn}>&larr; Volver</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Mi Carrito</Text>
                <View style={{ width: 50 }} />
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                    <Pressable style={styles.btnExplore} onPress={() => router.back()}>
                        <Text style={styles.btnExploreText}>Explorar Productos</Text>
                    </Pressable>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => String(item.id)}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <View style={styles.cartCard}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.info}>
                                    <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.itemPrice}>$ {item.price.toLocaleString('es-AR')}</Text>

                                    {/* Controles de cantidad */}
                                    <View style={styles.counterRow}>
                                        <View style={styles.qtyControls}>
                                            <Pressable
                                                style={styles.qtyBtn}
                                                onPress={() => updateQuantity(item.id, -1)}
                                            >
                                                <Text style={styles.qtyBtnText}>-</Text>
                                            </Pressable>
                                            <Text style={styles.qtyValue}>{item.quantity}</Text>
                                            <Pressable
                                                style={styles.qtyBtn}
                                                onPress={() => updateQuantity(item.id, 1)}
                                            >
                                                <Text style={styles.qtyBtnText}>+</Text>
                                            </Pressable>
                                        </View>
                                        <Text style={styles.subtotal}>
                                            $ {(item.price * item.quantity).toLocaleString('es-AR')}
                                        </Text>
                                    </View>
                                </View>
                                <Pressable onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                                    <Text style={styles.removeBtnText}>✕</Text>
                                </Pressable>
                            </View>
                        )}
                    />

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total a pagar:</Text>
                            <Text style={styles.totalValue}>$ {totalPrice.toLocaleString('es-AR')}</Text>
                        </View>
                        <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
                            <Text style={styles.checkoutBtnText}>Ir a Pagar</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    backBtn: { color: '#2563EB', fontSize: 16, fontWeight: '600' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 16, color: '#64748B', marginBottom: 16 },
    btnExplore: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    btnExploreText: { color: '#FFFFFF', fontWeight: '600' },
    list: { padding: 16 },
    cartCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 12, marginBottom: 12, alignItems: 'center' },
    image: { width: 60, height: 60, borderRadius: 6, backgroundColor: '#F1F5F9' },
    info: { flex: 1, marginLeft: 12 },
    itemTitle: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
    itemPrice: { fontSize: 13, color: '#64748B', marginTop: 2 },
    counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
    qtyControls: { flexDirection: 'row', alignItems: 'center' },
    qtyBtn: { width: 26, height: 26, backgroundColor: '#E2E8F0', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
    qtyBtnText: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
    qtyValue: { marginHorizontal: 10, fontSize: 13, fontWeight: '700', color: '#0F172A' },
    subtotal: { fontSize: 13, fontWeight: '700', color: '#2563EB' },
    removeBtn: { padding: 8 },
    removeBtnText: { color: '#EF4444', fontSize: 16, fontWeight: '700' },
    footer: { padding: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    totalLabel: { fontSize: 16, color: '#64748B' },
    totalValue: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
    checkoutBtn: { backgroundColor: '#16A34A', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
    checkoutBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});