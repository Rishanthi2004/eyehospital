import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, Phone, MapPin, Mail } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { IMAGES } from '../assets/images';
import { getSectionEntrance, getHeaderEntrance } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

interface FinalCtaSectionProps {
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-[#F8F6F0] via-[#E9F6F1]/70 to-[#D1ECE2]/40 relative overflow-hidden">
      
      {/* Background Hospital Architectural Backdrop */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 0.25, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="absolute -right-10 sm:-right-16 top-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[280px] sm:h-[440px] rounded-3xl pointer-events-none opacity-20 sm:opacity-25 select-none overflow-hidden shadow-2xl rotate-2 sm:rotate-3 border-2 border-[#16382C]/10"
      >
        <img
          src={IMAGES.hospitalBuilding}
          alt="Eye hospital building background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F8F6F0]/30 to-[#F8F6F0]" />
      </motion.div>

      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-2">
            <span>Preserve Your Sight</span>
          </div>

          <AnimatedText
            text="Your Vision Matters. Let’s Care for It Together."
            as="h2"
            className="text-3xl sm:text-5xl font-extrabold text-[#16382C] tracking-tight font-display leading-[1.08] text-balance"
          />

          <AnimatedText
            text="Schedule an in-depth consultation or second opinion with our consultant ophthalmologists."
            as="p"
            delay={0.15}
            className="mt-3 text-sm sm:text-base text-[#16382C]/75 leading-relaxed max-w-lg"
          />

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#16382C] hover:bg-[#1D4738] rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#45AC8B]" />
              <span>Book Appointment</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.mainPhone}`}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#16382C] bg-white hover:bg-[#F8F6F0] border border-[#16382C]/15 rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-[#45AC8B]" />
              <span className="tabular-nums">{HOSPITAL_INFO.mainPhone}</span>
            </a>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
};
