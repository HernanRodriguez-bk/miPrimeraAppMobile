export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string; // Para este ejemplo usamos URIs web estables para evitar errores si faltan imágenes locales
    descripcion: string;
}

export const PRODUCTS: Producto[] = [
    { id: 1, nombre: "Auriculares Air", precio: 89900, categoria: "Tecnología", imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", descripcion: "Auriculares inalámbricos con cancelación de ruido activa y hasta 30 horas de batería." },
    { id: 2, nombre: "Mochila Urban", precio: 64500, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300", descripcion: "Mochila resistente al agua con compartimiento acolchado para laptop de hasta 15 pulgadas." },
    { id: 3, nombre: "Zapatillas Move", precio: 112000, categoria: "Calzado", imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", descripcion: "Zapatillas ultralivianas con suela de espuma reactiva, ideales para running y uso diario." },
    { id: 4, nombre: "Botella Térmica", precio: 32900, categoria: "Hogar", imagen: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300", descripcion: "Botella de acero inoxidable de 750 ml que mantiene bebidas frías 24 h o calientes 12 h." },
    { id: 5, nombre: "Lámpara Desk", precio: 54900, categoria: "Hogar", imagen: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300", descripcion: "Lámpara LED de escritorio con 5 niveles de brillo y temperatura de color ajustable." },
    { id: 6, nombre: "Teclado Compact", precio: 78500, categoria: "Tecnología", imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300", descripcion: "Teclado mecánico compacto 75% con switches silenciosos y conexión Bluetooth/USB-C." },
    { id: 7, nombre: "Reloj Smart", precio: 95000, categoria: "Tecnología", imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", descripcion: "Smartwatch con monitor cardíaco, GPS integrado y resistencia al agua hasta 50 metros." },
    { id: 8, nombre: "Silla Ergonomica", precio: 185000, categoria: "Hogar", imagen: "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=300", descripcion: "Silla ergonómica con soporte lumbar ajustable, apoyabrazos 4D y malla transpirable." },
];