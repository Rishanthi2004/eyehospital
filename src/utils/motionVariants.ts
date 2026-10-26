/**
 * Centralized Motion Variants & Easing Curves
 * Designed for lightweight, hardware-accelerated, premium micro-animations
 * Supports repeating animations when scrolling into view (once: false)
 * and reduced-motion accessibility settings.
 */

// Premium easing curve (smooth deceleration)
export const PREMIUM_EASE = [0.22, 1, 0.36, 1];

export const getSectionEntrance = (shouldReduceMotion: boolean | null) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0 },
      viewport: { once: false },
    };
  }

  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: PREMIUM_EASE },
    viewport: { once: false, amount: 0.12 },
  };
};

export const getHeaderEntrance = (shouldReduceMotion: boolean | null, delay = 0) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0 },
      viewport: { once: false },
    };
  }

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: PREMIUM_EASE },
    viewport: { once: false, amount: 0.15 },
  };
};

export const getStaggerContainer = (shouldReduceMotion: boolean | null, stagger = 0.08) => {
  if (shouldReduceMotion) {
    return {
      initial: {},
      whileInView: {},
      viewport: { once: false },
    };
  }

  return {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
    viewport: { once: false, amount: 0.1 },
  };
};

export const getItemReveal = (shouldReduceMotion: boolean | null, customY = 24) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: customY },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: PREMIUM_EASE },
    },
    viewport: { once: false },
  };
};

export const getImageEntrance = (shouldReduceMotion: boolean | null, delay = 0.15) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, scale: 1 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0 },
      viewport: { once: false },
    };
  }

  return {
    initial: { opacity: 0, scale: 0.97, y: 16 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: PREMIUM_EASE },
    viewport: { once: false, amount: 0.15 },
  };
};
