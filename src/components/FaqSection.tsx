import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Phone } from 'lucide-react';
import { FAQ_ITEMS, HOSPITAL_INFO } from '../data/hospitalData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Take top 4 most practical FAQs for clean presentation
  const trimmedFaqs = FAQ_ITEMS.slice(0, 4);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#17324D]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
            <span>Patient FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Common Questions
          </h2>
        </div>

        {/* Clean Accordion */}
        <div className="space-y-3">
          {trimmedFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#17324D]/10 bg-[#F8F6F0] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#17324D] font-display">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#17324D]/10 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#17324D] text-white' : 'text-[#17324D]'
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
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#17324D]/75 leading-relaxed border-t border-[#17324D]/5 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Minimal Emergency Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#E7F2F8]/70 border border-[#72B7BC]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#17324D] font-medium text-center sm:text-left">
            Experiencing sudden vision loss or flashes? Our on-call trauma surgeon answers 24/7.
          </span>
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
            className="px-4 py-2 font-bold uppercase tracking-wider text-white bg-[#17324D] hover:bg-[#1a3957] rounded-lg transition-colors whitespace-nowrap"
          >
            Call {HOSPITAL_INFO.emergencyPhone}
          </a>
        </div>

      </div>
    </section>
  );
};
