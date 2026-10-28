import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ProfileProvider>
          <CartProvider>
            <FavoritesProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="product/[id]" />
                <Stack.Screen name="cart" />
                <Stack.Screen name="checkout" />
                <Stack.Screen name="explore" />
              </Stack>
            </FavoritesProvider>
          </CartProvider>
        </ProfileProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
