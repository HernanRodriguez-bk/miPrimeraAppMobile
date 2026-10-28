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

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Error en la petición HTTP (${response.status})`);
  }
  return (await response.json()) as T;
}

export const getProducts = async (signal?: AbortSignal): Promise<ProductoAPI[]> => {
  try {
    return await fetchJSON<ProductoAPI[]>(API_URL, signal);
  } catch (error) {
    if ((error as Error)?.name !== 'AbortError') {
      console.error('Error al obtener productos:', error);
    }
    throw error;
  }
};

export const getProductById = async (
  id: string | number,
  signal?: AbortSignal
): Promise<ProductoAPI> => {
  try {
    return await fetchJSON<ProductoAPI>(`${API_URL}/${id}`, signal);
  } catch (error) {
    if ((error as Error)?.name !== 'AbortError') {
      console.error(`Error al obtener el producto con id ${id}:`, error);
    }
    throw error;
  }
};
