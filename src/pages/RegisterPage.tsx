import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button, Input } from '@/shared/ui'
import { registerSchema, type RegisterFormData } from '@/features/checkout/schemas'
import { luxuryEase } from '@/shared/animations/motion'

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setError('')
    try {
      await registerUser(data)
      navigate('/account')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed')
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
          <h1 className="mt-4 font-display text-3xl tracking-wider">Create account</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" fullWidth loading={loading}>
            Register
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-gold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
