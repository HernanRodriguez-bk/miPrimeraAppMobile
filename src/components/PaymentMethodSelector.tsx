import { Pressable, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../constants/theme';

export type PaymentMethod = 'tarjeta' | 'efectivo' | 'transferencia';

const PAYMENT_OPTIONS: ReadonlyArray<{
  id: PaymentMethod;
  icon: string;
  label: string;
}> = [
  { id: 'tarjeta', icon: '💳', label: 'Tarjeta' },
  { id: 'efectivo', icon: '💵', label: 'Efectivo' },
  { id: 'transferencia', icon: '🏦', label: 'Transferencia' },
];

export interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>💳 Método de Pago</Text>

      <View style={styles.paymentOptions}>
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = selected === option.id;
          return (
            <Pressable
              key={option.id}
              style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
              onPress={() => onSelect(option.id)}
            >
              <Text style={styles.paymentIcon}>{option.icon}</Text>
              <Text style={styles.paymentText}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 12,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 8,
  },
  paymentCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: APP_THEME.colors.surfaceMuted,
    borderRadius: APP_THEME.radius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentCardSelected: {
    backgroundColor: APP_THEME.colors.primarySoft,
    borderColor: APP_THEME.colors.primary,
  },
  paymentIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  paymentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
});
