import { motion } from 'framer-motion';
import { FileDown, FileText } from 'lucide-react';

export default function ResumeButton() {
  const resumeUrl = "https://drive.google.com/file/d/1v7ckC3prb3__-DQvu4OmKLfCmsVend4q/view?usp=drive_link";

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 1000, // Above everything
      pointerEvents: 'auto'
    }}>
      <motion.a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          background: 'rgba(16, 20, 25, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(139, 145, 155, 0.2)',
          borderRadius: '100px',
          color: 'var(--on-surface)',
          textDecoration: 'none',
          fontSize: '0.8125rem',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(139, 145, 155, 0.2)'}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', color: 'var(--primary)' }}>
          <FileText size={18} />
        </span>
        RESUME
        <FileDown size={14} style={{ opacity: 0.5 }} />
      </motion.a>
    </div>
  );
}
