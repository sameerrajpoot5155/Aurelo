import { configureStore } from '@reduxjs/toolkit'
import { aureloApi } from './api'
import authReducer from '@/features/auth/authSlice'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [aureloApi.reducerPath]: aureloApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(aureloApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
