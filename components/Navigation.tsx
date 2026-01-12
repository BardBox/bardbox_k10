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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/k10-logo.png"
              alt="K10"
              width={100}
              height={40}
              className="w-auto h-8 lg:h-10"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('properties')}
              className="text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Properties
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+917862002567"
              className="text-sm text-neutral-charcoal hover:text-primary-rust transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 7862002567</span>
            </a>
            <button
              onClick={() => scrollToSection('enquire')}
              className="bg-primary-rust text-white px-6 py-2.5 rounded-md hover:bg-primary-orange transition-all duration-300 hover:shadow-lg font-medium"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-neutral-charcoal hover:text-primary-rust transition-colors"
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
          <div className="lg:hidden mt-4 pb-4 space-y-3">
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
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left py-2 text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-neutral-charcoal hover:text-primary-rust transition-colors font-medium"
            >
              Contact
            </button>
            <div className="pt-3 border-t border-neutral-gray">
              <a
                href="tel:+917862002567"
                className="block py-2 text-neutral-charcoal hover:text-primary-rust transition-colors"
              >
                📞 +91 7862002567
              </a>
              <button
                onClick={() => scrollToSection('enquire')}
                className="w-full mt-2 bg-primary-rust text-white px-6 py-2.5 rounded-md hover:bg-primary-orange transition-all duration-300 font-medium"
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
