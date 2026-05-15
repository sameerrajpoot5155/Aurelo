export type DataSource = 'mock' | 'firebase' | 'api'
export type AuthMode = 'demo' | 'firebase'

export const env = {
  dataSource: (import.meta.env.VITE_DATA_SOURCE ?? 'mock') as DataSource,
  authMode: (import.meta.env.VITE_AUTH_MODE ?? 'demo') as AuthMode,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string | undefined,
  isDev: import.meta.env.DEV,
} as const
