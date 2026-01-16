'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Patel',
    business: 'Patel Electronics',
    type: 'Shop Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    rating: 5,
    text: 'K10 INDEX helped us find the perfect shop location in RC Dutt Road. Their professionalism and market knowledge made the entire process smooth and hassle-free. Highly recommended!',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    business: 'Tech Solutions Pvt Ltd',
    type: 'Office Space',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    rating: 5,
    text: 'Excellent service from start to finish! The team understood our requirements perfectly and found us an amazing office space in Alkapuri. Very satisfied with their dedication.',
  },
  {
    id: 3,
    name: 'Amit Desai',
    business: 'Luxury Auto Showroom',
    type: 'Showroom',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    rating: 5,
    text: 'Working with K10 INDEX was a game-changer for our business. They found us a premium showroom with excellent visibility. Their after-sales support is commendable!',
  },
  {
    id: 4,
    name: 'Neha Trivedi',
    business: 'Fashion Boutique',
    type: 'Retail Space',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    rating: 5,
    text: 'The best real estate consultants in Vadodara! They helped me find a beautiful retail space that perfectly fits my boutique concept. Very professional and responsive team.',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && cardsRef.current) {
      const cards = gsap.utils.toArray('.testimonial-card');

      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  }, { scope: cardsRef });

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gradient-to-br from-neutral-cream via-white to-neutral-gray">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary-rust/10 rounded-full mb-4">
            <span className="text-primary-rust font-semibold text-sm uppercase tracking-wide">Client Testimonials</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-neutral-charcoal-dark mb-6">
            What Our Clients
            <span className="block text-primary-rust">Say About Us</span>
          </h2>

          <p className="text-lg text-neutral-charcoal/70">
            Don't just take our word for it. Hear from businesses who found their perfect space with K10 INDEX
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-primary-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-charcoal/80 leading-relaxed mb-6 text-lg">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center pt-6 border-t border-gray-200">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-charcoal">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-charcoal/70">{testimonial.business}</p>
                  <p className="text-xs text-primary-rust font-medium">{testimonial.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="font-semibold text-neutral-charcoal">Trusted</p>
            <p className="text-sm text-neutral-charcoal/70">Verified Listings</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-semibold text-neutral-charcoal">24/7</p>
            <p className="text-sm text-neutral-charcoal/70">Support Available</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="font-semibold text-neutral-charcoal">Legal</p>
            <p className="text-sm text-neutral-charcoal/70">Complete Support</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-semibold text-neutral-charcoal">Transparent</p>
            <p className="text-sm text-neutral-charcoal/70">No Hidden Costs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
