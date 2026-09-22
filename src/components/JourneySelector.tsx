import React from 'react';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Users,
  Compass,
  HeartPulse,
  Award,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JourneySelectorProps {
  selectedPath: 'health' | 'wealth' | null;
  onSelectPath: (path: 'health' | 'wealth') => void;
  onClearPath?: () => void;
}

export const JourneySelector: React.FC<JourneySelectorProps> = ({
  selectedPath,
  onSelectPath,
  onClearPath,
}) => {
  const isHealth = selectedPath === 'health';
  const isWealth = selectedPath === 'wealth';

  return (
    <div id="choose-your-journey-wrapper" className="w-full max-w-2xl mt-1 sm:mt-2">
      {/* Section Header: Small elegant heading and supporting text */}
      <div className="mb-3 sm:mb-5">
        <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
          <h2
            id="choose-journey-heading"
            className="text-[11px] sm:text-sm font-extrabold uppercase tracking-[0.16em] text-[#087A5A]"
          >
            CHOOSE YOUR JOURNEY
          </h2>
        </div>
        <p
          id="choose-journey-supporting-text"
          className="text-[#5F6368] text-xs sm:text-[15px] font-normal"
        >
          Start with the path that matches what you're looking for.
        </p>
      </div>

      {/* Two Interactive Journey Cards: Compact 2-column layout on mobile, spacious on desktop */}
      <div
        id="journey-cards-grid"
        className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-5 w-full"
      >
        {/* CARD 1: HEALTH - Subtle health-related light green background */}
        <div
          id="journey-card-health"
          role="button"
          tabIndex={0}
          onClick={() => onSelectPath('health')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectPath('health');
            }
          }}
          className={`group relative text-left p-3 xs:p-4 sm:p-7 rounded-2xl sm:rounded-[26px] border transition-all duration-300 cursor-pointer overflow-hidden select-none flex flex-col justify-between ${
            isHealth
              ? 'bg-[#E8F5EF] border-[#087A5A] ring-2 ring-[#087A5A] shadow-md sm:shadow-lg shadow-[#087A5A]/15'
              : 'bg-[#F4F9F6] border-[#D1E7DD] hover:border-[#087A5A]/50 hover:bg-[#E8F5EF]/70 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-md shadow-xs'
          }`}
          aria-pressed={isHealth}
        >
          {/* Subtle green visual decorative accent in top right */}
          <div
            className={`pointer-events-none absolute -top-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-opacity duration-300 ${
              isHealth ? 'bg-[#087A5A]/10 opacity-90' : 'bg-[#087A5A]/5 opacity-40 group-hover:opacity-80'
            }`}
            aria-hidden="true"
          />

          <div>
            {/* Top Row: Icon + Selected Badge */}
            <div className="relative z-10 flex items-start justify-between mb-2 sm:mb-5">
              {/* Premium Wellness Icon */}
              <div
                className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isHealth
                    ? 'bg-[#087A5A] text-[#FFFFFF] shadow-xs sm:shadow-sm'
                    : 'bg-[#FFFFFF] text-[#087A5A] border border-[#087A5A]/20 group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF] group-hover:scale-105'
                }`}
              >
                <HeartPulse className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7" />
              </div>

              {/* Status / Selected Indicator */}
              {isHealth ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FFFFFF] border border-[#087A5A]/30 text-[#087A5A] text-[9px] sm:text-xs font-bold tracking-wider shadow-xs"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#087A5A]" />
                  <span className="sm:inline">ACTIVE</span>
                </motion.span>
              ) : (
                <span className="text-[9px] sm:text-[11px] font-semibold text-[#5F6368] group-hover:text-[#087A5A] transition-colors uppercase tracking-wider">
                  <span className="sm:hidden">01</span>
                  <span className="hidden sm:inline">Pathway 01</span>
                </span>
              )}
            </div>

            {/* Title & Description - Dark text, not green */}
            <div className="relative z-10 space-y-0.5 sm:space-y-2 mb-2.5 sm:mb-6">
              <h3 className="text-sm xs:text-base sm:text-2xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#087A5A] transition-colors leading-tight">
                HEALTH
              </h3>
              <p className="text-[#5F6368] text-[10px] xs:text-[11px] sm:text-[15px] leading-tight sm:leading-relaxed">
                <span className="sm:hidden">Nutrition & Wellness</span>
                <span className="hidden sm:inline">Explore nutrition, wellness and products.</span>
              </p>
            </div>
          </div>

          {/* Clear CTA */}
          <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-[#087A5A]/15">
            <span
              className={`inline-flex items-center justify-between w-full text-[10px] sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                isHealth
                  ? 'text-[#087A5A]'
                  : 'text-[#111111] group-hover:text-[#087A5A]'
              }`}
            >
              <span>
                <span className="sm:hidden">EXPLORE</span>
                <span className="hidden sm:inline">EXPLORE HEALTH</span>
              </span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 text-[#087A5A]" />
            </span>
          </div>
        </div>

        {/* CARD 2: WEALTH - Distinct sophisticated dark charcoal / deep green combination */}
        <div
          id="journey-card-wealth"
          role="button"
          tabIndex={0}
          onClick={() => onSelectPath('wealth')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectPath('wealth');
            }
          }}
          className={`group relative text-left p-3 xs:p-4 sm:p-7 rounded-2xl sm:rounded-[26px] border transition-all duration-300 cursor-pointer overflow-hidden select-none flex flex-col justify-between ${
            isWealth
              ? 'bg-[#111613] border-[#087A5A] ring-2 ring-[#087A5A] shadow-lg shadow-[#000000]/25'
              : 'bg-[#171C19] border-[#2B3831] hover:border-[#087A5A]/70 hover:bg-[#1C2320] hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-md shadow-xs'
          }`}
          aria-pressed={isWealth}
        >
          {/* Subtle green ambient accent */}
          <div
            className={`pointer-events-none absolute -top-8 -right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-opacity duration-300 ${
              isWealth ? 'bg-[#087A5A]/25 opacity-90' : 'bg-[#087A5A]/15 opacity-40 group-hover:opacity-80'
            }`}
            aria-hidden="true"
          />

          <div>
            {/* Top Row: Icon + Selected Badge */}
            <div className="relative z-10 flex items-start justify-between mb-2 sm:mb-5">
              {/* Premium Business/Growth Icon */}
              <div
                className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isWealth
                    ? 'bg-[#087A5A] text-[#FFFFFF] shadow-xs sm:shadow-sm'
                    : 'bg-[#243029] text-[#34D399] border border-[#34D399]/20 group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF] group-hover:scale-105'
                }`}
              >
                <TrendingUp className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7" />
              </div>

              {/* Status / Selected Indicator */}
              {isWealth ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#243029] border border-[#34D399]/40 text-[#34D399] text-[9px] sm:text-xs font-bold tracking-wider"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#34D399]" />
                  <span className="sm:inline">ACTIVE</span>
                </motion.span>
              ) : (
                <span className="text-[9px] sm:text-[11px] font-semibold text-[#9CA3AF] group-hover:text-[#34D399] transition-colors uppercase tracking-wider">
                  <span className="sm:hidden">02</span>
                  <span className="hidden sm:inline">Pathway 02</span>
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div className="relative z-10 space-y-0.5 sm:space-y-2 mb-2.5 sm:mb-6">
              <h3 className="text-sm xs:text-base sm:text-2xl font-extrabold tracking-tight text-[#FFFFFF] group-hover:text-[#34D399] transition-colors leading-tight">
                WEALTH
              </h3>
              <p className="text-[#9CA3AF] text-[10px] xs:text-[11px] sm:text-[15px] leading-tight sm:leading-relaxed">
                <span className="sm:hidden">Business Opportunity</span>
                <span className="hidden sm:inline">Explore the independent business opportunity.</span>
              </p>
            </div>
          </div>

          {/* Clear CTA */}
          <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-[#2B3831]">
            <span
              className={`inline-flex items-center justify-between w-full text-[10px] sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                isWealth
                  ? 'text-[#34D399]'
                  : 'text-[#FFFFFF] group-hover:text-[#34D399]'
              }`}
            >
              <span>
                <span className="sm:hidden">EXPLORE</span>
                <span className="hidden sm:inline">EXPLORE WEALTH</span>
              </span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 text-[#34D399]" />
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Informational Panels (Hidden on mobile to prevent excessive scrolling/double panels) */}
      <div className="hidden sm:block">
        <AnimatePresence mode="wait">
        {isHealth && (
          <motion.div
            key="health-panel"
            id="health-information-panel"
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-6"
          >
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[24px] p-6 sm:p-7 shadow-sm relative">
              {/* Header of the panel */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#087A5A]">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A]">
                      Journey Selected
                    </span>
                    <h4 className="text-lg font-bold text-[#111111] leading-snug">
                      Health & Nutrition Architecture
                    </h4>
                  </div>
                </div>

                {onClearPath && (
                  <button
                    type="button"
                    onClick={onClearPath}
                    className="p-1.5 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                    aria-label="Close panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    Balanced Nutrition
                  </p>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Custom protein, vitamins, botanical teas and daily hydration.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    Science & Quality
                  </p>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Formulated by renowned nutritional doctors and scientific advisory.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    Dedicated Coaching
                  </p>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    One-on-one wellness evaluations and supportive accountability.
                  </p>
                </div>
              </div>

              {/* Action Button (Primary Button System) */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                <span className="text-xs text-[#5F6368]">
                  Ready to discover nutrition programs tailored to you?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPath('health');
                    setTimeout(() => {
                      const el = document.getElementById('health-section');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 50);
                  }}
                  className="px-5 py-2.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-xs font-bold tracking-wide transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  Explore Health Programs
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {isWealth && (
          <motion.div
            key="wealth-panel"
            id="wealth-information-panel"
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-6"
          >
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[24px] p-6 sm:p-7 shadow-sm relative">
              {/* Header of the panel */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#087A5A]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A]">
                      Journey Selected
                    </span>
                    <h4 className="text-lg font-bold text-[#111111] leading-snug">
                      Independent Business Opportunity
                    </h4>
                  </div>
                </div>

                {onClearPath && (
                  <button
                    type="button"
                    onClick={onClearPath}
                    className="p-1.5 rounded-lg text-[#5F6368] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                    aria-label="Close panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    Flexible Schedule
                  </p>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Build your business part-time or full-time around your current lifestyle.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    Proven Training
                  </p>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Comprehensive digital education, mentor pairing, and retail tools.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111111] mb-1">
                    Gold Standard
                  </p>
                  <p className="text-xs text-[#5F6368] leading-relaxed">
                    Low startup barrier, product return guarantees, and transparent standards.
                  </p>
                </div>
              </div>

              {/* Action Button (Primary Button System) */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                <span className="text-xs text-[#5F6368]">
                  Ready to explore entrepreneurship and distributor mentoring?
                </span>
                <button
                  type="button"
                  onClick={() => onSelectPath('wealth')}
                  className="px-5 py-2.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-xs font-bold tracking-wide transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  Explore Business Details
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};
