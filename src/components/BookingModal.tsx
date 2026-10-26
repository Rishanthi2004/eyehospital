import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Download, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_LIST, DOCTORS_LIST, HOSPITAL_INFO } from '../data/hospitalData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialDoctor,
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    service: initialService || SERVICES_LIST[0].name,
    doctor: initialDoctor || 'First Available Specialist',
    visitType: 'First-time comprehensive consultation',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    date: string;
    time: string;
    service: string;
    doctor: string;
    patientName: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  React.useEffect(() => {
    if (initialDoctor) {
      setFormData((prev) => ({ ...prev, doctor: initialDoctor }));
    }
  }, [initialDoctor]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Please enter patient full name';
    } else if (formData.patientName.trim().length < 3) {
      newErrors.patientName = 'Name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for appointment confirmation';
    } else if (!/^[\d\s+\-()]{7,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred appointment date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clinical dispatch & scheduling confirmation
    setTimeout(() => {
      const randomCode = `OCU-${Math.floor(1000 + Math.random() * 9000)}-EYE`;
      setConfirmedBooking({
        reference: randomCode,
        date: formData.preferredDate,
        time: formData.preferredTime,
        service: formData.service,
        doctor: formData.doctor,
        patientName: formData.patientName,
      });
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#16382C', '#45AC8B', '#D1ECE2', '#E8D9C7']
      });
    }, 900);
  };

  const copyDetails = () => {
    if (!confirmedBooking) return;
    const text = `Oculus Ophthalmic Hospital Appointment:
Reference: ${confirmedBooking.reference}
Patient: ${confirmedBooking.patientName}
Service: ${confirmedBooking.service}
Specialist: ${confirmedBooking.doctor}
Date/Time: ${confirmedBooking.date} (${confirmedBooking.time})
Address: ${HOSPITAL_INFO.address}, ${HOSPITAL_INFO.city}
Inquiries: ${HOSPITAL_INFO.mainPhone}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadICS = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Oculus Eye Hospital//Appointment Concierge//EN
BEGIN:VEVENT
SUMMARY:Eye Exam - ${confirmedBooking.service}
DESCRIPTION:Appointment Reference: ${confirmedBooking.reference}\\nDoctor: ${confirmedBooking.doctor}\\nHospital Phone: ${HOSPITAL_INFO.mainPhone}
LOCATION:${HOSPITAL_INFO.address}, ${HOSPITAL_INFO.city}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Oculus-Appointment-${confirmedBooking.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get tomorrow date in YYYY-MM-DD format for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16382C]/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#16382C]/10 relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#16382C]/60 hover:text-[#16382C] rounded-lg hover:bg-[#F8F6F0] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#45AC8B] uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>Ophthalmic Consultation Request</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16382C] font-display">
                Schedule Your Eye Examination.
              </h3>
              <p className="text-xs sm:text-sm text-[#16382C]/75 mt-1">
                Reserve an in-person diagnostic evaluation or second opinion. No referral required for general assessment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#16382C]/40 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Roosevelt"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F8F6F0] border rounded-xl text-xs sm:text-sm text-[#16382C] placeholder:text-[#16382C]/40 focus:outline-none focus:ring-2 focus:ring-[#45AC8B] ${
                        errors.patientName ? 'border-red-400 bg-red-50/20' : 'border-[#16382C]/10'
                      }`}
                    />
                  </div>
                  {errors.patientName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.patientName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#16382C]/40 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. +1 (415) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F8F6F0] border rounded-xl text-xs sm:text-sm text-[#16382C] placeholder:text-[#16382C]/40 focus:outline-none focus:ring-2 focus:ring-[#45AC8B] ${
                        errors.phone ? 'border-red-400 bg-red-50/20' : 'border-[#16382C]/10'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Visit Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#16382C]/40 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="For calendar & prep instructions"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F6F0] border border-[#16382C]/10 rounded-xl text-xs sm:text-sm text-[#16382C] placeholder:text-[#16382C]/40 focus:outline-none focus:ring-2 focus:ring-[#45AC8B]"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Visit Purpose
                  </label>
                  <select
                    value={formData.visitType}
                    onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#16382C]/10 rounded-xl text-xs sm:text-sm text-[#16382C] focus:outline-none focus:ring-2 focus:ring-[#45AC8B]"
                  >
                    <option value="First-time comprehensive consultation">First-time comprehensive consultation</option>
                    <option value="Cataract & lens replacement consultation">Cataract & lens replacement consultation</option>
                    <option value="Glaucoma or elevated eye pressure second opinion">Glaucoma / pressure second opinion</option>
                    <option value="Retinal flashes, floaters or diabetic check">Retinal flashes, floaters or diabetic check</option>
                    <option value="Severe dry eye / ocular surface assessment">Severe dry eye / ocular surface assessment</option>
                    <option value="Routine optical refraction / glasses update">Routine optical refraction / glasses update</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Service Selection & Preferred Specialist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Clinical Service Program
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#16382C]/10 rounded-xl text-xs sm:text-sm text-[#16382C] focus:outline-none focus:ring-2 focus:ring-[#45AC8B]"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.name}>{srv.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Preferred Surgeon / Specialist
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#16382C]/10 rounded-xl text-xs sm:text-sm text-[#16382C] focus:outline-none focus:ring-2 focus:ring-[#45AC8B]"
                  >
                    <option value="First Available Subspecialist">First Available Subspecialist</option>
                    {DOCTORS_LIST.map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Preferred Consultation Date *
                  </label>
                  <input
                    type="date"
                    min={minDateStr}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#F8F6F0] border rounded-xl text-xs sm:text-sm text-[#16382C] focus:outline-none focus:ring-2 focus:ring-[#45AC8B] ${
                      errors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-[#16382C]/10'
                    }`}
                  />
                  {errors.preferredDate && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.preferredDate}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#16382C]/10 rounded-xl text-xs sm:text-sm text-[#16382C] focus:outline-none focus:ring-2 focus:ring-[#45AC8B]"
                  >
                    <option value="Morning (08:30 - 11:30)">Morning Clinic (08:30 - 11:30)</option>
                    <option value="Midday (11:30 - 14:30)">Midday Clinic (11:30 - 14:30)</option>
                    <option value="Afternoon (14:30 - 17:30)">Afternoon Clinic (14:30 - 17:30)</option>
                    <option value="Saturday Morning (09:00 - 13:00)">Saturday Morning (09:00 - 13:00)</option>
                  </select>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-bold text-[#16382C] uppercase tracking-wider mb-1.5">
                  Specific Symptoms or Prior Diagnoses (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Glare while driving at night, dry gritty sensation, or recent blurred vision in left eye..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#16382C]/10 rounded-xl text-xs sm:text-sm text-[#16382C] placeholder:text-[#16382C]/40 focus:outline-none focus:ring-2 focus:ring-[#45AC8B]"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-3 border-t border-[#16382C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-[#16382C]/60">
                  <ShieldCheck className="w-4 h-4 text-[#45AC8B] shrink-0" />
                  <span>Confidential HIPAA Encrypted Booking</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#16382C] hover:bg-[#F8F6F0] rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#16382C] hover:bg-[#1D4738] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Availability...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 text-[#45AC8B]" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#E9F6F1] text-[#45AC8B] flex items-center justify-center mx-auto mb-4 ring-8 ring-[#D1ECE2]/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-xs font-bold text-[#45AC8B] uppercase tracking-widest mb-1">
              Appointment Successfully Reserved
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16382C] font-display">
              We Look Forward to Welcoming You.
            </h3>

            <p className="text-xs sm:text-sm text-[#16382C]/75 max-w-md mx-auto mt-2">
              Your appointment request has been scheduled with our clinical triage coordinator.
            </p>

            {/* Reference Card */}
            <div className="my-6 p-5 rounded-2xl bg-[#F8F6F0] border border-[#16382C]/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#16382C]/10">
                <span className="text-[#16382C]/60 font-medium">Reference Code:</span>
                <span className="font-bold text-[#16382C] font-display tracking-wider">
                  {confirmedBooking.reference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16382C]/60 font-medium">Patient:</span>
                <span className="font-semibold text-[#16382C]">{confirmedBooking.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16382C]/60 font-medium">Service:</span>
                <span className="font-semibold text-[#16382C] truncate max-w-[200px]">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16382C]/60 font-medium">Specialist:</span>
                <span className="font-semibold text-[#16382C]">{confirmedBooking.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16382C]/60 font-medium">Date & Time:</span>
                <span className="font-semibold text-[#16382C]">{confirmedBooking.date} · {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between pt-1 text-[11px] text-[#45AC8B]">
                <span>Hospital Location:</span>
                <span>{HOSPITAL_INFO.address}</span>
              </div>
            </div>

            {/* Action Tools */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={copyDetails}
                className="px-4 py-2 text-xs font-semibold text-[#16382C] bg-white border border-[#16382C]/15 rounded-xl hover:bg-[#F8F6F0] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#45AC8B]" />}
                <span>{copied ? 'Copied Details' : 'Copy Details'}</span>
              </button>

              <button
                onClick={downloadICS}
                className="px-4 py-2 text-xs font-semibold text-[#16382C] bg-white border border-[#16382C]/15 rounded-xl hover:bg-[#F8F6F0] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#45AC8B]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#16382C] rounded-xl hover:bg-[#1D4738] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
