import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGetProductQuery, useGetRelatedQuery, useGetReviewsQuery } from '@/app/api'
import { ProductCard } from '@/features/catalog/ProductCard'
import { useCart } from '@/shared/hooks/useCart'
import { Button, Modal, Breadcrumb, Badge, Skeleton } from '@/shared/ui'
import { formatCurrency } from '@/shared/lib/utils'
import { IconStar } from '@/shared/icons'
import { fadeUp, luxuryEase } from '@/shared/animations/motion'
import type { ProductSize } from '@/shared/types'

export default function ProductPage() {
  const { id = '' } = useParams()
  const { data: product, isLoading } = useGetProductQuery(id)
  const { data: related = [] } = useGetRelatedQuery(id, { skip: !id })
  const { data: reviews = [] } = useGetReviewsQuery(id, { skip: !id })
  const { addToCart } = useCart()
  const [size, setSize] = useState<ProductSize>('M')
  const [imageIndex, setImageIndex] = useState(0)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Skeleton className="mb-8 h-4 w-48" />
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p>Product not found.</p>
        <Link to="/shop" className="mt-4 text-gold">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: luxuryEase }}
        >
          <div className="relative aspect-square overflow-hidden border border-border">
            <motion.img
              key={imageIndex}
              src={product.images[imageIndex]}
              alt={product.name}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="mt-4 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setImageIndex(i)}
                className={`h-20 w-20 overflow-hidden border-2 ${i === imageIndex ? 'border-gold' : 'border-border'}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: luxuryEase, delay: 0.1 }}
        >
          <Badge variant="gold">{product.category}</Badge>
          <h1 className="mt-4 font-display text-3xl tracking-wider sm:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} size={16} filled={i < Math.round(product.rating)} />
            ))}
            <span className="text-sm text-muted">({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatCurrency(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-muted line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gold">Size</span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-muted underline hover:text-gold"
              >
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] border px-4 py-2 text-sm transition-colors ${
                    size === s
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-border hover:border-gold/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="mt-10 w-full sm:w-auto"
            size="lg"
            disabled={!product.inStock}
            onClick={() => addToCart(product.id, size)}
          >
            {product.inStock ? 'Add to cart' : 'Sold out'}
          </Button>
        </motion.div>
      </div>

      <section className="mt-20 border-t border-border pt-16">
        <h2 className="font-display text-2xl tracking-wider">Reviews</h2>
        <div className="mt-8 space-y-6">
          {reviews.map((r) => (
            <motion.article
              key={r.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-b border-border pb-6"
            >
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} size={14} filled={i < r.rating} />
                ))}
                {r.verified ? <Badge variant="success">Verified</Badge> : null}
              </div>
              <h4 className="mt-2 font-medium">{r.title}</h4>
              <p className="mt-1 text-sm text-muted">{r.body}</p>
              <p className="mt-2 text-xs text-muted">— {r.author}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-display text-2xl tracking-wider">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      <Modal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        title="Size guide"
        size="lg"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-gold">
              <th className="py-2">Size</th>
              <th className="py-2">Chest (in)</th>
              <th className="py-2">Length (in)</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {[
              ['XS', '34-36', '26'],
              ['S', '36-38', '27'],
              ['M', '38-40', '28'],
              ['L', '40-42', '29'],
              ['XL', '42-44', '30'],
              ['XXL', '44-46', '31'],
            ].map(([s, c, l]) => (
              <tr key={s} className="border-b border-border/50">
                <td className="py-2 text-cream">{s}</td>
                <td className="py-2">{c}</td>
                <td className="py-2">{l}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </div>
  )
}
