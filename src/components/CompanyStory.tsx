import React from 'react';
import { Calendar, Globe2, Sparkles, MessageCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import storyImg from '../assets/images/company_story_community_1789991347140.jpg';

interface CompanyStoryProps {
  onContactClick?: () => void;
}

const STORY_WHATSAPP_NUMBER = '916398331007';
const STORY_WHATSAPP_MSG = encodeURIComponent('Hello, I would like to learn more about Herbalife.');
const STORY_WHATSAPP_URL = `https://wa.me/${STORY_WHATSAPP_NUMBER}?text=${STORY_WHATSAPP_MSG}`;

export const CompanyStory: React.FC<CompanyStoryProps> = ({ onContactClick }) => {
  const timelinePoints = [
    {
      year: '1980',
      label: 'Global Foundation',
      description: 'Herbalife is founded, beginning its journey in nutrition and wellness.',
      icon: Globe2,
    },
    {
      year: '1999',
      label: 'Presence in India',
      description: 'Herbalife begins its presence in India.',
      icon: Calendar,
    },
    {
      year: 'TODAY',
      label: 'Worldwide Network',
      description:
        'Herbalife continues to operate through its network of Independent Associates, offering products and personalized support around nutrition and wellness.',
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] border-t border-[#E5E7EB] scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle organic light green accents */}
      <div
        className="pointer-events-none absolute top-10 left-0 w-80 h-80 bg-[#E8F5EF]/45 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 bg-[#E8F5EF]/40 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/20 text-[#087A5A] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
            OUR STORY
          </div>

          {/* Main Heading - Charcoal */}
          <h2
            id="company-story-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] tracking-tight leading-[1.18] mb-5 text-balance"
          >
            FROM A WELLNESS VISION TO A GLOBAL COMMUNITY
          </h2>

          {/* Introduction - Neutral Gray */}
          <p
            id="company-story-intro"
            className="text-base sm:text-lg text-[#5F6368] leading-relaxed font-normal mb-6"
          >
            Herbalife was founded in 1980 and has grown into a global nutrition and wellness company. Herbalife has been present in India since 1999.
          </p>

          {/* Clear Distinction Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#111111]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#087A5A]">
              <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
              Founded globally: <strong className="text-[#111111]">1980</strong>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#087A5A]">
              <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
              Herbalife India: <strong className="text-[#111111]">Since 1999</strong>
            </span>
          </div>
        </motion.div>

        {/* Two-Column Composition: Timeline & Lifestyle Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* LEFT: Premium Lifestyle & Community Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative rounded-[26px] overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-md p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8F5EF]">
                <img
                  src={storyImg}
                  alt="Herbalife community mentorship and wellness collaboration in a bright, modern setting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle dark-green gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-[#E5E7EB] shadow-sm flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#087A5A]">
                        Global Presence
                      </p>
                      <p className="text-sm font-bold text-[#111111]">
                        Nutrition, Community & Support
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#087A5A] bg-[#E8F5EF] px-2.5 py-1 rounded-full">
                      Since 1980
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-image note */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#5F6368]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                  Operating across diverse communities
                </span>
                <span className="font-semibold text-[#087A5A]">India Since 1999</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Timeline + Information Card */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            
            {/* TIMELINE: Horizontal progression styling on desktop, vertical on mobile */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#087A5A]">
                  CHRONOLOGICAL MILESTONES
                </h3>
                <span className="text-xs text-[#5F6368]">Historical Overview</span>
              </div>

              {/* Timeline Cards Container */}
              <div className="relative pl-6 sm:pl-0 border-l-2 sm:border-l-0 border-[#E5E7EB] sm:grid sm:grid-cols-3 gap-4">
                {timelinePoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={point.year}
                      id={`timeline-point-${point.year.toLowerCase()}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.12 }}
                      className="relative mb-6 sm:mb-0 group"
                    >
                      {/* Mobile timeline node dot */}
                      <span className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border-2 border-[#087A5A] sm:hidden" />

                      <div className="p-5 rounded-[22px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#087A5A]/50 transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between h-full">
                        <div>
                          {/* Year header + icon */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-black text-[#087A5A] tracking-tight">
                              {point.year}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>

                          <p className="text-xs font-bold uppercase tracking-wider text-[#5F6368] mb-1.5">
                            {point.label}
                          </p>

                          {/* Description */}
                          <p className="text-sm text-[#5F6368] leading-relaxed font-normal">
                            {point.description}
                          </p>
                        </div>

                        {/* Visual progression indicator */}
                        <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#087A5A] font-semibold">
                          <span>Milestone 0{index + 1}</span>
                          <span className="text-[#9CA3AF] sm:inline hidden">→</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* SMALL INFORMATION CARD: WHY THIS MATTERS */}
            <motion.div
              id="card-why-this-matters"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="p-5 sm:p-6 rounded-[22px] bg-[#F9FAFB] border border-[#E5E7EB] shadow-xs flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-[#111111] mb-1.5 tracking-tight">
                  WHY THIS MATTERS
                </h4>
                <p className="text-sm text-[#5F6368] leading-relaxed font-normal">
                  Understanding the company, its products and its business model helps you make an informed decision before connecting with an Independent Associate.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* BOTTOM CONTACT CTA: WhatsApp Consultation (Informational) */}
        <motion.div
          id="story-cta-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="pt-10 border-t border-[#E5E7EB]"
        >
          <div className="rounded-[24px] bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5A] block mb-1">
                TRANSPARENT CONSULTATION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                WANT TO UNDERSTAND MORE?
              </h3>
              <p className="text-sm text-[#5F6368] mt-1.5 max-w-xl leading-relaxed font-normal">
                Connect with us directly and we'll explain the wellness and business information personally.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="whatsapp-story-btn"
                href={STORY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer"
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
