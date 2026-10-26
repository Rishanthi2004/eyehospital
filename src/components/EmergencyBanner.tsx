import React, { useState } from 'react';
import { AlertCircle, Phone, X } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const EmergencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#16382C] text-[#F8F6F0] py-2 px-4 border-b border-[#45AC8B]/30 text-xs flex items-center justify-between relative z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#45AC8B] animate-pulse shrink-0" />
          <span className="font-semibold text-white">
            <span className="sm:hidden">24/7 Eye Emergency:</span>
            <span className="hidden sm:inline">24/7 Urgent Ophthalmic Triage Center Active:</span>
          </span>
          <span className="hidden md:inline text-white/80">
            Immediate surgical readiness for sudden vision loss, retinal tears & chemical burns.
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
            className="flex items-center gap-1.5 text-[#45AC8B] hover:text-white font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="tabular-nums">{HOSPITAL_INFO.emergencyPhone}</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
