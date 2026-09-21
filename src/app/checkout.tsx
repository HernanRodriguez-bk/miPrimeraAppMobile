import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';

export default function CheckoutScreen() {
    const router = useRouter();
    const { cart, totalPrice, clearCart } = useCart();
    const { profile } = useProfile();

    const [nombre, setNombre] = useState(profile?.nombre || '');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [telefono, setTelefono] = useState(profile?.telefono || '');
    const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'efectivo' | 'transferencia'>('tarjeta');

    const handleConfirmOrder = async () => {
        if (cart.length === 0) {
            Alert.alert('Carrito vacío', 'No tienes productos en el carrito.');
            return;
        }
        if (!nombre.trim() || !direccion.trim() || !ciudad.trim() || !telefono.trim()) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los datos de envío.');
            return;
        }

        Alert.alert(
            '¡Pedido Confirmado! 🎉',
            `Gracias por tu compra, ${nombre}.\nTu pedido llegará a ${direccion}, ${ciudad}.\nTotal abonado: $ ${totalPrice.toLocaleString('es-AR')}`,
            [
                {
                    text: 'Volver al Inicio',
                    onPress: async () => {
                        await clearCart();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backBtn}>&larr; Volver</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Finalizar Compra</Text>
                <View style={{ width: 50 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Resumen del pedido */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📦 Resumen del Pedido</Text>
                    {cart.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <Text style={styles.itemName} numberOfLines={1}>
                                {item.quantity}x {item.title}
                            </Text>
                            <Text style={styles.itemPrice}>
                                $ {(item.price * item.quantity).toLocaleString('es-AR')}
                            </Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total a pagar:</Text>
                        <Text style={styles.totalValue}>$ {totalPrice.toLocaleString('es-AR')}</Text>
                    </View>
                </View>

                {/* Datos de envío */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🚚 Datos de Envío</Text>

                    <Text style={styles.label}>Nombre completo</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Juan Pérez"
                    />

                    <Text style={styles.label}>Dirección de entrega</Text>
                    <TextInput
                        style={styles.input}
                        value={direccion}
                        onChangeText={setDireccion}
                        placeholder="Ej. Av. Corrientes 1234, 4B"
                    />

                    <Text style={styles.label}>Ciudad / Localidad</Text>
                    <TextInput
                        style={styles.input}
                        value={ciudad}
                        onChangeText={setCiudad}
                        placeholder="Ej. Buenos Aires"
                    />

                    <Text style={styles.label}>Teléfono de contacto</Text>
                    <TextInput
                        style={styles.input}
                        value={telefono}
                        onChangeText={setTelefono}
                        placeholder="Ej. 11 2345 6789"
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Método de pago */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💳 Método de Pago</Text>

                    <View style={styles.paymentOptions}>
                        <Pressable
                            style={[
                                styles.paymentCard,
                                metodoPago === 'tarjeta' && styles.paymentCardSelected,
                            ]}
                            onPress={() => setMetodoPago('tarjeta')}
                        >
                            <Text style={styles.paymentIcon}>💳</Text>
                            <Text style={styles.paymentText}>Tarjeta</Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.paymentCard,
                                metodoPago === 'efectivo' && styles.paymentCardSelected,
                            ]}
                            onPress={() => setMetodoPago('efectivo')}
                        >
                            <Text style={styles.paymentIcon}>💵</Text>
                            <Text style={styles.paymentText}>Efectivo</Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.paymentCard,
                                metodoPago === 'transferencia' && styles.paymentCardSelected,
                            ]}
                            onPress={() => setMetodoPago('transferencia')}
                        >
                            <Text style={styles.paymentIcon}>🏦</Text>
                            <Text style={styles.paymentText}>Transferencia</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    style={[styles.confirmBtn, cart.length === 0 && styles.confirmBtnDisabled]}
                    onPress={handleConfirmOrder}
                    disabled={cart.length === 0}
                >
                    <Text style={styles.confirmBtnText}>Confirmar y Pagar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
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
    content: { padding: 16 },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    itemName: { fontSize: 14, color: '#334155', flex: 1, marginRight: 8 },
    itemPrice: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
    divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 15, fontWeight: '600', color: '#475569' },
    totalValue: { fontSize: 18, fontWeight: '800', color: '#2563EB' },
    label: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 6, marginTop: 10 },
    input: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#0F172A',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    paymentOptions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    paymentCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        marginHorizontal: 4,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    paymentCardSelected: {
        backgroundColor: '#EFF6FF',
        borderColor: '#2563EB',
    },
    paymentIcon: { fontSize: 22, marginBottom: 4 },
    paymentText: { fontSize: 12, fontWeight: '700', color: '#1E293B' },
    footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
    confirmBtn: { backgroundColor: '#16A34A', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
    confirmBtnDisabled: { backgroundColor: '#94A3B8' },
    confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
