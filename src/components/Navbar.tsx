import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ArrowRight } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#welcome' },
    { label: 'Services', href: '#services' },
    { label: 'Eye Anatomy', href: '#anatomy' },
    { label: 'Specialists', href: '#specialists' },
    { label: 'Technology', href: '#technology' },
    { label: 'Patient Guide', href: '#journey' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F0]/92 backdrop-blur-md border-b border-[#17324D]/10 shadow-[0_4px_24px_rgba(23,50,77,0.04)] py-3'
            : 'bg-gradient-to-b from-[#F8F6F0]/90 via-[#F8F6F0]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single Wordmark */}
            <a
              href="#"
              className="text-lg sm:text-xl font-extrabold tracking-tight text-[#17324D] font-display whitespace-nowrap shrink-0 flex items-center gap-2 group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#72B7BC] group-hover:scale-125 transition-transform" />
              <span>OCULUS OPHTHALMIC</span>
            </a>

            {/* Zone 2: 4-5 Concise single-line navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#17324D]/80">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#17324D] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 Primary CTA */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={`tel:${HOSPITAL_INFO.mainPhone}`}
                className="hidden xl:flex items-center gap-1.5 text-xs text-[#17324D]/70 hover:text-[#17324D] transition-colors py-2 px-3 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#72B7BC]" />
                <span className="tabular-nums font-medium">{HOSPITAL_INFO.mainPhone}</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#17324D] hover:bg-[#1a3957] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#72B7BC]" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenBooking}
                className="sm:hidden px-3 py-1.5 text-xs font-semibold uppercase text-white bg-[#17324D] rounded-md"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#17324D] hover:text-[#72B7BC] rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#17324D]/40 backdrop-blur-sm lg:hidden">
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-[#F8F6F0] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="text-xs font-bold text-[#17324D]/50 uppercase tracking-widest mb-4">
                Hospital Navigation
              </div>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-[#17324D] hover:text-[#72B7BC] py-2 border-b border-[#17324D]/5 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#72B7BC]" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#17324D]/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-xs font-bold tracking-wider uppercase text-white bg-[#17324D] rounded-lg shadow-sm"
              >
                Book An Appointment
              </button>
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                className="w-full py-2.5 text-center text-xs font-medium text-[#17324D] bg-[#E7F2F8] rounded-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#72B7BC]" />
                <span>24/7 Trauma: {HOSPITAL_INFO.emergencyPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
