import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
})

export const paymentSchema = z.object({
  method: z.enum(['jazzcash', 'easypaisa', 'bank']),
  accountNumber: z.string().optional(),
  transactionRef: z.string().min(4, 'Transaction reference required'),
})

export type ShippingFormData = z.infer<typeof shippingSchema>
export type PaymentFormData = z.infer<typeof paymentSchema>

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name is required'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Enter a valid email'),
})
