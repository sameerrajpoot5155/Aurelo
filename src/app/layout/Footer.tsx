import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/shared/animations/motion'

const footerLinks = {
  Shop: [
    { label: 'All products', to: '/shop' },
    { label: 'Movie collection', to: '/shop?category=movie' },
    { label: 'Anime drops', to: '/shop?category=anime' },
    { label: 'Custom atelier', to: '/shop?category=customize' },
  ],
  Company: [
    { label: 'About', to: '/' },
    { label: 'Contact', to: '/' },
    { label: 'Shipping', to: '/' },
  ],
  Account: [
    { label: 'Sign in', to: '/login' },
    { label: 'Orders', to: '/account/orders' },
    { label: 'Wishlist', to: '/wishlist' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal-muted">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/logo.png" alt="Aurelo" className="h-14 w-14 rounded-full object-cover" />
              <span className="font-display text-xl tracking-[0.2em]">AURELO</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Premium custom apparel crafted in Lahore. Bespoke fits, editorial collections,
              delivered across Pakistan.
            </p>
          </motion.div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={fadeUp}>
              <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stitch pt-8 text-xs text-muted sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Aurelo. All rights reserved.</p>
          <p className="tracking-widest">LAHORE · KARACHI · ISLAMABAD</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
