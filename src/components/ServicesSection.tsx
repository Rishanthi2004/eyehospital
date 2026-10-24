import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, Check, Sparkles, Eye, Shield, Activity, Layers, Droplets, Heart, Glasses, AlertCircle, Stethoscope, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/hospitalData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showAllServices, setShowAllServices] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'cataract', label: 'Cataract' },
    { id: 'retina', label: 'Retina & Glaucoma' },
    { id: 'cornea', label: 'Cornea' },
    { id: 'optics', label: 'Vision Correction' },
    { id: 'pediatric', label: 'Paediatric' },
  ];

  const filtered = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  // If "all" is active and not expanded, show top 6 core services for a neat, sweet presentation
  const visibleServices = (activeCategory === 'all' && !showAllServices)
    ? filtered.slice(0, 6)
    : filtered;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#72B7BC]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#72B7BC]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#72B7BC]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#72B7BC]" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#72B7BC]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#72B7BC]" />;
      case 'Glasses': return <Glasses className="w-5 h-5 text-[#72B7BC]" />;
      case 'AlertCircle': return <AlertCircle className="w-5 h-5 text-[#72B7BC]" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-[#72B7BC]" />;
      default: return <Eye className="w-5 h-5 text-[#72B7BC]" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-[#F8F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Simple & Clean */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 sm:gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-1.5">
              <span>Clinical Subspecialties</span>
              <span aria-hidden="true">·</span>
              <span>Precision Programs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
              Specialized Eye Care Services
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#17324D]/75">
              Targeted treatments from routine screening to advanced micro-incision surgeries.
            </p>
          </div>

          {/* Minimal Horizontal Filter Rail */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1">
            <div className="inline-flex items-center gap-1 p-1 bg-white/90 rounded-xl border border-[#17324D]/10 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAllServices(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer touch-manipulation ${
                    activeCategory === cat.id
                      ? 'bg-[#17324D] text-white shadow-xs'
                      : 'text-[#17324D]/70 hover:text-[#17324D] hover:bg-[#F8F6F0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compact, Neat & Simple Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {visibleServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-xl p-4 sm:p-5 border border-[#17324D]/10 hover:border-[#72B7BC]/70 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer active:scale-[0.99] touch-manipulation"
            >
              <div>
                {/* Icon & Duration Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E7F2F8] flex items-center justify-center group-hover:bg-[#CDE7E4] transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[11px] text-[#17324D]/50 font-medium">
                    ~{service.durationMinutes} min
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] font-display group-hover:text-[#72B7BC] transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Short 1-line Tagline only (Keeps it simple & clean) */}
                <p className="text-xs text-[#17324D]/70 mt-1 line-clamp-2 leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="pt-3 mt-3 border-t border-[#17324D]/5 flex items-center justify-between text-xs font-semibold text-[#17324D] group-hover:text-[#72B7BC] transition-colors">
                <span className="text-[11px] font-medium text-[#72B7BC]">View details</span>
                <div className="w-6 h-6 rounded-full bg-[#F8F6F0] flex items-center justify-center group-hover:bg-[#72B7BC] group-hover:text-white transition-all">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Expand / Collapse Toggle if "All" is active */}
        {activeCategory === 'all' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-[#17324D] bg-white hover:bg-[#E7F2F8] border border-[#17324D]/15 rounded-xl transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <span>{showAllServices ? 'Show Less (6 Services)' : 'View All 10 Programs'}</span>
              {showAllServices ? <ChevronUp className="w-3.5 h-3.5 text-[#72B7BC]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#72B7BC]" />}
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal (All details appear here neatly without filling up the page) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[#17324D]/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-t-3xl sm:rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-[#17324D]/10 relative max-h-[88vh] overflow-y-auto"
            >
              {/* Drag bar indicator on mobile */}
              <div className="sm:hidden w-12 h-1 bg-[#17324D]/20 rounded-full mx-auto mb-3" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#17324D]/60 hover:text-[#17324D] rounded-lg hover:bg-[#F8F6F0] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#E7F2F8] flex items-center justify-center shrink-0">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div className="text-[11px] font-semibold text-[#72B7BC] uppercase tracking-wider">
                  Ophthalmic Subspecialty Protocol
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#17324D] font-display mb-2 pr-6">
                {selectedService.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#17324D]/80 leading-relaxed mb-4">
                {selectedService.description}
              </p>

              {/* Diagnostic Battery */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-2">
                  Diagnostic Protocol
                </h4>
                <div className="space-y-1.5">
                  {selectedService.keyExaminations.map((exam, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#17324D]/80">
                      <Check className="w-3.5 h-3.5 text-[#72B7BC] shrink-0 mt-0.5" />
                      <span>{exam}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Options */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-2">
                  Therapeutic Pathways
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {selectedService.treatmentOptions.map((treat, i) => (
                    <div key={i} className="p-2 rounded-lg bg-[#F8F6F0] text-xs font-medium text-[#17324D] border border-[#17324D]/5">
                      {treat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Preparation Tip */}
              <div className="p-3 rounded-xl bg-[#E7F2F8]/60 border border-[#72B7BC]/30 mb-4">
                <div className="text-xs font-bold text-[#17324D] mb-0.5">
                  Patient Preparation Note
                </div>
                <p className="text-xs text-[#17324D]/80 leading-relaxed">
                  {selectedService.preparationTip}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-3 border-t border-[#17324D]/10">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-[#17324D] hover:bg-[#F8F6F0] rounded-xl transition-colors text-center"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = selectedService.name;
                    setSelectedService(null);
                    onSelectServiceForBooking(name);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#17324D] hover:bg-[#1a3957] rounded-xl shadow-sm transition-all text-center"
                >
                  Book This Evaluation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
