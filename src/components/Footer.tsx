import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import amitWellnessLogo from '../assets/images/amit_wellness_logo_1790160852879.jpg';

interface FooterProps {
  onNavClick?: (target: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Health', href: '#health' },
    { label: 'Wealth', href: '#wealth' },
    { label: 'Ambassadors', href: '#ambassadors-section' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(label);
    }
  };

  return (
    <footer
      id="main-footer"
      className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] py-12 sm:py-16 text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-[#E5E7EB]">
          {/* Left Side: Amit Wellness branding/logo area + description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <div
              id="footer-brand-logo"
              className="flex items-center gap-3 cursor-pointer select-none mb-3 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Official Amit Wellness Circular Logo Emblem */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#087A5A]/30 shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0 bg-[#020B1E]">
                <img
                  src={amitWellnessLogo}
                  alt="Amit Wellness Official Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xl tracking-tight text-[#111111] leading-none">
                  Amit Wellness
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#087A5A] mt-0.5">
                  Wellness & Opportunity
                </span>
              </div>
            </div>

            {/* Required Short Description */}
            <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed font-normal">
              Wellness information, product information and business opportunity guidance.
            </p>
          </div>

          {/* Right Side: Navigation Links & Mobile Clickable Phone */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <nav
              id="footer-navigation"
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-semibold"
              aria-label="Footer Navigation"
            >
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  id={`footer-link-${item.label.toLowerCase()}`}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.label)}
                  className="text-[#5F6368] hover:text-[#087A5A] transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Clickable WhatsApp / Call on mobile & desktop */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <a
                id="footer-phone-call-link"
                href="tel:+916398331007"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[12px] bg-[#E8F5EF] text-[#087A5A] font-bold hover:bg-[#087A5A] hover:text-[#FFFFFF] transition-colors"
                title="Call Directly"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 63983 31007</span>
              </a>
              <a
                id="footer-whatsapp-link"
                href="https://wa.me/916398331007?text=Hello%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[12px] bg-[#087A5A] text-[#FFFFFF] font-bold hover:bg-[#07563F] transition-colors shadow-xs"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Informational Disclaimer Box */}
        <div
          id="footer-disclaimer-box"
          className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] text-[#5F6368] text-[11px] sm:text-xs leading-relaxed space-y-2"
        >
          <p>
            <strong className="text-[#111111] font-semibold">Important Informational Disclaimer:</strong> This website is an independent informational resource operated by Amit Wellness (Independent Associate) and is not an official e-commerce storefront of Herbalife.
          </p>
          <p>
            <strong className="text-[#111111] font-semibold">Nutrition & Health:</strong> Herbalife products are nutritional supplements and food products. They are not intended to diagnose, treat, cure, or prevent any disease. Results may vary depending on individual diet, physical activity, and metabolism.
          </p>
          <p>
            <strong className="text-[#111111] font-semibold">Business Opportunity:</strong> Income, earnings, or financial results are not guaranteed. Success with the Herbalife Independent Associate business opportunity depends on individual skill, effort, dedication, and time committed.
          </p>
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6368]">
          <p id="footer-copyright">
            © 2026 Amit Wellness. All rights reserved.
          </p>
          <p className="text-[11px] text-center sm:text-right">
            Amit Wellness Informational Portal • Direct Guidance via WhatsApp (+91 63983 31007)
          </p>
        </div>
      </div>
    </footer>
  );
};
