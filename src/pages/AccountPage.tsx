import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/shared/hooks/useAuth'
import { Button, Input, Breadcrumb } from '@/shared/ui'
import { fadeUp } from '@/shared/animations/motion'

const tabs = [
  { to: '/account', label: 'Profile', end: true },
  { to: '/account/orders', label: 'Orders' },
]

export default function AccountPage() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isOrders = location.pathname.includes('/orders')
  const [name, setName] = useState(user?.name ?? '')

  if (!user) return null

  if (isOrders) return <Outlet />

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
      <h1 className="mt-6 font-display text-4xl tracking-wider">Account</h1>

      <nav className="mt-8 flex gap-4 border-b border-border">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `pb-3 text-xs uppercase tracking-widest transition-colors ${
                isActive ? 'border-b-2 border-gold text-gold' : 'text-muted hover:text-cream'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-10 space-y-6">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" value={user.email} disabled />
        <div className="border border-border p-4">
          <h3 className="text-xs uppercase tracking-widest text-gold">Saved addresses (mock)</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {user.addresses.map((a) => (
              <li key={a.id}>
                <strong className="text-cream">{a.label}</strong> — {a.street}, {a.city}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => logout()}>
            Sign out
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
