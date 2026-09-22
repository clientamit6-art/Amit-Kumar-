import React from 'react';
import {
  MessageSquareText,
  PackageSearch,
  Leaf,
  TrendingUp,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import consultImg from '../assets/images/friendly_consultation_guidance_1789992707058.jpg';

interface WhyConnectProps {
  onContactClick?: () => void;
}

const WHY_CONNECT_WHATSAPP_NUMBER = '916398331007';
const WHY_CONNECT_WHATSAPP_MSG = encodeURIComponent(
  'Hello, I visited your website and would like to know more.'
);
const WHY_CONNECT_WHATSAPP_URL = `https://wa.me/${WHY_CONNECT_WHATSAPP_NUMBER}?text=${WHY_CONNECT_WHATSAPP_MSG}`;

export const WhyConnect: React.FC<WhyConnectProps> = ({ onContactClick }) => {
  const cards = [
    {
      id: 'personal-guidance',
      title: 'PERSONAL GUIDANCE',
      text: 'Ask questions and get information explained directly according to what you want to understand.',
      icon: MessageSquareText,
      tag: '1-on-1 Dialogue',
    },
    {
      id: 'understand-products',
      title: 'UNDERSTAND PRODUCTS',
      text: 'Learn about product categories, their intended use and how they fit into a broader wellness routine.',
      icon: PackageSearch,
      tag: 'Category Clarity',
    },
    {
      id: 'wellness-information',
      title: 'WELLNESS INFORMATION',
      text: 'Explore general nutrition and wellness information and discuss your questions with us.',
      icon: Leaf,
      tag: 'Everyday Habits',
    },
    {
      id: 'business-information',
      title: 'BUSINESS INFORMATION',
      text: 'Learn how the Independent Associate opportunity works and ask questions before making any decision.',
      icon: TrendingUp,
      tag: 'Transparent Model',
    },
  ];

  return (
    <section
      id="why-connect"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F7FBF8] border-t border-[#E8F5EF] scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Background ambient accents in strictly green/white */}
      <div
        className="pointer-events-none absolute top-12 left-0 w-96 h-96 bg-[#E8F5EF]/50 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 right-0 w-96 h-96 bg-[#E8F5EF]/45 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TWO-COLUMN COMPOSITION: Left Image, Right Header + 4 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18">
          
          {/* LEFT SIDE (Desktop): Large Premium Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative rounded-[26px] overflow-hidden bg-[#FFFFFF] border border-[#E8F5EF] shadow-lg shadow-[#07563F]/5 p-3 sm:p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[4/5] bg-[#E8F5EF]">
                <img
                  src={consultImg}
                  alt="Friendly, approachable professional consultation discussing wellness options with genuine attention"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Subtle dark green vignette at base */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/60 via-[#07563F]/10 to-transparent pointer-events-none" />

                {/* Floating Information Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-[#E8F5EF] shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#087A5A]">
                          Personalized Consultation
                        </p>
                        <p className="text-sm font-bold text-[#07563F] truncate">
                          Clear Answers • Zero Obligation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-image caption */}
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#07563F]/75">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A]" />
                  Direct 1-on-1 dialogue on WhatsApp
                </span>
                <span className="font-semibold text-[#087A5A]">Friendly Support</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (Desktop): Section Heading + 4 Information Cards */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Small Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EF] border border-[#087A5A]/15 text-[#087A5A] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
                WHY CONNECT WITH US
              </div>

              {/* Main Heading */}
              <h2
                id="why-connect-heading"
                className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#07563F] tracking-tight leading-[1.18] mb-4 text-balance"
              >
                GET THE INFORMATION YOU NEED, PERSONALLY
              </h2>

              {/* Supporting Text */}
              <p
                id="why-connect-subheading"
                className="text-base sm:text-lg text-[#07563F]/80 leading-relaxed font-normal"
              >
                Online information is a starting point. If you have questions or want to understand something in more detail, connect with us directly and we'll explain it personally.
              </p>
            </motion.div>

            {/* 4 Premium Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    id={`why-connect-card-${card.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group p-5 sm:p-6 rounded-[22px] bg-[#FFFFFF] border border-[#E8F5EF] hover:border-[#087A5A]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Icon & Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#E8F5EF] text-[#087A5A] flex items-center justify-center transition-transform group-hover:scale-105 group-hover:bg-[#087A5A] group-hover:text-[#FFFFFF]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#087A5A] bg-[#E8F5EF] px-2.5 py-1 rounded-full">
                          {card.tag}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-base font-extrabold text-[#07563F] group-hover:text-[#087A5A] transition-colors mb-2 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-xs sm:text-sm text-[#07563F]/80 leading-relaxed font-normal">
                        {card.text}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8F5EF] flex items-center justify-between text-xs text-[#087A5A] font-semibold">
                      <span>Reason 0{idx + 1}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* FULL-WIDTH WHATSAPP CONTACT AREA */}
        <motion.div
          id="why-connect-cta-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="pt-4 border-t border-[#E8F5EF]"
        >
          <div className="rounded-[24px] bg-[#FFFFFF] border border-[#E8F5EF] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-center md:text-left">
              {/* Small Label */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5A] block mb-1">
                LET'S TALK
              </span>
              {/* Heading */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#07563F] tracking-tight">
                HAVE QUESTIONS? WE'RE HERE TO EXPLAIN.
              </h3>
              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-[#07563F]/80 mt-2 max-w-2xl leading-relaxed font-normal">
                Choose Health, Products or Wealth and contact us directly. We'll understand what you're interested in and explain the relevant information personally.
              </p>
            </div>

            {/* ONE Large Premium Green Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="whatsapp-why-connect-btn"
                href={WHY_CONNECT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-base font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 text-[#FFFFFF]" />
                <span>CHAT WITH US ON WHATSAPP →</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
