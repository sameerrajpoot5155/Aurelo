import type { Transition, Variants } from 'framer-motion'

export const luxuryEase = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: luxuryEase,
}

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 24px rgb(0 0 0 / 0.5)' },
  hover: {
    y: -6,
    boxShadow: '0 12px 48px rgb(0 0 0 / 0.6), 0 0 40px rgb(201 169 110 / 0.08)',
    transition: { duration: 0.35, ease: luxuryEase },
  },
}
