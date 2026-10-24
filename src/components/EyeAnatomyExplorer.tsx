import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Sparkles, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';
import { ANATOMY_PARTS, AnatomyPart } from '../data/hospitalData';
import { IMAGES } from '../assets/images';

export const EyeAnatomyExplorer: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<AnatomyPart>(ANATOMY_PARTS[0]);
  const [activeTab, setActiveTab] = useState<'anatomy' | 'simulator'>('anatomy');
  
  // Vision Simulator states
  const [condition, setCondition] = useState<'normal' | 'cataract' | 'glaucoma' | 'astigmatism' | 'dryeye'>('normal');
  const [correctionLevel, setCorrectionLevel] = useState<number>(100);

  const conditions = [
    { id: 'normal', name: '20/20 Healthy Vision', desc: 'Crisp light refraction focused perfectly onto fovea.' },
    { id: 'cataract', name: 'Cataract Opacification', desc: 'Crystalline lens clouding creates hazy, glare-prone sight.' },
    { id: 'glaucoma', name: 'Glaucoma Peripheral Loss', desc: 'Optic nerve loss constricts peripheral vision (tunnel sight).' },
    { id: 'astigmatism', name: 'Corneal Astigmatism', desc: 'Uneven corneal curvature warps light along asymmetrical axes.' },
    { id: 'dryeye', name: 'Evaporative Dry Eye', desc: 'Tear film breakdown causes fluctuating blur and glare.' },
  ];

  const getSimulatorStyle = () => {
    if (condition === 'normal') return {};
    const uncorrectedFactor = (100 - correctionLevel) / 100;

    switch (condition) {
      case 'cataract':
        return {
          filter: `blur(${uncorrectedFactor * 7}px) sepia(${uncorrectedFactor * 0.35}) brightness(${1 - uncorrectedFactor * 0.2}) contrast(${1 - uncorrectedFactor * 0.3})`,
        };
      case 'astigmatism':
        return {
          filter: `blur(${uncorrectedFactor * 4}px)`,
          transform: `scale(${1 + uncorrectedFactor * 0.05}, 1)`,
        };
      case 'dryeye':
        return {
          filter: `blur(${uncorrectedFactor * 3}px) contrast(${1 + uncorrectedFactor * 0.2})`,
        };
      case 'glaucoma':
        return {};
      default:
        return {};
    }
  };

  return (
    <section id="anatomy" className="py-16 sm:py-24 lg:py-28 bg-[#FFFFFF] relative overflow-hidden border-t border-[#17324D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#72B7BC] uppercase mb-2 sm:mb-3">
            <span>Clinical Education & Optics</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Biomechanics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight font-display text-balance">
            Understanding Your Eye Anatomy & Vision.
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#17324D]/75">
            The human eye coordinates complex optical refraction, muscular aperture control, and neural signal 
            transduction. Explore the biological layers or test the patient vision simulator.
          </p>
        </div>

        {/* View Switcher: Segmented Control */}
        <div className="flex items-center justify-start mb-6 sm:mb-10 w-full overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1 p-1 bg-[#F8F6F0] rounded-xl border border-[#17324D]/10 shrink-0">
            <button
              onClick={() => setActiveTab('anatomy')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'anatomy'
                  ? 'bg-[#17324D] text-white shadow-xs'
                  : 'text-[#17324D]/70 hover:text-[#17324D]'
              }`}
            >
              Anatomy Explorer
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-[#17324D] text-white shadow-xs'
                  : 'text-[#17324D]/70 hover:text-[#17324D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#72B7BC]" />
              <span>Vision Simulator</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Anatomy Explorer */}
        {activeTab === 'anatomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            
            {/* Left Column: Visual Display with Interactive Structure */}
            <div className="lg:col-span-7 bg-[#F8F6F0] rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-[#17324D]/10 relative shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[340px] sm:min-h-[420px]">
              
              {/* Quick Anatomy Layer Selector Pills (Mobile Friendly on top) */}
              <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-2 z-30">
                {ANATOMY_PARTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPart(p)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedPart.id === p.id
                        ? 'bg-[#17324D] text-white shadow-xs'
                        : 'bg-white text-[#17324D]/70 border border-[#17324D]/10 hover:bg-[#E7F2F8]'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Central Eye / Iris Graphic with Layered Optical Rays */}
              <div className="relative w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] flex items-center justify-center select-none my-2">
                
                {/* Background optical focal axis lines */}
                <div className="absolute inset-x-[-15%] top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#72B7BC]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-y-[-15%] left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#72B7BC]/20 to-transparent pointer-events-none" />

                {/* Outer Sclera Dome */}
                <div className="absolute inset-0 rounded-full border-2 border-[#17324D]/10 bg-gradient-to-br from-white via-[#F8F6F0] to-[#E7F2F8]/60 shadow-[inset_0_0_30px_rgba(23,50,77,0.06)]" />

                {/* Rotating Iris Stroma Image */}
                <div className="relative w-[150px] h-[150px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                  <img
                    src={IMAGES.circularIris}
                    alt="Detailed anatomical human iris"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover animate-iris-spin"
                  />
                  {/* Central Pupil */}
                  <div className="absolute inset-0 m-auto w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#050B11] shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] animate-pupil-pulse" />
                  
                  {/* Specular corneal light gleam */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-5 sm:w-10 sm:h-7 rounded-[60%] bg-white/80 blur-[1px] rotate-[-30deg]" />
                </div>

                {/* Interactive Caliper Hotspots */}
                {ANATOMY_PARTS.map((part) => {
                  const isSelected = selectedPart.id === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      style={{
                        left: `${part.xPercent}%`,
                        top: `${part.yPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 group cursor-pointer focus:outline-none p-1.5 touch-manipulation"
                      aria-label={`Inspect ${part.name}`}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 rounded-full bg-[#72B7BC]/40 animate-ping" />
                      )}
                      
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md transition-all ${
                          isSelected
                            ? 'bg-[#17324D] text-white scale-125 ring-2 ring-[#72B7BC]'
                            : 'bg-white text-[#17324D] hover:bg-[#E7F2F8]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#72B7BC]" />
                      </div>
                    </button>
                  );
                })}

              </div>

              {/* Bottom cue */}
              <div className="text-[11px] sm:text-xs text-[#17324D]/60 flex items-center gap-1.5 mt-2">
                <Info className="w-3.5 h-3.5 text-[#72B7BC]" />
                <span>Tap any structure pill or dot to view medical details</span>
              </div>
            </div>

            {/* Right Column: Selected Anatomical Layer Clinical Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#17324D]/10 shadow-[0_12px_40px_rgba(23,50,77,0.05)]">
              <div className="mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-semibold text-[#72B7BC] tracking-wider uppercase">
                  Selected Anatomical Layer
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#17324D] font-display mt-0.5">
                  {selectedPart.name}
                </h3>
                <span className="text-xs font-serif italic text-[#17324D]/60">
                  {selectedPart.latinName}
                </span>
              </div>

              {/* Biological Role */}
              <div className="mb-4 sm:mb-5">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">
                  Physiological Function
                </h4>
                <p className="text-xs sm:text-sm text-[#17324D]/80 leading-relaxed bg-[#F8F6F0] p-3 sm:p-4 rounded-xl border border-[#17324D]/5">
                  {selectedPart.functionDesc}
                </p>
              </div>

              {/* Common Pathologies */}
              <div className="mb-4 sm:mb-5">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-2">
                  Common Ophthalmic Conditions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {selectedPart.commonPathologies.map((path, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#E7F2F8]/60 text-xs font-medium text-[#17324D]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#72B7BC] shrink-0" />
                      <span className="truncate">{path}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic Method */}
              <div className="border-t border-[#17324D]/10 pt-3 sm:pt-4">
                <span className="text-xs font-bold text-[#17324D] uppercase tracking-wider block mb-1">
                  Primary Hospital Diagnostic Method
                </span>
                <p className="text-xs text-[#17324D]/70 font-medium">
                  {selectedPart.diagnosticMethod}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Vision Impairment Simulator */}
        {activeTab === 'simulator' && (
          <div className="bg-[#F8F6F0] rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-[#17324D]/10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Left Column: Condition Selection & Lens Correction Slider */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#17324D] font-display">
                    Simulate Common Eye Conditions
                  </h3>
                  <p className="text-xs sm:text-sm text-[#17324D]/75 mt-1">
                    Select a diagnosed ocular condition below, then drag the slider to see how specialist 
                    intervention restores 20/20 vision clarity.
                  </p>
                </div>

                {/* Condition Buttons: Swipeable on mobile */}
                <div className="space-y-1.5 sm:space-y-2">
                  {conditions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCondition(item.id as any);
                        if (item.id === 'normal') setCorrectionLevel(100);
                        else setCorrectionLevel(30);
                      }}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer touch-manipulation ${
                        condition === item.id
                          ? 'bg-[#17324D] text-white border-[#17324D] shadow-sm'
                          : 'bg-white text-[#17324D] border-[#17324D]/10 hover:border-[#72B7BC]'
                      }`}
                    >
                      <div className="text-xs font-bold font-display">{item.name}</div>
                      <div className={`text-[11px] mt-0.5 line-clamp-1 ${condition === item.id ? 'text-white/80' : 'text-[#17324D]/60'}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Surgical Correction Slider */}
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#17324D]/10">
                  <div className="flex items-center justify-between text-xs font-bold text-[#17324D] mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#72B7BC]" />
                      <span>Treatment Restoration</span>
                    </span>
                    <span className="text-[#72B7BC] tabular-nums font-semibold">
                      {correctionLevel === 100 ? '20/20 Restored' : `${correctionLevel}% Corrected`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={correctionLevel}
                    onChange={(e) => setCorrectionLevel(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#E7F2F8] rounded-lg appearance-none cursor-pointer accent-[#17324D] touch-manipulation"
                  />
                  <div className="flex justify-between text-[10px] text-[#17324D]/60 mt-1 font-medium">
                    <span>Uncorrected Pathology</span>
                    <span>Post-Op Clarity</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCondition('normal');
                    setCorrectionLevel(100);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#17324D]/70 hover:text-[#17324D] font-medium"
                >
                  <RotateCcw className="w-3 h-3 text-[#72B7BC]" />
                  <span>Reset Simulator View</span>
                </button>
              </div>

              {/* Right Column: Simulated Visual Viewport */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-slate-900 aspect-16/10">
                  <div
                    style={getSimulatorStyle()}
                    className="w-full h-full relative transition-all duration-300"
                  >
                    <img
                      src={IMAGES.doctorExam}
                      alt="Doctor examining patient with biomicroscope"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {condition === 'glaucoma' && (
                    <div
                      style={{
                        background: `radial-gradient(circle at center, transparent ${correctionLevel * 0.45 + 10}%, rgba(5,11,17,0.95) ${correctionLevel * 0.45 + 35}%)`,
                      }}
                      className="absolute inset-0 pointer-events-none transition-all duration-300"
                    />
                  )}

                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#17324D]/10 shadow-sm text-[11px] sm:text-xs font-bold text-[#17324D] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#72B7BC]" />
                    <span>
                      {condition === 'normal'
                        ? 'Simulated 20/20 Vision'
                        : `${conditions.find(c => c.id === condition)?.name} (${correctionLevel}%)`}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
