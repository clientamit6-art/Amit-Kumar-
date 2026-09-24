import React, { useState } from 'react';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import heroLifestyleImg from '../assets/images/wellness_lifestyle_1789990124306.jpg';
import { JourneySelector } from './JourneySelector';

interface HeroProps {
  selectedPath?: 'health' | 'wealth' | null;
  onSelectPath?: (path: 'health' | 'wealth') => void;
  onClearPath?: () => void;
  onAmbassadorsClick?: () => void;
  onBookAppointmentClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedPath: controlledPath,
  onSelectPath,
  onClearPath,
  onAmbassadorsClick,
  onBookAppointmentClick,
}) => {
  const [internalPath, setInternalPath] = useState<'health' | 'wealth' | null>(null);

  const selectedPath = controlledPath !== undefined ? controlledPath : internalPath;

  const handlePathClick = (path: 'health' | 'wealth') => {
    setInternalPath(path);
    if (onSelectPath) {
      onSelectPath(path);
    }
  };

  const handleClearPath = () => {
    setInternalPath(null);
    if (onClearPath) {
      onClearPath();
    }
  };

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden pt-4 pb-8 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 bg-[#F9FAFB] border-b border-[#E5E7EB] w-full"
    >
      {/* Subtle organic light green architectural background accents strictly in #E8F5EF and #FFFFFF */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#E8F5EF]/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-32 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#E8F5EF]/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Headline, supporting text, and the compact two-choice interactive journey selector */}
          <motion.div
            id="hero-content-col"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center w-full min-w-0"
          >
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 self-start px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/20 text-[#087A5A] text-[11px] sm:text-sm font-semibold tracking-wide mb-2 sm:mb-5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#087A5A]" />
              Amit Wellness
            </div>

            {/* Main Headline - Compact on mobile, grand on desktop */}
            <h1
              id="hero-main-headline"
              className="text-[#111111] text-2xl xs:text-[26px] sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.15] mb-2 sm:mb-5 text-balance"
            >
              TRANSFORM YOUR WELLNESS.{' '}
              <span className="block sm:inline">BUILD YOUR OPPORTUNITY.</span>
            </h1>

            {/* Supporting Text - Short, clear, and scannable */}
            <p
              id="hero-supporting-text"
              className="text-[#5F6368] text-xs sm:text-lg lg:text-xl font-normal leading-snug sm:leading-relaxed mb-3.5 sm:mb-8 max-w-2xl"
            >
              Explore wellness guidance and an opportunity to build your journey.
            </p>

            {/* Premium Journey Selector (HEALTH, WEALTH & AMBASSADORS) - Appears immediately near top */}
            <JourneySelector
              selectedPath={selectedPath}
              onSelectPath={handlePathClick}
              onClearPath={handleClearPath}
              onAmbassadorsClick={onAmbassadorsClick}
            />

            {/* Quick Location-Verified Appointment Trigger */}
            {onBookAppointmentClick && (
              <div className="mt-4 sm:mt-5 pt-3 border-t border-[#E5E7EB]/80 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onBookAppointmentClick}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8F5EF] hover:bg-[#d4ede0] text-[#087A5A] text-xs sm:text-sm font-bold border border-[#087A5A]/25 transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#087A5A]" />
                  <span>Book Appointment (Current Location Verified)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#087A5A]" />
                </button>
                <span className="text-[11px] text-[#5F6368]">
                  • In-person & home wellness consultations
                </span>
              </div>
            )}
          </motion.div>

          {/* RIGHT SIDE: Premium wellness/business lifestyle visual - naturally responsive */}
          <motion.div
            id="hero-visual-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mt-3 sm:mt-6 lg:mt-0 w-full"
          >
            {/* Visual Container Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-md sm:shadow-xl p-2.5 sm:p-4">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] bg-[#E8F5EF]">
                <img
                  src={heroLifestyleImg}
                  alt="Modern wellness and independent business lifestyle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle soft gradient overlay in dark green at bottom to anchor text badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/40 via-transparent to-transparent pointer-events-none" />

                {/* Integrated Floating Badge inside visual container */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-2.5 sm:p-4 border border-[#E5E7EB] shadow-sm sm:shadow-md flex items-center justify-between gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-[#087A5A] shrink-0">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#087A5A]">
                          Trusted Ecosystem
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-[#111111] truncate">
                          Nutrition Science & Independence
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center text-xs font-medium text-[#5F6368] bg-[#F9FAFB] px-2.5 py-1 rounded-full border border-[#E5E7EB] shrink-0">
                      Worldwide
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Sub-visual Status pill */}
              <div className="mt-2.5 sm:mt-3.5 px-1.5 sm:px-2 flex items-center justify-between text-[11px] sm:text-xs text-[#5F6368]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#087A5A]" />
                  Verified wellness principles
                </span>
                <span className="font-semibold text-[#087A5A]">Independent Guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
