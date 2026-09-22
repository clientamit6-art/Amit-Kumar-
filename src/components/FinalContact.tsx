import React from 'react';
import {
  MessageCircle,
  Heart,
  Briefcase,
  Phone,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface FinalContactProps {
  onHealthClick?: () => void;
  onWealthClick?: () => void;
}

const WHATSAPP_NUMBER = '916398331007';
const HEALTH_MSG = encodeURIComponent(
  'Hello, I would like to learn more about Health & Wellness.'
);
const WEALTH_MSG = encodeURIComponent(
  'Hello, I would like to learn more about the Business Opportunity.'
);
const GENERAL_MSG = encodeURIComponent(
  'Hello, I visited your website and would like to know more.'
);

const HEALTH_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${HEALTH_MSG}`;
const WEALTH_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WEALTH_MSG}`;
const DIRECT_WHATSAPP_CALL_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${GENERAL_MSG}`;

export const FinalContact: React.FC<FinalContactProps> = ({
  onHealthClick,
  onWealthClick,
}) => {
  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#07563F] text-[#FFFFFF] overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Architectural subtle ambient shapes strictly in green and white tones */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-[#087A5A]/30 rounded-full blur-3xl -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFFFFF]/5 rounded-full blur-3xl -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18"
        >
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF]/15 border border-[#FFFFFF]/25 text-[#FFFFFF] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#FFFFFF]" />
            GET IN TOUCH
          </div>

          {/* Main Heading */}
          <h2
            id="final-contact-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] mb-5 text-balance"
          >
            LET'S START A CONVERSATION
          </h2>

          {/* Supporting Text */}
          <p
            id="final-contact-subheading"
            className="text-base sm:text-lg text-[#FFFFFF]/85 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Have questions about wellness, products or the business opportunity? Connect with us directly and we'll explain the information personally.
          </p>
        </motion.div>

        {/* TWO LARGE CONTACT OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mb-12 sm:mb-16">
          {/* OPTION 1: HEALTH & WELLNESS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="contact-option-health"
            className="rounded-[24px] bg-[#FFFFFF] text-[#111111] p-5 sm:p-9 shadow-md flex flex-col justify-between border border-[#E5E7EB]"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-2.5 sm:px-3 py-1 rounded-full">
                  Option 01
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mb-2">
                HEALTH & WELLNESS
              </h3>

              <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed font-normal mb-6 sm:mb-8">
                Questions about nutrition, wellness or products?
              </p>
            </div>

            <a
              id="whatsapp-health-option-btn"
              href={HEALTH_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onHealthClick}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-[14px] bg-[#087A5A] hover:bg-[#066147] text-[#FFFFFF] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
              <span>ASK ABOUT HEALTH →</span>
            </a>
          </motion.div>

          {/* OPTION 2: BUSINESS OPPORTUNITY */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            id="contact-option-wealth"
            className="rounded-[24px] bg-[#FFFFFF] text-[#111111] p-5 sm:p-9 shadow-md flex flex-col justify-between border border-[#E5E7EB]"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-2.5 sm:px-3 py-1 rounded-full">
                  Option 02
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mb-2">
                BUSINESS OPPORTUNITY
              </h3>

              <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed font-normal mb-6 sm:mb-8">
                Want to understand the Independent Associate opportunity?
              </p>
            </div>

            <a
              id="whatsapp-wealth-option-btn"
              href={WEALTH_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWealthClick}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-[14px] bg-[#087A5A] hover:bg-[#066147] text-[#FFFFFF] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
              <span>ASK ABOUT WEALTH →</span>
            </a>
          </motion.div>
        </div>

        {/* CONTACT INFORMATION & ADVISORY NOTE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="rounded-[24px] bg-[#064e39] border border-[#FFFFFF]/15 p-6 sm:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/75 block mb-1">
                Connect with us on WhatsApp
              </span>
              <a
                id="whatsapp-phone-direct-link"
                href={DIRECT_WHATSAPP_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-2xl sm:text-3xl font-black text-[#FFFFFF] hover:text-[#E8F5EF] tracking-tight transition-colors cursor-pointer"
              >
                <Phone className="w-6 h-6 text-[#FFFFFF]" />
                <span>+91 63983 31007</span>
              </a>
            </div>

            <div className="max-w-xl text-center md:text-right">
              <p className="text-xs sm:text-sm text-[#FFFFFF]/80 leading-relaxed font-normal flex items-start justify-center md:justify-end gap-2">
                <Info className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span>
                  Information provided through this website is for general informational purposes. For product-specific guidance, connect with an Independent Associate.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
