import { animated, useInView, useSpring } from '@react-spring/web';
import { Children, ReactNode, useMemo } from 'react';

interface CascadeRevealProps {
  children: ReactNode;
  threshold?: number;
  baseDelay?: number;
  staggerDelay?: number;
  config?: {
    mass?: number;
    tension?: number;
    friction?: number;
  };
  className?: string;
}

interface CascadeItemProps {
  children: ReactNode;
  inView: boolean;
  index: number;
  baseDelay: number;
  staggerDelay: number;
  config?: {
    mass?: number;
    tension?: number;
    friction?: number;
  };
  className?: string;
}

const CascadeItem = ({
  children,
  inView,
  index,
  baseDelay,
  staggerDelay,
  config,
}: CascadeItemProps) => {
  const itemDelay = baseDelay + index * staggerDelay;

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(5rem)',
    delay: itemDelay,
    config: config,
  });

  return <animated.div style={animation}>{children}</animated.div>;
};

const CascadeRevealElement = ({
  children,
  threshold = 0.4,
  baseDelay = 125,
  staggerDelay = 50,
  config = { mass: 3, tension: 250, friction: 50 },
  className = '',
}: CascadeRevealProps) => {
  const [ref, inView] = useInView({
    once: true,
    amount: threshold,
  });

  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <CascadeItem
          key={index}
          inView={inView}
          index={index}
          baseDelay={baseDelay}
          staggerDelay={staggerDelay}
          config={config}>
          {child}
        </CascadeItem>
      ))}
    </div>
  );
};

export default CascadeRevealElement;
