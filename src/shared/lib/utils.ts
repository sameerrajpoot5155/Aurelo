export function formatCurrency(amount: number, currency = 'PKR'): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function cartLineKey(productId: string, size: string): string {
  return `${productId}::${size}`
}

export function parseCartLineKey(key: string): { productId: string; size: string } {
  const [productId, size] = key.split('::')
  return { productId, size }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function randomDelay(min = 150, max = 400): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return delay(ms)
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
