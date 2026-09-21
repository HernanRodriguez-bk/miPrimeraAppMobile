import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
    return (
        <ProfileProvider>
            <CartProvider>
                <FavoritesProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
                    </Stack>
                </FavoritesProvider>
            </CartProvider>
        </ProfileProvider>
    );
}