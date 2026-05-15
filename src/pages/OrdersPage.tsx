import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useOrders } from '@/shared/hooks/useOrders'
import { formatCurrency } from '@/shared/lib/utils'
import { Badge, Button, Breadcrumb, Skeleton } from '@/shared/ui'
import { fadeUp } from '@/shared/animations/motion'
import type { OrderStatus } from '@/shared/types'

const tabs: Array<{ key: OrderStatus | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'active', label: 'Active' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
]

const statusVariant: Record<OrderStatus, 'default' | 'gold' | 'success' | 'danger' | 'outline'> = {
  pending: 'gold',
  active: 'default',
  delivered: 'success',
  cancelled: 'danger',
}

export default function OrdersPage() {
  const [tab, setTab] = useState<OrderStatus | 'all'>('all')
  const { orders, isLoading, cancelOrder } = useOrders(tab)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account', href: '/account' },
          { label: 'Orders' },
        ]}
      />
      <h1 className="mt-6 font-display text-4xl tracking-wider">Orders</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              tab === t.key
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-border text-muted hover:border-gold/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
          : orders.map((order, i) => (
              <motion.article
                key={order.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
                className="border border-border bg-charcoal-elevated p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted">{order.id}</p>
                    <p className="mt-1 font-display tracking-wider">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </div>

                <ul className="mt-4 space-y-1 text-sm text-muted">
                  {order.items.map((item) => (
                    <li key={`${item.productId}-${item.size}`}>
                      {item.name} × {item.quantity} ({item.size})
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-l border-gold/30 pl-4">
                  {order.timeline.map((event) => (
                    <div key={event.id} className="relative pb-4 last:pb-0">
                      <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-gold" />
                      <p className="text-sm font-medium">{event.label}</p>
                      <p className="text-xs text-muted">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                      {event.description ? (
                        <p className="text-xs text-muted">{event.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                {order.status === 'pending' ? (
                  <Button
                    variant="danger"
                    size="sm"
                    className="mt-4"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel order
                  </Button>
                ) : null}
              </motion.article>
            ))}

        {!isLoading && orders.length === 0 ? (
          <p className="py-12 text-center text-muted">No orders in this category.</p>
        ) : null}
      </div>

      <Link to="/account" className="mt-8 inline-block text-sm text-gold hover:underline">
        Back to account
      </Link>
    </div>
  )
}
