import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/data/mockProducts'
import { env } from '@/shared/lib/env'
import { randomDelay } from '@/shared/lib/utils'
import type { PaginatedProducts, Product, ProductFilters, Review } from '@/shared/types'

function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products]

  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category)
  }
  if (filters.audience && filters.audience !== 'all') {
    result = result.filter((p) => p.audience === filters.audience || p.audience === 'unisex')
  }
  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= filters.minPrice!)
  }
  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= filters.maxPrice!)
  }
  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    )
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      break
  }

  return result
}

async function withNetwork<T>(fn: () => T): Promise<T> {
  if (env.dataSource === 'mock') await randomDelay()
  return fn()
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
    return withNetwork(() => {
      const page = filters.page ?? 1
      const limit = filters.limit ?? 12
      const filtered = filterProducts(MOCK_PRODUCTS, filters)
      const total = filtered.length
      const totalPages = Math.max(1, Math.ceil(total / limit))
      const start = (page - 1) * limit
      return {
        items: filtered.slice(start, start + limit),
        total,
        page,
        totalPages,
      }
    })
  },

  async getProductById(id: string): Promise<Product | null> {
    return withNetwork(() => MOCK_PRODUCTS.find((p) => p.id === id) ?? null)
  },

  async getFeatured(): Promise<Product[]> {
    return withNetwork(() => MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 8))
  },

  async getRelated(productId: string, limit = 4): Promise<Product[]> {
    return withNetwork(() => {
      const product = MOCK_PRODUCTS.find((p) => p.id === productId)
      if (!product) return []
      return MOCK_PRODUCTS.filter(
        (p) => p.id !== productId && p.category === product.category,
      ).slice(0, limit)
    })
  },

  async getReviews(productId: string): Promise<Review[]> {
    return withNetwork(() => MOCK_REVIEWS.filter((r) => r.productId === productId))
  },
}
