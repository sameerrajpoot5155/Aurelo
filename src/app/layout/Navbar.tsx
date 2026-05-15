import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/shared/hooks/useCart'
import { useAuth } from '@/shared/hooks/useAuth'
import { useAppSelector } from '@/shared/hooks/redux'
import { selectWishlistIds } from '@/features/wishlist/wishlistSlice'
import { Drawer } from '@/shared/ui'
import { IconBag, IconHeart, IconMenu, IconUser } from '@/shared/icons'
import { luxuryEase } from '@/shared/animations/motion'

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=customize', label: 'Customize' },
  { to: '/shop?category=movie', label: 'Movie' },
  { to: '/shop?category=anime', label: 'Anime' },
]

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { count } = useCart()
  const { isAuthenticated, isAdmin } = useAuth()
  const wishlistCount = useAppSelector(selectWishlistIds).length

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: luxuryEase }}
        className="sticky top-0 z-40 border-b border-border/80 bg-charcoal/90 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-cream lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <IconMenu />
          </button>

          <Link to="/" className="group flex items-center gap-3" aria-label="Aurelo home">
            <motion.img
              src="/logo.png"
              alt="Aurelo"
              className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <span className="hidden font-display text-lg tracking-[0.25em] text-cream sm:block">
              AURELO
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-muted hover:text-cream'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              to="/wishlist"
              className="relative text-cream transition-colors hover:text-gold"
              aria-label="Wishlist"
            >
              <IconHeart />
              <AnimatePresence>
                {wishlistCount > 0 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-gold text-[9px] font-bold text-charcoal"
                  >
                    {wishlistCount}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </Link>
            <Link
              to="/cart"
              className="relative text-cream transition-colors hover:text-gold"
              aria-label="Cart"
            >
              <IconBag />
              <AnimatePresence>
                {count > 0 ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-gold text-[9px] font-bold text-charcoal"
                  >
                    {count}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </Link>
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="text-cream transition-colors hover:text-gold"
              aria-label="Account"
            >
              <IconUser />
            </Link>
            {isAdmin ? (
              <Link
                to="/admin"
                className="hidden text-[10px] uppercase tracking-widest text-gold sm:block"
              >
                Admin
              </Link>
            ) : null}
          </div>
        </div>
      </motion.header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu" side="left">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <img src="/logo.png" alt="Aurelo" className="h-11 w-11 rounded-full object-cover" />
          <span className="font-display text-base tracking-[0.25em] text-cream">AURELO</span>
        </div>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NavLink
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                className="block py-2 font-display text-lg tracking-wider text-cream hover:text-gold"
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
          <Link
            to="/account"
            onClick={() => setDrawerOpen(false)}
            className="py-2 text-muted hover:text-gold"
          >
            Account
          </Link>
        </nav>
      </Drawer>
    </>
  )
}
