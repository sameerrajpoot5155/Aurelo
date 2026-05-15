import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '@/shared/hooks/useCart'
import { Button, EmptyState, Breadcrumb } from '@/shared/ui'
import { IconMinus, IconPlus, IconTrash } from '@/shared/icons'
import { fadeUp } from '@/shared/animations/motion'

export default function CartPage() {
  const { items, subtotalFormatted, shippingFormatted, totalFormatted, updateQty, removeFromCart } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
        <EmptyState
          title="Your cart is empty"
          description="Discover our latest drops and bespoke pieces."
          actionLabel="Browse shop"
          onAction={() => (window.location.href = '/shop')}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      <h1 className="mt-6 font-display text-4xl tracking-wider">Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={`${item.productId}-${item.size}`}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 border border-border bg-charcoal-elevated p-4"
            >
              <img
                src={item.product?.images[0]}
                alt={item.product?.name}
                className="h-28 w-24 object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm tracking-wide">{item.product?.name}</h3>
                  <p className="text-xs text-muted">Size {item.size}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                      className="p-2 hover:text-gold"
                      aria-label="Decrease quantity"
                    >
                      <IconMinus size={16} />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                      className="p-2 hover:text-gold"
                      aria-label="Increase quantity"
                    >
                      <IconPlus size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-muted hover:text-danger"
                    aria-label="Remove item"
                  >
                    <IconTrash size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="h-fit border border-border bg-charcoal-elevated p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg tracking-wider">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{subtotalFormatted}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping estimate</dt>
              <dd>{shippingFormatted}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd className="text-gold">{totalFormatted}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="mt-8 block">
            <Button fullWidth size="lg">
              Proceed to checkout
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  )
}
