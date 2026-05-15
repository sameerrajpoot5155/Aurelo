import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/hooks/redux'
import { selectIsAuthenticated, selectIsAdmin } from '@/features/auth/authSlice'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuthenticated)
  const location = useLocation()
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuthenticated)
  const isAdmin = useAppSelector(selectIsAdmin)
  const location = useLocation()
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
