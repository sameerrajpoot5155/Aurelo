import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gold text-charcoal border border-gold-dark/30 shadow-gold hover:bg-gold-light',
  secondary: 'bg-charcoal-muted text-cream border border-border hover:border-gold/40',
  ghost: 'bg-transparent text-cream hover:text-gold hover:bg-gold/5',
  outline: 'bg-transparent text-gold border border-gold/60 hover:bg-gold/10',
  danger: 'bg-danger/20 text-danger border border-danger/40 hover:bg-danger/30',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs tracking-widest',
  md: 'px-6 py-2.5 text-sm tracking-widest',
  lg: 'px-8 py-3.5 text-sm tracking-widest',
}

/**
 * Button is a plain <button> — no wrapper div — so callers can pass
 * any Tailwind layout/alignment class (w-full, self-end, flex-1, etc.)
 * directly and it applies to the element that participates in the parent flex/grid.
 *
 * Hover/active scale is CSS-only so prefers-reduced-motion is respected
 * via the global CSS rule (transition-duration: 0.01ms).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading,
      fullWidth,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-body font-medium uppercase',
        'transition-all duration-200',
        'hover:scale-[1.02] active:scale-[0.97]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'
