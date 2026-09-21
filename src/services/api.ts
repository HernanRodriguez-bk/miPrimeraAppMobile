export interface ProductoAPI {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async (): Promise<ProductoAPI[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        const data: ProductoAPI[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const getProductById = async (id: string | number): Promise<ProductoAPI> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        const data: ProductoAPI = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener el producto con id ${id}:`, error);
        throw error;
    }
};