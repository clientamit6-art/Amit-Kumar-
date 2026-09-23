import React from 'react';
import {
  Compass,
  BookOpen,
  HelpCircle,
  MessageCircle,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import journeyConsultImg from '../assets/images/personal_wellness_guidance_1789992407640.jpg';

interface WellnessJourneyProps {
  onContactClick?: () => void;
}

const JOURNEY_WHATSAPP_NUMBER = '916398331007';
const JOURNEY_WHATSAPP_MSG = encodeURIComponent(
  'Hello, I have some questions and would like more information.'
);
const JOURNEY_WHATSAPP_URL = `https://wa.me/${JOURNEY_WHATSAPP_NUMBER}?text=${JOURNEY_WHATSAPP_MSG}`;

export const WellnessJourney: React.FC<WellnessJourneyProps> = ({ onContactClick }) => {
  const steps = [
    {
      step: '01',
      title: 'DISCOVER',
      description:
        'Explore information about wellness, nutrition, products and the business opportunity.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'UNDERSTAND',
      description:
        'Learn how the products, wellness categories and business opportunity work.',
      icon: BookOpen,
    },
    {
      step: '03',
      title: 'ASK',
      description:
        'Have questions? Ask us directly about anything you want to understand better.',
      icon: HelpCircle,
    },
    {
      step: '04',
      title: 'CONNECT',
      description:
        'Contact us through WhatsApp and start a direct conversation with our team.',
      icon: MessageCircle,
    },
    {
      step: '05',
      title: 'GET GUIDANCE',
      description:
        'We can personally explain the relevant information and help you understand your options.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      id="journey"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] border-t border-[#E5E7EB] scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle organic green background accents */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#E8F5EF]/35 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/20 text-[#087A5A] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
            YOUR JOURNEY
          </div>

          {/* Main Heading - Charcoal */}
          <h2
            id="journey-section-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] tracking-tight leading-[1.18] mb-5 text-balance"
          >
            FROM INFORMATION TO PERSONAL GUIDANCE
          </h2>

          {/* Supporting Text - Neutral Gray */}
          <p
            id="journey-section-subheading"
            className="text-base sm:text-lg text-[#5F6368] leading-relaxed font-normal"
          >
            Start by exploring the information that interests you. When you have questions or want to know more, connect with us directly for personal guidance.
          </p>
        </motion.div>

        {/* 5-STEP JOURNEY TIMELINE */}
        {/* Desktop: Horizontal connected sequence. Mobile: Continuous vertical line with clean steps */}
        <div className="mb-14 sm:mb-18">
          {/* DESKTOP TIMELINE (Hidden on mobile/tablet below lg) */}
          <div className="hidden lg:block relative">
            {/* Subtle connecting line across center */}
            <div className="absolute top-[48px] left-[7%] right-[7%] h-[2px] bg-[#E5E7EB] -z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    id={`journey-step-${item.step}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Step Node Circle with Number & Icon */}
                    <div className="relative mb-5">
                      <div className="w-24 h-24 rounded-2xl bg-[#FFFFFF] border-2 border-[#E5E7EB] group-hover:border-[#087A5A]/50 shadow-xs transition-all duration-300 flex flex-col items-center justify-center group-hover:-translate-y-1">
                        <span className="text-[11px] font-black text-[#087A5A] tracking-wider mb-1">
                          {item.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center transition-transform group-hover:scale-110">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] w-full flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-[#111111] tracking-tight mb-2 uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#5F6368] leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#E5E7EB] text-[10px] font-semibold text-[#087A5A] uppercase tracking-wider">
                        Phase 0{index + 1}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE & TABLET TIMELINE (Shown on screens < lg) */}
          <div className="lg:hidden relative pl-6 sm:pl-8 border-l-2 border-[#E5E7EB] space-y-6 sm:space-y-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  id={`journey-step-mobile-${item.step}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative group"
                >
                  {/* Visual Node dot along line */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full bg-[#FFFFFF] border-2 border-[#087A5A] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
                  </div>

                  {/* Step Card */}
                  <div className="p-5 sm:p-6 rounded-[20px] bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-[#087A5A] px-2.5 py-1 rounded-md bg-[#E8F5EF]">
                          STEP {item.step}
                        </span>
                        <h3 className="text-base font-extrabold text-[#111111] tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* LIFESTYLE GUIDANCE IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-18"
        >
          <div className="relative rounded-[26px] overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-md p-3 sm:p-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-[#E8F5EF]">
              <img
                src={journeyConsultImg}
                alt="Personal wellness guidance session with attentive coaching in a relaxed, sunlit interior"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/55 via-transparent to-transparent pointer-events-none" />

              {/* Overlay note */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-4 border border-[#E5E7EB] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#087A5A]">
                        Human Connection & Trust
                      </p>
                      <p className="text-sm font-bold text-[#111111]">
                        Personalized Explanation • No Pressure • Direct Answers
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#087A5A] bg-[#E8F5EF] px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Consultation via WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM WHATSAPP CTA */}
        <motion.div
          id="journey-cta-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="pt-4 border-t border-[#E5E7EB]"
        >
          <div className="rounded-[24px] bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5A] block mb-1">
                STEP-BY-STEP SUPPORT
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight">
                HAVE QUESTIONS?
              </h3>
              <p className="text-sm sm:text-base text-[#5F6368] mt-2 max-w-xl leading-relaxed font-normal">
                Talk to us directly and we'll help you understand the information you're interested in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="whatsapp-journey-cta-btn"
                href={JOURNEY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                <span>CHAT WITH US ON WHATSAPP →</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
