import React, { useState, useEffect } from 'react';
import {
  Trophy,
  ShieldCheck,
  ArrowRight,
  X,
  CheckCircle2,
  MessageCircle,
  Medal,
  Activity,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Ambassador {
  id: string;
  name: string;
  sport: string;
  category: 'global' | 'india' | 'team';
  roleTitle: string;
  description: string;
  relationship: string;
  verifiedBadge: string;
  partnershipYear?: string;
  imageUrl?: string;
  achievements: string[];
  nutritionFocus: string;
  quote?: string;
  learnMoreUrl?: string;
}

export const AMBASSADORS_DATA: Ambassador[] = [
  {
    id: 'cristiano-ronaldo',
    name: 'Cristiano Ronaldo',
    sport: 'Football / Soccer',
    category: 'global',
    roleTitle: 'International Football Forward',
    description:
      'Portuguese international football forward, five-time Ballon d’Or recipient, and captain of the Portugal national team.',
    relationship: 'Official Herbalife Nutrition Partner',
    verifiedBadge: 'Official Herbalife Nutrition Partner',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg',
    achievements: [
      '5-time Ballon d’Or Winner',
      '5-time UEFA Champions League Champion',
      'UEFA Euro 2016 Champion',
      'All-time leading men’s international goalscorer',
    ],
    nutritionFocus:
      'High-intensity athletic conditioning, hydration, and targeted recovery.',
    quote:
      'Nutrition is fundamental to performance and longevity on the pitch. Proper fueling allows me to compete at my highest level.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'smriti-mandhana',
    name: 'Smriti Mandhana',
    sport: "Women's Cricket",
    category: 'india',
    roleTitle: 'Indian International Cricketer',
    description:
      'Vice-captain of the Indian women’s cricket team and captain of Royal Challengers Bangalore in the Women’s Premier League (WPL).',
    relationship: 'Brand Ambassador for vritilife Ayurvedic Skincare Range',
    verifiedBadge: 'Brand Ambassador for vritilife Ayurvedic Skincare Range',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/dd/Smriti_Mandhana.jpg',
    achievements: [
      '2-time ICC Women’s Cricketer of the Year',
      'WPL Champion Captain (Royal Challengers Bangalore)',
      'Commonwealth Games Silver Medalist (2022)',
      'Arjuna Award for Outstanding Performance in Sports',
    ],
    nutritionFocus:
      'Matchday stamina, endurance, and everyday balanced wellness.',
    quote:
      'High-performance cricket requires dedication to personal care, everyday fitness, and holistic wellness.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'manika-batra',
    name: 'Manika Batra',
    sport: 'Table Tennis',
    category: 'india',
    roleTitle: 'Indian Table Tennis Olympian',
    description:
      'Top-ranked Indian table tennis player and Commonwealth Games individual and team gold medalist.',
    relationship: 'Brand Ambassador for vritilife Ayurvedic Skincare Range',
    verifiedBadge: 'Brand Ambassador for vritilife Ayurvedic Skincare Range',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Manika_Batra_in_2018.jpg',
    achievements: [
      'Commonwealth Games Individual & Team Gold Medalist (2018)',
      'Major Dhyan Chand Khel Ratna Awardee (2020)',
      'ITTF Asian Cup Bronze Medalist',
      'Multi-time Olympian (Rio 2016, Tokyo 2020, Paris 2024)',
    ],
    nutritionFocus:
      'Reflex agility, neuromuscular recovery, and tournament conditioning.',
    quote:
      'Fast-paced competitive sport requires mental sharpness and everyday health routines.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'lakshya-sen',
    name: 'Lakshya Sen',
    sport: 'Badminton',
    category: 'india',
    roleTitle: 'Indian Badminton Olympian',
    description:
      'Indian international badminton player, Commonwealth Games men’s singles champion, and Olympic semi-finalist.',
    relationship: 'Athlete associated with Herbalife.',
    verifiedBadge: 'Athlete Associated with Herbalife',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Lakshya_Sen_in_2018.jpg',
    achievements: [
      'Commonwealth Games Men’s Singles Gold Medalist (2022)',
      'Thomas Cup Gold Medalist (2022)',
      'World Championships Bronze Medalist (2021)',
      'Arjuna Award Recipient (2022)',
    ],
    nutritionFocus:
      'Court agility, stamina conditioning, and tournament recovery.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'palak-kohli',
    name: 'Palak Kohli',
    sport: 'Para-Badminton',
    category: 'india',
    roleTitle: 'Indian Para-Badminton Athlete & Paralympian',
    description:
      'Indian para-badminton athlete who made history as the youngest para-badminton player to qualify for the Tokyo Paralympics.',
    relationship: 'Athlete associated with Herbalife.',
    verifiedBadge: 'Athlete Associated with Herbalife',
    imageUrl:
      'https://www.herbalife.com/dmassets/market-reusable-assets/emea/india/our-athletes-images/sa-palak-kohli-in.jpg?qlt=85',
    achievements: [
      'Tokyo 2020 Paralympian',
      'Asian Youth Para Games Medalist',
      'BWF Para-Badminton World Championship Medalist',
    ],
    nutritionFocus:
      'Core endurance, physical strength, and structured training nutrition.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'yashasvi-jaiswal',
    name: 'Yashasvi Jaiswal',
    sport: 'International Cricket',
    category: 'india',
    roleTitle: 'Indian International Cricketer',
    description:
      'Opening batter for the Indian national cricket team, known for high-impact scoring and record-setting Test performances.',
    relationship: 'Herbalife Sponsored Athlete',
    verifiedBadge: 'Herbalife Sponsored Athlete',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/71/Yashasvi_Jaiswal_in_PMO_New_Delhi.jpg',
    achievements: [
      'Test Double Centurion for the Indian National Cricket Team',
      'Fastest fifty in Indian Premier League history',
      'Under-19 Cricket World Cup Leading Run-Scorer & Player of the Tournament (2020)',
      'Featured on Time Magazine’s Time 100 Next list',
    ],
    nutritionFocus:
      'Multi-day match stamina, explosive physical conditioning, and post-innings recovery.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    sport: 'International Cricket',
    category: 'india',
    roleTitle: 'Indian International Cricketer',
    description:
      'Former captain of the Indian national cricket team and one of the leading batsmen in modern cricket history.',
    relationship:
      'Herbalife India has publicly identified Virat Kohli among athletes it supports.',
    verifiedBadge: 'Supported Athlete',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg',
    achievements: [
      'ICC Cricket World Cup Champion (2011)',
      'ICC Champions Trophy Winner (2013)',
      'Most ODI centuries in cricket history',
      'Major Dhyan Chand Khel Ratna & Padma Shri recipient',
    ],
    nutritionFocus:
      'Disciplined daily nutrition, physical conditioning, and athletic hydration.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
  {
    id: 'mary-kom',
    name: 'MC Mary Kom',
    sport: 'Olympic Boxing',
    category: 'india',
    roleTitle: 'Olympic Medalist & 6-Time World Champion',
    description:
      'Legendary Indian amateur boxer, six-time World Amateur Boxing Champion, and Olympic bronze medalist.',
    relationship:
      'Herbalife India has publicly identified Mary Kom among athletes it supports.',
    verifiedBadge: 'Supported Athlete',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/dc/Mary_Kom_-_British_High_Commission%2C_Delhi%2C_27_July_2011.jpg',
    achievements: [
      '6-time World Amateur Boxing Champion',
      'Olympic Bronze Medalist (London 2012)',
      'Asian Games Gold Medalist (2014) & Commonwealth Games Gold (2018)',
      'Padma Vibhushan recipient',
    ],
    nutritionFocus:
      'Lean muscle maintenance, daily protein balance, and boxing conditioning.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
];

export const PARTNER_TEAMS_DATA: Ambassador[] = [
  {
    id: 'la-galaxy',
    name: 'LA Galaxy',
    sport: 'Major League Soccer (MLS)',
    category: 'team',
    roleTitle: 'Major League Soccer Club',
    description:
      'Major League Soccer club based in Los Angeles, California.',
    relationship: 'Official Nutrition Partner',
    verifiedBadge: 'Official Nutrition Partner',
    partnershipYear: 'Partnership since 2007',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/70/Los_Angeles_Galaxy_logo.svg',
    achievements: [
      'Record 5-time MLS Cup Champions',
      '4-time Supporters’ Shield Winners',
      'CONCACAF Champions’ Cup Winners',
      'Official club partner since 2007',
    ],
    nutritionFocus:
      'Club sports nutrition, athletic conditioning, and matchday hydration.',
    quote:
      'Herbalife has partnered with the LA Galaxy since 2007, supporting players on and off the pitch.',
    learnMoreUrl: 'https://www.herbalife.com/en-in/about-herbalife/our-athletes',
  },
];

interface AthleteCardImageProps {
  name: string;
  sport: string;
  imageUrl?: string;
  isTeam?: boolean;
}

/**
 * Dedicated athlete image container with fallback mechanism:
 * - Lazy loaded with fixed aspect ratio (4/3) to eliminate CLS
 * - If image fails or is unavailable, immediately presents a tasteful branded fallback
 *   containing the athlete's name, sport, and champagne-gold accent (#C49A4A, #F7F1E3, #6F5526)
 * - Zero empty or blank containers
 */
const AthleteCardImage: React.FC<AthleteCardImageProps> = ({
  name,
  sport,
  imageUrl,
  isTeam = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getInitials = (str: string) => {
    return str
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const shouldShowFallback = !imageUrl || hasError;

  return (
    <div className="relative w-full aspect-[4/3] bg-[#F7F1E3] overflow-hidden select-none">
      {/* 1. Tasteful Branded Champagne-Gold Fallback */}
      <div
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#F7F1E3] via-[#F4EBD7] to-[#E8D9BB] transition-opacity duration-300 ${
          shouldShowFallback ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        {/* Subtle geometric background aura */}
        <div className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#C49A4A]/15 blur-lg" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#6F5526]/10 blur-lg" />

        {/* Monogram Badge in Champagne Gold */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFFFF] shadow-xs border-2 border-[#C49A4A]/50 flex items-center justify-center mb-2.5">
          <span className="text-xl sm:text-2xl font-black text-[#6F5526] tracking-tight">
            {getInitials(name)}
          </span>
        </div>

        {/* Person's Name */}
        <span className="text-xs sm:text-sm font-extrabold text-[#111111] max-w-[90%] truncate leading-tight">
          {name}
        </span>

        {/* Sport with Champagne Gold Accent */}
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFFFF]/95 border border-[#C49A4A]/40 text-[#6F5526] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mt-1.5 shadow-2xs">
          <Medal className="w-2.5 h-2.5 text-[#C49A4A]" />
          <span>{sport}</span>
        </span>
      </div>

      {/* 2. Real Image (if available and hasn't errored) */}
      {imageUrl && !hasError && (
        <img
          src={imageUrl}
          alt={`Portrait of ${name}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full ${
            isTeam ? 'object-contain p-6 bg-[#FFFFFF]' : 'object-cover object-top'
          } transform transition-all duration-500 group-hover:scale-105 z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Subtle dark gradient overlay over loaded athlete photo for contrast */}
      {imageUrl && !hasError && isLoaded && !isTeam && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
};

interface AmbassadorsSectionProps {
  onContactClick?: (ambassadorName?: string) => void;
}

export const AmbassadorsSection: React.FC<AmbassadorsSectionProps> = ({
  onContactClick,
}) => {
  const [selectedAmbassador, setSelectedAmbassador] =
    useState<Ambassador | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAmbassador(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section
      id="ambassadors-section"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFFFFF] border-t border-[#E5E7EB] scroll-mt-20 sm:scroll-mt-24"
      aria-labelledby="ambassadors-section-heading"
    >
      {/* Background ambient accents in subtle champagne gold */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#F7F1E3]/50 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Section Label in Champagne Gold */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E3] border border-[#C49A4A]/30 text-[#6F5526] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-[#C49A4A]" />
            <span>SPORTS NUTRITION & EXCELLENCE</span>
          </div>

          {/* Main Heading */}
          <h2
            id="ambassadors-section-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] tracking-tight leading-[1.18] mb-4 text-balance"
          >
            Herbalife Ambassadors & Athletes
          </h2>

          {/* Subtitle */}
          <p
            id="ambassadors-section-subheading"
            className="text-base sm:text-lg text-[#5F6368] leading-relaxed font-normal text-balance"
          >
            Meet athletes and sporting personalities associated with Herbalife.
          </p>
        </motion.div>

        {/* 4-COLUMN DESKTOP / 2-COLUMN TABLET / 1-COLUMN MOBILE GRID */}
        <div
          id="ambassadors-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-12 sm:mb-16"
        >
          {AMBASSADORS_DATA.map((ambassador, index) => {
            return (
              <motion.article
                key={ambassador.id}
                id={`ambassador-card-${ambassador.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-[#FFFFFF] rounded-[24px] border border-[#E5E7EB] hover:border-[#C49A4A] hover:shadow-[0_10px_25px_rgba(196,154,74,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:-translate-y-1"
              >
                <div>
                  {/* Portrait / Visual Container with locked aspect ratio & robust fallback */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <AthleteCardImage
                      name={ambassador.name}
                      sport={ambassador.sport}
                      imageUrl={ambassador.imageUrl}
                    />

                    {/* Top Right Verified Relationship Badge - Only when verified partnership year exists */}
                    {ambassador.partnershipYear ? (
                      <div className="absolute top-3.5 right-3.5 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#C49A4A]/30 text-[#6F5526] text-[11px] font-bold shadow-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#C49A4A]" />
                          <span>{ambassador.partnershipYear}</span>
                        </span>
                      </div>
                    ) : null}

                    {/* Bottom Left Sport Tag on top of image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 z-20">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#6F5526] text-[#FFFFFF] text-[11px] font-extrabold uppercase tracking-wider mb-1 shadow-xs">
                        <Medal className="w-3 h-3 text-[#C49A4A]" />
                        {ambassador.sport}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 sm:p-6">
                    {/* Ambassador Name */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] group-hover:text-[#6F5526] transition-colors tracking-tight mb-1">
                      {ambassador.name}
                    </h3>

                    {/* Role Title in Champagne Gold dark accent */}
                    <p className="text-xs font-bold text-[#6F5526] uppercase tracking-wider mb-3">
                      {ambassador.roleTitle}
                    </p>

                    {/* Factual Description */}
                    <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal mb-4">
                      {ambassador.description}
                    </p>

                    {/* Verified Herbalife Relationship Block */}
                    <div className="rounded-xl bg-[#FDFBF7] border border-[#E5E7EB] p-3 mb-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C49A4A] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[11px] font-extrabold text-[#6F5526] uppercase tracking-wider mb-0.5">
                            {ambassador.verifiedBadge}
                          </p>
                          <p className="text-xs text-[#111111] font-medium leading-relaxed">
                            {ambassador.relationship}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Learn More Button in Champagne Gold */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-[#E5E7EB]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#5F6368] font-medium">
                    Athlete Record
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedAmbassador(ambassador)}
                    aria-label={`Learn more about ${ambassador.name}'s association with Herbalife`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#6F5526] hover:bg-[#F7F1E3] hover:text-[#C49A4A] transition-all cursor-pointer group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A4A] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* SEPARATE PARTNER TEAMS SECTION */}
        <div id="partner-teams-section" className="mb-12 sm:mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F1E3] border border-[#C49A4A]/30 text-[#6F5526] text-xs font-extrabold uppercase tracking-wider mb-2 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-[#C49A4A]" />
              <span>PARTNER TEAMS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Partner Teams
            </h3>
            <p className="text-sm sm:text-base text-[#5F6368] mt-1 font-normal">
              Official sporting clubs and organizations partnering with Herbalife.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {PARTNER_TEAMS_DATA.map((team, index) => {
              return (
                <motion.article
                  key={team.id}
                  id={`partner-team-card-${team.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative bg-[#FFFFFF] rounded-[24px] border border-[#E5E7EB] hover:border-[#C49A4A] hover:shadow-[0_10px_25px_rgba(196,154,74,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:-translate-y-1"
                >
                  <div>
                    {/* Visual Container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <AthleteCardImage
                        name={team.name}
                        sport={team.sport}
                        imageUrl={team.imageUrl}
                        isTeam={true}
                      />

                      {/* Top Right Verified Partnership Since 2007 Badge */}
                      {team.partnershipYear && (
                        <div className="absolute top-3.5 right-3.5 z-20">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#C49A4A]/30 text-[#6F5526] text-[11px] font-bold shadow-xs">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C49A4A]" />
                            <span>{team.partnershipYear}</span>
                          </span>
                        </div>
                      )}

                      {/* Bottom Left Sport Tag */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 z-20">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#6F5526] text-[#FFFFFF] text-[11px] font-extrabold uppercase tracking-wider mb-1 shadow-xs">
                          <Medal className="w-3 h-3 text-[#C49A4A]" />
                          {team.sport}
                        </span>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="p-5 sm:p-6">
                      <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] group-hover:text-[#6F5526] transition-colors tracking-tight mb-1">
                        {team.name}
                      </h4>

                      <p className="text-xs font-bold text-[#6F5526] uppercase tracking-wider mb-3">
                        {team.roleTitle}
                      </p>

                      <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal mb-4">
                        {team.description}
                      </p>

                      {/* Relationship block: Official Nutrition Partner & Partnership since 2007 */}
                      <div className="rounded-xl bg-[#FDFBF7] border border-[#E5E7EB] p-3 mb-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C49A4A] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[11px] font-extrabold text-[#6F5526] uppercase tracking-wider mb-0.5">
                              {team.verifiedBadge}
                            </p>
                            <p className="text-xs text-[#111111] font-medium leading-relaxed">
                              {team.partnershipYear}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Learn More Button */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-[#E5E7EB]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[#5F6368] font-medium">
                      Official Team Partner
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedAmbassador(team)}
                      aria-label={`Learn more about ${team.name}'s partnership with Herbalife`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#6F5526] hover:bg-[#F7F1E3] hover:text-[#C49A4A] transition-all cursor-pointer group/btn"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C49A4A] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ADVISORY NOTE & WHATSAPP GUIDANCE (Champagne Gold Accents) */}
        <div className="rounded-[24px] bg-[#FDFBF7] border border-[#C49A4A]/25 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6F5526] block mb-1">
              ATHLETIC PERFORMANCE NUTRITION
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] tracking-tight">
              Curious About Sports Nutrition & Conditioning?
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6368] mt-1 max-w-xl leading-relaxed">
              Herbalife supports elite athletes worldwide through science-backed sports nutrition. Ask us how athletes integrate nutrition into everyday training.
            </p>
          </div>

          <a
            id="whatsapp-ambassadors-cta-btn"
            href="https://wa.me/916398331007?text=Hello%2C%20I%20saw%20your%20Herbalife%20Ambassadors%20%26%20Athletes%20page%20and%20would%20like%20to%20know%20more%20about%20sports%20nutrition."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onContactClick?.()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] bg-[#6F5526] hover:bg-[#523F1B] text-[#FFFFFF] text-sm font-bold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
            <span>ASK ABOUT SPORTS NUTRITION →</span>
          </a>
        </div>

        {/* OFFICIAL HERBALIFE ATHLETE INFORMATION FOOTER LINK */}
        <div className="mt-8 text-center">
          <a
            id="official-herbalife-athlete-info-link"
            href="https://www.herbalife.com/en-in/about-herbalife/our-athletes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6F5526] hover:text-[#C49A4A] hover:underline transition-colors"
          >
            <span>Official Herbalife Athlete Information →</span>
          </a>
        </div>
      </div>

      {/* DETAILED AMBASSADOR MODAL */}
      <AnimatePresence>
        {selectedAmbassador && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ambassador-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedAmbassador(null)}
              className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs transition-opacity"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-[28px] border border-[#E5E7EB] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#FDFBF7]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F7F1E3] text-[#6F5526] border border-[#C49A4A]/30 flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#C49A4A]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6F5526]">
                    {selectedAmbassador.category === 'team'
                      ? 'Official Partner Team Profile'
                      : 'Official Athlete Profile'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedAmbassador(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F6368] hover:text-[#111111] hover:bg-[#E5E7EB] transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Hero Profile Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#F7F1E3] border-2 border-[#C49A4A]/30 shrink-0 shadow-xs flex items-center justify-center relative">
                    {selectedAmbassador.imageUrl ? (
                      <img
                        src={selectedAmbassador.imageUrl}
                        alt={selectedAmbassador.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full ${
                          selectedAmbassador.category === 'team'
                            ? 'object-contain p-4 bg-[#FFFFFF]'
                            : 'object-cover object-top'
                        }`}
                        onError={(e) => {
                          // Hide image and show initials container on modal error
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F7F1E3] to-[#E8D9BB] font-black text-2xl text-[#6F5526]">
                        {getInitials(selectedAmbassador.name)}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F7F1E3] border border-[#C49A4A]/30 text-[#6F5526] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      {selectedAmbassador.sport}
                      {selectedAmbassador.partnershipYear
                        ? ` • ${selectedAmbassador.partnershipYear}`
                        : ''}
                    </span>
                    <h3
                      id="ambassador-modal-title"
                      className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight"
                    >
                      {selectedAmbassador.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#6F5526]">
                      {selectedAmbassador.roleTitle}
                    </p>
                  </div>
                </div>

                {/* Quote (if available) */}
                {selectedAmbassador.quote && (
                  <blockquote className="p-4 rounded-xl bg-[#FDFBF7] border-l-4 border-[#C49A4A] text-xs sm:text-sm text-[#111111] italic leading-relaxed">
                    “{selectedAmbassador.quote}”
                  </blockquote>
                )}

                {/* Verified Relationship Block */}
                <div className="rounded-2xl bg-[#FDFBF7] border border-[#C49A4A]/30 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-[#C49A4A]" />
                    <h4 className="text-sm font-bold text-[#111111]">
                      Verified Herbalife Relationship
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#111111]/90 leading-relaxed font-medium">
                    {selectedAmbassador.relationship}
                  </p>
                </div>

                {/* Nutrition Focus */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F5526] mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#C49A4A]" />
                    Sports Nutrition Focus
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
                    {selectedAmbassador.nutritionFocus}
                  </p>
                </div>

                {/* Career Achievements */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F5526] mb-3 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-[#C49A4A]" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedAmbassador.achievements.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111111]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C49A4A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="px-6 py-4 bg-[#FDFBF7] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="https://www.herbalife.com/en-in/about-herbalife/our-athletes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#6F5526] hover:text-[#C49A4A] hover:underline flex items-center gap-1"
                >
                  <span>Official Herbalife Athlete Information →</span>
                </a>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedAmbassador(null)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-[12px] bg-[#FFFFFF] border border-[#E5E7EB] text-xs font-bold text-[#111111] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <a
                    href="https://wa.me/916398331007?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Herbalife%20sports%20nutrition%20and%20athletic%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onContactClick?.(selectedAmbassador?.name)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#6F5526] hover:bg-[#523F1B] text-[#FFFFFF] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
