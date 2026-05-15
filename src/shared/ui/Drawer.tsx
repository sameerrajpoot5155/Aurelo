import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IconClose } from '@/shared/icons'
import { luxuryEase } from '@/shared/animations/motion'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  side?: 'left' | 'right'
}

export function Drawer({ open, onClose, title, children, side = 'right' }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const x = side === 'right' ? '100%' : '-100%'

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close drawer"
          />
          <motion.aside
            initial={{ x }}
            animate={{ x: 0 }}
            exit={{ x }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className={`absolute top-0 flex h-full w-full max-w-sm flex-col border-border bg-charcoal-elevated shadow-lg ${
              side === 'right' ? 'right-0 border-l' : 'left-0 border-r'
            } border`}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-lg tracking-wider">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-muted hover:text-gold"
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
