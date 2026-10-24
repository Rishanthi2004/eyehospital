import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/hospitalData';

export const PatientReviewsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="max-w-xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
            <span>Patient Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Real Stories of Restored Sight.
          </h2>
        </div>

        {/* Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#17324D]/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#72B7BC]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#17324D]/10" />
                </div>

                <p className="text-xs sm:text-sm text-[#17324D]/80 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div>
                <div className="mb-3 p-2 rounded-lg bg-[#E7F2F8]/70 text-[11px] font-semibold text-[#17324D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#72B7BC] shrink-0" />
                  <span className="truncate">{t.outcome}</span>
                </div>

                <div className="pt-3 border-t border-[#17324D]/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#17324D] font-display">
                    {t.patient}, {t.age}
                  </span>
                  <span className="text-[11px] text-[#72B7BC] font-semibold">
                    {t.surgeon.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
