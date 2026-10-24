import React from 'react';
import { Calendar, Phone, MapPin, Mail } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { IMAGES } from '../assets/images';

interface FinalCtaSectionProps {
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-[#F8F6F0] via-[#E7F2F8]/70 to-[#CDE7E4]/40 relative overflow-hidden">
      
      {/* Background Animated Rotating Giant Iris Artwork */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full pointer-events-none opacity-40 select-none overflow-hidden">
        <div className="w-full h-full animate-iris-spin">
          <img
            src={IMAGES.circularIris}
            alt="Rotating iris artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full filter contrast-[1.05]"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-2">
            <span>Preserve Your Sight</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17324D] tracking-tight font-display leading-[1.08] text-balance">
            Your Vision Matters. <br />
            Let’s Care for It Together.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#17324D]/75 leading-relaxed max-w-lg">
            Schedule an in-depth consultation or second opinion with our consultant ophthalmologists.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#17324D] hover:bg-[#1a3957] rounded-xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#72B7BC]" />
              <span>Book Appointment</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.mainPhone}`}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#17324D] bg-white hover:bg-[#F8F6F0] border border-[#17324D]/15 rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-[#72B7BC]" />
              <span className="tabular-nums">{HOSPITAL_INFO.mainPhone}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
