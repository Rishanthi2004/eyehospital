import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Shield, Eye, Zap, Clock } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const WelcomeSection: React.FC = () => {
  const metrics = [
    { icon: Zap, title: 'Sub-Micron Precision', desc: 'Femtosecond laser guidance accurate to < 1 micron.' },
    { icon: Clock, title: 'Painless 15-Min Care', desc: 'Gentle outpatient procedures with next-day recovery.' },
    { icon: Shield, title: 'Zero-Radiation Imaging', desc: '100% safe optical coherence tomography.' },
  ];

  return (
    <section id="welcome" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#17324D]/5">
      {/* Decorative ambient background rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#CDE7E4]/50 pointer-events-none -mr-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simple & Punchy Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-2">
            <span>Clinical Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1992</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Where Science Restores Natural Sight.
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#17324D]/75">
            Combining internationally fellowship-trained surgeons with advanced non-invasive laser diagnostics.
          </p>
        </div>

        {/* Split Screen: Minimalist & Animated */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Photographic Display with subtle floating movement */}
          <div className="lg:col-span-6 relative">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#17324D]/10 bg-[#F8F6F0]"
            >
              <img
                src={IMAGES.doctorExam}
                alt="Ophthalmologist examining patient"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[420px] object-cover object-center filter contrast-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/70 via-transparent to-transparent pointer-events-none" />

              {/* Minimal floating live label */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 rounded-xl bg-white/92 backdrop-blur-md border border-[#17324D]/10 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#17324D] block font-display">Slit-Lamp Biomicroscopy Suite</span>
                  <span className="text-[11px] text-[#17324D]/70">High-definition anterior segment analysis</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#72B7BC] animate-ping shrink-0" />
              </div>
            </motion.div>

            {/* Rotating Iris Stamp Badge */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full p-1 bg-white shadow-xl border border-[#72B7BC]/30 hidden sm:block animate-iris-spin">
              <img
                src={IMAGES.circularIris}
                alt="Iris emblem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Right: 3 Minimalist Value Cards with Hover Animation */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
            {metrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F8F6F0] border border-[#17324D]/5 hover:border-[#72B7BC]/60 hover:bg-white hover:shadow-md transition-all flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7F2F8] flex items-center justify-center shrink-0 text-[#72B7BC]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#17324D] font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#17324D]/70 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Quick 1-line consultation promise */}
            <div className="pt-2 text-xs text-[#17324D]/60 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#72B7BC] shrink-0" />
              <span>Full 45-minute unhurried specialist consultation for every patient</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
