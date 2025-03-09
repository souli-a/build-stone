import { animated, useInView, useSpring } from '@react-spring/web';

const ScrollRevealText = ({
  children,
  threshold = 0.5,
  className,
}: {
  children: React.ReactNode;
  threshold?: number;
  className: string;
}) => {
  const [ref, inView] = useInView({
    once: true,
    amount: threshold,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0rem)' : 'translateY(4rem)',
    config: { mass: 5, tension: 175, friction: 50 },
  });

  return (
    <animated.div className={className} ref={ref} style={animation}>
      {children}
    </animated.div>
  );
};

export default ScrollRevealText;
