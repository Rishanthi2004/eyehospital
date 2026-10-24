import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartHandshake, Microscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const ClinicalHighlightsSection: React.FC = () => {
  const highlights = [
    { icon: Microscope, title: 'Zero-Radiation Imaging', desc: '100% safe optical infrared light waves.' },
    { icon: Award, title: 'Fellowship Faculty', desc: 'Trained at Moorfields, Wilmer & Bascom Palmer.' },
    { icon: ShieldCheck, title: 'Laminar Cleanrooms', desc: 'Positive-pressure micro-filtered surgical suites.' },
    { icon: HeartHandshake, title: 'Personal Coordinators', desc: 'Dedicated nurse guidance from prep to recovery.' }
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
            <span>Clinical Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Why Patients Choose Oculus.
          </h2>
        </div>

        {/* 4 Quantitative Rigor Blocks with hover lift */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {HOSPITAL_INFO.stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-[#17324D]/10 shadow-xs flex flex-col justify-between"
            >
              <span className="text-2xl sm:text-4xl font-extrabold text-[#17324D] font-display tabular-nums tracking-tight mb-1">
                {stat.value.toLocaleString()}{stat.suffix}
              </span>
              <span className="text-xs text-[#17324D]/80 font-medium">
                {stat.label}
              </span>
              <div className="mt-3 pt-2.5 border-t border-[#17324D]/5 flex items-center gap-1.5 text-[10px] text-[#72B7BC] font-semibold">
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
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-xl border border-[#17324D]/10 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E7F2F8] flex items-center justify-center shrink-0 text-[#72B7BC]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#17324D] font-display">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#17324D]/70 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
