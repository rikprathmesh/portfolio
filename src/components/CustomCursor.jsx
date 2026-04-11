import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = e => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      animate={{ 
        x: mousePosition.x - 24, 
        y: mousePosition.y - 24,
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 90 : 0
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '48px',
        height: '48px',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isHovering ? 'var(--primary-container)' : 'var(--primary)',
        fontFamily: 'monospace',
        fontSize: '18px',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(102, 168, 238, 0.5)',
        mixBlendMode: 'difference'
      }}
    >
      &lt;/&gt;
    </motion.div>
  );
}
