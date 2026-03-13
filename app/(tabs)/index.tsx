import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import { useCart } from '@/context/cart-context';
import { CATEGORIES, PRODUCTS, Product } from '@/data/products';

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <TouchableOpacity
      testID={`product-card-${product.id}`}
      style={styles.card}
      onPress={() => router.push(`/product/${product.id}`)}>
      <View style={[styles.cardImage, { backgroundColor: product.color }]}>
        <Text style={styles.cardEmoji}>{product.emoji}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text testID={`product-name-${product.id}`} style={styles.cardName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.cardRating}>
          <Text style={styles.star}>★</Text>
          <Text testID={`product-rating-${product.id}`} style={styles.ratingText}>
            {product.rating} ({product.reviews})
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <Text testID={`product-price-${product.id}`} style={styles.cardPrice}>
            ${product.price.toFixed(2)}
          </Text>
          <TouchableOpacity
            testID={`product-add-to-cart-${product.id}`}
            style={styles.addButton}
            onPress={() => addToCart(product)}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filtered =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.textLight]}>🛍️ ShopApp</Text>
        <Text testID="shop-item-count" style={[styles.headerSub, isDark && styles.textMuted]}>
          {filtered.length} items
        </Text>
      </View>

      <View style={[styles.categoryBar, isDark && styles.categoryBarDark]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map(cat => (
            <Pressable
              key={cat}
              testID={`category-chip-${cat.toLowerCase()}`}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}>
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                  isDark && selectedCategory !== cat && styles.textLight,
                ]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        testID="shop-product-list"
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerDark: {
    backgroundColor: '#1E1E1E',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
  },
  headerSub: {
    fontSize: 13,
    color: '#888',
  },
  categoryBar: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  categoryBarDark: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
  },
  categoryScroll: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  list: {
    padding: 10,
    paddingBottom: 24,
  },
  row: {
    gap: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 48,
  },
  cardBody: {
    padding: 10,
    gap: 4,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181C',
    lineHeight: 18,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  star: {
    color: '#F4B942',
    fontSize: 13,
  },
  ratingText: {
    fontSize: 11,
    color: '#888',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  addButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  textLight: {
    color: '#ECEDEE',
  },
  textMuted: {
    color: '#9BA1A6',
  },
});
