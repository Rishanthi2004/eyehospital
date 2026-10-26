import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Award, HeartHandshake, Microscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { getSectionEntrance, getHeaderEntrance, getItemReveal } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

export const ClinicalHighlightsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const highlights = [
    { icon: Microscope, title: 'Zero-Radiation Imaging', desc: '100% safe optical infrared light waves.' },
    { icon: Award, title: 'Fellowship Faculty', desc: 'Trained at Moorfields, Wilmer & Bascom Palmer.' },
    { icon: ShieldCheck, title: 'Laminar Cleanrooms', desc: 'Positive-pressure micro-filtered surgical suites.' },
    { icon: HeartHandshake, title: 'Personal Coordinators', desc: 'Dedicated nurse guidance from prep to recovery.' }
  ];

  return (
    <section id="highlights" className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Simple Header */}
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="text-center max-w-xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-1.5">
            <span>Clinical Rigor</span>
          </div>
          <AnimatedText
            text="Why Patients Choose Oculus."
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16382C] tracking-tight font-display text-balance"
          />
        </motion.div>

        {/* 4 Quantitative Rigor Blocks with hover lift */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {HOSPITAL_INFO.stats.map((stat, i) => (
            <motion.div
              key={i}
              {...getItemReveal(shouldReduceMotion, 20)}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.07 }}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-[#16382C]/10 shadow-xs flex flex-col justify-between"
            >
              <span className="text-2xl sm:text-4xl font-extrabold text-[#16382C] font-display tabular-nums tracking-tight mb-1">
                {stat.value.toLocaleString()}{stat.suffix}
              </span>
              <span className="text-xs text-[#16382C]/80 font-medium">
                {stat.label}
              </span>
              <div className="mt-3 pt-2.5 border-t border-[#16382C]/5 hidden sm:flex items-center gap-1.5 text-[10px] text-[#45AC8B] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Verified Quality Indicator</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Minimalist Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                {...getItemReveal(shouldReduceMotion, 16)}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.06 }}
                className={`bg-white p-3.5 sm:p-5 rounded-xl border border-[#16382C]/10 items-center gap-3.5 ${
                  idx >= 2 ? 'hidden sm:flex' : 'flex'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#E9F6F1] flex items-center justify-center shrink-0 text-[#45AC8B]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#16382C] font-display">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#16382C]/70 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};
