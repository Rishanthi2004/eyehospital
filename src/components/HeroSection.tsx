import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Calendar, Eye, Sparkles, ShieldCheck, Scan, Play, Pause, Zap, ArrowDown } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringEye, setIsHoveringEye] = useState(false);
  const [pupilMode, setPupilMode] = useState<'normal' | 'dilated' | 'constricted'>('normal');
  const [isLaserScanning, setIsLaserScanning] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<'slow' | 'fast'>('slow');

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 20 });

  const irisMoveX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const irisMoveY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  const pupilMoveX = useTransform(springX, [-0.5, 0.5], [-36, 36]);
  const pupilMoveY = useTransform(springY, [-0.5, 0.5], [-26, 26]);

  const macroEyeX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const macroEyeY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const lightGleamX = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const lightGleamY = useTransform(springY, [-0.5, 0.5], [-32, 32]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHoveringEye(false);
  };

  const activePupilScale =
    pupilMode === 'dilated'
      ? 1.5
      : pupilMode === 'constricted'
      ? 0.7
      : isHoveringEye
      ? 1.3
      : 1.0;

  return (
    <section
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
          className="absolute -top-10 -right-10 w-[450px] sm:w-[750px] h-[450px] sm:h-[750px] rounded-full bg-gradient-to-br from-[#72B7BC]/20 via-[#CDE7E4]/30 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 -left-10 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#E8D9C7]/40 via-[#E7F2F8]/50 to-transparent blur-2xl"
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
              className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#72B7BC] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#72B7BC] animate-ping" />
              <span>Ophthalmic Institute</span>
              <span aria-hidden="true" className="text-[#17324D]/30">/</span>
              <span>Precision Care</span>
            </motion.div>

            {/* Oversized Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-[#17324D] tracking-tight leading-[1.08] font-display text-balance">
                SEE LIFE WITH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17324D] via-[#72B7BC] to-[#17324D] animate-pulse [animation-duration:4s]">
                  PURE CLARITY.
                </span>
              </h1>
            </motion.div>

            {/* Punchy 1-line statement (Clean & Minimal) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-[#17324D]/75 leading-relaxed max-w-md font-normal"
            >
              Sub-micron laser precision, world-renowned eye specialists, and painless same-day vision restoration.
            </motion.p>

            {/* Interactive Eye Control Dock (Highly Animated) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-3 bg-white/80 backdrop-blur-md border border-[#17324D]/10 rounded-2xl shadow-sm space-y-2.5 max-w-md"
            >
              <div className="flex items-center justify-between text-xs text-[#17324D]/70 font-semibold px-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#72B7BC]" />
                  <span>Interactive Eye Optics</span>
                </span>
                <button
                  onClick={() => setIsLaserScanning(!isLaserScanning)}
                  className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-bold transition-all ${
                    isLaserScanning
                      ? 'bg-[#72B7BC]/20 text-[#17324D]'
                      : 'bg-neutral-100 text-[#17324D]/50'
                  }`}
                >
                  <Scan className="w-3 h-3 text-[#72B7BC]" />
                  <span>{isLaserScanning ? 'Laser: Active' : 'Laser: Off'}</span>
                </button>
              </div>

              {/* 3 Pupil Reaction Modes */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setPupilMode('constricted')}
                  className={`py-2 px-1 text-xs rounded-xl font-semibold transition-all ${
                    pupilMode === 'constricted'
                      ? 'bg-[#17324D] text-white shadow-xs'
                      : 'bg-[#F8F6F0] text-[#17324D]/80 hover:bg-[#E7F2F8]'
                  }`}
                >
                  Bright Light
                </button>
                <button
                  onClick={() => setPupilMode('normal')}
                  className={`py-2 px-1 text-xs rounded-xl font-semibold transition-all ${
                    pupilMode === 'normal'
                      ? 'bg-[#17324D] text-white shadow-xs'
                      : 'bg-[#F8F6F0] text-[#17324D]/80 hover:bg-[#E7F2F8]'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setPupilMode('dilated')}
                  className={`py-2 px-1 text-xs rounded-xl font-semibold transition-all ${
                    pupilMode === 'dilated'
                      ? 'bg-[#17324D] text-white shadow-xs'
                      : 'bg-[#F8F6F0] text-[#17324D]/80 hover:bg-[#E7F2F8]'
                  }`}
                >
                  Dilated
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
                className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#17324D] hover:bg-[#1a3957] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] group"
              >
                <Calendar className="w-4 h-4 text-[#72B7BC] group-hover:scale-125 transition-transform" />
                <span>Book Appointment</span>
              </button>

              <a
                href="#anatomy"
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#17324D] bg-white border border-[#17324D]/15 rounded-xl hover:bg-[#E7F2F8] transition-colors"
              >
                Explore 3D Eye
              </a>
            </motion.div>

          </div>

          {/* Right Column: Giant Animated Human Eye & Laser Scan System */}
          <div className="w-full lg:col-span-7 flex justify-center items-center relative py-2 sm:py-6 order-2">
            
            {/* Background Layered Big Text "SEE BEYOND" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-[0.06]">
              <span className="text-[6rem] sm:text-[9rem] lg:text-[11rem] font-extrabold tracking-tighter text-[#17324D] font-display whitespace-nowrap">
                SEE BEYOND
              </span>
            </div>

            {/* Eye Frame Assembly */}
            <div
              onMouseEnter={() => setIsHoveringEye(true)}
              onMouseLeave={() => setIsHoveringEye(false)}
              className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] rounded-full flex items-center justify-center cursor-pointer sm:cursor-crosshair group select-none"
            >
              {/* Outer Golden Concentric Radar Rings with Animated Pulse */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-[#72B7BC]/30 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 sm:inset-5 rounded-full border border-dashed border-[#17324D]/20 pointer-events-none"
              />

              {/* Pulsing Concentric Sonar Wave */}
              <div className="absolute inset-0 rounded-full border border-[#72B7BC]/20 animate-ping [animation-duration:4s] pointer-events-none" />

              {/* Macro Human Eye Photo Frame */}
              <motion.div
                style={{ x: macroEyeX, y: macroEyeY }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-2 sm:inset-4 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(23,50,77,0.25)] border-2 sm:border-4 border-white bg-white"
              >
                <img
                  src={IMAGES.heroMacroEye}
                  alt="Human eye close-up"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-radial from-transparent via-[#F8F6F0]/5 to-[#17324D]/25 pointer-events-none" />

                {/* Live Laser Scanning Sweep Line (Futuristic Ophthalmic OCT Laser) */}
                {isLaserScanning && (
                  <motion.div
                    animate={{
                      top: ['-10%', '110%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#72B7BC] to-transparent shadow-[0_0_15px_#72B7BC,0_0_30px_#72B7BC] pointer-events-none z-30"
                  >
                    <div className="w-2 h-2 rounded-full bg-white mx-auto -mt-0.5 shadow-[0_0_8px_#ffffff]" />
                  </motion.div>
                )}
              </motion.div>

              {/* Central Giant Circular Iris Layer (With rotation & parallax) */}
              <motion.div
                style={{ x: irisMoveX, y: irisMoveY }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.15 }}
                className="relative w-[160px] h-[160px] xs:w-[185px] xs:h-[185px] sm:w-[260px] sm:h-[260px] md:w-[290px] md:h-[290px] rounded-full overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.7),0_10px_35px_rgba(23,50,77,0.35)] border-2 border-white z-20"
              >
                {/* Rotating Iris Stroma Image */}
                <motion.div
                  className={`absolute inset-[-10%] w-[120%] h-[120%] ${
                    rotationSpeed === 'fast' ? 'animate-spin [animation-duration:30s]' : 'animate-iris-spin'
                  }`}
                >
                  <img
                    src={IMAGES.circularIris}
                    alt="Iris fibers"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full filter saturate-[1.2]"
                  />
                </motion.div>

                {/* Central Dynamic Pupil */}
                <motion.div
                  style={{ x: pupilMoveX, y: pupilMoveY }}
                  animate={{ scale: activePupilScale }}
                  transition={{ type: 'spring', stiffness: 140, damping: 14 }}
                  className="absolute inset-0 m-auto w-[52px] h-[52px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] rounded-full bg-[#050B11] shadow-[inset_0_0_18px_rgba(0,0,0,0.95),0_0_24px_rgba(5,11,17,0.9)] z-30 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-full h-full rounded-full border border-neutral-900/50" />
                </motion.div>

                {/* Moving Specular Corneal Catchlight */}
                <motion.div
                  style={{ x: lightGleamX, y: lightGleamY }}
                  className="absolute top-1/4 left-1/4 w-9 h-6 sm:w-16 sm:h-11 rounded-[60%] bg-gradient-to-br from-white via-white/80 to-transparent blur-[1px] rotate-[-25deg] pointer-events-none z-40 opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                />

                <div className="absolute bottom-5 right-7 w-4 h-3 sm:w-8 sm:h-6 rounded-full bg-white/30 blur-[1px] pointer-events-none z-40" />
              </motion.div>

              {/* Floating Live Telemetry Badge */}
              <div className="absolute -bottom-3 sm:bottom-3 left-1/2 -translate-x-1/2 bg-[#17324D]/95 text-white text-[11px] px-3.5 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2 z-40 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#72B7BC] animate-pulse" />
                <span>Interactive Iris · Hover / Tap to trigger reflex</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom KPI Bar - Clean & Minimal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-6 sm:pt-8">
        <div className="border-t border-[#17324D]/10 pt-4 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 w-full md:w-auto">
            {HOSPITAL_INFO.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-[#17324D] font-display tabular-nums">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="text-[11px] sm:text-xs text-[#17324D]/60 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#welcome"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#17324D]/70 hover:text-[#17324D] transition-colors group shrink-0"
          >
            <span>Learn More</span>
            <div className="w-7 h-7 rounded-full border border-[#17324D]/20 flex items-center justify-center group-hover:border-[#72B7BC] transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#17324D] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
