import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: 'var(--surface-container-low)', 
      padding: '80px 20px 40px', 
      borderTop: '1px solid rgba(139, 145, 155, 0.1)',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '60px'
        }}>
          
          {/* Brand & Tagline */}
          <div style={{ flex: '1 1 300px' }}>
            <h2 className="title-lg" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--on-surface)' }}>
              Rik.<span style={{ color: 'var(--primary)' }}>Prathmesh</span>
            </h2>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: '320px', lineHeight: '1.6' }}>
              Architecting high-performance digital systems with focus on scalability, AI integration, and premium user experience.
            </p>
          </div>

          {/* Site Map Links */}
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="label-sm" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Navigation</span>
              <a href="#home" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--on-surface)'} onMouseOut={e => e.target.style.color = 'var(--on-surface-variant)'}>Home</a>
              <a href="#skills" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--on-surface)'} onMouseOut={e => e.target.style.color = 'var(--on-surface-variant)'}>Technical Arsenal</a>
              <a href="#projects" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--on-surface)'} onMouseOut={e => e.target.style.color = 'var(--on-surface-variant)'}>Selected Works</a>
              <a href="#contact" style={{ color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--on-surface)'} onMouseOut={e => e.target.style.color = 'var(--on-surface-variant)'}>Contact</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="label-sm" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resources</span>
              <a href="https://github.com/rikprathmesh" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--on-surface)'} onMouseOut={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                <FaGithub size={18} style={{ color: '#fff' }} /> GitHub <ExternalLink size={12} style={{ opacity: 0.5 }} />
              </a>
              <a href="https://www.linkedin.com/in/prathmesh-rikame-77035a207/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--on-surface)'} onMouseOut={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                <FaLinkedin size={18} style={{ color: '#0A66C2' }} /> LinkedIn <ExternalLink size={12} style={{ opacity: 0.5 }} />
              </a>
              <a href="https://discord.gg/38dscQ4e" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--on-surface)'} onMouseOut={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                <SiDiscord size={18} style={{ color: '#5865F2' }} /> Discord <ExternalLink size={12} style={{ opacity: 0.5 }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Status & Copyright */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(139, 145, 155, 0.05)',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}
            />
            <span className="label-sm" style={{ color: 'var(--on-surface-variant)', letterSpacing: '0.05em' }}>
              SYSTEM STATUS: <span style={{ color: 'var(--on-surface)' }}>_OPTIMIZED</span>
            </span>
          </div>

          <div style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
             © {currentYear} RIK PRATHMESH. ALL RIGHTS RESERVED. // ARCHITECTURAL_V.2
          </div>
        </div>
      </div>
    </footer>
  );
}
