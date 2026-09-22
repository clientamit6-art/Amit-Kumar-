import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

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
          {/* Left Side: Herbalife branding/logo area + description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <div
              id="footer-brand-logo"
              className="flex items-center gap-3 cursor-pointer select-none mb-3 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Botanical Leaf Triad Emblem in Primary Green */}
              <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] flex items-center justify-center border border-[#087A5A]/15 transition-transform duration-300 group-hover:scale-105">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#087A5A]"
                  aria-label="Herbalife Leaf Emblem"
                >
                  <path
                    d="M16 4C16 4 19.5 9 19.5 14.5C19.5 17.5 17.5 19.5 16 20C14.5 19.5 12.5 17.5 12.5 14.5C12.5 9 16 4 16 4Z"
                    fill="#087A5A"
                  />
                  <path
                    d="M14.5 17C14.5 17 9.5 14.5 6.5 18C4 20.8 5.2 24.2 7 25C8.8 25.5 12.5 24 14.5 20.5L14.5 17Z"
                    fill="#07563F"
                  />
                  <path
                    d="M17.5 17C17.5 17 22.5 14.5 25.5 18C28 20.8 26.8 24.2 25 25C23.2 25.5 19.5 24 17.5 20.5L17.5 17Z"
                    fill="#087A5A"
                  />
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xl tracking-tight text-[#111111] leading-none">
                  HERBALIFE
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

        {/* Bottom Copyright Area */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6368]">
          <p id="footer-copyright">
            © 2026 All rights reserved.
          </p>
          <p className="text-[11px] text-center sm:text-right">
            Independent Associate Informational Portal • Direct Guidance via WhatsApp (+91 63983 31007)
          </p>
        </div>
      </div>
    </footer>
  );
};
