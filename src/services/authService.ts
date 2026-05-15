import { env } from '@/shared/lib/env'
import { getStorageItem, setStorageItem } from '@/shared/lib/storage'
import { randomDelay } from '@/shared/lib/utils'
import type { AuthCredentials, RegisterData, User } from '@/shared/types'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'

const DEMO_ADMIN = { email: 'admin@aurelo.pk', password: 'admin123' }

const defaultAddresses = [
  {
    id: 'addr-1',
    label: 'Home',
    fullName: 'Demo User',
    phone: '+92 300 1234567',
    street: '12 Gulberg III',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '54000',
    isDefault: true,
  },
]

function loadUsers(): Record<string, User & { password: string }> {
  return getStorageItem(USERS_KEY, {})
}

function saveUsers(users: Record<string, User & { password: string }>) {
  setStorageItem(USERS_KEY, users)
}

function createDemoUser(data: RegisterData): User {
  return {
    id: `user-${Date.now()}`,
    email: data.email,
    name: data.name,
    role: data.email === DEMO_ADMIN.email ? 'admin' : 'customer',
    addresses: [...defaultAddresses],
    createdAt: new Date().toISOString(),
  }
}

export const authService = {
  async login(credentials: AuthCredentials): Promise<User> {
    await randomDelay()

    if (env.authMode === 'demo') {
      const users = loadUsers()
      const stored = users[credentials.email]
      if (stored && stored.password === credentials.password) {
        const { password: _, ...user } = stored
        setStorageItem(SESSION_KEY, user)
        return user
      }
      if (!stored) {
        const user = createDemoUser({ ...credentials, name: credentials.email.split('@')[0] })
        users[credentials.email] = { ...user, password: credentials.password }
        saveUsers(users)
        setStorageItem(SESSION_KEY, user)
        return user
      }
      throw new Error('Invalid email or password')
    }

    throw new Error('Firebase auth not configured. Set VITE_AUTH_MODE=demo')
  },

  async register(data: RegisterData): Promise<User> {
    await randomDelay()
    const users = loadUsers()
    if (users[data.email]) throw new Error('Account already exists')
    const user = createDemoUser(data)
    users[data.email] = { ...user, password: data.password }
    saveUsers(users)
    setStorageItem(SESSION_KEY, user)
    return user
  },

  async logout(): Promise<void> {
    await randomDelay(50, 100)
    setStorageItem(SESSION_KEY, null)
  },

  getSession(): User | null {
    return getStorageItem<User | null>(SESSION_KEY, null)
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await randomDelay()
    const session = authService.getSession()
    if (!session || session.id !== userId) throw new Error('Unauthorized')
    const updated = { ...session, ...updates }
    setStorageItem(SESSION_KEY, updated)
    const users = loadUsers()
    if (users[session.email]) {
      users[session.email] = { ...users[session.email], ...updated }
      saveUsers(users)
    }
    return updated
  },

  isAdmin(user: User | null): boolean {
    return user?.role === 'admin' || user?.email === DEMO_ADMIN.email
  },

  demoAdminCredentials: DEMO_ADMIN,
}
