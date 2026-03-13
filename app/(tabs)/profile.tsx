import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { useCart, Order } from '@/context/cart-context';

const STATUS_COLORS: Record<Order['status'], string> = {
  Processing: '#E67E22',
  Shipped: '#2980B9',
  Delivered: '#27AE60',
};

function OrderCard({ order }: { order: Order }) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.orderCard, isDark && styles.orderCardDark]}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={[styles.orderId, isDark && styles.textLight]}>{order.id}</Text>
          <Text style={[styles.orderDate, isDark && styles.textMuted]}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.status] + '22' }]}>
          <Text style={[styles.statusText, { color: STATUS_COLORS[order.status] }]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={[styles.orderDivider, isDark && styles.orderDividerDark]} />

      <View style={styles.orderItems}>
        {order.items.map(item => (
          <View key={item.product.id} style={styles.orderItemRow}>
            <Text style={styles.orderItemEmoji}>{item.product.emoji}</Text>
            <Text style={[styles.orderItemName, isDark && styles.textLight]} numberOfLines={1}>
              {item.product.name}
            </Text>
            <Text style={[styles.orderItemQty, isDark && styles.textMuted]}>x{item.quantity}</Text>
            <Text style={styles.orderItemPrice}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.orderDivider, isDark && styles.orderDividerDark]} />

      <View style={styles.orderFooter}>
        <Text style={[styles.orderItemsCount, isDark && styles.textMuted]}>
          {order.items.reduce((s, i) => s + i.quantity, 0)} items
        </Text>
        <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { orders } = useCart();
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <View>
          <Text style={[styles.userName, isDark && styles.textLight]}>Guest User</Text>
          <Text style={[styles.userMeta, isDark && styles.textMuted]}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} placed
          </Text>
        </View>
      </View>

      <View style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Order History</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={[styles.emptyTitle, isDark && styles.textLight]}>No orders yet</Text>
          <Text style={[styles.emptySub, isDark && styles.textMuted]}>
            Place an order from your cart and it will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={o => o.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <OrderCard order={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
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
    paddingBottom: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  headerDark: {
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#333',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11181C',
  },
  userMeta: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  sectionHeaderDark: {
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  list: {
    padding: 16,
    paddingTop: 4,
    paddingBottom: 32,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  orderCardDark: {
    backgroundColor: '#1E1E1E',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#11181C',
    fontFamily: 'monospace',
  },
  orderDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  orderDividerDark: {
    backgroundColor: '#333',
  },
  orderItems: {
    gap: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderItemEmoji: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  orderItemName: {
    flex: 1,
    fontSize: 13,
    color: '#11181C',
  },
  orderItemQty: {
    fontSize: 13,
    color: '#888',
  },
  orderItemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemsCount: {
    fontSize: 13,
    color: '#888',
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0a7ea4',
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
  textLight: {
    color: '#ECEDEE',
  },
  textMuted: {
    color: '#9BA1A6',
  },
});
