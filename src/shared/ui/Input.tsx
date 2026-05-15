import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  /** Applied to the outer wrapper div — use for layout classes like flex-1, col-span-2, etc. */
  wrapperClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, wrapperClassName, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    // Decide what to show in the reserved slot beneath the input.
    // The slot is ALWAYS rendered (h-4 = 16 px) so layout never shifts.
    const footerText = error ?? hint ?? ''
    const footerVisible = Boolean(footerText)

    return (
      <div className={cn('flex flex-col', wrapperClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1 text-xs uppercase tracking-widest text-muted"
          >
            {label}
          </label>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full border bg-charcoal-elevated px-4 py-3 text-sm text-cream',
            'placeholder:text-muted/50',
            'transition-colors duration-200',
            'focus:border-gold/60 focus:outline-none',
            error ? 'border-danger' : 'border-border',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-msg` : hint ? `${inputId}-msg` : undefined
          }
          {...props}
        />

        {/*
          This div is ALWAYS in the DOM and always takes up space (min-h-[1.2rem]).
          When there is no message it's invisible — layout stays stable.
        */}
        <div className="min-h-[1.2rem] pt-1">
          <p
            id={`${inputId}-msg`}
            role={error ? 'alert' : undefined}
            className={cn(
              'text-xs leading-none transition-opacity duration-200',
              error ? 'text-danger' : 'text-muted',
              footerVisible ? 'opacity-100' : 'pointer-events-none opacity-0 select-none',
            )}
            aria-hidden={!footerVisible}
          >
            {/* Keep a zero-width space so the line always has height */}
            {footerText || '\u200B'}
          </p>
        </div>
      </div>
    )
  },
)
Input.displayName = 'Input'
