import { memo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { APP_THEME } from '../constants/theme';
import { CATEGORIAS_CATALOGO } from '../hooks/useProducts';

export interface CatalogFilterBarProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CatalogFilterBar = memo(function CatalogFilterBar({
  searchQuery,
  onChangeSearch,
  selectedCategory,
  onSelectCategory,
}: CatalogFilterBarProps) {
  return (
    <View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor={APP_THEME.colors.textPlaceholder}
          value={searchQuery}
          onChangeText={onChangeSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 ? (
          <Pressable onPress={() => onChangeSearch('')} hitSlop={8}>
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIAS_CATALOGO.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelectCategory(cat)}
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
});

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_THEME.colors.surface,
    borderRadius: APP_THEME.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: APP_THEME.colors.border,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: APP_THEME.colors.textPrimary,
  },
  clearIcon: {
    fontSize: 16,
    color: APP_THEME.colors.textPlaceholder,
    paddingHorizontal: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: APP_THEME.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: APP_THEME.radius.pill,
    marginRight: 8,
    borderWidth: 1,
    borderColor: APP_THEME.colors.borderStrong,
  },
  chipSelected: {
    backgroundColor: APP_THEME.colors.primaryDark,
    borderColor: APP_THEME.colors.primaryDark,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: APP_THEME.colors.textSecondary,
    textTransform: 'capitalize',
  },
  chipTextSelected: {
    color: APP_THEME.colors.white,
  },
});
