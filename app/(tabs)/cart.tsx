import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import { useCart } from '@/context/cart-context';
import { CartItem } from '@/context/cart-context';

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const isDark = useColorScheme() === 'dark';

  return (
    <View testID={`cart-item-${item.product.id}`} style={[styles.itemRow, isDark && styles.itemRowDark]}>
      <View style={[styles.itemThumb, { backgroundColor: item.product.color }]}>
        <Text style={styles.itemEmoji}>{item.product.emoji}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text
          testID={`cart-item-name-${item.product.id}`}
          style={[styles.itemName, isDark && styles.textLight]}
          numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text testID={`cart-item-price-${item.product.id}`} style={styles.itemPrice}>
          ${item.product.price.toFixed(2)}
        </Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            testID={`cart-item-decrement-${item.product.id}`}
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.product.id, item.quantity - 1)}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text testID={`cart-item-quantity-${item.product.id}`} style={[styles.qtyValue, isDark && styles.textLight]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            testID={`cart-item-increment-${item.product.id}`}
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text testID={`cart-item-total-${item.product.id}`} style={styles.itemTotal}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          testID={`cart-item-remove-${item.product.id}`}
          onPress={() => removeFromCart(item.product.id)}>
          <Text style={styles.removeBtn}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const { items, totalItems, totalPrice, clearCart, placeOrder } = useCart();
  const isDark = useColorScheme() === 'dark';

  const handleCheckout = () => {
    if (items.length === 0) return;
    Alert.alert(
      'Confirm Order',
      `Place order for ${totalItems} item${totalItems !== 1 ? 's' : ''} totalling $${totalPrice.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: () => {
            placeOrder();
            Alert.alert('Order Placed!', 'Your order has been placed successfully. Check the Profile tab to track it.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.headerTitle, isDark && styles.textLight]}>My Cart</Text>
        {items.length > 0 && (
          <TouchableOpacity
            testID="cart-clear-button"
            onPress={() => Alert.alert('Clear Cart', 'Remove all items?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', style: 'destructive', onPress: clearCart },
            ])}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View testID="cart-empty-state" style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={[styles.emptyTitle, isDark && styles.textLight]}>Your cart is empty</Text>
          <Text style={[styles.emptySub, isDark && styles.textMuted]}>
            Add items from the Shop tab to get started
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            testID="cart-item-list"
            data={items}
            keyExtractor={item => item.product.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => <CartItemRow item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <View style={[styles.summary, isDark && styles.summaryDark]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, isDark && styles.textMuted]}>
                Subtotal ({totalItems} items)
              </Text>
              <Text testID="cart-subtotal" style={[styles.summaryValue, isDark && styles.textLight]}>
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, isDark && styles.textMuted]}>Shipping</Text>
              <Text style={styles.freeText}>FREE</Text>
            </View>
            <View style={[styles.summaryDivider, isDark && styles.summaryDividerDark]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, isDark && styles.textLight]}>Total</Text>
              <Text testID="cart-total" style={styles.totalValue}>
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              testID="cart-place-order-button"
              style={styles.checkoutBtn}
              onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  headerDark: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
  },
  clearText: {
    color: '#E74C3C',
    fontSize: 15,
    fontWeight: '500',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 72,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#11181C',
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
  list: {
    padding: 16,
  },
  separator: {
    height: 12,
  },
  itemRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  itemRowDark: {
    backgroundColor: '#1E1E1E',
  },
  itemThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemEmoji: {
    fontSize: 30,
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181C',
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 13,
    color: '#888',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
    minWidth: 20,
    textAlign: 'center',
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  removeBtn: {
    fontSize: 16,
    color: '#aaa',
    padding: 4,
  },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  summaryDark: {
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#11181C',
  },
  freeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
  summaryDividerDark: {
    backgroundColor: '#333',
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#11181C',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  checkoutBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#ECEDEE',
  },
  textMuted: {
    color: '#9BA1A6',
  },
});
