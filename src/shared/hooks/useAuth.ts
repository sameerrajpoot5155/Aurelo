import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import {
  logout as logoutAction,
  setUser,
  selectUser,
  selectIsAuthenticated,
  selectIsAdmin,
} from '@/features/auth/authSlice'
import { authService } from '@/services/authService'
import type { AuthCredentials, RegisterData } from '@/shared/types'

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isAdmin = useAppSelector(selectIsAdmin)

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      const loggedIn = await authService.login(credentials)
      dispatch(setUser(loggedIn))
      toast.success(`Welcome back, ${loggedIn.name}`)
      return loggedIn
    },
    [dispatch],
  )

  const register = useCallback(
    async (data: RegisterData) => {
      const registered = await authService.register(data)
      dispatch(setUser(registered))
      toast.success('Account created successfully')
      return registered
    },
    [dispatch],
  )

  const logout = useCallback(async () => {
    await authService.logout()
    dispatch(logoutAction())
    toast.info('Signed out')
    navigate('/')
  }, [dispatch, navigate])

  return { user, isAuthenticated, isAdmin, login, register, logout }
}
