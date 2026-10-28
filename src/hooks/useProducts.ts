import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getProductById, getProducts, ProductoAPI } from '../services/api';

export const CATEGORIAS_CATALOGO = [
  'Todas',
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
] as const;

export interface UseProductsReturn {
  productos: ProductoAPI[];
  productosFiltrados: ProductoAPI[];
  cargando: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoriaSeleccionada: string;
  setCategoriaSeleccionada: (category: string) => void;
  recargarProductos: () => Promise<void>;
}

/**
 * Custom Hook que encapsula el consumo de la API de productos,
 * manejo de estados de carga/error, cancelación limpia y filtrado reactivo.
 */
export function useProducts(): UseProductsReturn {
  const [productos, setProductos] = useState<ProductoAPI[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const abortRef = useRef<AbortController | null>(null);

  const recargarProductos = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setCargando(true);
      setError(null);
      const data = await getProducts(controller.signal);
      if (!controller.signal.aborted) {
        setProductos(data);
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        setError('No se pudieron cargar los productos. Intenta nuevamente.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    void recargarProductos();
    return () => {
      abortRef.current?.abort();
    };
  }, [recargarProductos]);

  const productosFiltrados = useMemo(() => {
    const queryNormalizada = searchQuery.trim().toLowerCase();
    return productos.filter((producto) => {
      const coincideTexto =
        queryNormalizada === '' ||
        producto.title.toLowerCase().includes(queryNormalizada);
      const coincideCategoria =
        categoriaSeleccionada === 'Todas' ||
        producto.category.toLowerCase() === categoriaSeleccionada.toLowerCase();
      return coincideTexto && coincideCategoria;
    });
  }, [productos, searchQuery, categoriaSeleccionada]);

  return {
    productos,
    productosFiltrados,
    cargando,
    error,
    searchQuery,
    setSearchQuery,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    recargarProductos,
  };
}

export interface UseProductDetailReturn {
  producto: ProductoAPI | null;
  cargando: boolean;
  error: string | null;
  recargarDetalle: () => Promise<void>;
}

/**
 * Custom Hook para obtener el detalle de un producto individual por ID.
 */
export function useProductDetail(id?: string | number): UseProductDetailReturn {
  const [producto, setProducto] = useState<ProductoAPI | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const recargarDetalle = useCallback(async () => {
    if (id === undefined || id === null || id === '') return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setCargando(true);
      setError(null);
      const data = await getProductById(Number(id), controller.signal);
      if (!controller.signal.aborted) {
        setProducto(data);
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        setError('No se pudo cargar el detalle del producto.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setCargando(false);
      }
    }
  }, [id]);

  useEffect(() => {
    void recargarDetalle();
    return () => {
      abortRef.current?.abort();
    };
  }, [recargarDetalle]);

  return {
    producto,
    cargando,
    error,
    recargarDetalle,
  };
}

