import { Pressable, StyleSheet, Text, View } from 'react-native';
import { APP_THEME } from '../../constants/theme';

export interface QuantitySelectorProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  size?: 'sm' | 'md';
  minDisabled?: boolean;
  maxDisabled?: boolean;
}

export function QuantitySelector({
  value,
  onDecrement,
  onIncrement,
  size = 'md',
  minDisabled = false,
  maxDisabled = false,
}: QuantitySelectorProps) {
  const isSmall = size === 'sm';

  return (
    <View style={styles.row}>
      <Pressable
        disabled={minDisabled}
        onPress={onDecrement}
        style={({ pressed }) => [
          styles.btn,
          isSmall ? styles.btnSm : styles.btnMd,
          minDisabled && styles.btnDisabled,
          pressed && !minDisabled && styles.btnPressed,
        ]}
      >
        <Text style={[styles.btnText, isSmall ? styles.btnTextSm : styles.btnTextMd]}>-</Text>
      </Pressable>

      <Text style={[styles.value, isSmall ? styles.valueSm : styles.valueMd]}>{value}</Text>

      <Pressable
        disabled={maxDisabled}
        onPress={onIncrement}
        style={({ pressed }) => [
          styles.btn,
          isSmall ? styles.btnSm : styles.btnMd,
          maxDisabled && styles.btnDisabled,
          pressed && !maxDisabled && styles.btnPressed,
        ]}
      >
        <Text style={[styles.btnText, isSmall ? styles.btnTextSm : styles.btnTextMd]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: APP_THEME.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSm: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  btnMd: {
    width: 36,
    height: 36,
    borderRadius: APP_THEME.radius.sm,
  },
  btnPressed: {
    opacity: 0.75,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
  },
  btnTextSm: {
    fontSize: 15,
  },
  btnTextMd: {
    fontSize: 18,
  },
  value: {
    fontWeight: '700',
    color: APP_THEME.colors.textPrimary,
  },
  valueSm: {
    marginHorizontal: 10,
    fontSize: 13,
  },
  valueMd: {
    marginHorizontal: 16,
    fontSize: 16,
  },
});
