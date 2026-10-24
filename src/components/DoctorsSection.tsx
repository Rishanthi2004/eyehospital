import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, GraduationCap, X, ArrowRight, UserCheck } from 'lucide-react';
import { DOCTORS_LIST, DoctorItem } from '../data/hospitalData';

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorForBooking }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorItem | null>(null);

  const getAvatarGradient = (seed: string) => {
    switch (seed) {
      case 'elena': return 'from-[#17324D] via-[#2A4D6F] to-[#72B7BC]';
      case 'julian': return 'from-[#1E3A4B] via-[#2E5E6E] to-[#CDE7E4]';
      case 'sophia': return 'from-[#17324D] via-[#386675] to-[#72B7BC]';
      case 'arthur': return 'from-[#244255] via-[#436B79] to-[#E7F2F8]';
      default: return 'from-[#17324D] to-[#72B7BC]';
    }
  };

  return (
    <section id="specialists" className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Minimal Header */}
        <div className="max-w-xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
            <span>Faculty</span>
            <span aria-hidden="true">·</span>
            <span>Fellowship Trained</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Consultant Surgeons
          </h2>
          <p className="mt-1 text-xs sm:text-base text-[#17324D]/75">
            Board-certified ophthalmologists with international surgical fellowships.
          </p>
        </div>

        {/* Minimal Doctors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {DOCTORS_LIST.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#17324D]/10 hover:border-[#72B7BC]/70 transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Visual Avatar Banner */}
                <div className={`h-36 sm:h-40 bg-gradient-to-br ${getAvatarGradient(doc.avatarSeed)} relative p-4 flex flex-col justify-between overflow-hidden`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                      {doc.experienceYears} Years Exp
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#72B7BC] shadow-xs" />
                  </div>

                  {/* Monogram */}
                  <div className="z-10 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-display font-extrabold text-lg flex items-center justify-center">
                      {doc.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-white/80 block">Specialist</span>
                      <span className="text-xs font-bold text-white tracking-wide truncate max-w-[150px] block">
                        {doc.subspecialty.split(',')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Minimal Body */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-bold text-[#17324D] font-display group-hover:text-[#72B7BC] transition-colors leading-snug">
                    {doc.name}
                  </h3>
                  
                  <p className="text-xs text-[#72B7BC] font-medium mt-0.5 truncate">
                    {doc.subspecialty}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#17324D]/5 text-xs text-[#17324D]/70 truncate flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#72B7BC] shrink-0" />
                    <span className="truncate">{doc.fellowships[0].split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => onSelectDoctorForBooking(doc.name)}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#17324D] hover:bg-[#1a3957] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#72B7BC]" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
