import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
    isFavorite: (id: number) => boolean;
    isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem('@favorites');
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error cargando favoritos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addFavorite = async (item: FavoriteItem) => {
        try {
            // Evitamos duplicados por seguridad
            if (favorites.some(fav => fav.id === item.id)) return;

            const newFavorites = [...favorites, item];
            setFavorites(newFavorites);
            await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error agregando favorito:', error);
        }
    };

    const removeFavorite = async (id: number) => {
        try {
            const newFavorites = favorites.filter(fav => fav.id !== id);
            setFavorites(newFavorites);
            await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error eliminando favorito:', error);
        }
    };

    const isFavorite = (id: number) => {
        return favorites.some(fav => fav.id === id);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite, isLoading }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
    return context;
}