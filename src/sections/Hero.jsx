import { useEffect, useRef } from 'react';
import anime from 'animejs';
import HeroVisual from '../components/HeroVisual';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Hero() {
  const headlineRef = useRef(null);
  const nameRef = useRef(null);
  const isMobile = useIsMobile(768);
  const isSmall = useIsMobile(480);

  useEffect(() => {
    const textWrapper = headlineRef.current;
    if (textWrapper && textWrapper.textContent) {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime.timeline({ loop: false }).add({
        targets: '.animate-headline .letter',
        translateY: [60, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
        delay: (el, i) => 200 + 20 * i,
      });
    }

    const nameWrapper = nameRef.current;
    if (nameWrapper && nameWrapper.textContent) {
      nameWrapper.innerHTML = nameWrapper.textContent.replace(/\S/g, "<span class='name-letter'>$&</span>");
      anime({
        targets: '.name-letter',
        opacity: [0, 1],
        scale: [0.8, 1],
        translateY: [10, 0],
        delay: anime.stagger(30, { start: 500 }),
        duration: 800,
        easing: 'easeOutElastic(1, .8)',
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="section-padding"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: isMobile ? '96px' : '120px',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
        /* On mobile the 3D visual is behind, so we don't need to share horizontal space */
      }}>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-md" style={{
            color: 'var(--primary)',
            marginBottom: '1rem',
            letterSpacing: '0.2em',
            fontSize: isMobile ? '0.65rem' : '0.875rem',
          }}>
            SOFTWARE ENGINEER
          </p>
        </motion.div>

        <h1
          ref={nameRef}
          style={{
            fontSize: isSmall ? '2rem' : isMobile ? '2.5rem' : 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: '900',
            lineHeight: '1.05',
            marginBottom: '1rem',
            color: 'var(--on-surface)',
            letterSpacing: '-0.02em',
          }}
        >
          Prathmesh Rikame
        </h1>

        <h2
          ref={headlineRef}
          className="animate-headline"
          style={{
            fontSize: isSmall ? '1rem' : isMobile ? '1.2rem' : '1.5rem',
            marginBottom: '1.5rem',
            maxWidth: '560px',
            color: 'var(--on-surface-variant)',
            fontWeight: '400',
            lineHeight: '1.3',
          }}
        >
          Architecting robust digital layers.
        </h2>

        <p style={{
          maxWidth: '560px',
          marginBottom: '2.5rem',
          color: 'var(--on-surface-variant)',
          lineHeight: '1.6',
          fontSize: isSmall ? '0.875rem' : '1rem',
        }}>
          Precise, layered, and intentionally structured interfaces. Turning complex requirements into sophisticated web applications with a focus on AI and high-performance React architecture.
        </p>

        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: isMobile ? 'column' : 'row',
          maxWidth: isMobile ? '360px' : 'none',
        }}>
          <motion.a
            href="#experience"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-gradient"
            style={{
              padding: isMobile ? '14px 24px' : '16px 40px',
              borderRadius: '12px',
              border: 'none',
              color: 'var(--surface-container-lowest)',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontWeight: '700',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            Explore Architecture
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ backgroundColor: 'rgba(102,168,238,0.1)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: isMobile ? '14px 24px' : '16px 40px',
              borderRadius: '12px',
              border: '1px solid var(--outline-variant)',
              color: 'var(--on-surface)',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            Initiate Handshake
          </motion.a>
        </div>
      </div>

      {/* High-End CSS-3D Animated Neural Hub */}
      <HeroVisual />
    </section>
  );
}
