import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '@/features/catalog/ProductCard'
import { useProducts } from '@/shared/hooks/useProducts'
import { Button, ProductCardSkeleton, Breadcrumb } from '@/shared/ui'
import { IconSearch } from '@/shared/icons'
import { fadeUp, staggerContainer } from '@/shared/animations/motion'
import type { ProductCategory, ProductAudience } from '@/shared/types'

const categories: Array<{ value: ProductCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movie' },
  { value: 'anime', label: 'Anime' },
  { value: 'casual', label: 'Casual' },
  { value: 'customize', label: 'Customize' },
]

const audiences: Array<{ value: ProductAudience | 'all'; label: string }> = [
  { value: 'all', label: 'Everyone' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
]

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const {
    products,
    total,
    filters,
    setFilter,
    searchInput,
    setSearchInput,
    isLoading,
    isFetching,
    loadMore,
  } = useProducts()

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null
    if (cat) setFilter({ category: cat })
  }, [searchParams, setFilter])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-6 font-display text-4xl tracking-wider"
      >
        Shop
      </motion.h1>
      <p className="mt-2 text-muted">{total} pieces available</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="search"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full border border-border bg-charcoal-elevated py-2.5 pl-10 pr-4 text-sm focus:border-gold/50 focus:outline-none"
              aria-label="Search products"
            />
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest text-gold">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFilter({ category: c.value })}
                  className={`border px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                    filters.category === c.value
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-border text-muted hover:border-gold/40'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest text-gold">Audience</h3>
            <div className="flex flex-wrap gap-2">
              {audiences.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => setFilter({ audience: a.value })}
                  className={`border px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                    filters.audience === a.value
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-border text-muted hover:border-gold/40'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs uppercase tracking-widest text-gold">Sort</h3>
            <select
              value={filters.sort ?? 'newest'}
              onChange={(e) => setFilter({ sort: e.target.value as typeof filters.sort })}
              className="w-full border border-border bg-charcoal-elevated px-3 py-2 text-sm"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </aside>

        <div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </motion.div>

          {!isLoading && products.length === 0 ? (
            <p className="py-20 text-center text-muted">No products match your filters.</p>
          ) : null}

          {products.length < total ? (
            <div className="mt-12 text-center">
              <Button variant="outline" onClick={loadMore} loading={isFetching}>
                Load more
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
