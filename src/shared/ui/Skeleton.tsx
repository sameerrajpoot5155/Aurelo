import { cn } from '@/shared/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-charcoal-muted/80', className)} aria-hidden />
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}
