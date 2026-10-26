import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/hospitalData';
import { getSectionEntrance, getHeaderEntrance, getItemReveal } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

export const PatientReviewsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="reviews" className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Simple Header */}
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="max-w-xl mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-1.5">
            <span>Patient Outcomes</span>
          </div>
          <AnimatedText
            text="Real Stories of Restored Sight."
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16382C] tracking-tight font-display text-balance"
          />
        </motion.div>

        {/* Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              {...getItemReveal(shouldReduceMotion, 20)}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className={`bg-white rounded-2xl p-4 sm:p-6 border border-[#16382C]/10 shadow-xs hover:shadow-md transition-all justify-between flex-col ${
                idx >= 1 ? 'hidden md:flex' : 'flex'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#45AC8B]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#16382C]/10" />
                </div>

                <p className="text-xs sm:text-sm text-[#16382C]/80 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div>
                <div className="mb-3 p-2 rounded-lg bg-[#E9F6F1]/70 text-[11px] font-semibold text-[#16382C] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#45AC8B] shrink-0" />
                  <span className="truncate">{t.outcome}</span>
                </div>

                <div className="pt-3 border-t border-[#16382C]/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#16382C] font-display">
                    {t.patient}, {t.age}
                  </span>
                  <span className="text-[11px] text-[#45AC8B] font-semibold">
                    {t.surgeon.split(',')[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};
