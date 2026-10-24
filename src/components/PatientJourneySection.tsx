import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Stethoscope, Microscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { PATIENT_JOURNEY } from '../data/hospitalData';

interface PatientJourneySectionProps {
  onOpenBooking: () => void;
}

export const PatientJourneySection: React.FC<PatientJourneySectionProps> = ({ onOpenBooking }) => {
  const stepIcons = [Calendar, Microscope, Stethoscope, CheckCircle2];

  return (
    <section id="journey" className="py-14 sm:py-20 lg:py-24 bg-[#FFFFFF] relative overflow-hidden border-t border-[#17324D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
              <span>Patient Pathway</span>
              <span aria-hidden="true">·</span>
              <span>4 Simple Steps</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
              Your Visit, Made Simple.
            </h2>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#17324D] hover:bg-[#1a3957] rounded-xl transition-all shadow-xs self-start sm:self-auto cursor-pointer"
          >
            Start Booking
          </button>
        </div>

        {/* 4 Steps: Minimal, Animated & Crisp */}
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-[#72B7BC]/20 via-[#72B7BC] to-[#72B7BC]/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {PATIENT_JOURNEY.map((item, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={item.step}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#F8F6F0] rounded-2xl p-5 sm:p-6 border border-[#17324D]/10 hover:border-[#72B7BC]/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-[#17324D]/10 flex items-center justify-center group-hover:bg-[#72B7BC] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 text-[#72B7BC] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-2xl font-extrabold text-[#17324D]/20 font-display tabular-nums group-hover:text-[#72B7BC]/60 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#17324D] font-display mb-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#17324D]/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#17324D]/5 text-[11px] text-[#72B7BC] font-semibold flex items-center gap-1">
                    <span>{item.detail}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
