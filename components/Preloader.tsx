'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const minLoaderTime = 1000; // Increased to 1000ms as requested "AT LEAST 500ms" and user seems to want to see it
        const startTime = Date.now();

        const animateOut = () => {
            gsap.to('.preloader-container', {
                opacity: 0,
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: () => setIsLoading(false),
            });
        };

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoaderTime - elapsedTime);
            setTimeout(animateOut, remainingTime);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="preloader-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white gap-16 overflow-hidden">
            {/* Background Rings */}
            <div className="moving-ring" style={{ animationDelay: '0s' }}></div>
            <div className="moving-ring" style={{ animationDelay: '0.8s' }}></div>
            <div className="moving-ring" style={{ animationDelay: '1.5s' }}></div>

            <div className="relative w-48 h-20 md:w-64 md:h-24 z-10">
                <Image
                    src="/k10-logo.png"
                    alt="K10 Loading"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            {/* Custom CSS Loader requested by user */}
            <div className="loader z-10"></div>
        </div>
    );
}
