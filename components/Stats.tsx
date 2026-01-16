'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Satisfied customers across Vadodara',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Expertise in real estate industry',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: 3,
    value: 100,
    suffix: '+',
    label: 'Properties Sold',
    description: 'Successful transactions completed',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 4,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Rated by our valued clients',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Animate stat cards
      const cards = gsap.utils.toArray('.stat-card');
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Animate counter numbers
      stats.forEach((stat, index) => {
        const element = statsRef.current?.querySelector(`.stat-number-${index}`);
        if (element) {
          gsap.from(element, {
            textContent: 0,
            duration: 2.5,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            onUpdate: function () {
              const target = this.targets()[0] as HTMLElement;
              target.textContent = Math.ceil(parseFloat(target.textContent || '0')).toString();
            },
          });
        }
      });
    }
  }, { scope: statsRef });

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-br from-neutral-charcoal-dark via-neutral-charcoal to-neutral-charcoal-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary-gold/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-primary-gold font-semibold text-sm uppercase tracking-wide">Our Achievement</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Trusted by Hundreds of
            <span className="block text-primary-gold">Businesses in Vadodara</span>
          </h2>

          <p className="text-lg text-gray-300">
            Over 15 years of excellence in delivering premium commercial properties and exceptional service
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="stat-card group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-primary-gold/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-20 h-20 bg-primary-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-gold/20 transition-colors duration-300">
                  <div className="text-primary-gold">
                    {stat.icon}
                  </div>
                </div>

                {/* Counter */}
                <div className="mb-3">
                  <span className={`stat-number-${index} text-5xl md:text-6xl font-bold text-primary-gold`}>
                    0
                  </span>
                  <span className="text-5xl md:text-6xl font-bold text-primary-gold">{stat.suffix}</span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>

                {/* Description */}
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl mb-6 text-gray-300">Ready to find your perfect commercial space?</p>
          <button
            onClick={() => {
              const element = document.getElementById('enquire');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-primary-gold text-neutral-charcoal-dark px-8 py-4 rounded-lg hover:bg-primary-gold/90 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-gold/30 font-bold text-lg inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
