import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '@/app/api'
import { MOCK_PRODUCTS } from '@/data/mockProducts'
import { formatCurrency } from '@/shared/lib/utils'
import { Badge, Breadcrumb, Skeleton } from '@/shared/ui'
import type { OrderStatus } from '@/shared/types'
import { toast } from 'sonner'

export default function AdminPage() {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery()
  const [updateStatus] = useUpdateOrderStatusMutation()

  const handleStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateStatus({ orderId, status }).unwrap()
      toast.success('Order status updated')
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Admin' }]} />
      <h1 className="mt-6 font-display text-4xl tracking-wider">Admin</h1>
      <p className="mt-2 text-sm text-muted">Demo dashboard — manage products and orders</p>

      <section className="mt-12">
        <h2 className="font-display text-xl tracking-wider">Products ({MOCK_PRODUCTS.length})</h2>
        <div className="mt-4 overflow-x-auto border border-border">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-border bg-charcoal-muted text-xs uppercase tracking-widest text-gold">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.slice(0, 15).map((p) => (
                <tr key={p.id} className="border-b border-border/50">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 capitalize text-muted">{p.category}</td>
                  <td className="p-3">{formatCurrency(p.price)}</td>
                  <td className="p-3">
                    <Badge variant={p.inStock ? 'success' : 'outline'}>
                      {p.inStock ? 'In stock' : 'Out'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-xl tracking-wider">Orders</h2>
        {isLoading ? (
          <Skeleton className="mt-4 h-40 w-full" />
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 border border-border p-4"
              >
                <div>
                  <p className="text-xs text-muted">{order.id}</p>
                  <p className="font-medium">{formatCurrency(order.total)}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatus(order.id, e.target.value as OrderStatus)}
                  className="border border-border bg-charcoal-elevated px-3 py-2 text-sm"
                  aria-label={`Update status for ${order.id}`}
                >
                  {(['pending', 'active', 'delivered', 'cancelled'] as const).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
