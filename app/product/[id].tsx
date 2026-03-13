import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import { useCart } from '@/context/cart-context';
import { PRODUCTS } from '@/data/products';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart, items } = useCart();
  const isDark = useColorScheme() === 'dark';
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Product not found</Text>
      </View>
    );
  }

  const cartItem = items.find(i => i.product.id === product.id);
  const inCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(product.rating);
    const half = !full && i < product.rating;
    return full ? '★' : half ? '⭐' : '☆';
  });

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.imageBanner, { backgroundColor: product.color }]}>
          <Text style={styles.productEmoji}>{product.emoji}</Text>
        </View>

        <View style={[styles.content, isDark && styles.contentDark]}>
          <View style={styles.topRow}>
            <Text testID="product-detail-category" style={[styles.category, isDark && styles.textMuted]}>
              {product.category}
            </Text>
            {inCart && (
              <View testID="product-detail-in-cart-badge" style={styles.inCartBadge}>
                <Text style={styles.inCartText}>In cart ({cartItem!.quantity})</Text>
              </View>
            )}
          </View>

          <Text testID="product-detail-name" style={[styles.name, isDark && styles.textLight]}>
            {product.name}
          </Text>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>{stars.join('')}</Text>
            <Text testID="product-detail-rating" style={[styles.ratingLabel, isDark && styles.textMuted]}>
              {product.rating} · {product.reviews} reviews
            </Text>
          </View>

          <Text testID="product-detail-price" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>

          <View style={[styles.divider, isDark && styles.dividerDark]} />

          <Text style={[styles.sectionTitle, isDark && styles.textMuted]}>Description</Text>
          <Text testID="product-detail-description" style={[styles.description, isDark && styles.textLight]}>
            {product.description}
          </Text>

          <View style={[styles.divider, isDark && styles.dividerDark]} />

          <Text style={[styles.sectionTitle, isDark && styles.textMuted]}>Details</Text>
          <View style={styles.detailsGrid}>
            <View style={[styles.detailChip, isDark && styles.detailChipDark]}>
              <Text style={[styles.detailLabel, isDark && styles.textMuted]}>Category</Text>
              <Text style={[styles.detailValue, isDark && styles.textLight]}>
                {product.category}
              </Text>
            </View>
            <View style={[styles.detailChip, isDark && styles.detailChipDark]}>
              <Text style={[styles.detailLabel, isDark && styles.textMuted]}>Rating</Text>
              <Text style={[styles.detailValue, isDark && styles.textLight]}>
                {product.rating}/5.0
              </Text>
            </View>
            <View style={[styles.detailChip, isDark && styles.detailChipDark]}>
              <Text style={[styles.detailLabel, isDark && styles.textMuted]}>Reviews</Text>
              <Text style={[styles.detailValue, isDark && styles.textLight]}>
                {product.reviews}
              </Text>
            </View>
            <View style={[styles.detailChip, isDark && styles.detailChipDark]}>
              <Text style={[styles.detailLabel, isDark && styles.textMuted]}>Shipping</Text>
              <Text style={[styles.detailValue, { color: '#27AE60' }]}>Free</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, isDark && styles.footerDark]}>
        <View>
          <Text style={[styles.footerLabel, isDark && styles.textMuted]}>Price</Text>
          <Text testID="product-detail-footer-price" style={styles.footerPrice}>
            ${product.price.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          testID="product-detail-add-to-cart"
          style={[styles.addBtn, added && styles.addBtnSuccess]}
          onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>
            {added ? '✓ Added to Cart' : inCart ? '+ Add Again' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
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
  scroll: {
    paddingBottom: 120,
  },
  imageBanner: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 100,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 24,
    gap: 10,
  },
  contentDark: {
    backgroundColor: '#1E1E1E',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inCartBadge: {
    backgroundColor: '#E8F4F8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inCartText: {
    color: '#0a7ea4',
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#11181C',
    lineHeight: 32,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    fontSize: 16,
    color: '#F4B942',
    letterSpacing: 2,
  },
  ratingLabel: {
    fontSize: 13,
    color: '#888',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  dividerDark: {
    backgroundColor: '#333',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailChip: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    flex: 1,
    minWidth: '45%',
    gap: 4,
  },
  detailChipDark: {
    backgroundColor: '#2A2A2A',
  },
  detailLabel: {
    fontSize: 11,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11181C',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  footerDark: {
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
  },
  footerLabel: {
    fontSize: 12,
    color: '#888',
  },
  footerPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  addBtn: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addBtnSuccess: {
    backgroundColor: '#27AE60',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#888',
  },
  textLight: {
    color: '#ECEDEE',
  },
  textMuted: {
    color: '#9BA1A6',
  },
});
