import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, Stethoscope, Microscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { PATIENT_JOURNEY } from '../data/hospitalData';
import { getSectionEntrance, getHeaderEntrance, getItemReveal } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

interface PatientJourneySectionProps {
  onOpenBooking: () => void;
}

export const PatientJourneySection: React.FC<PatientJourneySectionProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();
  const stepIcons = [Calendar, Microscope, Stethoscope, CheckCircle2];

  return (
    <section id="journey" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#16382C]/5">
      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Simple & Minimal Header */}
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-1.5">
              <span>Patient Pathway</span>
              <span aria-hidden="true">·</span>
              <span>4 Simple Steps</span>
            </div>
            <AnimatedText
              text="Your Visit, Made Simple."
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16382C] tracking-tight font-display text-balance"
            />
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#16382C] hover:bg-[#1D4738] rounded-xl transition-all shadow-xs self-start sm:self-auto cursor-pointer"
          >
            Start Booking
          </button>
        </motion.div>

        {/* 4 Steps: Minimal, Animated & Crisp */}
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-[#45AC8B]/20 via-[#45AC8B] to-[#45AC8B]/20 z-0" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
            {PATIENT_JOURNEY.map((item, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={item.step}
                  {...getItemReveal(shouldReduceMotion, 22)}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  className="bg-[#F8F6F0] rounded-2xl p-3.5 sm:p-6 border border-[#16382C]/10 hover:border-[#45AC8B]/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white shadow-xs border border-[#16382C]/10 flex items-center justify-center group-hover:bg-[#45AC8B] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#45AC8B] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#16382C]/25 font-display tabular-nums group-hover:text-[#45AC8B]/60 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-base font-bold text-[#16382C] font-display mb-1 line-clamp-1 sm:line-clamp-none">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#16382C]/70 leading-relaxed hidden sm:block">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#16382C]/5 text-[10px] sm:text-[11px] text-[#45AC8B] font-semibold flex items-center gap-1">
                    <span className="truncate">{item.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </section>
  );
};
