import { Link } from 'react-router-dom'
import { IconChevron } from '@/shared/icons'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted"
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 ? <IconChevron size={14} className="text-gold/50" direction="right" /> : null}
          {item.href && i < items.length - 1 ? (
            <Link to={item.href} className="transition-colors hover:text-gold">
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? 'text-gold' : ''}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
