import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile(768);

  const linkStyle = {
    color: 'var(--on-surface-variant)',
    textDecoration: 'none',
    transition: 'color 0.3s',
    fontSize: isMobile ? '0.9rem' : '0.95rem',
  };

  return (
    <footer style={{
      backgroundColor: 'var(--surface-container-low)',
      padding: isMobile ? '48px 20px 32px' : '80px 32px 40px',
      borderTop: '1px solid rgba(139,145,155,0.1)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top section */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: isMobile ? '32px' : '40px',
          marginBottom: isMobile ? '36px' : '60px',
          textAlign: isMobile ? 'center' : 'left',
        }}>

          {/* Brand */}
          <div style={{ width: '100%' }}>
            <h2 style={{
              fontSize: isMobile ? '1.375rem' : '2rem',
              marginBottom: '0.75rem',
              color: 'var(--on-surface)',
              fontWeight: '700',
            }}>
              Rik.<span style={{ color: 'var(--primary)' }}>Prathmesh</span>
            </h2>
            <p style={{
              color: 'var(--on-surface-variant)',
              maxWidth: isMobile ? '100%' : '320px',
              lineHeight: '1.6',
              fontSize: isMobile ? '0.875rem' : '1rem',
              margin: isMobile ? '0 auto' : '0',
            }}>
              Architecting high-performance digital systems with focus on scalability, AI integration, and premium user experience.
            </p>
          </div>

          {/* Links grid */}
          <div style={{
            display: 'flex',
            gap: '48px',
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: '100%',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: isMobile ? 'center' : 'flex-start' }}>
              <span style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navigation</span>
              {['home', 'skills', 'projects', 'contact'].map(link => (
                <a key={link} href={`#${link}`} style={linkStyle}
                  onMouseOver={e => e.target.style.color = 'var(--on-surface)'}
                  onMouseOut={e => e.target.style.color = 'var(--on-surface-variant)'}
                >{link.charAt(0).toUpperCase() + link.slice(1)}</a>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: isMobile ? 'center' : 'flex-start' }}>
              <span style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Resources</span>
              <a href="https://github.com/rikprathmesh" target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--on-surface)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}
              >
                <FaGithub size={16} style={{ color: '#fff' }} /> GitHub <ExternalLink size={11} style={{ opacity: 0.5 }} />
              </a>
              <a href="https://www.linkedin.com/in/prathmesh-rikame-77035a207/" target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--on-surface)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}
              >
                <FaLinkedin size={16} style={{ color: '#0A66C2' }} /> LinkedIn <ExternalLink size={11} style={{ opacity: 0.5 }} />
              </a>
              <a href="https://discord.gg/38dscQ4e" target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--on-surface)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}
              >
                <SiDiscord size={16} style={{ color: '#5865F2' }} /> Discord <ExternalLink size={11} style={{ opacity: 0.5 }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '28px',
          borderTop: '1px solid rgba(139,145,155,0.06)',
          gap: '16px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '7px', height: '7px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80' }}
            />
            <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
              SYSTEM STATUS: <span style={{ color: 'var(--on-surface)' }}>_OPTIMIZED</span>
            </span>
          </div>

          <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
            © {currentYear} RIK PRATHMESH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
