# 🛍️ La Tienda — App de E-Commerce Mobile

> Aplicación móvil de e-commerce construida con **Expo SDK 57** y **React Native**, desarrollada como proyecto integrador para la Tecnicatura Superior en Desarrollo de Software (TSDS).

---

## 📱 Capturas de pantalla y Módulos

| Catálogo & Búsqueda | Detalle con Rating | Carrito Interactable | Checkout & Envío | Favoritos | Perfil & GPS |
|---|---|---|---|---|---|
| Buscador + Chips + Hero | Imagen + ⭐ Rating | Controles `+` / `-` | Formulario de Pago | Lista Persistente | Avatar + Ubicación |

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| [Expo](https://expo.dev) | ~57.0.22 | Plataforma base móvil |
| [React Native](https://reactnative.dev) | 0.86.3 | UI nativa e interacciones |
| [Expo Router](https://docs.expo.dev/router/introduction/) | ~57.0.22 | Navegación basada en archivos (File-based Routing) |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0.3 | Tipado estático y seguridad |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | 2.2.0 | Persistencia local (Carrito, Favoritos, Perfil) |
| [expo-image-picker](https://docs.expo.dev/versions/v57.0.0/sdk/imagepicker/) | ~57.0.19 | Captura y selección de foto de perfil |
| [expo-location](https://docs.expo.dev/versions/v57.0.0/sdk/location/) | ~57.0.19 | Geolocalización GPS |
| [@expo/vector-icons](https://docs.expo.dev/guides/icons/) | ^15.0.2 | Iconografía nativa (Ionicons) |
| [react-native-safe-area-context](https://docs.expo.dev/versions/v57.0.0/sdk/safe-area-context/) | ~5.7.0 | Adaptación a notches y márgenes seguros |
| [FakeStore API](https://fakestoreapi.com/) | Live API | Catálogo de productos en tiempo real |

---

## 📁 Estructura Completa del Proyecto

```
miPrimeraAPPMobile/
├── app.json                    # Configuración de Expo (Splash, Iconos, Permisos)
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración TypeScript
└── src/
    ├── app/                    # 📂 Rutas principales (Expo Router)
    │   ├── _layout.tsx         # Layout raíz (Providers: Profile, Cart, Favorites)
    │   ├── cart.tsx            # Carrito interactivo (+/- cantidad, subtotal, eliminar)
    │   ├── checkout.tsx        # Formulario de pago, dirección de envío y confirmación
    │   ├── explore.tsx         # Pantalla de estadísticas / tema Cyber
    │   ├── (tabs)/             # 📂 Navegación por Tabs principales
    │   │   ├── _layout.tsx     # Configuración de TabBar con íconos Ionicons
    │   │   ├── index.tsx       # Catálogo con Búsqueda, Filtro por Categoría, Pull-to-Refresh
    │   │   ├── favoritos.tsx   # Lista de Favoritos guardados
    │   │   └── perfil.tsx      # Perfil de usuario (Avatar + GPS + formulario editable)
    │   └── product/
    │       └── [id].tsx        # Vista detallada del producto con ⭐ Rating y Selector de Cantidad
    │
    ├── components/             # 📂 Componentes reutilizables de UI
    │   ├── ProductCard.tsx     # Tarjeta de producto con botón "+ Agregar", Favorito y Rating
    │   ├── HeroBanner.tsx      # Banner promocional destacado para la vista principal
    │   ├── Toast.tsx           # Notificación flotante emergente de confirmación visual
    │   ├── AvatarPicker.tsx    # Componente para tomar/elegir foto de perfil
    │   ├── LocationPicker.tsx  # Componente para detectar coordenadas GPS
    │   └── ui/
    │       └── ModuleCard.tsx  # Tarjetas de módulo con estética Cyber
    │
    ├── context/                # 📂 Contextos globales de estado (Providers)
    │   ├── CartContext.tsx     # Estado global del Carrito (agregar, quitar, updateQuantity)
    │   ├── FavoritesContext.tsx # Estado global de Favoritos (persistente)
    │   └── ProfileContext.tsx   # Estado global del Perfil de usuario (persistente)
    │
    └── services/
        ├── api.ts              # Conexión HTTP a FakeStore API (getProducts, getProductById)
        └── storage.ts         # Métodos de AsyncStorage para respaldo del carrito
```

---

## 🛠️ Novedades e Implementaciones Realizadas (Última Auditoría)

### 1. 🔴 Módulo de Checkout Completo (`/checkout`)
- **Formulario de Envío:** Captura de Nombre completo, Dirección, Ciudad y Teléfono.
- **Resumen de Pedido:** Lista detallada de ítems comprados, cantidades y precio total formateado en pesos argentinos (`$ ES-AR`).
- **Métodos de Pago:** Selector dinámico interactivo (💳 Tarjeta, 💵 Efectivo, 🏦 Transferencia).
- **Finalización:** Botón "Confirmar y Pagar" que limpia el carrito automáticamente, emite una alerta de éxito personalizada y redirige al inicio (`/`).

### 2. 🟡 Buscador y Filtro por Categorías en Tiempo Real
- **Buscador Dinámico:** Campo `TextInput` con ícono y botón para limpiar búsqueda (`✕`), filtrando el catálogo instantáneamente al escribir.
- **Chips de Categoría:** Scroll horizontal con filtros (`Todas`, `Electronics`, `Jewelery`, `Men's clothing`, `Women's clothing`) que resalta la categoría activa y filtra los productos.

### 3. 🟡 Hero Banner Promocional (`HeroBanner.tsx`)
- Incorporado en la parte superior del catálogo (`ListHeaderComponent`) con llamada a la acción ("Ver mi Carrito 🛒") y estética visual atractiva.

### 4. 🟡 Header Cart Badge Interactivo
- El badge `🛒 {count}` en el header del catálogo es un botón `Pressable` que permite navegar directamente a la pantalla del carrito `/cart`.

### 5. 🟡 Toast / Feedback de Confirmación Visual (`Toast.tsx`)
- Componente de notificación animada (`Animated.View`) que aparece temporalmente en la parte inferior al agregar productos al carrito o marcarlos como favoritos.

### 6. 🟢 Controles de Cantidad en Carrito (+/-)
- Botones de incremento (`+`) y decremento (`-`) directo por ítem en `cart.tsx`. Reducir la cantidad a cero elimina el ítem automáticamente.

### 7. 🟢 Pull-to-Refresh y Valoración Rating (⭐)
- **Pull-to-refresh:** Permite deslizar hacia abajo en la pantalla principal para actualizar el catálogo desde la API.
- **Rating:** Visualización de puntajes `⭐ rating.rate (count)` tanto en las tarjetas del catálogo como en la pantalla de detalle del producto.

### 8. 🔴 Persistencia de Favoritos y Perfil
- Implementación de `FavoritesContext` y `ProfileContext` guardando la información en `AsyncStorage` (`@favorites`, `@user_profile`).

---

## 🧪 Auditoría y Resultados de Pruebas (8/8 Pasados)

| # | Prueba | Estado | Notas |
|---|---|---|---|
| 1 | Tabs funcionando | ✅ PASA | 3 Tabs (`Catálogo`, `Favoritos`, `Perfil`) activas y navegables. |
| 2 | FlatList visible | ✅ PASA | Renderiza productos dinámicos con `ProductCard`. |
| 3 | Ruta dinámica abre | ✅ PASA | Abre `/product/[id]` pasando el parámetro ID. |
| 4 | Botón volver | ✅ PASA | Volver atrás vía `router.back()`. |
| 5 | Catálogo oficial API | ✅ PASA | Consume `https://fakestoreapi.com/products`. |
| 6 | Props correctas en ProductCard | ✅ PASA | Recibe imagen, nombre, precio, categoría, rating y callbacks. |
| 7 | Detalle coincide con ID | ✅ PASA | Carga el producto real de la API en el detalle via `getProductById()`. |
| 8 | Consola sin errores TS | ✅ PASA | `tsc --noEmit` ejecuta limpiamente sin fallos de compilación. |

---

## ⚙️ Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd miPrimeraAPPMobile

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo Expo
npx expo start
```

---

## 👨‍💻 Autor

**Hernán Rodríguez**  
*Tecnicatura Superior en Desarrollo de Software (TSDS) — 3er Año*  
*Materia: Programación Mobile*



// el buscador y los filtros al escribir una letra se cerrar