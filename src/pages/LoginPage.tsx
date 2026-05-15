import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button, Input } from '@/shared/ui'
import { loginSchema, type LoginFormData } from '@/features/checkout/schemas'
import { luxuryEase } from '@/shared/animations/motion'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/account'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError('')
    try {
      await login(data)
      navigate(from)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: luxuryEase }}
      >
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Aurelo" className="mx-auto h-20 w-20 rounded-full object-cover" />
          <h1 className="mt-4 font-display text-3xl tracking-wider">Sign in</h1>
          <p className="mt-2 text-sm text-muted">Demo mode: any email and password works</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" fullWidth loading={loading}>
            Sign in
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          New here?{' '}
          <Link to="/register" className="text-gold hover:underline">
            Create account
          </Link>
        </p>
        <p className="mt-4 text-center text-xs text-muted">
          Admin demo: admin@aurelo.pk / admin123
        </p>
      </motion.div>
    </div>
  )
}
