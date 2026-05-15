import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  selectCartItems,
  selectCartCount,
} from '@/features/cart/cartSlice'
import { MOCK_PRODUCTS } from '@/data/mockProducts'
import { formatCurrency } from '@/shared/lib/utils'
import type { ProductSize } from '@/shared/types'

const SHIPPING_THRESHOLD = 10000
const SHIPPING_FLAT = 250

export function useCart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const count = useAppSelector(selectCartCount)

  const enriched = useMemo(
    () =>
      items.map((item) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === item.productId)
        return { ...item, product }
      }),
    [items],
  )

  const subtotal = useMemo(
    () => enriched.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.quantity, 0),
    [enriched],
  )

  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT
  const total = subtotal + shipping

  const addToCart = useCallback(
    (productId: string, size: ProductSize, quantity = 1) => {
      dispatch(addItem({ productId, size, quantity }))
      toast.success('Added to cart', { description: `Size ${size}` })
    },
    [dispatch],
  )

  return {
    items: enriched,
    count,
    subtotal,
    shipping,
    total,
    subtotalFormatted: formatCurrency(subtotal),
    shippingFormatted: formatCurrency(shipping),
    totalFormatted: formatCurrency(total),
    addToCart,
    updateQty: (productId: string, size: ProductSize, quantity: number) =>
      dispatch(updateQuantity({ productId, size, quantity })),
    removeFromCart: (productId: string, size: ProductSize) =>
      dispatch(removeItem({ productId, size })),
    clearCart: () => dispatch(clearCart()),
  }
}
