'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

const properties = [
  {
    id: 1,
    title: 'Front Elevation View',
    description: 'Modern commercial complex at prime location in Akshar Chowk',
    type: 'Office',
    image: '/images/6K_K10 Index Front View-b.jpg',
  },
  {
    id: 2,
    title: 'Side Perspective',
    description: 'Strategic corner view showcasing accessibility from multiple sides',
    type: 'Shop',
    image: '/images/6K_K10 Index Left Side Top View_b.jpg',
  },
  {
    id: 3,
    title: 'Aerial View',
    description: 'Bird\'s eye perspective highlighting 4-road connectivity advantage',
    type: 'Showroom',
    image: '/images/6K_K10 New Top View_4 roads (1).jpg',
  },
  {
    id: 4,
    title: 'Corner Positioning',
    description: 'Distinctive corner placement with maximum street visibility',
    type: 'Office',
    image: '/images/K10 Index Left Corner View-c.jpg',
  },
  {
    id: 5,
    title: 'Architectural Design',
    description: 'Contemporary building design with premium finishing touches',
    type: 'Shop',
    image: '/images/building 3_enhanced.png',
  },
  {
    id: 6,
    title: 'Premium Features',
    description: 'Comprehensive amenities designed for business excellence',
    type: 'Showroom',
    image: '/images/Premium Amenities.jpg',
  },
];

export default function PropertyGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProperties = activeFilter === 'All'
    ? properties
    : properties.filter(prop => prop.type === activeFilter);



  return (
    <section id="properties" ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-2 bg-primary-rust/10 rounded-full mb-6">
            <span className="text-primary-rust font-semibold text-sm uppercase tracking-wide">Available Properties</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-neutral-charcoal-dark mb-6">
            Explore Our Premium
            <span className="block text-primary-rust">Commercial Properties</span>
          </h2>

          <p className="text-lg text-neutral-charcoal/70">
            Handpicked selection of the finest commercial spaces in Vadodara's most sought after locations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['All', 'Shop', 'Office', 'Showroom'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeFilter === filter
                ? 'text-white shadow-lg'
                : 'bg-white text-neutral-charcoal border-2 border-neutral-charcoal/10 hover:border-primary-rust/30'
                }`}
              style={activeFilter === filter ? { backgroundColor: '#d45d48' } : {}}
            >
              {filter === 'Shop' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              )}
              {filter === 'Office' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              )}
              {filter === 'Showroom' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              )}
              <span>{filter}</span>
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="property-card group cursor-pointer"
            >
              {/* Property Image */}
              <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Property Type Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-neutral-charcoal shadow-lg">
                    {property.type}
                  </span>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2 drop-shadow-lg">
                    {property.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
