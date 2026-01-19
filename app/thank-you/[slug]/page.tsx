'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import gsap from 'gsap';

export default function ThankYouPage() {
    const params = useParams();
    const slug = params?.slug as string;

    // Format campaign name logic
    const formatCampaignName = (text: string) => {
        if (!text || text === 'success' || text === 'direct') return null;
        return text
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    const campaignName = formatCampaignName(slug);

    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const circleRef = useRef(null);
    const checkRef = useRef(null);

    const shape1Ref = useRef(null);
    const shape2Ref = useRef(null);
    const shape3Ref = useRef(null);

    useEffect(() => {
        // Fire Meta Pixel Lead event
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
                content_name: campaignName || 'General Enquiry',
                status: 'success'
            });
            console.log('Meta Pixel Lead event fired');
        }

        // Animations
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(cardRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        )
            .fromTo(circleRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
                '-=0.5'
            )
            .fromTo(checkRef.current,
                { strokeDasharray: 24, strokeDashoffset: 24, opacity: 0 },
                { strokeDashoffset: 0, opacity: 1, duration: 0.6 },
                '-=0.2'
            )
            .fromTo([titleRef.current, textRef.current],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
                '-=0.4'
            );

        // Floating Shapes Animation
        gsap.to(shape1Ref.current, {
            y: -20,
            rotation: 360,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        gsap.to(shape2Ref.current, {
            y: 30,
            rotation: -180,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        gsap.to(shape3Ref.current, {
            y: -15,
            x: 15,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

    }, []);

    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-white relative overflow-hidden flex flex-col pt-32 pb-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #000000 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}></div>
                </div>

                {/* Decorative Gradients */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-rust/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                {/* Geometric Shapes */}
                {/* Shape 1: Large Gold Ring */}
                <div ref={shape1Ref} className="absolute top-20 left-[10%] opacity-20 hidden lg:block">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-primary-gold">
                        <circle cx="50" cy="50" r="45" strokeWidth="2" />
                    </svg>
                </div>

                {/* Shape 2: Rust Hexagon */}
                <div ref={shape2Ref} className="absolute bottom-40 left-[5%] opacity-15 hidden lg:block">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-primary-rust">
                        <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" fillOpacity="0.5" />
                    </svg>
                </div>

                {/* Shape 3: Dotted Grid / Diamond */}
                <div ref={shape3Ref} className="absolute top-40 right-[10%] opacity-20 hidden lg:block">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-neutral-charcoal">
                        <rect x="50" y="5" width="64" height="64" transform="rotate(45 50 50)" strokeWidth="2" />
                    </svg>
                </div>

                <div className="flex-grow flex items-center justify-center relative z-10 p-4">
                    <div
                        ref={cardRef}
                        className="bg-white border border-gray-100 p-8 md:p-14 rounded-3xl shadow-2xl max-w-2xl w-full text-center"
                    >
                        <div
                            ref={circleRef}
                            className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
                        >
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    ref={checkRef}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h1 ref={titleRef} className="text-4xl md:text-6xl font-playfair font-bold text-neutral-charcoal mb-6">
                            Thank <span className="text-primary-rust">You!</span>
                        </h1>

                        <div ref={textRef}>
                            <p className="text-xl text-neutral-charcoal/80 mb-8 font-light leading-relaxed">
                                We have received your enquiry{campaignName && <> regarding <span className="font-semibold text-primary-rust">{campaignName}</span></>}. <br className="hidden md:block" />
                                Our team will get back to you shortly.
                            </p>

                            <div className="space-y-6">
                                <p className="text-sm text-gray-500">
                                    In the meantime, feel free to explore more about K10 Index.
                                </p>

                                <Link
                                    href="/"
                                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-rust to-primary-gold text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-primary-rust/20 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <span>Back to Home</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
