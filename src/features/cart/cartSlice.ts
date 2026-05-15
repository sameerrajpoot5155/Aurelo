import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { cartLineKey } from '@/shared/lib/utils'
import { getStorageItem, setStorageItem } from '@/shared/lib/storage'
import type { ProductSize } from '@/shared/types'
import type { RootState } from '@/app/store'

export interface CartItem {
  productId: string
  size: ProductSize
  quantity: number
}

interface CartState {
  items: Record<string, CartItem>
}

const persisted = getStorageItem<CartItem[]>('cart', [])

const initialState: CartState = {
  items: persisted.reduce<Record<string, CartItem>>((acc, item) => {
    acc[cartLineKey(item.productId, item.size)] = item
    return acc
  }, {}),
}

function persistItems(items: Record<string, CartItem>) {
  setStorageItem('cart', Object.values(items))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ productId: string; size: ProductSize; quantity?: number }>,
    ) => {
      const { productId, size, quantity = 1 } = action.payload
      const key = cartLineKey(productId, size)
      if (state.items[key]) {
        state.items[key].quantity += quantity
      } else {
        state.items[key] = { productId, size, quantity }
      }
      persistItems(state.items)
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; size: ProductSize; quantity: number }>,
    ) => {
      const key = cartLineKey(action.payload.productId, action.payload.size)
      if (state.items[key]) {
        if (action.payload.quantity <= 0) {
          delete state.items[key]
        } else {
          state.items[key].quantity = action.payload.quantity
        }
        persistItems(state.items)
      }
    },
    removeItem: (state, action: PayloadAction<{ productId: string; size: ProductSize }>) => {
      const key = cartLineKey(action.payload.productId, action.payload.size)
      delete state.items[key]
      persistItems(state.items)
    },
    clearCart: (state) => {
      state.items = {}
      persistItems(state.items)
    },
  },
})

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state: RootState) => Object.values(state.cart.items)
export const selectCartCount = (state: RootState) =>
  Object.values(state.cart.items).reduce((sum, i) => sum + i.quantity, 0)
export const selectCartItemByKey = (state: RootState, key: string) => state.cart.items[key]
