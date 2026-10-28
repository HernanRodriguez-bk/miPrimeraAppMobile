import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { APP_THEME } from '../../constants/theme';

const DEFAULT_SWIPE_THRESHOLD = -105;

export interface SwipeableDraggableRowProps {
  children: React.ReactNode;
  index?: number;
  totalItems?: number;
  itemHeight?: number;
  deleteLabel?: string;
  onSwipeDelete: () => void;
  onMoveItem?: (fromIndex: number, toIndex: number) => void;
}

/**
 * Contenedor interactivo moderno para Expo SDK 58:
 * - Usa exclusivamente la API declarativa `Gesture.Pan()` + `<GestureDetector>`
 *   y `scheduleOnRN` de `react-native-worklets` (cero APIs deprecadas).
 * - Soporta Swipe to Delete hacia la izquierda.
 * - Soporta Drag & Drop vertical manteniendo presionado cuando `onMoveItem` está definido.
 */
export function SwipeableDraggableRow({
  children,
  index = 0,
  totalItems = 1,
  itemHeight = 116,
  deleteLabel = '🗑️ Eliminar',
  onSwipeDelete,
  onMoveItem,
}: SwipeableDraggableRowProps) {
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const swipePanGesture = Gesture.Pan()
    .activeOffsetX([-15, 15])
    .failOffsetY([-15, 15])
    .onUpdate((event) => {
      if (!isDragging.value) {
        translateX.value = Math.min(0, event.translationX);
      }
    })
    .onEnd((event) => {
      if (isDragging.value) return;
      if (translateX.value < DEFAULT_SWIPE_THRESHOLD || event.velocityX < -750) {
        translateX.value = withTiming(-screenWidth, { duration: 220 }, (finished) => {
          if (finished) {
            scheduleOnRN(onSwipeDelete);
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const dragPanGesture = Gesture.Pan()
    .enabled(Boolean(onMoveItem) && totalItems > 1)
    .activateAfterLongPress(220)
    .onStart(() => {
      isDragging.value = true;
      translateX.value = withSpring(0);
    })
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      const offsetSteps = Math.round(translateY.value / itemHeight);
      const targetIndex = Math.max(0, Math.min(totalItems - 1, index + offsetSteps));

      translateY.value = withSpring(0);
      isDragging.value = false;

      if (onMoveItem && targetIndex !== index) {
        scheduleOnRN(onMoveItem, index, targetIndex);
      }
    })
    .onFinalize(() => {
      translateY.value = withSpring(0);
      isDragging.value = false;
    });

  const composedGesture = onMoveItem
    ? Gesture.Race(dragPanGesture, swipePanGesture)
    : swipePanGesture;

  const animatedForegroundStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withSpring(isDragging.value ? 1.025 : 1) },
    ],
    zIndex: isDragging.value ? 100 : 1,
    elevation: isDragging.value ? 8 : 2,
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -8 ? 1 : 0,
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.deleteBackdrop, animatedBackdropStyle]}>
        <Text style={styles.deleteBackdropText}>{deleteLabel}</Text>
      </Animated.View>

      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.foreground, animatedForegroundStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    position: 'relative',
  },
  deleteBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: APP_THEME.colors.danger,
    borderRadius: APP_THEME.radius.md,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 22,
  },
  deleteBackdropText: {
    color: APP_THEME.colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
  foreground: {
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.md,
  },
});
