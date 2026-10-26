import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, CheckCircle2, Shield, Eye, Zap, Clock, Building2 } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { getSectionEntrance, getHeaderEntrance, getImageEntrance, getItemReveal } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

export const WelcomeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    { icon: Zap, title: 'Sub-Micron Precision', desc: 'Femtosecond laser guidance accurate to < 1 micron.' },
    { icon: Clock, title: 'Painless 15-Min Care', desc: 'Gentle outpatient procedures with next-day recovery.' },
    { icon: Shield, title: 'Zero-Radiation Imaging', desc: '100% safe optical coherence tomography.' },
  ];

  return (
    <section id="welcome" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#16382C]/5">
      {/* Decorative ambient background rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#D1ECE2]/50 pointer-events-none -mr-40" />
      
      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Simple & Punchy Header */}
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="max-w-2xl mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-2">
            <span>Clinical Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1992</span>
          </div>
          <AnimatedText
            text="Where Science Restores Natural Sight."
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16382C] tracking-tight font-display text-balance"
          />
          <AnimatedText
            text="Combining internationally fellowship-trained surgeons with advanced non-invasive laser diagnostics."
            as="p"
            delay={0.15}
            className="mt-2 text-xs sm:text-base text-[#16382C]/75"
          />
        </motion.div>

        {/* Split Screen: Minimalist & Animated */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Photographic Display with subtle floating movement */}
          <motion.div
            {...getImageEntrance(shouldReduceMotion, 0.1)}
            className="lg:col-span-6 relative"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#16382C]/10 bg-[#F8F6F0]"
            >
              <img
                src={IMAGES.doctorExam}
                alt="Ophthalmologist examining patient"
                referrerPolicy="no-referrer"
                className="w-full h-[200px] sm:h-[420px] object-cover object-center filter contrast-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#16382C]/70 via-transparent to-transparent pointer-events-none" />

              {/* Minimal floating live label */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 rounded-xl bg-white/92 backdrop-blur-md border border-[#16382C]/10 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#16382C] block font-display">Slit-Lamp Biomicroscopy Suite</span>
                  <span className="text-[11px] text-[#16382C]/70">High-definition anterior segment analysis</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#45AC8B] animate-ping shrink-0" />
              </div>
            </motion.div>

            {/* Hospital Accreditation Seal Badge */}
            <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full p-1 bg-white shadow-xl border border-[#45AC8B]/35 hidden sm:flex flex-col items-center justify-center text-center">
              <div className="w-full h-full rounded-full border border-dashed border-[#16382C]/25 flex flex-col items-center justify-center p-1 bg-[#F8F6F0]">
                <Building2 className="w-4 h-4 text-[#45AC8B]" />
                <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#16382C] leading-none mt-0.5">NABH</span>
                <span className="text-[7px] text-[#16382C]/60 font-semibold leading-none">CERTIFIED</span>
              </div>
            </div>
          </motion.div>

          {/* Right: 3 Minimalist Value Cards with Hover Animation */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
            {metrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  {...getItemReveal(shouldReduceMotion, 16)}
                  whileHover={shouldReduceMotion ? {} : { x: 6 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3.5 sm:p-5 rounded-2xl bg-[#F8F6F0] border border-[#16382C]/5 hover:border-[#45AC8B]/60 hover:bg-white hover:shadow-md transition-all items-start gap-3.5 sm:gap-4 cursor-pointer ${
                    idx >= 2 ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E9F6F1] flex items-center justify-center shrink-0 text-[#45AC8B]">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-base font-bold text-[#16382C] font-display">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#16382C]/70 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Quick 1-line consultation promise */}
            <div className="pt-2 text-xs text-[#16382C]/60 hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#45AC8B] shrink-0" />
              <span>Full 45-minute unhurried specialist consultation for every patient</span>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
