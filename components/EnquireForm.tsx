'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { supabase } from '../utils/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function EnquireForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    propertyType: [] as string[],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && formRef.current) {
      gsap.from(formRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }
  }, { scope: formRef });

  const budgetOptions = [
    '50 Lacs to below',
    '50 Lacs to 1 Crore',
    '1 Crore to 1.5 Crore',
    '1.5 Crore to 2 Crore',
    '2 Crore to 3 Crore',
    '3 Crore and above',
  ];

  const propertyTypes = ['Shop', 'Office', 'Showroom', 'Residential'];

  const handlePropertyTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace these with your actual keys from EmailJS Dashboard
      // https://dashboard.emailjs.com/admin

      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from('enquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            budget: formData.budget,
            property_type: formData.propertyType.join(', '),
            message: formData.message,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      console.log('SUCCESS!');
      alert('Thank you! Your enquiry has been sent successfully.');

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        budget: '',
        propertyType: [],
        message: '',
      });


    } catch (error) {
      console.error('FAILED...', error);
      alert('Failed to send message. Please try again later or contact us directly at +91 80006 26586');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquire" className="py-20 bg-gradient-to-br from-neutral-cream via-white to-neutral-gray">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Form Info */}
          <div ref={formRef} className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary-rust/10 rounded-full mb-4">
              <span className="text-primary-rust font-semibold text-sm uppercase tracking-wide">Get In Touch</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-neutral-charcoal-dark leading-tight">
              Find Your Perfect
              <span className="block text-primary-rust">Commercial Space</span>
            </h2>

            <p className="text-lg text-neutral-charcoal/70 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours. We're here to help you find the ideal property that matches your business needs.
            </p>

            {/* K10 Building 3D Image */}
            <div className="my-8 relative">
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/K10 BUILDING PNG.png"
                  alt="K10 Building 3D Model"
                  width={400}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>


          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <h3 className="text-2xl font-playfair font-bold text-neutral-charcoal mb-6">Enquire Now</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-rust focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-charcoal mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-rust focus:border-transparent outline-none transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-rust focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-neutral-charcoal mb-2">
                  Budget Range *
                </label>
                <select
                  id="budget"
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-rust focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-3">
                  Property Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.propertyType.includes(type)
                        ? 'border-primary-rust bg-primary-rust/5'
                        : 'border-gray-300 hover:border-primary-rust/50'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.propertyType.includes(type)}
                        onChange={() => handlePropertyTypeChange(type)}
                        className="w-4 h-4 text-primary-rust focus:ring-primary-rust rounded"
                      />
                      <span className="text-sm font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-charcoal mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-rust focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-rust text-white py-4 rounded-lg hover:bg-primary-orange transition-all duration-300 hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  'Submit Enquiry'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
