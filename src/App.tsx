import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from '@/app/router'
import { useAppDispatch } from '@/shared/hooks/redux'
import { initializeAuth } from '@/features/auth/authSlice'

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#141414',
            border: '1px solid #2a2a2a',
            color: '#f5f0e8',
          },
        }}
        richColors
        closeButton
      />
    </>
  )
}
