import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLegal }) => {
  return (
    <footer className="bg-[#17324D] text-[#F8F6F0] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Clinical Accreditation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#72B7BC]" />
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                OCULUS OPHTHALMIC
              </span>
            </div>

            <p className="text-xs text-[#F8F6F0]/75 leading-relaxed max-w-sm">
              Tertiary eye hospital dedicated to restoring and preserving vision through precision micro-surgery, 
              laser anterior segment reconstruction, and compassionate diagnostic excellence.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#72B7BC]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>JCI Accredited · International Ophthalmic Surgical Center</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#72B7BC]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F6F0]/80">
              <li><a href="#welcome" className="hover:text-white transition-colors">About Hospital</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Eye Care Services</a></li>
              <li><a href="#anatomy" className="hover:text-white transition-colors">Eye Anatomy Explorer</a></li>
              <li><a href="#specialists" className="hover:text-white transition-colors">Faculty Surgeons</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Surgical Technology</a></li>
              <li><a href="#journey" className="hover:text-white transition-colors">Patient Visit Guide</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">Clinical FAQs</a></li>
            </ul>
          </div>

          {/* Col 3: Specialized Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#72B7BC]">
              Clinical Focus
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F6F0]/80">
              <li>Femtosecond Laser Cataract & Multifocal IOL</li>
              <li>Vitreoretinal Macular Surgery & Anti-VEGF</li>
              <li>Minimally Invasive Glaucoma Surgery (MIGS)</li>
              <li>Corneal Cross-Linking (CXL) & Keratoconus</li>
              <li>Paediatric Amblyopia & Strabismus Correction</li>
              <li>Thermal Pulsation Dry Eye Clinic</li>
            </ul>
          </div>

          {/* Col 4: Contact & Clinical Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#72B7BC]">
              Hospital Location & Hours
            </h4>
            
            <div className="text-xs text-[#F8F6F0]/80 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#72B7BC] shrink-0 mt-0.5" />
                <span>
                  {HOSPITAL_INFO.address}<br />
                  {HOSPITAL_INFO.city}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#72B7BC] shrink-0 mt-0.5" />
                <span>
                  {HOSPITAL_INFO.hours.weekdays}<br />
                  {HOSPITAL_INFO.hours.saturday}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1 text-white font-semibold">
                <Phone className="w-3.5 h-3.5 text-[#72B7BC]" />
                <span className="tabular-nums">{HOSPITAL_INFO.mainPhone}</span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_INFO.address + ' ' + HOSPITAL_INFO.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#72B7BC] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Disclaimer & Privacy */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#F8F6F0]/60">
          <div>
            © {new Date().getFullYear()} {HOSPITAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy & HIPAA
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Clinical Terms & Consent
            </button>
            <span aria-hidden="true">·</span>
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
              className="text-[#72B7BC] hover:underline font-semibold"
            >
              24/7 Trauma Triage
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
