import { Variants } from 'framer-motion';

export const motionConfig = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        when: 'beforeChildren',
      },
    },
  } as Variants,

  itemVariants: {
    hidden: { y: 8, opacity: 0 }, // Réduire le déplacement initial
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } as Variants,

  defaultViewport: {
    once: true,
    amount: 0.1,
  },
};
