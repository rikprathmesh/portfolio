import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const Orbit = ({ radius, rotateX, rotateY, delay, speed = 10, color = 'rgba(102, 168, 238, 0.2)' }) => {
  return (
    <motion.div
      animate={{ rotateZ: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear", delay }}
      style={{
        position: 'absolute',
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        border: `1.5px solid ${color}`,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        boxShadow: `0 0 20px ${color}`,
        pointerEvents: 'none'
      }}
    >
      {[0, 120, 240].map((angle, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--primary)',
            borderRadius: '50%',
            transform: `rotateZ(${angle}deg) translateX(${radius}px)`,
            boxShadow: '0 0 10px var(--primary)'
          }}
        />
      ))}
    </motion.div>
  );
};

export default function HeroVisual() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile(768);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic parallax - TIGHTER FOR SPEED
  const springX = useSpring(mouseX, { stiffness: 100, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15 });

  // Map mouse position to slight 3D tilt
  const mouseTiltX = useTransform(springY, [-500, 500], [15, -15]);
  const mouseTiltY = useTransform(springX, [-500, 500], [-15, 15]);

  // SCROLL TRANSFORMATIONS - Snappier Journey
  // Travel between: Hero (0), Skills (0.33), Projects (0.66), Contact (1.0)
  const xPos = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["0vw", "10vw", "-25vw", "-25vw"]); 
  const yPos = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["0%", "-20%", "10%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 0.7, 2.5, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.6, 0.75, 1], [0.8, 0.8, 0.1, 0.1, 0.5, 0.6]);
  const globalRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const webDevElements = [
    { text: '<div />', color: '#61DAFB' },
    { text: '{ code }', color: '#F7DF1E' },
    { text: 'const data = []', color: '#9ecaff' },
    { text: 'async function()', color: '#E0234E' },
    { text: 'git commit', color: '#F05032' },
    { text: 'System.Architecture', color: 'var(--primary)' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      /* On mobile: full width at low opacity (backdrop effect) */
      /* On desktop: right half only */
      width: isMobile ? '100vw' : '50vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1500px',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
      transformStyle: 'preserve-3d',
      opacity: isMobile ? 0.25 : 1, // subtle backdrop on mobile
    }}>
      <motion.div
        style={{
          position: 'relative',
          width: '1px',
          height: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          x: isMobile ? 0 : xPos,
          y: isMobile ? 0 : yPos,
          scale: isMobile ? 0.55 : scale,
          opacity,
          rotateX: mouseTiltX,
          rotateY: mouseTiltY,
          rotateZ: globalRotation,
        }}
      >
        {/* Core Glowing Orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary) 0%, rgba(16, 20, 25, 0) 70%)',
            filter: 'blur(30px)',
            zIndex: -1
          }}
        />
        <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--primary)',
            boxShadow: '0 0 80px 20px var(--primary)',
            zIndex: 1
        }} />

        {/* Orbiting Architecture Layers */}
        <Orbit radius={120} rotateX={60} rotateY={20} delay={0} speed={8} />
        <Orbit radius={180} rotateX={45} rotateY={-30} delay={1} speed={12} color="rgba(158, 202, 255, 0.15)" />
        <Orbit radius={260} rotateX={-30} rotateY={45} delay={2} speed={15} color="rgba(102, 168, 238, 0.1)" />

        {/* Web Developer Specific Floating Fragments */}
        {webDevElements.map((el, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [100, -200],
              x: (Math.sin(i) * 200),
              z: (Math.cos(i) * 200)
            }}
            transition={{ 
                duration: 6 + Math.random() * 4, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              color: el.color,
              fontSize: '12px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              textShadow: `0 0 10px ${el.color}66`
            }}
          >
            {el.text}
          </motion.div>
        ))}

      </motion.div>
    </div>
  );
}
