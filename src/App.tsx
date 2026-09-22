import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HealthSection } from './components/HealthSection';
import { WealthSection } from './components/WealthSection';
import { AmbassadorsSection } from './components/AmbassadorsSection';
import { CompanyStory } from './components/CompanyStory';
import { ProductsSection } from './components/ProductsSection';
import { WellnessJourney } from './components/WellnessJourney';
import { WhyConnect } from './components/WhyConnect';
import { FinalContact } from './components/FinalContact';
import { Footer } from './components/Footer';
import { CheckCircle2, X, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedJourney, setSelectedJourney] = useState<'health' | 'wealth' | null>('health');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleSelectPath = (path: 'health' | 'wealth') => {
    setSelectedJourney(path);
    if (path === 'health') {
      showNotification('Health: Health & Wellness section activated.');
      setTimeout(() => {
        const el = document.getElementById('health-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      showNotification('Wealth: Focusing on independent distributor business opportunity and coaching.');
      setTimeout(() => {
        const el = document.getElementById('wealth-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleClearPath = () => {
    setSelectedJourney(null);
  };

  const handleAmbassadorsScroll = () => {
    const el = document.getElementById('ambassadors-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (section: string) => {
    const secLower = section.toLowerCase();
    if (secLower === 'about') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showNotification('About: Learn about our global foundation in 1980 and India presence since 1999.');
    } else if (secLower === 'health') {
      handleSelectPath('health');
    } else if (secLower === 'wealth') {
      handleSelectPath('wealth');
    } else if (secLower === 'ambassadors') {
      handleAmbassadorsScroll();
      showNotification('Ambassadors: Meet world-class athletes and sporting partners associated with Herbalife.');
    } else if (secLower === 'contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showNotification('Contact: Connect with us directly on WhatsApp (+91 63983 31007) for personal guidance.');
    } else if (secLower === 'products') {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showNotification('Products: Explore nutrition categories and connect for personalized guidance.');
    } else {
      showNotification(`Navigation: "${section}" section activated.`);
    }
  };

  const handleGetStartedClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showNotification('Get Started: Connect with us directly on WhatsApp (+91 63983 31007) to begin your conversation.');
  };

  const handleContactNotice = (type: 'health' | 'wealth') => {
    showNotification(
      type === 'health'
        ? 'Opening WhatsApp: Inquiring about Health & Wellness personal consultation.'
        : 'Opening WhatsApp: Inquiring about the Business Opportunity personal explanation.'
    );
  };

  const activeNavLabel = selectedJourney === 'health' ? 'Health' : selectedJourney === 'wealth' ? 'Wealth' : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111111] selection:bg-[#E8F5EF] selection:text-[#087A5A]">
      {/* 1. Premium Sticky Header */}
      <Header
        activeItem={activeNavLabel}
        onNavClick={handleNavClick}
        onGetStartedClick={handleGetStartedClick}
      />

      {/* 2. Main Hero Section */}
      <main className="flex-1">
        <Hero
          selectedPath={selectedJourney}
          onSelectPath={handleSelectPath}
          onClearPath={handleClearPath}
          onAmbassadorsClick={handleAmbassadorsScroll}
        />

        {/* 3. HEALTH SECTION: Revealed when HEALTH journey is selected */}
        <AnimatePresence mode="wait">
          {selectedJourney === 'health' && (
            <motion.div
              key="health-section-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <HealthSection onContactClick={handleContactNotice} />
            </motion.div>
          )}

          {/* WEALTH SECTION (Step 6): Active when WEALTH journey is selected */}
          {selectedJourney === 'wealth' && (
            <motion.div
              key="wealth-section-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <WealthSection
                onContactClick={() =>
                  showNotification('Opening WhatsApp: Connecting to discuss Herbalife Business Opportunity (+91 63983 31007)...')
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AMBASSADORS & ATHLETES SECTION: Positioned below main journey content */}
        <AmbassadorsSection
          onContactClick={(ambassadorName?: string) =>
            showNotification(
              ambassadorName
                ? `Opening WhatsApp: Inquiring about nutrition inspired by ${ambassadorName} (+91 63983 31007)...`
                : 'Opening WhatsApp: Connecting for sports nutrition consultation (+91 63983 31007)...'
            )
          }
        />

        {/* 4. COMPANY STORY & HISTORY SECTION (Step 5) */}
        <CompanyStory
          onContactClick={() =>
            showNotification('Opening WhatsApp: Connecting to discuss Herbalife history & personalized guidance (+91 63983 31007)...')
          }
        />

        {/* 5. PRODUCTS INFORMATION SECTION (Step 7) */}
        <ProductsSection
          onContactClick={(cat) =>
            showNotification(`Opening WhatsApp: Inquiring about ${cat || 'products'} personalized guidance (+91 63983 31007)...`)
          }
        />

        {/* 6. WELLNESS JOURNEY / HOW IT WORKS SECTION (Step 8) */}
        <WellnessJourney
          onContactClick={() =>
            showNotification('Opening WhatsApp: Connecting for personalized guidance & answers (+91 63983 31007)...')
          }
        />

        {/* 7. WHY CONNECT WITH US SECTION (Step 9) */}
        <WhyConnect
          onContactClick={() =>
            showNotification('Opening WhatsApp: Inquiring with our team for 1-on-1 personalized guidance (+91 63983 31007)...')
          }
        />

        {/* 8. FINAL CONTACT SECTION (Step 10) */}
        <FinalContact
          onHealthClick={() =>
            showNotification('Opening WhatsApp: Connecting for Health & Wellness guidance (+91 63983 31007)...')
          }
          onWealthClick={() =>
            showNotification('Opening WhatsApp: Connecting for Business Opportunity guidance (+91 63983 31007)...')
          }
        />
      </main>

      {/* 9. PREMIUM MINIMAL FOOTER (Step 10) */}
      <Footer onNavClick={handleNavClick} />

      {/* Subtle Toast Feedback for Interactive Controls */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-[#FFFFFF] border border-[#E5E7EB] shadow-xl rounded-[14px] p-4 flex items-start gap-3 text-[#111111]"
          >
            <CheckCircle2 className="w-5 h-5 text-[#087A5A] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#087A5A] mb-0.5">
                Interaction Notice
              </p>
              <p className="text-sm font-medium text-[#5F6368] leading-snug">
                {toastMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#5F6368] hover:text-[#111111] p-1 rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
