import { describe, it, expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, {
  addItem,
  updateQuantity,
  removeItem,
  selectCartCount,
} from '@/features/cart/cartSlice'
import type { RootState } from '@/app/store'

function makeStore() {
  return configureStore({ reducer: { cart: cartReducer } })
}

function cartState(store: ReturnType<typeof makeStore>): RootState {
  return store.getState() as unknown as RootState
}

describe('cart slice', () => {
  it('adds items and normalizes by productId+size', () => {
    const store = makeStore()
    store.dispatch(addItem({ productId: 'p1', size: 'M', quantity: 1 }))
    store.dispatch(addItem({ productId: 'p1', size: 'M', quantity: 2 }))
    expect(selectCartCount(cartState(store))).toBe(3)
  })

  it('updates quantity and removes items', () => {
    const store = makeStore()
    store.dispatch(addItem({ productId: 'p1', size: 'L', quantity: 1 }))
    store.dispatch(updateQuantity({ productId: 'p1', size: 'L', quantity: 5 }))
    expect(selectCartCount(cartState(store))).toBe(5)
    store.dispatch(removeItem({ productId: 'p1', size: 'L' }))
    expect(selectCartCount(cartState(store))).toBe(0)
  })
})
