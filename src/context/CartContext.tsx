import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { Alert } from 'react-native';
import { useAsyncStorageState } from '../hooks/useAsyncStorageState';
import { CartItem, STORAGE_KEYS } from '../services/storage';

const MAX_ITEM_QUANTITY = 50;
const EMPTY_CART: CartItem[] = [];

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  reorderCart: (newOrder: CartItem[]) => Promise<void>;
  updateQuantity: (id: number, delta: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function clampQuantityWithAlert(quantity: number): number {
  if (quantity > MAX_ITEM_QUANTITY) {
    Alert.alert(
      'Límite alcanzado',
      `Puedes agregar un máximo de ${MAX_ITEM_QUANTITY} unidades por producto.`
    );
    return MAX_ITEM_QUANTITY;
  }
  return quantity;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    state: cart,
    setPersistentState: setCart,
    isLoading,
  } = useAsyncStorageState<CartItem[]>(STORAGE_KEYS.CART, EMPTY_CART);

  const handleAddToCart = useCallback(
    async (newItem: CartItem) => {
      await setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === newItem.id);
        if (existingIndex >= 0) {
          return prev.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: clampQuantityWithAlert(item.quantity + newItem.quantity) }
              : item
          );
        }
        return [
          ...prev,
          { ...newItem, quantity: clampQuantityWithAlert(newItem.quantity) },
        ];
      });
    },
    [setCart]
  );

  const handleUpdateQuantity = useCallback(
    async (id: number, delta: number) => {
      await setCart((prev) =>
        prev
          .map((item) => {
            if (item.id !== id) return item;
            const nextQty = clampQuantityWithAlert(item.quantity + delta);
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          })
          .filter((item): item is CartItem => item !== null)
      );
    },
    [setCart]
  );

  const handleRemoveFromCart = useCallback(
    async (id: number) => {
      await setCart((prev) => prev.filter((item) => item.id !== id));
    },
    [setCart]
  );

  const handleReorderCart = useCallback(
    async (newOrder: CartItem[]) => {
      await setCart(newOrder);
    },
    [setCart]
  );

  const handleClearCart = useCallback(async () => {
    await setCart([]);
  }, [setCart]);

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        reorderCart: handleReorderCart,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de un CartProvider');
  }
  return context;
};
