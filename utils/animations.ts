import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  });
};

export const staggerFadeIn = (elements: string, container: string) => {
  return gsap.from(elements, {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  });
};

export const parallaxEffect = (element: string, trigger: string, yPercent: number = 50) => {
  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const counterAnimation = (element: string, endValue: number) => {
  return gsap.from(element, {
    textContent: 0,
    duration: 2,
    ease: 'power1.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: 'top 70%',
    },
    onUpdate: function() {
      const target = this.targets()[0] as HTMLElement;
      target.textContent = Math.ceil(parseFloat(target.textContent || '0')).toString();
    },
  });
};

export default { fadeInUp, staggerFadeIn, parallaxEffect, counterAnimation };
