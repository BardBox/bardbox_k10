'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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
    if (formRef.current) {
      gsap.from(formRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will contact you soon.');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      budget: '',
      propertyType: [],
      message: '',
    });
    setIsSubmitting(false);
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
                <div className="absolute -bottom-4 -right-4 bg-primary-gold text-white px-6 py-3 rounded-lg shadow-xl">
                  <p className="text-sm font-semibold">Premium Property</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-rust/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-rust" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-charcoal mb-1">Visit Our Office</h4>
                  <p className="text-neutral-charcoal/70">605/6, Signet Hub, Akshar Chowk, Akota, Vadodara</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-rust/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-rust" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-charcoal mb-1">Call Us</h4>
                  <a href="tel:+917862002567" className="text-primary-rust hover:text-primary-orange transition-colors">
                    +91 7862002567
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-rust/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-rust" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-charcoal mb-1">Working Hours</h4>
                  <p className="text-neutral-charcoal/70">Monday - Friday, 10:00 AM - 5:00 PM</p>
                </div>
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
                      className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.propertyType.includes(type)
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
