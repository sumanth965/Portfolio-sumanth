export const sectionViewport = { once: true, amount: 0.2 }

export const sectionFadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: sectionViewport,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren,
      delayChildren,
    },
  },
  viewport: sectionViewport,
})

export const staggerItem = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}
