'use client';

import { useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToEnquire = () => {
    const element = document.getElementById('enquire');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative h-screen w-full overflow-hidden bg-neutral-charcoal-dark">
      {/* Parallax Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%]"
      >
        <Image
          src="/images/Herosection.png"
          alt="K10 Commercial Complex"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div ref={contentRef} className="max-w-4xl mx-auto text-white text-center">
            <div className="inline-block px-3 py-2 bg-primary-gold/30 backdrop-blur-md rounded-full mb-4 md:mb-6 border border-primary-gold/30">
              <span className="text-primary-gold font-semibold text-[12px] md:text-lg drop-shadow-lg">Premium Properties</span>
            </div>

            <h1 className="text-3xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4 md:mb-6 leading-tight drop-shadow-2xl">
              Your Dream Property
              <span className="block text-primary-gold mt-2">Awaits in Vadodara</span>
            </h1>

            <p className="text-base md:text-2xl text-white mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-medium">
              Discover exceptional commercial spaces - shops, offices, and showrooms - in prime locations across Vadodara.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 md:mt-10">
              <button
                onClick={scrollToEnquire}
                className="w-full sm:w-auto group text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-2xl font-semibold text-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: '#d45d48' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d94645'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d45d48'}
              >
                <span>Enquire Now</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <a
                href="tel:+918000626586"
                className="w-full sm:w-auto text-white px-8 py-3 rounded-full transition-all duration-300 border-2 border-white hover:bg-white hover:text-gray-900 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now</span>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 md:mt-16 grid grid-cols-3 gap-2 md:gap-8 max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-white/10">
              <div className="text-center">
                <div className="text-2xl md:text-5xl font-bold text-primary-gold mb-1 md:mb-2 drop-shadow-lg">500+</div>
                <div className="text-xs md:text-base text-white font-medium">Happy Clients</div>
              </div>
              <div className="text-center border-x border-white/30">
                <div className="text-2xl md:text-5xl font-bold text-primary-gold mb-1 md:mb-2 drop-shadow-lg">15+</div>
                <div className="text-xs md:text-base text-white font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-5xl font-bold text-primary-gold mb-1 md:mb-2 drop-shadow-lg">100+</div>
                <div className="text-xs md:text-base text-white font-medium">Properties Sold</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
