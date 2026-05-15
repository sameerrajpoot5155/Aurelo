import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IconClose } from '@/shared/icons'
import { defaultTransition, fadeIn, scaleIn } from '@/shared/animations/motion'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'md' | 'lg'
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)

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

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            variants={fadeIn}
            transition={defaultTransition}
            onClick={onClose}
            aria-label="Close modal"
          />
          <motion.div
            ref={ref}
            variants={scaleIn}
            transition={defaultTransition}
            className={`relative z-10 max-h-[90vh] w-full overflow-y-auto border border-border bg-charcoal-elevated shadow-lg ${
              size === 'lg' ? 'max-w-2xl' : 'max-w-lg'
            }`}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 id="modal-title" className="font-display text-lg tracking-wider text-cream">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-muted transition-colors hover:text-gold"
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
