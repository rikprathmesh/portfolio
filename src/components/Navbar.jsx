import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

// "Magnetic" Framer Motion wrapper
function MagneticFramed({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x: position.x * 0.15, y: position.y * 0.15 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const links = ['Home', 'Skills', 'Projects', 'Contact'];
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div style={{ position: 'fixed', top: '32px', left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'center' }}>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setHoveredLink(null)}
        style={{
          backgroundColor: 'rgba(38, 42, 49, 0.45)', // surface-container-high heavily transparent
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          borderRadius: '999px', // Pill shape
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(139, 145, 155, 0.15)', // transparent outline
          gap: '32px'
        }}
      >
        <div style={{ 
          padding: '8px 24px', 
          color: 'var(--on-surface)', 
          fontWeight: '700', 
          letterSpacing: '0.05em',
          pointerEvents: 'none'
        }}>
          Rik.<span style={{ color: 'var(--primary)' }}>Prathmesh</span>
        </div>
        
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '4px' }}>
          {links.map((link) => (
            <MagneticFramed key={link}>
              <li style={{ position: 'relative' }}>
                <a 
                  href={`#${link.toLowerCase()}`}
                  onMouseEnter={() => setHoveredLink(link)}
                  style={{
                    display: 'block',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    color: hoveredLink === link ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {link}
                </a>

                {/* Animated Background Pill */}
                {hoveredLink === link && (
                  <motion.div 
                    layoutId="navbar-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(102, 168, 238, 0.15)', // primary at 15% opacity
                      borderRadius: '999px',
                      zIndex: 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            </MagneticFramed>
          ))}
        </ul>

      </motion.nav>
    </div>
  );
}
