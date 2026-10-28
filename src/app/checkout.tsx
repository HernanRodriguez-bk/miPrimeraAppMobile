import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OrderSummaryCard } from '../components/OrderSummaryCard';
import { PaymentMethod, PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { AppButton } from '../components/ui/AppButton';
import { FormField } from '../components/ui/FormField';
import { ScreenContainer } from '../components/ui/ScreenContainer';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { APP_THEME, formatPriceARS } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const { profile } = useProfile();

  const [nombre, setNombre] = useState<string>(profile?.nombre || '');
  const [direccion, setDireccion] = useState<string>('');
  const [ciudad, setCiudad] = useState<string>('');
  const [telefono, setTelefono] = useState<string>(profile?.telefono || '');
  const [metodoPago, setMetodoPago] = useState<PaymentMethod>('tarjeta');

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
      `Gracias por tu compra, ${nombre}.\nTu pedido llegará a ${direccion}, ${ciudad}.\nTotal abonado: ${formatPriceARS(totalPrice)}`,
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
    <ScreenContainer mode="stack">
      <ScreenHeader title="Finalizar Compra" showBack />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <OrderSummaryCard items={cart} totalPrice={totalPrice} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚚 Datos de Envío</Text>

          <FormField
            label="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Juan Pérez"
            autoCapitalize="words"
          />

          <FormField
            label="Dirección de entrega"
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Ej. Av. Corrientes 1234, 4B"
          />

          <FormField
            label="Ciudad / Localidad"
            value={ciudad}
            onChangeText={setCiudad}
            placeholder="Ej. Buenos Aires"
            autoCapitalize="words"
          />

          <FormField
            label="Teléfono de contacto"
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Ej. 11 2345 6789"
            keyboardType="phone-pad"
          />
        </View>

        <PaymentMethodSelector selected={metodoPago} onSelect={setMetodoPago} />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          label="Confirmar y Pagar"
          size="lg"
          variant="success"
          disabled={cart.length === 0}
          onPress={handleConfirmOrder}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.md,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
    marginBottom: 6,
  },
  footer: {
    padding: 16,
    backgroundColor: APP_THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: APP_THEME.colors.border,
  },
});
