import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { APP_THEME } from '../../constants/theme';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'soft'
  | 'outline';

export type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
}: AppButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.textBase, textSizeStyles[size], textVariantStyles[variant], textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    backgroundColor: APP_THEME.colors.textPlaceholder,
    borderColor: APP_THEME.colors.textPlaceholder,
  },
  textBase: {
    fontWeight: '700',
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: APP_THEME.radius.sm,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  lg: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: APP_THEME.radius.md,
  },
});

const textSizeStyles = StyleSheet.create({
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 16 },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: APP_THEME.colors.primaryDark,
  },
  secondary: {
    backgroundColor: APP_THEME.colors.textSecondary,
  },
  success: {
    backgroundColor: APP_THEME.colors.success,
  },
  danger: {
    backgroundColor: APP_THEME.colors.dangerSoft,
  },
  soft: {
    backgroundColor: APP_THEME.colors.primaryTint,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: APP_THEME.colors.borderStrong,
  },
});

const textVariantStyles = StyleSheet.create({
  primary: { color: APP_THEME.colors.white },
  secondary: { color: APP_THEME.colors.white },
  success: { color: APP_THEME.colors.white },
  danger: { color: APP_THEME.colors.danger },
  soft: { color: APP_THEME.colors.primaryDark },
  outline: { color: APP_THEME.colors.textMuted },
});
