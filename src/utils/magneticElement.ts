import gsap from 'gsap';

const initMagneticEffect = () => {
  const elements = document.querySelectorAll('.magnetic-element');

  if (!elements) {
    return;
  }

  elements.forEach(element => {
    initButtonEffects(element);
  });
};

const initButtonEffects = (element: Element) => {
  let boundingRect = element.getBoundingClientRect();

  window.addEventListener('resize', () => {
    boundingRect = element.getBoundingClientRect();
  });

  element.addEventListener('mousemove', (e: Event) => {
    const mouseEvent = e as MouseEvent;
    boundingRect = element.getBoundingClientRect();
    const mousePosX = mouseEvent.clientX - boundingRect.left;
    const mousePosY = mouseEvent.clientY - boundingRect.top;

    gsap.to(element, {
      x: (mousePosX - boundingRect.width / 2) * 0.2,
      y: (mousePosY - boundingRect.height / 2) * 0.2,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    });
  });

  element.addEventListener('mousedown', () => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.15,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseup', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.15,
      ease: 'power2.out',
    });
  });
};

window.addEventListener('load', initMagneticEffect);
