import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'motion/react';
import { Calendar, Sparkles, ShieldCheck, ArrowDown, Building2, Stethoscope, Star, CheckCircle2, Clock } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeFacilityView, setActiveFacilityView] = useState<'campus' | 'clinic'>('campus');

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const cardMoveX = useTransform(springX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-12, 12]);
  const cardMoveY = useTransform(springY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-8, 8]);
  const floatBadgeX = useTransform(springX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [14, -14]);
  const floatBadgeY = useTransform(springY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92svh] sm:min-h-[100svh] w-full bg-[#F8F6F0] overflow-hidden flex flex-col justify-between pt-16 sm:pt-24 pb-6 sm:pb-10"
    >
      {/* Background Animated Floating Optical Bokeh Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -right-10 w-[450px] sm:w-[750px] h-[450px] sm:h-[750px] rounded-full bg-gradient-to-br from-[#45AC8B]/20 via-[#D1ECE2]/30 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 -left-10 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#E8D9C7]/40 via-[#E9F6F1]/50 to-transparent blur-2xl"
        />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Minimal, Punchy Typography & Controls */}
          <div className="w-full lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6 order-1">
            
            {/* Minimal Kicker with animated glowing pulse */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#45AC8B] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#45AC8B] animate-ping" />
              <span>Ophthalmic Institute</span>
              <span aria-hidden="true" className="text-[#16382C]/30">/</span>
              <span>Precision Care</span>
            </motion.div>

            {/* Oversized Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-[#16382C] tracking-tight leading-[1.08] font-display text-balance">
                SEE LIFE WITH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16382C] via-[#45AC8B] to-[#16382C] animate-pulse [animation-duration:4s]">
                  PURE CLARITY.
                </span>
              </h1>
            </motion.div>

            {/* Punchy 1-line statement (Clean & Minimal) */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-base text-[#16382C]/75 leading-relaxed max-w-md font-normal"
            >
              Sub-micron laser precision, world-renowned eye specialists, and painless same-day vision restoration.
            </motion.p>

            {/* Hospital Feature Pill Dock */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden sm:block p-3 bg-white/80 backdrop-blur-md border border-[#16382C]/10 rounded-2xl shadow-sm space-y-2.5 max-w-md"
            >
              <div className="flex items-center justify-between text-xs text-[#16382C]/70 font-semibold px-1">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#45AC8B]" />
                  <span>Campus & Diagnostics Wing</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-bold bg-[#45AC8B]/20 text-[#16382C]">
                  <Clock className="w-3 h-3 text-[#45AC8B]" />
                  <span>Open 24/7</span>
                </span>
              </div>

              {/* View Selector between Hospital Exterior & Interior Clinic */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveFacilityView('campus')}
                  className={`py-2 px-2 text-xs rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    activeFacilityView === 'campus'
                      ? 'bg-[#16382C] text-white shadow-xs'
                      : 'bg-[#F8F6F0] text-[#16382C]/80 hover:bg-[#E9F6F1]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Hospital Building</span>
                </button>
                <button
                  onClick={() => setActiveFacilityView('clinic')}
                  className={`py-2 px-2 text-xs rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    activeFacilityView === 'clinic'
                      ? 'bg-[#16382C] text-white shadow-xs'
                      : 'bg-[#F8F6F0] text-[#16382C]/80 hover:bg-[#E9F6F1]'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Clinic & Slit-Lamp</span>
                </button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 pt-1"
            >
              <button
                onClick={onOpenBooking}
                className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#16382C] hover:bg-[#1D4738] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] group"
              >
                <Calendar className="w-4 h-4 text-[#45AC8B] group-hover:scale-125 transition-transform" />
                <span>Book Appointment</span>
              </button>

              <a
                href="#welcome"
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#16382C] bg-white border border-[#16382C]/15 rounded-xl hover:bg-[#E9F6F1] transition-colors"
              >
                Explore Facilities
              </a>
            </motion.div>

          </div>

          {/* Right Column: Modern Eye Hospital Showcase */}
          <div className="w-full lg:col-span-7 flex justify-center items-center relative py-4 sm:py-6 order-2">
            
            {/* Background Layered Big Text "SEE BEYOND" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.05]">
              <span className="text-[5.5rem] sm:text-[8rem] lg:text-[10rem] font-extrabold tracking-tighter text-[#16382C] font-display whitespace-nowrap">
                EYE CARE
              </span>
            </div>

            {/* Main Interactive Hospital Showcase Card */}
            <motion.div
              style={{ x: cardMoveX, y: cardMoveY }}
              className="relative w-full max-w-[540px] rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/90 via-white/70 to-white/95 backdrop-blur-md border border-[#16382C]/10 shadow-[0_25px_60px_-15px_rgba(23,50,77,0.22)] group"
            >
              {/* Primary Image Container with Smooth Fade Transitions */}
              <div className="relative w-full h-[280px] xs:h-[330px] sm:h-[400px] md:h-[430px] rounded-2xl overflow-hidden bg-neutral-900 shadow-inner">
                <AnimatePresence mode="wait">
                  {activeFacilityView === 'campus' ? (
                    <motion.div
                      key="campus"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={IMAGES.hospitalBuilding}
                        alt="Aravind Eye Hospital Building & Vision Care Center"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16382C]/85 via-transparent to-[#16382C]/25" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="clinic"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={IMAGES.hospitalClinic}
                        alt="Eye Hospital Diagnostic Examination Suite"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16382C]/85 via-transparent to-[#16382C]/25" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Overlay Badge inside Image */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="px-3 py-1.5 rounded-full bg-[#16382C]/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#45AC8B] animate-pulse" />
                    <span>{activeFacilityView === 'campus' ? 'Tertiary Eye Hospital Campus' : 'Biomicroscopy & Retinal Suite'}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#16382C] text-[10px] font-bold tracking-wider uppercase shadow-xs">
                    {activeFacilityView === 'campus' ? 'Building Tour' : 'Diagnostic Wing'}
                  </span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-xl bg-[#16382C]/85 backdrop-blur-md border border-white/15 text-white z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold font-display text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#45AC8B]" />
                        <span>{activeFacilityView === 'campus' ? 'Eye Hospital & Vision Institute' : 'Consultant Ophthalmology Clinic'}</span>
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/75 mt-0.5 line-clamp-1">
                        {activeFacilityView === 'campus'
                          ? 'Advanced Surgical Theatres · Cornea, Retina & Refractive Wings'
                          : 'High-Resolution Slit Lamp & Anterior Segment Analysis Room'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphism Badge 1: Top Right */}
              <motion.div
                style={{ x: floatBadgeX, y: floatBadgeY }}
                className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#16382C]/10 shadow-xl flex items-center gap-2.5 z-20 pointer-events-none"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E9F6F1] border border-[#45AC8B]/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#16382C]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#16382C]">
                    <span>NABH Certified</span>
                    <CheckCircle2 className="w-3 h-3 text-[#45AC8B]" />
                  </div>
                  <span className="text-[10px] text-[#16382C]/60 block">Tertiary Eye Hospital</span>
                </div>
              </motion.div>

              {/* Floating Glassmorphism Badge 2: Bottom Left */}
              <motion.div
                style={{ x: cardMoveX, y: cardMoveY }}
                className="hidden sm:flex absolute -bottom-3 sm:-bottom-5 -left-2 sm:-left-4 p-2.5 sm:p-3 rounded-2xl bg-[#16382C] text-white shadow-xl border border-white/10 items-center gap-3 z-20 pointer-events-none"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#45AC8B]/20 flex items-center justify-center shrink-0">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#45AC8B] fill-[#45AC8B]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <span>4.9 / 5 Rating</span>
                    <span className="text-[#45AC8B]">★★★★★</span>
                  </div>
                  <span className="text-[10px] text-white/70 block">50,000+ Successful Surgeries</span>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>

      {/* Bottom KPI Bar - Clean & Minimal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-6 sm:pt-8">
        <div className="border-t border-[#16382C]/10 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 w-full md:w-auto">
            {HOSPITAL_INFO.stats.map((stat, i) => (
              <div key={i} className={`flex flex-col ${i >= 2 ? 'hidden sm:flex' : ''}`}>
                <span className="text-lg sm:text-2xl font-bold text-[#16382C] font-display tabular-nums">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="text-[11px] sm:text-xs text-[#16382C]/60 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#welcome"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16382C]/70 hover:text-[#16382C] transition-colors group shrink-0"
          >
            <span>Learn More</span>
            <div className="w-7 h-7 rounded-full border border-[#16382C]/20 flex items-center justify-center group-hover:border-[#45AC8B] transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#16382C] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
