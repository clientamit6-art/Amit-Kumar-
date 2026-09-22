import React from 'react';
import {
  Target,
  Apple,
  Zap,
  Droplets,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  HeartPulse,
  Briefcase,
} from 'lucide-react';
import { motion } from 'motion/react';
import healthRoutineImg from '../assets/images/health_wellness_routine_1789990762826.jpg';

interface HealthSectionProps {
  onContactClick?: (type: 'health' | 'wealth') => void;
}

const WHATSAPP_NUMBER = '916398331007';
const HEALTH_WHATSAPP_MSG = encodeURIComponent('Hello, I would like to learn more about Health & Wellness.');
const WEALTH_WHATSAPP_MSG = encodeURIComponent('Hello, I would like to learn more about the Business Opportunity.');

const HEALTH_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${HEALTH_WHATSAPP_MSG}`;
const WEALTH_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WEALTH_WHATSAPP_MSG}`;

export const HealthSection: React.FC<HealthSectionProps> = ({ onContactClick }) => {
  const healthCards = [
    {
      id: 'healthy-weight',
      title: 'HEALTHY WEIGHT',
      description: 'Explore nutrition options that can complement a balanced lifestyle.',
      icon: Target,
    },
    {
      id: 'daily-nutrition',
      title: 'DAILY NUTRITION',
      description: 'Discover everyday nutrition and wellness support.',
      icon: Apple,
    },
    {
      id: 'fitness-performance',
      title: 'FITNESS & PERFORMANCE',
      description: 'Explore nutrition options designed around active lifestyles and fitness goals.',
      icon: Zap,
    },
    {
      id: 'skin-body-care',
      title: 'SKIN & BODY CARE',
      description: 'Explore personal care and everyday skin and body care products.',
      icon: Droplets,
    },
  ];

  return (
    <section
      id="health-section"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] border-t border-b border-[#E5E7EB] scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background architectural accents strictly in green and white */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[#E8F5EF]/50 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-[#E8F5EF]/40 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Label, Main Heading, Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/20 text-[#087A5A] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
            HEALTH & WELLNESS
          </div>

          {/* Main Heading - Dark text, not green */}
          <h2
            id="health-section-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111111] tracking-tight leading-[1.15] mb-5 text-balance"
          >
            BUILD A HEALTHIER EVERYDAY ROUTINE
          </h2>

          {/* Supporting Text - Neutral Gray */}
          <p
            id="health-section-subheading"
            className="text-base sm:text-lg text-[#5F6368] leading-relaxed font-normal"
          >
            Explore nutrition, wellness and everyday healthy-lifestyle support through products and personalized guidance.
          </p>
        </motion.div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Large High-Quality Wellness Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-[26px] overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-md p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8F5EF]">
                <img
                  src={healthRoutineImg}
                  alt="Healthy adult engaged in a clean and active daily wellness routine"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle soft dark-green gradient vignette at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/40 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-[#E5E7EB] shadow-sm flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-[#087A5A] shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#087A5A]">
                          Evidence-Based Care
                        </p>
                        <p className="text-sm font-bold text-[#111111] truncate">
                          Personalized Nutrition & Hydration
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#087A5A] bg-[#E8F5EF] px-2.5 py-1 rounded-full">
                      Daily Routine
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-image caption details */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#5F6368]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                  Balanced macronutrients & micronutrients
                </span>
                <span className="font-semibold text-[#087A5A]">Global Standards</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Four Premium Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {healthCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  id={`health-card-${card.id}`}
                  className="group relative p-6 rounded-[22px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#087A5A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-xs select-none"
                >
                  {/* Card Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF] group-hover:scale-105">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Card Title - Charcoal */}
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#087A5A] transition-colors mb-2 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Card Description - Neutral Gray */}
                  <p className="text-sm text-[#5F6368] leading-relaxed font-normal">
                    {card.description}
                  </p>

                  {/* Subtle bottom indicator */}
                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#5F6368] font-semibold">
                    <span>Category 0{idx + 1}</span>
                    <span className="text-[#087A5A] opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More →
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

        {/* INFORMATION + WHATSAPP CONTACT SECTION: Replaces product-shopping CTA */}
        <motion.div
          id="guidance-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16 pt-10 border-t border-[#E5E7EB]"
        >
          {/* Section Heading & Subheading */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/20 text-[#087A5A] text-xs font-extrabold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
              PERSONALIZED GUIDANCE
            </div>

            <h3
              id="guidance-main-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight mb-3"
            >
              READY TO LEARN MORE?
            </h3>

            <p
              id="guidance-supporting-text"
              className="text-sm sm:text-base text-[#5F6368] leading-relaxed font-normal"
            >
              Explore the information, understand what may be right for your wellness or business goals, and connect with us directly for personalized guidance.
            </p>

            {/* Information Journey Flow Indicator */}
            <div className="mt-4 inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#5F6368] bg-[#F9FAFB] border border-[#E5E7EB] px-3.5 py-1.5 rounded-full">
              <span className="text-[#087A5A] font-bold">LEARN</span>
              <span className="text-[#9CA3AF]">→</span>
              <span>UNDERSTAND</span>
              <span className="text-[#9CA3AF]">→</span>
              <span>CONTACT US</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="text-[#087A5A] font-bold">PERSONAL GUIDANCE</span>
            </div>
          </div>

          {/* TWO PREMIUM INFORMATION/CONTACT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* CARD 1 — HEALTH */}
            <div
              id="contact-card-health"
              className="p-6 sm:p-8 rounded-[24px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#087A5A]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mb-5">
                  <HeartPulse className="w-6 h-6" />
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#087A5A] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
                  Wellness Consultation
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">
                  HEALTH & WELLNESS
                </h4>

                <p className="text-sm sm:text-[15px] text-[#5F6368] leading-relaxed mb-6 font-normal">
                  Want to learn more about nutrition, wellness and available products? Connect with us and we'll explain everything personally.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                <a
                  id="whatsapp-ask-health-btn"
                  href={HEALTH_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onContactClick && onContactClick('health')}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-sm sm:text-[15px] font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                  <span>ASK ABOUT HEALTH →</span>
                </a>

                <p className="text-center text-xs text-[#5F6368] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                  Direct WhatsApp: +91 63983 31007
                </p>
              </div>
            </div>

            {/* CARD 2 — WEALTH */}
            <div
              id="contact-card-wealth"
              className="p-6 sm:p-8 rounded-[24px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#087A5A]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6" />
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#087A5A] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
                  Independent Opportunity
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-3 tracking-tight">
                  BUSINESS OPPORTUNITY
                </h4>

                <p className="text-sm sm:text-[15px] text-[#5F6368] leading-relaxed mb-6 font-normal">
                  Interested in learning how the Independent Associate business opportunity works? Connect with us for a personal explanation.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                <a
                  id="whatsapp-ask-wealth-btn"
                  href={WEALTH_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onContactClick && onContactClick('wealth')}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-sm sm:text-[15px] font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                  <span>ASK ABOUT WEALTH →</span>
                </a>

                <p className="text-center text-xs text-[#5F6368] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                  Direct WhatsApp: +91 63983 31007
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
