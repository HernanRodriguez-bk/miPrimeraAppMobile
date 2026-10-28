import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  CART: '@la_tienda:cart_v1',
  FAVORITES: '@favorites',
  PROFILE: '@user_profile',
} as const;

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

/**
 * Helper genérico tipado para lectura segura desde AsyncStorage.
 */
export async function getStorageItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : fallback;
  } catch (error) {
    console.error(`Error leyendo clave "${key}" en AsyncStorage:`, error);
    return fallback;
  }
}

/**
 * Helper genérico tipado para escritura segura en AsyncStorage.
 */
export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error guardando clave "${key}" en AsyncStorage:`, error);
  }
}

/**
 * Helper genérico para eliminación segura en AsyncStorage.
 */
export async function removeStorageItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error eliminando clave "${key}" en AsyncStorage:`, error);
  }
}

export const getCart = (): Promise<CartItem[]> =>
  getStorageItem<CartItem[]>(STORAGE_KEYS.CART, []);

export const saveCart = (cart: CartItem[]): Promise<void> =>
  setStorageItem<CartItem[]>(STORAGE_KEYS.CART, cart);

export const clearCart = (): Promise<void> =>
  removeStorageItem(STORAGE_KEYS.CART);

export const addToCart = async (newItem: CartItem): Promise<void> => {
  const currentCart = await getCart();
  const existingIndex = currentCart.findIndex((item) => item.id === newItem.id);

  if (existingIndex >= 0) {
    currentCart[existingIndex].quantity += newItem.quantity;
  } else {
    currentCart.push(newItem);
  }

  await saveCart(currentCart);
};

export const removeFromCart = async (id: number): Promise<void> => {
  const currentCart = await getCart();
  await saveCart(currentCart.filter((item) => item.id !== id));
};
