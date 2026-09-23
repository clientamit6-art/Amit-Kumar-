import React, { useState } from 'react';
import {
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Category lifestyle images
import healthyWeightImg from '../assets/images/healthy_weight_smoothie_1789992063405.jpg';
import fitnessImg from '../assets/images/fitness_performance_active_1789992082256.jpg';
import dailyNutritionImg from '../assets/images/daily_nutrition_botanicals_1789992099244.jpg';
import teasBeveragesImg from '../assets/images/teas_beverages_herbal_1789992117227.jpg';
import skinCareImg from '../assets/images/skin_body_care_aloe_1789992133355.jpg';

interface ProductsSectionProps {
  onContactClick?: (categoryTitle?: string) => void;
}

const PRODUCTS_WHATSAPP_NUMBER = '916398331007';
const PRODUCTS_WHATSAPP_BASE_MSG = encodeURIComponent(
  "Hello, I would like to learn more about the Herbalife products and wellness options."
);
const PRODUCTS_WHATSAPP_URL = `https://wa.me/${PRODUCTS_WHATSAPP_NUMBER}?text=${PRODUCTS_WHATSAPP_BASE_MSG}`;

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onContactClick }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'healthy-weight',
      title: 'HEALTHY WEIGHT',
      shortDescription:
        'Explore nutrition products designed to complement a balanced, active lifestyle.',
      image: healthyWeightImg,
      explanation:
        'Foundational nutritional solutions designed to complement everyday meals, manage calorie intake responsibly, and fit seamlessly into busy lifestyles.',
      examples: [
        'Balanced meal replacement shake mixes (Formula 1)',
        'Personalized protein powders for dietary satiety',
        'Convenient high-protein nutritious snacks',
        'Dietary active fiber complexes',
      ],
      advisory:
        'Product selection and daily meal replacement routines should be discussed with an Independent Associate according to your individual daily energy needs and goals.',
    },
    {
      id: 'fitness-performance',
      title: 'FITNESS & PERFORMANCE',
      shortDescription:
        'Explore nutrition options associated with active lifestyles, exercise and performance.',
      image: fitnessImg,
      explanation:
        'Targeted nutritional options engineered for recreational sports enthusiasts, gym-goers, and active individuals focused on pre-workout readiness and post-exercise recovery.',
      examples: [
        'Advanced electrolyte and hydration beverage complexes',
        'Pre-training energy and focus formulations',
        'Post-workout high-protein recovery blends (H24 range)',
        'Nutritional support for active muscle endurance',
      ],
      advisory:
        'Discuss your training intensity, hydration requirements, and athletic goals with an Independent Associate to select appropriate timing and products.',
    },
    {
      id: 'daily-nutrition',
      title: 'DAILY NUTRITION & HEALTH',
      shortDescription:
        'Learn about products intended to support everyday nutrition and wellness routines.',
      image: dailyNutritionImg,
      explanation:
        'Essential micronutrient formulas and botanical complexes crafted to support everyday vitality and help balance common dietary nutritional gaps.',
      examples: [
        'Comprehensive multivitamin and mineral complexes',
        'Targeted botanical cellular nutrition formulations',
        'Calcium, magnesium and vitamin D dietary complexes',
        'Omega-3 dietary supplements for balanced fatty acids',
      ],
      advisory:
        'Dietary supplements are intended to complement a varied and balanced diet. Consult with an Independent Associate to review your general nutrition habits.',
    },
    {
      id: 'teas-beverages',
      title: 'TEAS & BEVERAGES',
      shortDescription:
        'Explore the range of beverage and tea options available within the nutrition portfolio.',
      image: teasBeveragesImg,
      explanation:
        'Refreshing botanical teas and soothing herbal concentrates designed to provide an invigorating alternative to sugary beverages while encouraging daily hydration.',
      examples: [
        'Instant herbal tea concentrates in refreshing botanical flavors',
        'Concentrated green tea botanical extract beverages',
        'Purified soothing herbal aloe vera drink concentrates',
        'Hydrating zero-sugar botanical infusions',
      ],
      advisory:
        'Connect with an Independent Associate to explore flavor variations, optimal hot or cold preparation methods, and daily fluid balance.',
    },
    {
      id: 'skin-body-care',
      title: 'SKIN & BODY CARE',
      shortDescription:
        'Explore personal care products designed for everyday skin and body care routines.',
      image: skinCareImg,
      explanation:
        'Botanically inspired personal care formulas created to cleanse, hydrate, nourish, and refresh your exterior skin and hair as part of daily self-care.',
      examples: [
        'Soothing herbal aloe body gels and hydrating hand creams',
        'Botanical daily face cleansers and gentle toners',
        'Hydrating moisturizers with antioxidant botanicals',
        'Nourishing herbal hair cleansers and conditioners',
      ],
      advisory:
        'An Independent Associate can introduce you to the complete personal care collection suited to your skin type and daily grooming preferences.',
    },
  ];

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategory((current) => (current === categoryId ? null : categoryId));
  };

  const getCategoryWhatsAppUrl = (categoryTitle: string) => {
    const text = encodeURIComponent(
      `Hello, I would like to learn more about the ${categoryTitle} category and available options.`
    );
    return `https://wa.me/${PRODUCTS_WHATSAPP_NUMBER}?text=${text}`;
  };

  return (
    <section
      id="products"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F9FAFB] border-t border-[#E5E7EB] scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle organic green background blur accents */}
      <div
        className="pointer-events-none absolute top-12 right-0 w-96 h-96 bg-[#E8F5EF]/50 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 left-0 w-96 h-96 bg-[#E8F5EF]/45 rounded-full blur-3xl -z-10"
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
            PRODUCT INFORMATION
          </div>

          {/* Main Heading - Charcoal */}
          <h2
            id="products-section-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] tracking-tight leading-[1.18] mb-5 text-balance"
          >
            EXPLORE THE NUTRITION & WELLNESS RANGE
          </h2>

          {/* Supporting Text - Neutral Gray */}
          <p
            id="products-section-subheading"
            className="text-base sm:text-lg text-[#5F6368] leading-relaxed font-normal mb-4"
          >
            Learn about the different product categories and how they fit into the broader wellness and nutrition journey.
          </p>

          {/* Informational Guidance Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#5F6368] bg-[#FFFFFF] border border-[#E5E7EB] px-3.5 py-1.5 rounded-full shadow-2xs">
            <Info className="w-3.5 h-3.5 text-[#087A5A]" />
            <span>Informational Guide Only • Consult an Independent Associate for Personal Guidance</span>
          </div>
        </motion.div>

        {/* 5 LARGE CATEGORY CARDS GRID */}
        {/* Layout: Responsive grid with 2 cards in top row, 3 in bottom row on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {categories.map((category, index) => {
            const isExpanded = expandedCategory === category.id;
            const isWide = index < 2;

            return (
              <motion.div
                key={category.id}
                id={`product-category-${category.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-[24px] bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#087A5A]/50 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isWide ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Category Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E8F5EF]">
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07563F]/55 via-transparent to-transparent pointer-events-none" />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-[#087A5A] shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
                        Category 0{index + 1}
                      </span>
                    </div>

                    {/* Bottom Category Title Overlay on Image */}
                    <div className="absolute bottom-3.5 left-4 right-4 text-[#FFFFFF]">
                      <h3 className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-xs">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-sm text-[#5F6368] leading-relaxed font-normal mb-5">
                      {category.shortDescription}
                    </p>

                    {/* Interactive "LEARN MORE →" Button */}
                    <button
                      type="button"
                      id={`learn-more-btn-${category.id}`}
                      onClick={() => handleToggleExpand(category.id)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#087A5A] hover:text-[#07563F] group cursor-pointer transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'CLOSE DETAILS' : 'LEARN MORE'}</span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </motion.span>
                    </button>
                  </div>
                </div>

                {/* ACCORDION EXPANSION AREA */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`expanded-info-${category.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-[#F9FAFB] border-t border-[#E5E7EB]"
                    >
                      <div className="p-6 space-y-4">
                        {/* Overview */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#087A5A] mb-1.5 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            Overview
                          </h4>
                          <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal">
                            {category.explanation}
                          </p>
                        </div>

                        {/* General Examples */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#087A5A] mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            General Product Types
                          </h4>
                          <ul className="space-y-1.5">
                            {category.examples.map((example, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs text-[#5F6368] leading-relaxed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#087A5A] shrink-0 mt-0.5" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Consultation Note */}
                        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB]">
                          <p className="text-[11px] text-[#5F6368] leading-relaxed flex items-start gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-[#087A5A] shrink-0 mt-0.5" />
                            <span>{category.advisory}</span>
                          </p>
                        </div>

                        {/* Category-Specific WhatsApp Inquiry */}
                        <div className="pt-2">
                          <a
                            id={`category-whatsapp-${category.id}`}
                            href={getCategoryWhatsAppUrl(category.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onContactClick && onContactClick(category.title)}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[12px] bg-[#FFFFFF] border border-[#087A5A] text-[#087A5A] hover:bg-[#087A5A] hover:text-[#FFFFFF] text-xs font-bold transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Inquire About {category.title} →</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA: Premium WhatsApp Contact Consultation Banner */}
        <motion.div
          id="products-cta-section"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="pt-4 border-t border-[#E5E7EB]"
        >
          <div className="rounded-[24px] bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-center md:text-left">
              {/* Small Label */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#087A5A] block mb-1">
                NEED MORE INFORMATION?
              </span>
              {/* Heading - Charcoal */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight">
                LET'S TALK ABOUT WHAT YOU'RE LOOKING FOR
              </h3>
              {/* Supporting Text - Neutral Gray */}
              <p className="text-sm sm:text-base text-[#5F6368] mt-2 max-w-2xl leading-relaxed font-normal">
                Have questions about the products or wellness options? Contact us directly and we'll explain the information personally.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="whatsapp-products-cta-btn"
                href={PRODUCTS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onContactClick && onContactClick('All Categories')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                <span>ASK US ON WHATSAPP →</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
