import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui'
import { fadeUp } from '@/shared/animations/motion'

export default function ErrorPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <p className="font-display text-8xl text-danger/40">500</p>
        <h1 className="mt-4 font-display text-3xl tracking-wider">Something went wrong</h1>
        <p className="mt-2 max-w-md text-muted">
          Our atelier is fixing the issue. Please try again shortly.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="outline">Return home</Button>
        </Link>
      </motion.div>
    </div>
  )
}
