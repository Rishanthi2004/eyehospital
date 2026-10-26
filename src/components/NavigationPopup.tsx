import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Eye,
  Building2,
  Layers,
  Sparkles,
  UserCheck,
  Cpu,
  ShieldCheck,
  Compass,
  Star,
  HelpCircle,
  Calendar,
  X,
} from 'lucide-react';

export interface SectionInfo {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export const SECTIONS_METADATA: Record<string, SectionInfo> = {
  hero: {
    id: 'hero',
    badge: 'Page Entrance',
    title: 'Oculus Eye Hospital',
    subtitle: 'Advanced Ophthalmic Care & Microsurgery',
    iconName: 'Eye',
  },
  welcome: {
    id: 'welcome',
    badge: 'Hospital Overview',
    title: 'Welcome to Oculus',
    subtitle: 'Clinical Excellence & Medical Governance',
    iconName: 'Building2',
  },
  services: {
    id: 'services',
    badge: 'Clinical Subspecialties',
    title: 'Comprehensive Eye Care',
    subtitle: '10 Subspecialties & Cataract Guidance',
    iconName: 'Layers',
  },
  anatomy: {
    id: 'anatomy',
    badge: 'Optics & Anatomy',
    title: 'Eye Anatomy Explorer',
    subtitle: 'Interactive Optics & Vision Simulator',
    iconName: 'Sparkles',
  },
  specialists: {
    id: 'specialists',
    badge: 'Faculty Surgeons',
    title: 'Meet Our Eye Specialists',
    subtitle: 'Board Certified & Fellowship Trained',
    iconName: 'UserCheck',
  },
  technology: {
    id: 'technology',
    badge: 'Diagnostics & Lasers',
    title: 'Surgical & Laser Systems',
    subtitle: 'Femtosecond, SMILE & High-Res OCT',
    iconName: 'Cpu',
  },
  highlights: {
    id: 'highlights',
    badge: 'Clinical Quality',
    title: 'Why Patients Choose Us',
    subtitle: 'Zero-Radiation & Ultra-Clean Suites',
    iconName: 'ShieldCheck',
  },
  journey: {
    id: 'journey',
    badge: 'Patient Experience',
    title: 'Your Care Pathway',
    subtitle: '4-Step Consultation to Recovery',
    iconName: 'Compass',
  },
  reviews: {
    id: 'reviews',
    badge: 'Patient Feedback',
    title: 'Verified Clinical Outcomes',
    subtitle: '5-Star Trust & Restored Vision',
    iconName: 'Star',
  },
  faqs: {
    id: 'faqs',
    badge: 'Patient Support',
    title: 'Frequently Asked Questions',
    subtitle: 'Insurance, Preparation & Patient Safety',
    iconName: 'HelpCircle',
  },
  contact: {
    id: 'contact',
    badge: 'Direct Concierge',
    title: 'Schedule Your Visit',
    subtitle: 'Same-Day Consultations & Rapid Triage',
    iconName: 'Calendar',
  },
};

const renderIcon = (name: string) => {
  const iconProps = { className: 'w-5 h-5 text-[#45AC8B]' };
  switch (name) {
    case 'Eye':
      return <Eye {...iconProps} />;
    case 'Building2':
      return <Building2 {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'UserCheck':
      return <UserCheck {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} />;
    case 'Compass':
      return <Compass {...iconProps} />;
    case 'Star':
      return <Star {...iconProps} />;
    case 'HelpCircle':
      return <HelpCircle {...iconProps} />;
    case 'Calendar':
      return <Calendar {...iconProps} />;
    default:
      return <Eye {...iconProps} />;
  }
};

export const NavigationPopup: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<SectionInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);

  const hideTimeoutRef = useRef<number | null>(null);
  const lastSectionRef = useRef<string>('');

  const displayPopup = (sectionId: string) => {
    const meta = SECTIONS_METADATA[sectionId];
    if (!meta) return;

    // Clear previous timer
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    setActiveSection(meta);
    setTriggerKey((k) => k + 1);
    setIsVisible(true);

    // Auto-hide after exactly 2.8 seconds
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 2800);
  };

  useEffect(() => {
    // 1. Initial page load entrance popup
    const hash = window.location.hash.replace('#', '');
    const initialSection = hash && SECTIONS_METADATA[hash] ? hash : 'hero';
    lastSectionRef.current = initialSection;
    displayPopup(initialSection);

    // 2. Click listener for navigation links (Header, mobile drawer, footer, anchor buttons)
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href) {
          const sectionId = href === '#' ? 'hero' : href.replace('#', '');
          if (SECTIONS_METADATA[sectionId]) {
            lastSectionRef.current = sectionId;
            displayPopup(sectionId);
          }
        }
      }
    };
    document.addEventListener('click', handleLinkClick, { capture: true });

    // 3. Hash change listener
    const handleHashChange = () => {
      const sectionId = window.location.hash.replace('#', '');
      if (sectionId && SECTIONS_METADATA[sectionId]) {
        lastSectionRef.current = sectionId;
        displayPopup(sectionId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    // 4. Scroll IntersectionObserver to detect navigating into sections
    const sectionIds = Object.keys(SECTIONS_METADATA);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Trigger whenever the user scrolls into a different section
            if (sectionId && sectionId !== lastSectionRef.current && SECTIONS_METADATA[sectionId]) {
              lastSectionRef.current = sectionId;
              displayPopup(sectionId);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.15,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50 pointer-events-none select-none max-w-[calc(100vw-2rem)]"
    >
      <AnimatePresence mode="wait">
        {isVisible && activeSection && (
          <motion.div
            key={`${activeSection.id}-${triggerKey}`}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -18, scale: 0.92, filter: 'blur(6px)' }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -14, scale: 0.95, filter: 'blur(4px)' }
            }
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 340,
            }}
            className="pointer-events-auto relative flex items-center gap-3 sm:gap-3.5 pl-3.5 pr-2.5 py-3 rounded-2xl bg-white/95 dark:bg-[#16382C]/95 backdrop-blur-xl border border-[#45AC8B]/35 shadow-[0_12px_40px_rgba(22,56,44,0.18)] max-w-xs sm:max-w-sm overflow-hidden"
          >
            {/* Animated linear progress countdown bar in scrub green */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 2.8, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#45AC8B] via-[#45AC8B] to-[#16382C] origin-left"
            />

            {/* Icon with pulsing background halo */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E9F6F1] border border-[#45AC8B]/30 flex items-center justify-center shrink-0 shadow-xs">
              <span className="absolute inset-0 rounded-xl bg-[#45AC8B]/20 animate-ping [animation-duration:2.5s]" />
              <div className="relative z-10">{renderIcon(activeSection.iconName)}</div>
            </div>

            {/* Text details */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#45AC8B] mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#45AC8B] animate-pulse" />
                <span>{activeSection.badge}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-[#16382C] font-display leading-snug truncate">
                {activeSection.title}
              </h4>
              <p className="text-[11px] text-[#16382C]/70 truncate max-w-[190px] sm:max-w-[230px]">
                {activeSection.subtitle}
              </p>
            </div>

            {/* Right side: Dismiss X button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-[#16382C]/40 hover:text-[#16382C] hover:bg-[#E9F6F1] rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
