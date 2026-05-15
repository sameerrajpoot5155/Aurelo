import { cn } from '@/shared/lib/utils'

type BadgeVariant = 'default' | 'gold' | 'success' | 'danger' | 'outline'

const styles: Record<BadgeVariant, string> = {
  default: 'bg-charcoal-muted text-cream border-border',
  gold: 'bg-gold/15 text-gold border-gold/30',
  success: 'bg-success/15 text-success border-success/30',
  danger: 'bg-danger/15 text-danger border-danger/30',
  outline: 'bg-transparent text-muted border-border',
}

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
