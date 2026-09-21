import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FavoriteItem, useFavorites } from '../../context/FavoritesContext';

export default function FavoritosScreen() {
    const { favorites, removeFavorite, isLoading } = useFavorites();
    const router = useRouter();

    if (isLoading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color="#1357C5" />
            </SafeAreaView>
        );
    }

    if (favorites.length === 0) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.emoji}>❤️</Text>
                <Text style={styles.title}>Mis Favoritos</Text>
                <Text style={styles.subtitle}>Aún no tienes productos guardados.</Text>
            </SafeAreaView>
        );
    }

    const renderItem = ({ item }: { item: FavoriteItem }) => (
        <Pressable
            style={styles.card}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: String(item.id) } })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>$ {item.price.toLocaleString('es-AR')}</Text>

                <Pressable
                    style={styles.btnRemove}
                    onPress={(e) => {
                        e.stopPropagation(); // Evita que se abra el detalle al tocar el botón
                        removeFavorite(item.id);
                    }}
                >
                    <Text style={styles.btnRemoveText}>Quitar</Text>
                </Pressable>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mis Favoritos</Text>
            </View>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6F8' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6F8' },
    emoji: { fontSize: 48, marginBottom: 16 },
    title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
    subtitle: { fontSize: 14, color: '#64748B', marginTop: 6 },
    header: { padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
    list: { padding: 16 },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 12,
    },
    image: { width: 80, height: 80, borderRadius: 8, resizeMode: 'contain' },
    info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: '600', color: '#0B1F3A', marginBottom: 4 },
    price: { fontSize: 16, fontWeight: '700', color: '#1357C5', marginBottom: 8 },
    btnRemove: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FEE2E2',
        borderRadius: 6,
    },
    btnRemoveText: { color: '#DC2626', fontSize: 12, fontWeight: '700' },
});