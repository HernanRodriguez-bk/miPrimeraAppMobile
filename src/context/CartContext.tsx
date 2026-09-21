import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CartItem, getCart, saveCart } from '../services/storage';

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    updateQuantity: (id: number, delta: number) => Promise<void>;
    clearCart: () => Promise<void>;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        getCart().then(setCart);
    }, []);

    const handleAddToCart = async (newItem: CartItem) => {
        const updatedCart = [...cart];
        const existingIndex = updatedCart.findIndex((item) => item.id === newItem.id);

        if (existingIndex >= 0) {
            const totalQty = updatedCart[existingIndex].quantity + newItem.quantity;
            if (totalQty > 50) {
                Alert.alert('Límite alcanzado', 'Puedes agregar un máximo de 50 unidades por producto.');
                updatedCart[existingIndex].quantity = 50;
            } else {
                updatedCart[existingIndex].quantity = totalQty;
            }
        } else {
            if (newItem.quantity > 50) {
                Alert.alert('Límite alcanzado', 'Puedes agregar un máximo de 50 unidades por producto.');
                newItem.quantity = 50;
            }
            updatedCart.push(newItem);
        }

        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const handleUpdateQuantity = async (id: number, delta: number) => {
        const updatedCart = cart
            .map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    if (newQty > 50) {
                        Alert.alert('Límite alcanzado', 'Puedes agregar un máximo de 50 unidades por producto.');
                        return { ...item, quantity: 50 };
                    }
                    return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
            })
            .filter((item): item is CartItem => item !== null);

        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const handleRemoveFromCart = async (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const handleClearCart = async () => {
        setCart([]);
        await saveCart([]);
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart: handleAddToCart,
                removeFromCart: handleRemoveFromCart,
                updateQuantity: handleUpdateQuantity,
                clearCart: handleClearCart,
                totalItems,
                totalPrice,
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