import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
          {/* Herbalife Branding / Logo Area */}
          <div
            id="brand-logo"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Custom stylized botanical leaf triad emblem in primary green */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#E8F5EF] flex items-center justify-center border border-[#087A5A]/15 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#087A5A]"
                aria-label="Herbalife Leaf Emblem"
              >
                {/* Center upright leaf */}
                <path
                  d="M16 4C16 4 19.5 9 19.5 14.5C19.5 17.5 17.5 19.5 16 20C14.5 19.5 12.5 17.5 12.5 14.5C12.5 9 16 4 16 4Z"
                  fill="#087A5A"
                />
                {/* Left angled leaf */}
                <path
                  d="M14.5 17C14.5 17 9.5 14.5 6.5 18C4 20.8 5.2 24.2 7 25C8.8 25.5 12.5 24 14.5 20.5L14.5 17Z"
                  fill="#07563F"
                />
                {/* Right angled leaf */}
                <path
                  d="M17.5 17C17.5 17 22.5 14.5 25.5 18C28 20.8 26.8 24.2 25 25C23.2 25.5 19.5 24 17.5 20.5L17.5 17Z"
                  fill="#087A5A"
                />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#111111] leading-none">
                HERBALIFE
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
