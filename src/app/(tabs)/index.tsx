import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeroBanner } from '../../components/HeroBanner';
import ProductCard from '../../components/ProductCard';
import { Toast } from '../../components/Toast';
import { useCart } from '../../context/CartContext';
import { getProducts, ProductoAPI } from '../../services/api';

const CATEGORIAS = ['Todas', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

export default function HomeScreen() {
  const router = useRouter();
  const [productos, setProductos] = useState<ProductoAPI[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de Filtro y Búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Estado del Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Consumimos el carrito desde el Contexto
  const { totalItems } = useCart();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const apiData = await getProducts();
      setProductos(apiData);
    } catch (e) {
      setError('No se pudieron cargar los productos. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  // Filtrado dinámico
  const productosFiltrados = productos.filter((p) => {
    const coincideTexto = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' ||
      p.category.toLowerCase() === categoriaSeleccionada.toLowerCase();
    return coincideTexto && coincideCategoria;
  });

  if (cargando && productos.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando catálogo desde FakeStore API...</Text>
      </SafeAreaView>
    );
  }

  if (error && productos.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.btnRetry} onPress={cargarDatos}>
          <Text style={styles.btnRetryText}>Reintentar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View>
      {/* Banner Principal */}
      <HeroBanner />

      {/* Campo de Búsqueda */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Chips de Categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIAS.map((cat) => {
          const isSelected = categoriaSeleccionada === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => setCategoriaSeleccionada(cat)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {cat === 'Todas' ? '✨ Todas' : cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Encabezado con contador global Clickeable */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>La Tienda</Text>
          <Text style={styles.headerSubtitle}>Catálogo API en vivo</Text>
        </View>

        <Pressable style={styles.cartBadge} onPress={() => router.push('/cart')}>
          <Text style={styles.cartBadgeText}>🛒 {totalItems}</Text>
        </Pressable>
      </View>

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={renderHeader}
        refreshing={cargando}
        onRefresh={cargarDatos}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            nombre={item.title}
            precio={item.price}
            categoria={item.category}
            imagen={item.image}
            rating={item.rating}
            onActionToast={showToast}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron productos.</Text>
          </View>
        }
      />

      {/* Toast Flotante */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
  },
  errorText: {
    fontSize: 15,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  btnRetry: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnRetryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  cartBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  cartBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  listContent: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  clearIcon: {
    fontSize: 16,
    color: '#94A3B8',
    paddingHorizontal: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  chipSelected: {
    backgroundColor: '#1357C5',
    borderColor: '#1357C5',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    textTransform: 'capitalize',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
});