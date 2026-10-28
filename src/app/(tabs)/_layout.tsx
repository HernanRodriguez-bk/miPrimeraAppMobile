import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { APP_THEME } from '../../constants/theme';
import { useFavorites } from '../../context/FavoritesContext';

export default function TabsLayout() {
  const { favorites } = useFavorites();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: APP_THEME.colors.primary,
        tabBarInactiveTintColor: APP_THEME.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          tabBarLabel: 'Catálogo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarLabel: 'Favoritos',
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
