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
    <div id="choose-your-journey-wrapper" className="w-full max-w-2xl mt-2">
      {/* Section Header: Small elegant heading and supporting text */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
          <h2
            id="choose-journey-heading"
            className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-[#087A5A]"
          >
            CHOOSE YOUR JOURNEY
          </h2>
        </div>
        <p
          id="choose-journey-supporting-text"
          className="text-[#07563F]/75 text-sm sm:text-[15px] font-normal"
        >
          Start with the path that matches what you're looking for.
        </p>
      </div>

      {/* Two Large Interactive Journey Cards */}
      <div
        id="journey-cards-grid"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
      >
        {/* CARD 1: HEALTH */}
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
          className={`group relative text-left p-6 sm:p-7 rounded-[26px] bg-[#FFFFFF] border transition-all duration-300 cursor-pointer overflow-hidden select-none ${
            isHealth
              ? 'border-[#087A5A] ring-2 ring-[#087A5A] shadow-lg shadow-[#087A5A]/12'
              : 'border-[#E8F5EF] hover:border-[#087A5A]/40 hover:-translate-y-1 hover:shadow-md shadow-sm hover:bg-[#F7FBF8]'
          }`}
          aria-pressed={isHealth}
        >
          {/* Subtle green visual decorative accent in top right */}
          <div
            className={`pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full transition-opacity duration-300 ${
              isHealth ? 'bg-[#E8F5EF] opacity-90' : 'bg-[#E8F5EF]/50 opacity-40 group-hover:opacity-80'
            }`}
            aria-hidden="true"
          />

          {/* Top Row: Icon + Selected Badge */}
          <div className="relative z-10 flex items-start justify-between mb-5">
            {/* Premium Wellness Icon */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isHealth
                  ? 'bg-[#087A5A] text-[#FFFFFF] shadow-sm'
                  : 'bg-[#E8F5EF] text-[#087A5A] group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF] group-hover:scale-105'
              }`}
            >
              <HeartPulse className="w-7 h-7" />
            </div>

            {/* Status / Selected Indicator */}
            {isHealth ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EF] border border-[#087A5A]/25 text-[#087A5A] text-xs font-bold tracking-wider"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                SELECTED
              </motion.span>
            ) : (
              <span className="text-[11px] font-semibold text-[#07563F]/50 group-hover:text-[#087A5A] transition-colors uppercase tracking-wider">
                Pathway 01
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="relative z-10 space-y-2 mb-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#07563F] group-hover:text-[#087A5A] transition-colors">
              HEALTH
            </h3>
            <p className="text-[#07563F]/80 text-sm sm:text-[15px] leading-relaxed">
              Explore nutrition, wellness and products.
            </p>
          </div>

          {/* Clear CTA */}
          <div className="relative z-10 pt-2 border-t border-[#E8F5EF]">
            <span
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                isHealth
                  ? 'text-[#087A5A]'
                  : 'text-[#07563F] group-hover:text-[#087A5A]'
              }`}
            >
              <span>EXPLORE HEALTH</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#087A5A]" />
            </span>
          </div>
        </div>

        {/* CARD 2: WEALTH */}
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
          className={`group relative text-left p-6 sm:p-7 rounded-[26px] bg-[#FFFFFF] border transition-all duration-300 cursor-pointer overflow-hidden select-none ${
            isWealth
              ? 'border-[#087A5A] ring-2 ring-[#087A5A] shadow-lg shadow-[#087A5A]/12'
              : 'border-[#E8F5EF] hover:border-[#087A5A]/40 hover:-translate-y-1 hover:shadow-md shadow-sm hover:bg-[#F7FBF8]'
          }`}
          aria-pressed={isWealth}
        >
          {/* Subtle green visual decorative accent in top right */}
          <div
            className={`pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full transition-opacity duration-300 ${
              isWealth ? 'bg-[#E8F5EF] opacity-90' : 'bg-[#E8F5EF]/50 opacity-40 group-hover:opacity-80'
            }`}
            aria-hidden="true"
          />

          {/* Top Row: Icon + Selected Badge */}
          <div className="relative z-10 flex items-start justify-between mb-5">
            {/* Premium Business/Growth Icon */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isWealth
                  ? 'bg-[#087A5A] text-[#FFFFFF] shadow-sm'
                  : 'bg-[#E8F5EF] text-[#087A5A] group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF] group-hover:scale-105'
              }`}
            >
              <TrendingUp className="w-7 h-7" />
            </div>

            {/* Status / Selected Indicator */}
            {isWealth ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EF] border border-[#087A5A]/25 text-[#087A5A] text-xs font-bold tracking-wider"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                SELECTED
              </motion.span>
            ) : (
              <span className="text-[11px] font-semibold text-[#07563F]/50 group-hover:text-[#087A5A] transition-colors uppercase tracking-wider">
                Pathway 02
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="relative z-10 space-y-2 mb-6">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#07563F] group-hover:text-[#087A5A] transition-colors">
              WEALTH
            </h3>
            <p className="text-[#07563F]/80 text-sm sm:text-[15px] leading-relaxed">
              Explore the independent business opportunity.
            </p>
          </div>

          {/* Clear CTA */}
          <div className="relative z-10 pt-2 border-t border-[#E8F5EF]">
            <span
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
                isWealth
                  ? 'text-[#087A5A]'
                  : 'text-[#07563F] group-hover:text-[#087A5A]'
              }`}
            >
              <span>EXPLORE WEALTH</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-[#087A5A]" />
            </span>
          </div>
        </div>
      </div>

      {/* Smoothly Revealed Information Panels */}
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
            <div className="bg-[#FFFFFF] border border-[#087A5A]/30 rounded-[24px] p-6 sm:p-7 shadow-sm shadow-[#07563F]/5 relative">
              {/* Header of the panel */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E8F5EF]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#087A5A]">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A]">
                      Journey Selected
                    </span>
                    <h4 className="text-lg font-bold text-[#07563F] leading-snug">
                      Health & Nutrition Architecture
                    </h4>
                  </div>
                </div>

                {onClearPath && (
                  <button
                    type="button"
                    onClick={onClearPath}
                    className="p-1.5 rounded-lg text-[#07563F]/50 hover:text-[#07563F] hover:bg-[#E8F5EF] transition-colors cursor-pointer"
                    aria-label="Close panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#E8F5EF]">
                  <p className="text-xs font-bold text-[#07563F] mb-1">
                    Balanced Nutrition
                  </p>
                  <p className="text-xs text-[#07563F]/75 leading-relaxed">
                    Custom protein, vitamins, botanical teas and daily hydration.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#E8F5EF]">
                  <p className="text-xs font-bold text-[#07563F] mb-1">
                    Science & Quality
                  </p>
                  <p className="text-xs text-[#07563F]/75 leading-relaxed">
                    Formulated by renowned nutritional doctors and scientific advisory.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#E8F5EF]">
                  <p className="text-xs font-bold text-[#07563F] mb-1">
                    Dedicated Coaching
                  </p>
                  <p className="text-xs text-[#07563F]/75 leading-relaxed">
                    One-on-one wellness evaluations and supportive accountability.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#E8F5EF]">
                <span className="text-xs text-[#07563F]/70">
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
                  className="px-4 py-2 rounded-full bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
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
            <div className="bg-[#FFFFFF] border border-[#087A5A]/30 rounded-[24px] p-6 sm:p-7 shadow-sm shadow-[#07563F]/5 relative">
              {/* Header of the panel */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E8F5EF]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#087A5A]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A]">
                      Journey Selected
                    </span>
                    <h4 className="text-lg font-bold text-[#07563F] leading-snug">
                      Independent Business Opportunity
                    </h4>
                  </div>
                </div>

                {onClearPath && (
                  <button
                    type="button"
                    onClick={onClearPath}
                    className="p-1.5 rounded-lg text-[#07563F]/50 hover:text-[#07563F] hover:bg-[#E8F5EF] transition-colors cursor-pointer"
                    aria-label="Close panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#E8F5EF]">
                  <p className="text-xs font-bold text-[#07563F] mb-1">
                    Flexible Schedule
                  </p>
                  <p className="text-xs text-[#07563F]/75 leading-relaxed">
                    Build your business part-time or full-time around your current lifestyle.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#E8F5EF]">
                  <p className="text-xs font-bold text-[#07563F] mb-1">
                    Proven Training
                  </p>
                  <p className="text-xs text-[#07563F]/75 leading-relaxed">
                    Comprehensive digital education, mentor pairing, and retail tools.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#E8F5EF]">
                  <p className="text-xs font-bold text-[#07563F] mb-1">
                    Gold Standard
                  </p>
                  <p className="text-xs text-[#07563F]/75 leading-relaxed">
                    Low startup barrier, product return guarantees, and transparent standards.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#E8F5EF]">
                <span className="text-xs text-[#07563F]/70">
                  Ready to explore entrepreneurship and distributor mentoring?
                </span>
                <button
                  type="button"
                  onClick={() => onSelectPath('wealth')}
                  className="px-4 py-2 rounded-full bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Explore Business Details
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
