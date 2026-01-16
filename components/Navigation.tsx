'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navClasses = isScrolled
    ? 'fixed top-6 left-0 right-0 mx-auto w-[95%] max-w-5xl z-50 bg-white/90 backdrop-blur-md shadow-2xl rounded-full py-2 border border-white/20 transition-all duration-500 ease-in-out'
    : 'fixed top-0 left-0 right-0 w-full z-50 bg-transparent py-8 transition-all duration-500 ease-in-out';

  const textColorClass = isScrolled ? 'text-neutral-charcoal' : 'text-white';
  const hoverColorClass = isScrolled ? 'hover:text-primary-rust' : 'hover:text-primary-gold';

  return (
    <nav className={navClasses}>
      <div className="px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`relative ${isScrolled ? 'w-24 h-8' : 'w-28 h-10'} transition-all duration-300`}>
              <Image
                src="/k10-logo.png"
                alt="K10"
                fill
                className={`object-contain object-left`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('properties')}
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium`}
            >
              Properties
            </button>
            <button
              onClick={() => scrollToSection('enquire')}
              className={`${textColorClass} ${hoverColorClass} transition-colors font-medium`}
            >
              Contact
            </button>
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+918000626586"
              className={`text-sm ${textColorClass} ${hoverColorClass} transition-colors flex items-center space-x-2`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 80006 26586</span>
            </a>
            <button
              onClick={() => scrollToSection('enquire')}
              className="bg-primary-rust text-white px-6 py-2.5 rounded-full hover:bg-primary-orange transition-all duration-300 hover:shadow-lg font-medium"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${textColorClass} ${hoverColorClass} transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 bg-white rounded-2xl p-6 shadow-xl absolute top-full left-0 right-0 mx-4 border border-gray-100">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left py-2 text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('properties')}
              className="block w-full text-left py-2 text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Properties
            </button>
            <button
              onClick={() => scrollToSection('enquire')}
              className="block w-full text-left py-2 text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Contact
            </button>
            <div className="pt-3 border-t border-neutral-gray">
              <a
                href="tel:+918000626586"
                className="block py-2 text-neutral-charcoal hover:text-primary-rust transition-colors"
              >
                📞 +91 80006 26586
              </a>
              <button
                onClick={() => scrollToSection('enquire')}
                className="w-full mt-2 bg-primary-rust text-white px-6 py-2.5 rounded-full hover:bg-primary-orange transition-all duration-300 font-medium"
              >
                Enquire Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
