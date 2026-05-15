import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getStorageItem, setStorageItem } from '@/shared/lib/storage'
import type { RootState } from '@/app/store'

interface WishlistState {
  productIds: string[]
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { productIds: getStorageItem<string[]>('wishlist', []) } as WishlistState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.productIds.indexOf(id)
      if (index >= 0) {
        state.productIds.splice(index, 1)
      } else {
        state.productIds.push(id)
      }
      setStorageItem('wishlist', state.productIds)
    },
    clearWishlist: (state) => {
      state.productIds = []
      setStorageItem('wishlist', state.productIds)
    },
  },
})

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer

export const selectWishlistIds = (state: RootState) => state.wishlist.productIds
export const selectIsWishlisted = (state: RootState, productId: string) =>
  state.wishlist.productIds.includes(productId)
