import React, { useState } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { EyeAnatomyExplorer } from './components/EyeAnatomyExplorer';
import { DoctorsSection } from './components/DoctorsSection';
import { TechnologySection } from './components/TechnologySection';
import { ClinicalHighlightsSection } from './components/ClinicalHighlightsSection';
import { PatientJourneySection } from './components/PatientJourneySection';
import { PatientReviewsSection } from './components/PatientReviewsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LegalModal } from './components/LegalModal';
import { NavigationPopup } from './components/NavigationPopup';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [preselectedDoctor, setPreselectedDoctor] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenBooking = (service?: string, doctor?: string) => {
    setPreselectedService(service);
    setPreselectedDoctor(doctor);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setPreselectedService(undefined);
    setPreselectedDoctor(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#16382C] selection:bg-[#45AC8B]/30 selection:text-[#16382C] flex flex-col font-sans">
      {/* 24/7 Acute Ophthalmic Emergency Triage Banner */}
      <EmergencyBanner />

      {/* Primary Sticky Top Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Navigation Entrance Popup */}
      <NavigationPopup />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero — Cinematic Animated Eye, Iris & Layered Typography */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Section 2: Welcome to Our Eye Hospital (Split Screen & Clinical Governance) */}
        <WelcomeSection />

        {/* Section 3: Our Eye Care Services (10 Subspecialties & Detailed Modals) */}
        <ServicesSection onSelectServiceForBooking={(serviceName) => handleOpenBooking(serviceName)} />

        {/* Section 4: Eye Anatomy Interactive Explorer & Vision Impairment Simulator */}
        <EyeAnatomyExplorer />

        {/* Section 5: Meet Our Eye Specialists (Faculty Surgeons & Fellowships) */}
        <DoctorsSection onSelectDoctorForBooking={(doctorName) => handleOpenBooking(undefined, doctorName)} />

        {/* Section 6: Our Diagnostic & Surgical Technology */}
        <TechnologySection />

        {/* Section 7: Why Patients Choose Us (Clinical Rigor & Verified Quality) */}
        <ClinicalHighlightsSection />

        {/* Section 8: Your Visit, Made Simple (4-Step Pathway) */}
        <PatientJourneySection onOpenBooking={() => handleOpenBooking()} />

        {/* Section 9: Verified Patient Experiences & Clinical Outcomes */}
        <PatientReviewsSection />

        {/* Section 10: Frequently Asked Questions (Accordion) */}
        <FaqSection />

        {/* Section 11: Final Appointment CTA (Rotating Iris Visual & Direct Booking) */}
        <FinalCtaSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Section 12: Comprehensive Hospital Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Interactive Appointment Booking Concierge */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        initialService={preselectedService}
        initialDoctor={preselectedDoctor}
      />

      {/* Patient Privacy & Clinical Terms Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
