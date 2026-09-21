import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@la_tienda:cart_v1';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export const getCart = async (): Promise<CartItem[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(CART_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error cargando el carrito:', error);
        return [];
    }
};

export const addToCart = async (newItem: CartItem): Promise<void> => {
    try {
        const currentCart = await getCart();
        const existingIndex = currentCart.findIndex((item) => item.id === newItem.id);

        if (existingIndex >= 0) {
            currentCart[existingIndex].quantity += newItem.quantity;
        } else {
            currentCart.push(newItem);
        }

        await AsyncStorage.setItem(CART_KEY, JSON.stringify(currentCart));
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
    }
};

export const removeFromCart = async (id: number): Promise<void> => {
    try {
        const currentCart = await getCart();
        const updatedCart = currentCart.filter((item) => item.id !== id);
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    } catch (error) {
        console.error('Error al remover producto:', error);
    }
};

export const clearCart = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(CART_KEY);
    } catch (error) {
        console.error('Error al limpiar el carrito:', error);
    }
};

export const saveCart = async (cart: CartItem[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
};