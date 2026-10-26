import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, GraduationCap } from 'lucide-react';
import { DOCTORS_LIST } from '../data/hospitalData';
import { getSectionEntrance, getHeaderEntrance, getItemReveal } from '../utils/motionVariants';
import { AnimatedText } from './AnimatedText';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorForBooking }) => {
  const shouldReduceMotion = useReducedMotion();
  const [showAllDoctors, setShowAllDoctors] = React.useState(false);

  return (
    <section id="specialists" className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <motion.div
        {...getSectionEntrance(shouldReduceMotion)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Simple & Minimal Header */}
        <motion.div
          {...getHeaderEntrance(shouldReduceMotion)}
          className="max-w-xl mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#45AC8B] uppercase mb-1.5">
            <span>Faculty</span>
            <span aria-hidden="true">·</span>
            <span>Fellowship Trained</span>
          </div>
          <AnimatedText
            text="Consultant Surgeons"
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16382C] tracking-tight font-display text-balance"
          />
          <AnimatedText
            text="Board-certified ophthalmologists with international surgical fellowships."
            as="p"
            delay={0.12}
            className="mt-1 text-xs sm:text-base text-[#16382C]/75"
          />
        </motion.div>

        {/* Minimal Doctors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DOCTORS_LIST.map((doc, index) => (
            <motion.div
              key={doc.id}
              {...getItemReveal(shouldReduceMotion, 20)}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
              className={`bg-white rounded-2xl overflow-hidden border border-[#16382C]/10 hover:border-[#45AC8B]/70 transition-all duration-300 hover:shadow-xl justify-between group flex-col ${
                !showAllDoctors && index >= 2 ? 'hidden sm:flex' : 'flex'
              }`}
            >
              <div>
                {/* Doctor Photographic Portrait */}
                <div className="h-56 sm:h-64 relative overflow-hidden bg-neutral-900">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Top & Bottom Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16382C]/90 via-[#16382C]/20 to-[#16382C]/40 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#16382C]/75 backdrop-blur-md border border-white/15 shadow-sm">
                      {doc.experienceYears} Years Exp
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white px-2 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available</span>
                    </span>
                  </div>

                  {/* Bottom Subspecialty Pill over Photo */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <span className="inline-block text-[10px] font-bold tracking-wider text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/25 truncate max-w-full">
                      {doc.subspecialty.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-bold text-[#16382C] font-display group-hover:text-[#45AC8B] transition-colors leading-snug">
                    {doc.name}
                  </h3>
                  
                  <p className="text-xs text-[#45AC8B] font-semibold mt-1 truncate">
                    {doc.title.split('&')[0]}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#16382C]/5 text-xs text-[#16382C]/70 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#45AC8B] shrink-0" />
                    <span className="truncate">{doc.fellowships[0].split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => onSelectDoctorForBooking(doc.name)}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#16382C] hover:bg-[#1D4738] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#45AC8B]" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center sm:hidden">
          <button
            onClick={() => setShowAllDoctors(!showAllDoctors)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#16382C] bg-white border border-[#16382C]/15 rounded-xl shadow-xs"
          >
            <span>{showAllDoctors ? 'Show Less' : 'View All 4 Specialists'}</span>
          </button>
        </div>

      </motion.div>
    </section>
  );
};
