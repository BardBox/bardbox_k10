'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden" style={{ backgroundColor: '#202020' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={contentRef}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(195, 163, 109, 0.15)' }}>
              <span className="text-primary-gold font-semibold text-sm uppercase tracking-wide">Our Achievement</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
              Trusted by Hundreds of
              <span className="block text-primary-gold">Businesses in Vadodara</span>
            </h2>

            <p className="text-lg text-white/70">
              Over 15 years of excellence in delivering premium commercial properties and exceptional service
            </p>
          </div>

          {/* Map and Info Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-neutral-charcoal mb-6">
                  Ready to find your perfect commercial space?
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d45d48' }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-charcoal mb-1">Location</h4>
                      <p className="text-neutral-charcoal/70 text-sm">
                        K10 INDEX, Opp. SURYA PALACE HOTEL<br />
                        Parshuram Nagar, Sayajiganj<br />
                        Vadodara, Gujarat 390007
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c3a36d' }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-charcoal mb-1">Call Us</h4>
                      <a href="tel:+917862002567" className="text-primary-rust font-semibold hover:underline">
                        +91 78620 02567
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d45d48' }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-charcoal mb-1">Working Hours</h4>
                      <p className="text-neutral-charcoal/70 text-sm">
                        Monday - Saturday: 10:00 AM - 7:00 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://www.google.com/maps/dir//K10+INDEX+SURYA+PALACE+HOTEL+opp.+GRAND+MERCURE,+Parshuram+Nagar,+Sayajiganj+Vadodara,+Gujarat+390007/@22.3064374,73.1840837,16z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg font-semibold text-sm"
                  style={{ backgroundColor: '#d45d48' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d94645'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d45d48'}
                >
                  <span>Get Directions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map Embed */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5859999999997!2d73.1840837!3d22.3064374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcfecee5d292f%3A0xe21fbd0742f8452f!2sK10%20INDEX!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="K10 INDEX Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
