import { describe, it, expect, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, {
  setUser,
  initializeAuth,
  selectIsAuthenticated,
} from '@/features/auth/authSlice'
import { removeStorageItem } from '@/shared/lib/storage'
import type { RootState } from '@/app/store'

function makeStore() {
  return configureStore({ reducer: { auth: authReducer } })
}

function authState(store: ReturnType<typeof makeStore>): RootState {
  return store.getState() as unknown as RootState
}

describe('auth slice', () => {
  beforeEach(() => {
    removeStorageItem('session')
    removeStorageItem('users')
  })

  it('sets user and reports authenticated', () => {
    const store = makeStore()
    store.dispatch(
      setUser({
        id: 'u1',
        email: 'test@aurelo.pk',
        name: 'Test',
        role: 'customer',
        addresses: [],
        createdAt: new Date().toISOString(),
      }),
    )
    expect(selectIsAuthenticated(authState(store))).toBe(true)
  })

  it('initializes from empty session', () => {
    const store = makeStore()
    store.dispatch(initializeAuth())
    expect(selectIsAuthenticated(authState(store))).toBe(false)
  })
})
