import { useEffect, useRef } from 'react';
import anime from 'animejs';
import HeroVisual from '../components/HeroVisual';
import { motion } from 'framer-motion';

export default function Hero() {
  const headlineRef = useRef(null);
  const nameRef = useRef(null);
  
  useEffect(() => {
    // Scramble / Fade animation for the headline
    const textWrapper = headlineRef.current;
    if(textWrapper && textWrapper.textContent) {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      
      anime.timeline({loop: false})
        .add({
          targets: '.animate-headline .letter',
          translateY: [60,0],
          translateZ: 0,
          opacity: [0,1],
          easing: "easeOutExpo",
          duration: 800,
          delay: (el, i) => 200 + 20 * i
        });
    }

    // Name reveal animation - FASTER
    const nameWrapper = nameRef.current;
    if(nameWrapper && nameWrapper.textContent) {
        nameWrapper.innerHTML = nameWrapper.textContent.replace(/\S/g, "<span class='name-letter'>$&</span>");
        anime({
            targets: '.name-letter',
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [10, 0],
            delay: anime.stagger(30, {start: 500}),
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        });
    }
  }, []);

  return (
    <section id="home" className="section-padding" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      position: 'relative',
      paddingTop: '120px',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
            <p className="label-md" style={{ color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '0.2em' }}>
                SOFTWARE ENGINEER
            </p>
        </motion.div>

        <h1 
          ref={nameRef}
          className="display-lg" 
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: '900',
            lineHeight: '1',
            marginBottom: '1rem',
            color: 'var(--on-surface)',
            letterSpacing: '-0.02em'
          }}
        >
          Prathmesh Rikame
        </h1>

        <h2 
          ref={headlineRef}
          className="headline-md animate-headline" 
          style={{ 
            marginBottom: '2.5rem',
            maxWidth: '600px',
            color: 'var(--on-surface-variant)',
            fontWeight: '400',
            lineHeight: '1.2'
          }}
        >
          Architecting robust digital layers.
        </h2>

        <p className="body-lg" style={{ maxWidth: '600px', marginBottom: '3rem', color: 'var(--on-surface-variant)' }}>
          Precise, layered, and intentionally structured interfaces. Turning complex requirements into sophisticated web applications with a focus on AI and high-performance React architecture.
        </p>
        
        <div style={{ display: 'flex', gap: '24px' }}>
            <motion.a 
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient" 
                style={{
                    padding: '16px 40px',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'var(--surface-container-lowest)',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                Explore Architecture
            </motion.a>

            <motion.a 
                href="#contact"
                whileHover={{ backgroundColor: 'rgba(102, 168, 238, 0.1)' }}
                style={{
                    padding: '16px 40px',
                    borderRadius: '12px',
                    border: '1px solid var(--outline-variant)',
                    color: 'var(--on-surface)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
