import { motion } from 'framer-motion'
import { fadeUp, defaultTransition } from '@/shared/animations/motion'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={defaultTransition}
    >
      <div className="mb-6 h-px w-16 bg-gold/40" />
      <h3 className="font-display text-xl tracking-wider text-cream">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm text-muted">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button className="mt-8" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </motion.div>
  )
}
