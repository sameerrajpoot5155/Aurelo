import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui'
import { fadeUp } from '@/shared/animations/motion'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <p className="font-display text-8xl text-gold/30">404</p>
        <h1 className="mt-4 font-display text-3xl tracking-wider">Page not found</h1>
        <p className="mt-2 max-w-md text-muted">
          This piece may have sold out or moved to a private collection.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="outline">Return home</Button>
        </Link>
      </motion.div>
    </div>
  )
}
