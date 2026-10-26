import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown, Phone } from 'lucide-react';
import { FAQ_ITEMS, HOSPITAL_INFO } from '../data/hospitalData';
import { getSectionEntrance, getHeaderEntrance, getItemReveal } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

export const FaqSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Take top 4 most practical FAQs for clean presentation
  const trimmedFaqs = FAQ_ITEMS.slice(0, 4);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#16382C]/5">
      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Simple Header */}
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="text-center max-w-xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-1.5">
            <span>Patient FAQs</span>
          </div>
          <AnimatedText
            text="Common Questions"
            as="h2"
            className="text-2xl sm:text-4xl font-extrabold text-[#16382C] tracking-tight font-display text-balance"
          />
        </motion.div>

        {/* Clean Accordion */}
        <div className="space-y-3">
          {trimmedFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                {...getItemReveal(shouldReduceMotion, 14)}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.06 }}
                className={`rounded-xl border border-[#16382C]/10 bg-[#F8F6F0] overflow-hidden transition-all ${
                  idx >= 3 ? 'hidden sm:block' : 'block'
                }`}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#16382C] font-display">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#16382C]/10 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#16382C] text-white' : 'text-[#16382C]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#16382C]/75 leading-relaxed border-t border-[#16382C]/5 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal Emergency Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#E9F6F1]/70 border border-[#45AC8B]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#16382C] font-medium text-center sm:text-left">
            Experiencing sudden vision loss or flashes? Our on-call trauma surgeon answers 24/7.
          </span>
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
            className="px-4 py-2 font-bold uppercase tracking-wider text-white bg-[#16382C] hover:bg-[#1D4738] rounded-lg transition-colors whitespace-nowrap"
          >
            Call {HOSPITAL_INFO.emergencyPhone}
          </a>
        </div>

      </motion.div>
    </section>
  );
};
