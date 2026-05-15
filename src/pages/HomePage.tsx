import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useGetFeaturedQuery } from '@/app/api'
import { ProductCard } from '@/features/catalog/ProductCard'
import { Button } from '@/shared/ui'
import { newsletterSchema } from '@/features/checkout/schemas'
import { fadeUp, staggerContainer, luxuryEase } from '@/shared/animations/motion'
import { cn } from '@/shared/lib/utils'
import type { z } from 'zod'

type NewsletterData = z.infer<typeof newsletterSchema>

const collections = [
  {
    title: 'Movie',
    desc: 'Cinema-inspired drops',
    to: '/shop?category=movie',
    img: 'https://images.unsplash.com/photo-1539109136881-029369031791f?w=600&q=80',
  },
  {
    title: 'Anime',
    desc: 'Limited studio arcs',
    to: '/shop?category=anime',
    img: 'https://images.unsplash.com/photo-1612036782180-bf6be0d1b4ae?w=600&q=80',
  },
  {
    title: 'Custom',
    desc: 'Bespoke atelier pieces',
    to: '/shop?category=customize',
    img: 'https://images.unsplash.com/photo-1558171813-4c030d41d619?w=600&q=80',
  },
]

export default function HomePage() {
  const { data: featured = [], isLoading } = useGetFeaturedQuery()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterData>({ resolver: zodResolver(newsletterSchema) })

  const onNewsletter = (data: NewsletterData) => {
    toast.success('Welcome to the atelier list', { description: data.email })
    reset()
  }

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[92dvh] items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558171813-4c030d41d619?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal sm:bg-gradient-to-r sm:from-charcoal sm:via-charcoal/90 sm:to-charcoal/50" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="flex flex-col"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-3 text-xs uppercase tracking-[0.35em] text-gold"
              >
                Premium custom apparel
              </motion.p>

              <h1 className="font-display text-[2.1rem] leading-[1.15] tracking-wide sm:text-5xl lg:text-6xl">
                Crafted for those who{' '}
                <span className="text-gold-gradient">wear the story</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                Aurelo merges editorial luxury with streetwear precision. Movie, anime, and
                bespoke collections — stitched with gold-thread detail.
              </p>

              {/* CTA buttons — full-width on mobile, auto-width on sm+ */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link to="/shop" className="block">
                  <Button size="lg" fullWidth className="sm:w-auto">
                    Explore shop
                  </Button>
                </Link>
                <Link to="/shop?category=customize" className="block">
                  <Button size="lg" variant="outline" fullWidth className="sm:w-auto">
                    Start customizing
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Logo emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: luxuryEase, delay: 0.25 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.img
                src="/logo.png"
                alt="Aurelo emblem"
                className="h-52 w-52 rounded-full object-cover sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                style={{ filter: 'drop-shadow(0 0 56px rgba(201,169,110,0.28))' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-8 w-px bg-gradient-to-b from-gold/60 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div className="overflow-hidden border-y border-border bg-charcoal-muted py-3.5">
        <motion.div
          className="flex gap-16 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-muted"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, gi) => (
            <span key={gi} className="flex gap-16">
              {[
                'Free shipping over PKR 10,000',
                'Hand-finished in Lahore',
                'JazzCash · EasyPaisa · Bank',
                '40+ exclusive drops',
                'Custom orders open',
              ].map((t) => (
                <span key={t} className="flex items-center gap-3">
                  <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {t}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── COLLECTIONS ─── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 text-center font-display text-2xl tracking-wider sm:text-3xl"
        >
          Featured collections
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-3 sm:gap-6"
        >
          {collections.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <Link
                to={col.to}
                className="group relative block overflow-hidden border border-border"
              >
                <img
                  src={col.img}
                  alt={col.title}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 w-full p-5 sm:p-6">
                  <h3 className="font-display text-xl tracking-wider sm:text-2xl">{col.title}</h3>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{col.desc}</p>
                  <span className="mt-3 inline-block text-[10px] uppercase tracking-widest text-gold">
                    View collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── FEATURED PIECES ─── */}
      <section className="border-t border-border bg-charcoal-elevated py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between sm:mb-12">
            <h2 className="font-display text-2xl tracking-wider sm:text-3xl">Featured pieces</h2>
            <Link
              to="/shop"
              className="text-[10px] uppercase tracking-widest text-gold hover:underline sm:text-xs"
            >
              View all
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse bg-charcoal-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              {featured.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="border-t border-border py-12 sm:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-px bg-border sm:grid-cols-4"
        >
          {[
            { value: '5,000+', label: 'Orders fulfilled' },
            { value: '40+', label: 'Exclusive drops' },
            { value: '4.9 ★', label: 'Average rating' },
            { value: '3 cities', label: 'Lahore · Karachi · Islamabad' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center bg-charcoal px-4 py-8 text-center"
            >
              <span className="font-display text-2xl text-gold sm:text-3xl">{stat.value}</span>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="border-t border-border bg-charcoal-elevated py-16 sm:py-24">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mx-auto mb-5 h-px w-12 bg-gold/50" />
            <h2 className="font-display text-2xl tracking-wider sm:text-3xl">
              Join the atelier list
            </h2>
            <p className="mt-2 text-sm text-muted">
              Early access to drops and bespoke consultations.
            </p>

            <form onSubmit={handleSubmit(onNewsletter)} noValidate className="mt-8">
              {/*
                Input + button sit in ONE flex row so they share the same
                height naturally — no wrapper divs in between.
                On mobile: stacked (flex-col). On sm+: side-by-side (flex-row).
              */}
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  aria-describedby="newsletter-msg"
                  aria-invalid={!!errors.email}
                  className={cn(
                    'flex-1 border bg-charcoal-elevated px-4 py-3 text-sm text-cream',
                    'placeholder:text-muted/50 transition-colors duration-200',
                    'focus:outline-none',
                    'focus:border-gold/60',
                    errors.email ? 'border-danger' : 'border-border',
                  )}
                  {...register('email')}
                />
                <Button
                  type="submit"
                  size="md"
                  /* same py-3 as input so heights are pixel-perfect equal */
                  className="w-full py-3 sm:w-auto sm:shrink-0"
                >
                  Subscribe
                </Button>
              </div>

              {/* Reserved error slot — always in DOM so layout never jumps */}
              <div className="min-h-[1.2rem] pt-1">
                <p
                  id="newsletter-msg"
                  role={errors.email ? 'alert' : undefined}
                  aria-hidden={!errors.email?.message}
                  className={cn(
                    'text-left text-xs text-danger transition-opacity duration-200',
                    errors.email?.message
                      ? 'opacity-100'
                      : 'pointer-events-none select-none opacity-0',
                  )}
                >
                  {errors.email?.message ?? '\u200B'}
                </p>
              </div>
            </form>

            <p className="mt-4 text-[10px] text-muted/60">
              No spam. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
