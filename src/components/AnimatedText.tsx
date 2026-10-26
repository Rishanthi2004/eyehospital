import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PREMIUM_EASE } from '../utils/motionVariants';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.035,
  once = false,
  amount = 0.2,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = Component as any;
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(/\s+/).filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: PREMIUM_EASE,
      },
    },
  };

  const MotionComponent = (motion as any)[Component] || motion.span;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '-20px 0px -20px 0px' }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionComponent>
  );
};
