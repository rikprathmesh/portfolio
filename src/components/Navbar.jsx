import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

// "Magnetic" Framer Motion wrapper — desktop only
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

  const mouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x: position.x * 0.15, y: position.y * 0.15 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const links = ['Home', 'Skills', 'Projects', 'Contact'];
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(768);

  return (
    <>
      {/* ── Nav pill / bar ── */}
      <div style={{
        position: 'fixed', top: '20px', left: 0, right: 0,
        zIndex: 1000, display: 'flex', justifyContent: 'center',
        padding: '0 16px',
      }}>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => setHoveredLink(null)}
          style={{
            backgroundColor: 'rgba(28, 32, 38, 0.75)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 8px',
            borderRadius: '999px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)',
            border: '1px solid rgba(139,145,155,0.15)',
            gap: '8px',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '480px' : '620px',
          }}
        >
          {/* Logo */}
          <div style={{
            padding: '8px 16px',
            color: 'var(--on-surface)',
            fontWeight: '700',
            letterSpacing: '0.05em',
            fontSize: isMobile ? '0.8rem' : '0.95rem',
            whiteSpace: 'nowrap',
          }}>
            Rik.<span style={{ color: 'var(--primary)' }}>Prathmesh</span>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '4px' }}>
              {links.map((link) => (
                <MagneticFramed key={link}>
                  <li style={{ position: 'relative' }}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      onMouseEnter={() => setHoveredLink(link)}
                      style={{
                        display: 'block',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        color: hoveredLink === link ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                        fontSize: '0.8125rem',
                        fontWeight: '500',
                        transition: 'color 0.2s ease',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {link}
                    </a>
                    {hoveredLink === link && (
                      <motion.div
                        layoutId="navbar-pill"
                        style={{
                          position: 'absolute', inset: 0,
                          backgroundColor: 'rgba(158,202,255,0.12)',
                          borderRadius: '999px', zIndex: 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </li>
                </MagneticFramed>
              ))}
            </ul>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none',
                color: 'var(--on-surface)',
                padding: '8px 12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center',
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </motion.nav>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 998,
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                position: 'fixed', top: '76px',
                left: '16px', right: '16px',
                backgroundColor: 'rgba(22,26,32,0.97)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                padding: '20px',
                borderRadius: '20px',
                zIndex: 999,
                border: '1px solid rgba(139,145,155,0.15)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
              }}
            >
              {links.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'block',
                    padding: '14px 16px',
                    color: 'var(--on-surface)',
                    textDecoration: 'none',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    marginBottom: '6px',
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
