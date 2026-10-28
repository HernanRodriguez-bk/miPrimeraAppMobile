import React from 'react';
import { StatusBar, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { APP_THEME } from '../../constants/theme';

const TAB_EDGES: Edge[] = ['top', 'left', 'right'];
const STACK_EDGES: Edge[] = ['top', 'bottom', 'left', 'right'];

export interface ScreenContainerProps {
  children: React.ReactNode;
  /**
   * 'tab' omite el inset inferior para evitar doble padding sobre el TabBar en SDK 58 Edge-to-Edge.
   * 'stack' aplica todos los bordes seguros en pantallas de pila completa.
   */
  mode?: 'tab' | 'stack';
  edges?: Edge[];
  backgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content';
  style?: StyleProp<ViewStyle>;
}

export function ScreenContainer({
  children,
  mode = 'tab',
  edges,
  backgroundColor = APP_THEME.colors.background,
  barStyle = 'dark-content',
  style,
}: ScreenContainerProps) {
  const resolvedEdges = edges ?? (mode === 'tab' ? TAB_EDGES : STACK_EDGES);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }, style]} edges={resolvedEdges}>
      <StatusBar barStyle={barStyle} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

