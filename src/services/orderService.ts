import { getStorageItem, setStorageItem } from '@/shared/lib/storage'
import { randomDelay } from '@/shared/lib/utils'
import type { Address, Order, OrderStatus, OrderTimelineEvent, PaymentMethod } from '@/shared/types'

const ORDERS_KEY = 'orders'

function loadOrders(): Order[] {
  return getStorageItem<Order[]>(ORDERS_KEY, [])
}

function saveOrders(orders: Order[]) {
  setStorageItem(ORDERS_KEY, orders)
}

function buildTimeline(status: OrderStatus): OrderTimelineEvent[] {
  const now = new Date().toISOString()
  const base: OrderTimelineEvent[] = [
    { id: 't1', status: 'pending', label: 'Order placed', timestamp: now },
  ]
  if (status === 'active' || status === 'delivered') {
    base.push({
      id: 't2',
      status: 'active',
      label: 'In production',
      timestamp: now,
      description: 'Your custom piece is being crafted at our Lahore atelier.',
    })
  }
  if (status === 'delivered') {
    base.push({
      id: 't3',
      status: 'delivered',
      label: 'Delivered',
      timestamp: now,
    })
  }
  if (status === 'cancelled') {
    base.push({
      id: 't4',
      status: 'cancelled',
      label: 'Cancelled',
      timestamp: now,
    })
  }
  return base
}

export function seedDemoOrders(userId: string): void {
  const existing = loadOrders().filter((o) => o.userId === userId)
  if (existing.length > 0) return

  const demo: Order[] = [
    {
      id: `ORD-${Date.now()}-1`,
      userId,
      items: [
        {
          productId: 'prod-001',
          name: 'Noir Cinema Oversized Tee',
          size: 'L',
          quantity: 1,
          price: 4490,
          image:
            'https://images.unsplash.com/photo-1539109136881-029369031791f?w=200&q=80&auto=format&fit=crop',
        },
      ],
      status: 'delivered',
      subtotal: 4490,
      shipping: 250,
      total: 4740,
      shippingAddress: {
        id: 'addr-1',
        label: 'Home',
        fullName: 'Demo User',
        phone: '+92 300 1234567',
        street: '12 Gulberg III',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000',
      },
      paymentMethod: 'jazzcash',
      timeline: buildTimeline('delivered'),
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `ORD-${Date.now()}-2`,
      userId,
      items: [
        {
          productId: 'prod-009',
          name: 'Epic Saga Longline',
          size: 'M',
          quantity: 2,
          price: 4790,
          image:
            'https://images.unsplash.com/photo-1612036782180-bf6be0d1b4ae?w=200&q=80&auto=format&fit=crop',
        },
      ],
      status: 'active',
      subtotal: 9580,
      shipping: 250,
      total: 9830,
      shippingAddress: {
        id: 'addr-1',
        label: 'Home',
        fullName: 'Demo User',
        phone: '+92 300 1234567',
        street: '12 Gulberg III',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000',
      },
      paymentMethod: 'easypaisa',
      timeline: buildTimeline('active'),
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `ORD-${Date.now()}-3`,
      userId,
      items: [
        {
          productId: 'prod-028',
          name: 'Bespoke Atelier Jacket',
          size: 'XL',
          quantity: 1,
          price: 24990,
          image:
            'https://images.unsplash.com/photo-1558171813-4c030d41d619?w=200&q=80&auto=format&fit=crop',
        },
      ],
      status: 'pending',
      subtotal: 24990,
      shipping: 0,
      total: 24990,
      shippingAddress: {
        id: 'addr-1',
        label: 'Home',
        fullName: 'Demo User',
        phone: '+92 300 1234567',
        street: '12 Gulberg III',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000',
      },
      paymentMethod: 'bank',
      timeline: buildTimeline('pending'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  saveOrders([...loadOrders(), ...demo])
}

export const orderService = {
  async getOrders(userId: string): Promise<Order[]> {
    await randomDelay()
    return loadOrders()
      .filter((o) => o.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  async getAllOrders(): Promise<Order[]> {
    await randomDelay()
    return loadOrders().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  },

  async createOrder(payload: {
    userId: string
    items: Order['items']
    subtotal: number
    shipping: number
    total: number
    shippingAddress: Address
    paymentMethod: PaymentMethod
  }): Promise<Order> {
    await randomDelay()
    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId: payload.userId,
      items: payload.items,
      status: 'pending',
      subtotal: payload.subtotal,
      shipping: payload.shipping,
      total: payload.total,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      timeline: buildTimeline('pending'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveOrders([order, ...loadOrders()])
    return order
  },

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    await randomDelay()
    const orders = loadOrders()
    const index = orders.findIndex((o) => o.id === orderId)
    if (index === -1) throw new Error('Order not found')
    orders[index] = {
      ...orders[index],
      status,
      timeline: buildTimeline(status),
      updatedAt: new Date().toISOString(),
    }
    saveOrders(orders)
    return orders[index]
  },

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    await randomDelay()
    const orders = loadOrders()
    const order = orders.find((o) => o.id === orderId && o.userId === userId)
    if (!order) throw new Error('Order not found')
    if (order.status !== 'pending') throw new Error('Only pending orders can be cancelled')
    return orderService.updateStatus(orderId, 'cancelled')
  },

  seedDemoOrders,
}
