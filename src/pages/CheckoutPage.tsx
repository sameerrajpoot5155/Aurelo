import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useCart } from '@/shared/hooks/useCart'
import { useAuth } from '@/shared/hooks/useAuth'
import { orderService } from '@/services/orderService'
import { aureloApi } from '@/app/api'
import { useAppDispatch } from '@/shared/hooks/redux'
import { clearCart } from '@/features/cart/cartSlice'
import { Button, Input, Breadcrumb } from '@/shared/ui'
import {
  shippingSchema,
  paymentSchema,
  type ShippingFormData,
  type PaymentFormData,
} from '@/features/checkout/schemas'
import { luxuryEase } from '@/shared/animations/motion'

const steps = ['Shipping', 'Payment', 'Review'] as const

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null)

  const { items, subtotal, shipping, total, subtotalFormatted, shippingFormatted, totalFormatted } =
    useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  })

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: 'jazzcash' },
  })

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/checkout' } })
    return null
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const onShipping = shippingForm.handleSubmit((data) => {
    setShippingData(data)
    setStep(1)
  })

  const onPayment = paymentForm.handleSubmit((data) => {
    setPaymentData(data)
    setStep(2)
  })

  const placeOrder = async () => {
    if (!user || !shippingData || !paymentData) return
    try {
      await orderService.createOrder({
        userId: user.id,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.product?.name ?? '',
          size: i.size,
          quantity: i.quantity,
          price: i.product?.price ?? 0,
          image: i.product?.images[0] ?? '',
        })),
        subtotal,
        shipping,
        total,
        shippingAddress: {
          id: 'checkout',
          label: 'Checkout',
          fullName: shippingData.fullName,
          phone: shippingData.phone,
          street: shippingData.street,
          city: shippingData.city,
          province: shippingData.province,
          postalCode: shippingData.postalCode,
        },
        paymentMethod: paymentData.method,
      })
      dispatch(clearCart())
      dispatch(aureloApi.util.invalidateTags(['Orders']))
      toast.success('Order placed successfully')
      navigate('/account/orders')
    } catch {
      toast.error('Could not place order')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />
      <h1 className="mt-5 font-display text-3xl tracking-wider sm:text-4xl">Checkout</h1>

      {/* Step indicator */}
      <div className="mt-6 flex gap-1.5 sm:gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => i < step && setStep(i)}
            className={[
              'flex-1 border py-2.5 text-[10px] uppercase tracking-widest transition-colors sm:text-xs',
              i === step
                ? 'border-gold bg-gold/10 text-gold'
                : i < step
                  ? 'cursor-pointer border-gold/40 text-gold/60'
                  : 'cursor-default border-border text-muted',
            ].join(' ')}
          >
            <span className="hidden sm:inline">{i + 1}. </span>
            {s}
          </button>
        ))}
      </div>

      {/* Main grid — stacked on mobile, side-by-side on lg */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
        {/* Form area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
          >
            {/* ── STEP 0: Shipping ── */}
            {step === 0 ? (
              <form onSubmit={onShipping} className="space-y-5" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    placeholder="Ayesha Khan"
                    error={shippingForm.formState.errors.fullName?.message}
                    {...shippingForm.register('fullName')}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    error={shippingForm.formState.errors.email?.message}
                    {...shippingForm.register('email')}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="+92 300 0000000"
                    error={shippingForm.formState.errors.phone?.message}
                    {...shippingForm.register('phone')}
                  />
                  {/* Street spans full width on sm+ */}
                  <Input
                    label="Street address"
                    placeholder="House / Block / Street"
                    wrapperClassName="sm:col-span-2"
                    error={shippingForm.formState.errors.street?.message}
                    {...shippingForm.register('street')}
                  />
                  <Input
                    label="City"
                    placeholder="Lahore"
                    error={shippingForm.formState.errors.city?.message}
                    {...shippingForm.register('city')}
                  />
                  <Input
                    label="Province"
                    placeholder="Punjab"
                    error={shippingForm.formState.errors.province?.message}
                    {...shippingForm.register('province')}
                  />
                  <Input
                    label="Postal code"
                    placeholder="54000"
                    error={shippingForm.formState.errors.postalCode?.message}
                    {...shippingForm.register('postalCode')}
                  />
                </div>
                <Button type="submit" size="md" fullWidth className="mt-2 sm:w-auto">
                  Continue to payment
                </Button>
              </form>
            ) : null}

            {/* ── STEP 1: Payment ── */}
            {step === 1 ? (
              <form onSubmit={onPayment} className="space-y-6" noValidate>
                <fieldset>
                  <legend className="mb-4 text-xs uppercase tracking-widest text-gold">
                    Payment method (Pakistan)
                  </legend>
                  <div className="space-y-3">
                    {(['jazzcash', 'easypaisa', 'bank'] as const).map((m) => (
                      <label
                        key={m}
                        className="flex cursor-pointer items-center gap-3 border border-border p-4 transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/5"
                      >
                        <input
                          type="radio"
                          value={m}
                          {...paymentForm.register('method')}
                          className="accent-gold"
                        />
                        <div>
                          <span className="text-sm font-medium uppercase tracking-wider">
                            {m === 'jazzcash'
                              ? 'JazzCash'
                              : m === 'easypaisa'
                                ? 'EasyPaisa'
                                : 'Bank Transfer'}
                          </span>
                          <p className="mt-0.5 text-xs text-muted">
                            {m === 'bank'
                              ? 'Transfer to our MCB account'
                              : `Pay via ${m === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} mobile wallet`}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Input
                  label="Transaction reference"
                  placeholder="e.g. TXN-123456"
                  hint="Enter the confirmation ID you received after payment"
                  error={paymentForm.formState.errors.transactionRef?.message}
                  {...paymentForm.register('transactionRef')}
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="ghost"
                    className="order-2 sm:order-1"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                  <Button type="submit" fullWidth className="order-1 sm:order-2 sm:w-auto">
                    Review order
                  </Button>
                </div>
              </form>
            ) : null}

            {/* ── STEP 2: Review ── */}
            {step === 2 && shippingData && paymentData ? (
              <div className="space-y-5">
                <div className="border border-border bg-charcoal-elevated p-4 text-sm">
                  <h3 className="text-xs uppercase tracking-widest text-gold">Shipping to</h3>
                  <p className="mt-2 font-medium">{shippingData.fullName}</p>
                  <p className="mt-0.5 text-muted">
                    {shippingData.street}, {shippingData.city}, {shippingData.province}{' '}
                    {shippingData.postalCode}
                  </p>
                  <p className="mt-0.5 text-muted">{shippingData.phone}</p>
                </div>

                <div className="border border-border bg-charcoal-elevated p-4 text-sm">
                  <h3 className="text-xs uppercase tracking-widest text-gold">Payment</h3>
                  <p className="mt-2 capitalize text-muted">
                    {paymentData.method === 'jazzcash'
                      ? 'JazzCash'
                      : paymentData.method === 'easypaisa'
                        ? 'EasyPaisa'
                        : 'Bank Transfer'}
                  </p>
                  <p className="text-muted">Ref: {paymentData.transactionRef}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="ghost"
                    className="order-2 sm:order-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    fullWidth
                    className="order-1 sm:order-2 sm:w-auto"
                    onClick={placeOrder}
                  >
                    Place order
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Order summary sidebar — shows below form on mobile, sticky on lg */}
        <aside className="h-fit rounded-sm border border-border bg-charcoal-elevated p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-lg tracking-wider">Summary</h2>
          <ul className="mt-4 divide-y divide-border/50 text-sm">
            {items.map((i) => (
              <li
                key={`${i.productId}-${i.size}`}
                className="flex items-start justify-between gap-2 py-3"
              >
                <span className="text-muted">
                  {i.product?.name}{' '}
                  <span className="text-cream/70">
                    ×{i.quantity} ({i.size})
                  </span>
                </span>
                <span className="shrink-0 text-cream">
                  {i.product ? `PKR ${(i.product.price * i.quantity).toLocaleString()}` : '—'}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="text-cream">{subtotalFormatted}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Shipping {subtotal >= 10000 ? '(Free)' : ''}</dt>
              <dd className="text-cream">{shippingFormatted}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2.5 text-base font-semibold text-gold">
              <dt>Total</dt>
              <dd>{totalFormatted}</dd>
            </div>
          </dl>
          {subtotal < 10000 && subtotal > 0 ? (
            <p className="mt-3 text-[10px] text-muted">
              Add PKR {(10000 - subtotal).toLocaleString()} more for free shipping
            </p>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
