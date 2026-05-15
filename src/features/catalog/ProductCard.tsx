import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux'
import { toggleWishlist, selectIsWishlisted } from '@/features/wishlist/wishlistSlice'
import { formatCurrency } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui'
import { IconHeart } from '@/shared/icons'
import { cardHover, fadeUp } from '@/shared/animations/motion'
import type { Product } from '@/shared/types'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const wishlisted = useAppSelector((s) => selectIsWishlisted(s, product.id))

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
      className="group relative"
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="overflow-hidden border border-border bg-charcoal-elevated"
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
            {!product.inStock ? (
              <Badge className="absolute left-3 top-3" variant="outline">
                Sold out
              </Badge>
            ) : product.compareAtPrice ? (
              <Badge className="absolute left-3 top-3" variant="gold">
                Sale
              </Badge>
            ) : null}
          </div>
          <div className="space-y-2 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{product.category}</p>
            <h3 className="font-display text-sm leading-snug tracking-wide text-cream transition-colors group-hover:text-gold">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-cream">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-xs text-muted line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            dispatch(toggleWishlist(product.id))
          }}
          className="absolute right-3 top-3 rounded-full bg-charcoal/80 p-2 text-cream backdrop-blur transition-colors hover:text-gold"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <IconHeart filled={wishlisted} size={18} />
        </button>
      </motion.div>
    </motion.article>
  )
}
