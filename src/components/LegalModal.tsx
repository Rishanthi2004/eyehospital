import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16382C]/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#16382C]/10 relative max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#16382C]/60 hover:text-[#16382C] rounded-lg hover:bg-[#F8F6F0] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#45AC8B] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>HIPAA & Patient Data Protection</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#16382C] font-display mb-4">
              Patient Privacy Policy
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#16382C]/80 leading-relaxed">
              <p>
                At {HOSPITAL_INFO.name}, protecting your protected health information (PHI) and clinical diagnostic records 
                is our highest clinical and legal commitment under HIPAA standards.
              </p>
              <h4 className="font-bold text-[#16382C] uppercase tracking-wider text-xs">
                1. Collection of Diagnostic Records
              </h4>
              <p>
                Optical coherence tomography scans, fundus photographs, autorefraction waveprints, and clinical examination notes 
                are stored on encrypted, access-restricted institutional medical picture archiving systems (PACS).
              </p>
              <h4 className="font-bold text-[#16382C] uppercase tracking-wider text-xs">
                2. Information Use & Consent
              </h4>
              <p>
                We do not sell, rent, or monetize patient data under any circumstances. Information is utilized solely for clinical 
                diagnosis, surgical planning, care coordination with your referring optometrist/physician, and verified medical insurance adjudication.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#45AC8B] uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" />
              <span>Clinical Governance & Information</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#16382C] font-display mb-4">
              Terms of Medical Service & In-Person Care
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#16382C]/80 leading-relaxed">
              <p>
                The information provided on this website is for educational and appointment reservation purposes and does not 
                substitute for direct clinical examination, diagnosis, or in-person evaluation by a licensed ophthalmologist.
              </p>
              <h4 className="font-bold text-[#16382C] uppercase tracking-wider text-xs">
                1. Dilation Drops & Accompanying Escort
              </h4>
              <p>
                Pharmacologic mydriatic drops administered during examinations will temporarily blur your accommodation and 
                increase daylight glare sensitivity for 2 to 4 hours. Driving is discouraged until pupils return to normal baseline.
              </p>
              <h4 className="font-bold text-[#16382C] uppercase tracking-wider text-xs">
                2. Emergency Care Protocol
              </h4>
              <p>
                If you are experiencing sudden acute loss of vision, penetrating eye trauma, or severe chemical exposure, do not wait 
                for an online appointment confirmation. Contact our emergency line directly at {HOSPITAL_INFO.emergencyPhone} or proceed 
                immediately to our trauma center.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#16382C]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#16382C] rounded-xl hover:bg-[#1D4738] transition-all cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
