import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@/services/authService'
import { orderService } from '@/services/orderService'
import type { User } from '@/shared/types'
import type { RootState } from '@/app/store'

interface AuthState {
  user: User | null
  initialized: boolean
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, initialized: false } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      if (action.payload) {
        orderService.seedDemoOrders(action.payload.id)
      }
    },
    initializeAuth: (state) => {
      const session = authService.getSession()
      state.user = session
      state.initialized = true
      if (session) orderService.seedDemoOrders(session.id)
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { setUser, initializeAuth, logout } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user
export const selectIsAdmin = (state: RootState) => authService.isAdmin(state.auth.user)
