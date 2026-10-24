import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Check, Eye, Scan, Sparkles } from 'lucide-react';
import { TECH_LIST, TechItem } from '../data/hospitalData';
import { IMAGES } from '../assets/images';

export const TechnologySection: React.FC = () => {
  const [activeTech, setActiveTech] = useState<TechItem>(TECH_LIST[0]);
  const [isLaserFiring, setIsLaserFiring] = useState(true);

  return (
    <section id="technology" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#17324D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Minimal Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
            <span>Surgical Suite</span>
            <span aria-hidden="true">·</span>
            <span>Laser Robotics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Precision Diagnostic Technology
          </h2>
          <p className="mt-1 text-xs sm:text-base text-[#17324D]/75">
            Non-invasive optical imaging platforms calibrated to sub-micron accuracy.
          </p>
        </div>

        {/* Visual Animated Laser Suite Showcase Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#17324D]/10 bg-[#17324D] mb-8 group">
          <div className="relative h-[260px] sm:h-[380px] lg:h-[420px] w-full">
            <img
              src={IMAGES.laserTech}
              alt="Laser surgical suite"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.93] group-hover:scale-102 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/90 via-[#17324D]/35 to-transparent" />

            {/* Live Animated Laser Scanning Grid Line across the image */}
            {isLaserFiring && (
              <motion.div
                animate={{
                  left: ['-5%', '105%'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-[#72B7BC] to-transparent shadow-[0_0_20px_#72B7BC,0_0_40px_#72B7BC] pointer-events-none z-20"
              />
            )}

            {/* Sleek Floating Technical Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-md p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-[#17324D]/10 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-[#72B7BC] mb-1">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{activeTech.manufacturer}</span>
                </span>
                <span className="text-[#17324D] font-mono tabular-nums">{activeTech.accuracy}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#17324D] font-display">
                {activeTech.name}
              </h3>
              <p className="text-xs text-[#17324D]/75 mt-1 leading-relaxed">
                {activeTech.benefit}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Clickable Interactive Tech Tabs (Minimal text, max interactivity) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TECH_LIST.map((item) => {
            const isSelected = activeTech.id === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTech(item);
                  setIsLaserFiring(true);
                }}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#17324D] text-white border-[#17324D] shadow-md -translate-y-0.5'
                    : 'bg-[#F8F6F0] text-[#17324D] border-[#17324D]/10 hover:border-[#72B7BC]'
                }`}
              >
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isSelected ? 'text-[#72B7BC]' : 'text-[#72B7BC]'
                  }`}>
                    {item.manufacturer.split(' ')[0]}
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-display line-clamp-1">
                    {item.name.split('(')[0]}
                  </div>
                </div>

                <div className={`mt-2 pt-2 border-t text-[11px] font-medium flex items-center justify-between ${
                  isSelected ? 'border-white/10 text-white/80' : 'border-[#17324D]/5 text-[#17324D]/60'
                }`}>
                  <span className="truncate">{item.accuracy}</span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#72B7BC] animate-ping' : 'bg-neutral-300'}`} />
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
