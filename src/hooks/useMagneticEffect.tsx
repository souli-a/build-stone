import gsap from 'gsap';
import { useEffect, type RefObject } from 'react';

const useMagneticEffect = <T extends HTMLElement>(ref: RefObject<T | null>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let boundingRect = element.getBoundingClientRect();

    const handleResize = () => {
      boundingRect = element.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mousePosX = e.clientX - boundingRect.left;
      const mousePosY = e.clientY - boundingRect.top;

      gsap.to(element, {
        x: (mousePosX - boundingRect.width / 2) * 0.4,
        y: (mousePosY - boundingRect.height / 2) * 0.4,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(element);
    };
  }, [ref]);
};

export default useMagneticEffect;
