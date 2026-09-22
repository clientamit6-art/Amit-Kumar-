import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import heroLifestyleImg from '../assets/images/wellness_lifestyle_1789990124306.jpg';
import { JourneySelector } from './JourneySelector';

interface HeroProps {
  selectedPath?: 'health' | 'wealth' | null;
  onSelectPath?: (path: 'health' | 'wealth') => void;
  onClearPath?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedPath: controlledPath,
  onSelectPath,
  onClearPath,
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
      className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 bg-[#F7FBF8]"
    >
      {/* Subtle organic light green architectural background accents strictly in #E8F5EF and #FFFFFF */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E8F5EF]/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-[#E8F5EF]/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Headline, supporting text, and the two large interactive buttons */}
          <motion.div
            id="hero-content-col"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/15 text-[#087A5A] text-xs sm:text-sm font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
              Herbalife Wellness & Business Platform
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-headline"
              className="text-[#07563F] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] mb-6 text-balance"
            >
              TRANSFORM YOUR WELLNESS. BUILD YOUR OPPORTUNITY.
            </h1>

            {/* Supporting Text */}
            <p
              id="hero-supporting-text"
              className="text-[#07563F]/80 text-lg sm:text-xl font-normal leading-relaxed mb-10 max-w-2xl"
            >
              Explore nutrition, wellness guidance, products and an opportunity to build your own business journey.
            </p>

            {/* Premium Journey Selector (HEALTH & WEALTH) */}
            <JourneySelector
              selectedPath={selectedPath}
              onSelectPath={handlePathClick}
              onClearPath={handleClearPath}
            />
          </motion.div>

          {/* RIGHT SIDE: Premium, realistic wellness/business lifestyle visual */}
          <motion.div
            id="hero-visual-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Container Card */}
            <div className="relative rounded-3xl overflow-hidden bg-[#FFFFFF] border border-[#E8F5EF] shadow-xl shadow-[#07563F]/6 p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/3] bg-[#E8F5EF]">
                <img
                  src={heroLifestyleImg}
                  alt="Modern wellness and independent business lifestyle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle soft gradient overlay in dark green at bottom to anchor text badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/40 via-transparent to-transparent pointer-events-none" />

                {/* Integrated Floating Badge inside visual container */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-[#E8F5EF] shadow-md flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-[#087A5A] shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#087A5A]">
                          Trusted Ecosystem
                        </p>
                        <p className="text-sm font-bold text-[#07563F] truncate">
                          Nutrition Science & Independence
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center text-xs font-medium text-[#07563F]/75 bg-[#F7FBF8] px-2.5 py-1 rounded-full border border-[#E8F5EF]">
                      Worldwide
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Sub-visual Status pill */}
              <div className="mt-3.5 px-2 flex items-center justify-between text-xs text-[#07563F]/75">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
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
