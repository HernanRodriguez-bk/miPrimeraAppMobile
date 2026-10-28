import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { APP_THEME } from '../constants/theme';

export interface ToastProps {
  visible: boolean;
  message: string;
  onDismiss?: () => void;
}

export function Toast({ visible, message, onDismiss }: ToastProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!visible) {
      opacity.value = 0;
      return;
    }

    opacity.value = withSequence(
      withTiming(1, { duration: 220 }),
      withDelay(
        1800,
        withTiming(0, { duration: 220 }, (finished) => {
          if (finished && onDismiss) {
            scheduleOnRN(onDismiss);
          }
        })
      )
    );
  }, [visible, message, onDismiss, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View pointerEvents="none" style={[styles.container, animatedStyle]}>
      <View style={styles.toast}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    backgroundColor: APP_THEME.colors.textPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: APP_THEME.radius.pill,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    color: APP_THEME.colors.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
