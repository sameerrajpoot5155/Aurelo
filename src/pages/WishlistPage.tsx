import { motion } from 'framer-motion'
import { useAppSelector } from '@/shared/hooks/redux'
import { selectWishlistIds } from '@/features/wishlist/wishlistSlice'
import { MOCK_PRODUCTS } from '@/data/mockProducts'
import { ProductCard } from '@/features/catalog/ProductCard'
import { EmptyState, Breadcrumb } from '@/shared/ui'
import { staggerContainer } from '@/shared/animations/motion'

export default function WishlistPage() {
  const ids = useAppSelector(selectWishlistIds)
  const products = MOCK_PRODUCTS.filter((p) => ids.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
      <h1 className="mt-6 font-display text-4xl tracking-wider">Wishlist</h1>

      {products.length === 0 ? (
        <EmptyState
          title="No saved pieces yet"
          description="Tap the heart on any product to save it here."
          actionLabel="Explore shop"
          onAction={() => (window.location.href = '/shop')}
        />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
