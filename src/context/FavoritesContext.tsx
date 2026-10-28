import React, { createContext, useCallback, useContext } from 'react';
import { useAsyncStorageState } from '../hooks/useAsyncStorageState';
import { STORAGE_KEYS } from '../services/storage';

export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface FavoritesContextData {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  reorderFavorites: (newOrder: FavoriteItem[]) => Promise<void>;
  isFavorite: (id: number) => boolean;
  isLoading: boolean;
}

const EMPTY_FAVORITES: FavoriteItem[] = [];

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const {
    state: favorites,
    setPersistentState: setFavorites,
    isLoading,
  } = useAsyncStorageState<FavoriteItem[]>(STORAGE_KEYS.FAVORITES, EMPTY_FAVORITES);

  const addFavorite = useCallback(
    async (item: FavoriteItem) => {
      await setFavorites((prev) => {
        if (prev.some((fav) => fav.id === item.id)) return prev;
        return [...prev, item];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    async (id: number) => {
      await setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    },
    [setFavorites]
  );

  const reorderFavorites = useCallback(
    async (newOrder: FavoriteItem[]) => {
      await setFavorites(newOrder);
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some((fav) => fav.id === id),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        reorderFavorites,
        isFavorite,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
}
