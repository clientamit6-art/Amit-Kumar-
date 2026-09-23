import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import amitWellnessLogo from '../assets/images/amit_wellness_logo_1790160852879.jpg';

interface HeaderProps {
  activeItem?: string;
  onNavClick?: (target: string) => void;
  onGetStartedClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeItem,
  onNavClick,
  onGetStartedClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Health', href: '#health' },
    { label: 'Wealth', href: '#wealth' },
    { label: 'Ambassadors', href: '#ambassadors-section' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleItemClick = (item: string) => {
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(item);
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-xs border-b border-[#E5E7EB]'
          : 'bg-[#FFFFFF] border-b border-[#E5E7EB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Amit Wellness Branding / Logo Area */}
          <div
            id="brand-logo"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Official Amit Wellness Circular Logo Emblem */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#087A5A]/30 shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0 bg-[#020B1E]">
              <img
                src={amitWellnessLogo}
                alt="Amit Wellness Official Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#111111] leading-none">
                Amit Wellness
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-[#087A5A] mt-0.5">
                Wellness & Opportunity
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeItem?.toLowerCase() === item.label.toLowerCase();
              return (
                <a
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item.label);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'text-[#087A5A] bg-[#E8F5EF] font-semibold'
                      : 'text-[#171717] hover:text-[#087A5A] hover:bg-[#F3F4F6]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Get Started Button (Primary Button System) */}
          <div className="hidden md:flex items-center pl-2">
            <button
              id="header-get-started-btn"
              type="button"
              onClick={onGetStartedClick}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-[15px] font-semibold tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-lg flex items-center justify-center text-[#171717] hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#087A5A]/30 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activeItem?.toLowerCase() === item.label.toLowerCase();
                return (
                  <a
                    key={item.label}
                    id={`mobile-nav-${item.label.toLowerCase()}`}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(item.label);
                    }}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#E8F5EF] text-[#087A5A]'
                        : 'text-[#171717] hover:bg-[#F3F4F6] hover:text-[#087A5A]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-2">
                <button
                  id="mobile-get-started-btn"
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onGetStartedClick) onGetStartedClick();
                  }}
                  className="w-full py-3 px-5 rounded-[14px] bg-[#087A5A] hover:bg-[#07563F] text-[#FFFFFF] text-base font-semibold tracking-wide text-center shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
