import React from 'react';
import {
  Briefcase,
  Users,
  GraduationCap,
  Clock,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Compass,
  MessageSquare,
  CheckSquare,
} from 'lucide-react';
import { motion } from 'motion/react';
import businessImg from '../assets/images/business_mentorship_guidance_1789991692037.jpg';

interface WealthSectionProps {
  onContactClick?: () => void;
}

const WEALTH_WHATSAPP_NUMBER = '916398331007';
const WEALTH_WHATSAPP_MSG = encodeURIComponent(
  'Hello, I would like to learn more about the Herbalife Business Opportunity.'
);
const WEALTH_WHATSAPP_URL = `https://wa.me/${WEALTH_WHATSAPP_NUMBER}?text=${WEALTH_WHATSAPP_MSG}`;

export const WealthSection: React.FC<WealthSectionProps> = ({ onContactClick }) => {
  const infoCards = [
    {
      id: 'independent-associate',
      title: 'INDEPENDENT ASSOCIATE',
      text: 'Learn about the role of an Independent Associate and how they connect customers with Herbalife products and wellness support.',
      icon: Briefcase,
    },
    {
      id: 'personal-guidance',
      title: 'PERSONAL GUIDANCE',
      text: "Independent Associates can provide product information, wellness guidance and support based on the customer's interests.",
      icon: Users,
    },
    {
      id: 'training-resources',
      title: 'TRAINING & RESOURCES',
      text: 'Explore the training, tools and resources available to Independent Associates as they learn about the products and business model.',
      icon: GraduationCap,
    },
    {
      id: 'build-at-your-own-pace',
      title: 'BUILD AT YOUR OWN PACE',
      text: 'Learn about the opportunity and decide how you want to participate based on your own goals, time and circumstances.',
      icon: Clock,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'LEARN',
      description: 'Explore the company background, product philosophy, and Independent Associate structure.',
      icon: BookOpen,
    },
    {
      step: '02',
      title: 'UNDERSTAND',
      description: 'Review the guidelines, Gold Standard consumer protections, and operational ethics.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'GET GUIDANCE',
      description: 'Ask detailed questions in a 1-on-1 consultation with an experienced Associate.',
      icon: MessageSquare,
    },
    {
      step: '04',
      title: 'DECIDE',
      description: 'Evaluate your own schedule, interests, and individual goals with full transparency.',
      icon: CheckSquare,
    },
  ];

  return (
    <section
      id="wealth-section"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] border-t border-b border-[#E8F5EF] scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background architectural accents strictly in green and white */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-96 h-96 bg-[#E8F5EF]/45 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-[#E8F5EF]/40 rounded-full blur-3xl -z-10"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/15 text-[#087A5A] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
            BUSINESS OPPORTUNITY
          </div>

          {/* Main Heading */}
          <h2
            id="wealth-section-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#07563F] tracking-tight leading-[1.15] mb-5 text-balance"
          >
            BUILD YOUR OWN BUSINESS JOURNEY
          </h2>

          {/* Supporting Text */}
          <p
            id="wealth-section-subheading"
            className="text-base sm:text-lg text-[#07563F]/80 leading-relaxed font-normal"
          >
            Learn how the Herbalife Independent Associate model works, what support is available, and how you can explore the opportunity for yourself.
          </p>
        </motion.div>

        {/* Two-Column Responsive Layout: Left Image, Right 4 Informational Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18">
          {/* LEFT SIDE: Realistic Business & Mentorship Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-[26px] overflow-hidden bg-[#FFFFFF] border border-[#E8F5EF] shadow-lg shadow-[#07563F]/5 p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8F5EF]">
                <img
                  src={businessImg}
                  alt="Herbalife Independent Associate mentorship and professional wellness discussion in a modern setting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle dark-green gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/45 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-[#E8F5EF] shadow-sm flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-[#087A5A] shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#087A5A]">
                          Independent Associate Model
                        </p>
                        <p className="text-sm font-bold text-[#07563F] truncate">
                          Gold Standard Ethical Protections
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#087A5A] bg-[#E8F5EF] px-2.5 py-1 rounded-full">
                      India Since 1999
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-image caption details */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#07563F]/75">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                  Self-paced learning & direct mentorship
                </span>
                <span className="font-semibold text-[#087A5A]">Transparent Model</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Four Premium Informational Cards */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {infoCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  id={`wealth-card-${card.id}`}
                  className="group relative p-6 rounded-[22px] bg-[#FFFFFF] border border-[#E8F5EF] hover:border-[#087A5A]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-sm select-none flex flex-col justify-between"
                >
                  <div>
                    {/* Card Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF] group-hover:scale-105">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#07563F] group-hover:text-[#087A5A] transition-colors mb-2 tracking-tight">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-sm text-[#07563F]/80 leading-relaxed font-normal">
                      {card.text}
                    </p>
                  </div>

                  {/* Subtle bottom indicator */}
                  <div className="mt-4 pt-3 border-t border-[#E8F5EF] flex items-center justify-between text-xs text-[#087A5A] font-semibold">
                    <span>Pillar 0{idx + 1}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Inquire on WhatsApp →
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* INFORMATION FLOW: LEARN → UNDERSTAND → GET GUIDANCE → DECIDE */}
        <motion.div
          id="wealth-process-flow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-16 p-6 sm:p-8 rounded-[24px] bg-[#F7FBF8] border border-[#E8F5EF] shadow-sm"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087A5A] block mb-1">
              TRANSPARENT DECISION PROCESS
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#07563F]">
              HOW TO EXPLORE THE OPPORTUNITY
            </h3>
            <p className="text-sm text-[#07563F]/80 mt-2 font-normal leading-relaxed">
              Start by learning how the opportunity works. Ask questions, understand the requirements and decide whether it is right for you.
            </p>
          </div>

          {/* 4 Clean Green Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  id={`wealth-step-${step.title.toLowerCase()}`}
                  className="relative p-5 rounded-[20px] bg-[#FFFFFF] border border-[#E8F5EF] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-lg bg-[#E8F5EF] text-[#087A5A] font-extrabold text-xs flex items-center justify-center">
                        {step.step}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-[#E8F5EF]/60 text-[#087A5A] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-base font-extrabold text-[#07563F] mb-1.5 tracking-tight">
                      {step.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#07563F]/80 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#E8F5EF] shadow-xs flex items-center justify-center text-[#087A5A]">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CONTACT CTA: Premium WhatsApp Contact Area */}
        <motion.div
          id="wealth-cta-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4 border-t border-[#E8F5EF]"
        >
          <div className="rounded-[24px] bg-[#F7FBF8] border border-[#E8F5EF] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5A] block mb-1">
                PERSONALIZED CLARIFICATION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07563F]">
                CURIOUS ABOUT THE OPPORTUNITY?
              </h3>
              <p className="text-sm text-[#07563F]/75 mt-1.5 max-w-xl leading-relaxed font-normal">
                Talk to us directly and we'll explain how the business opportunity works and answer your questions personally.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="whatsapp-wealth-cta-btn"
                href={WEALTH_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-sm sm:text-base font-bold tracking-wide shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                <span>CHAT ON WHATSAPP →</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
