import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SiReact, SiNextdotjs, SiNestjs, SiNodedotjs, SiTypescript, SiPostgresql, SiHtml5, SiCss, SiSass, SiTailwindcss, SiGnubash } from 'react-icons/si';
import { FaNetworkWired } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

// Updated skill list per user input with authentic internet brand icons & colors
const skills = [
  { name: 'React.js', color: '#61DAFB', icon: <SiReact size={28} /> },
  { name: 'Next.js', color: '#ffffff', icon: <SiNextdotjs size={28} /> },
  { name: 'Nest.js', color: '#E0234E', icon: <SiNestjs size={28} /> },
  { name: 'Node.js', color: '#339933', icon: <SiNodedotjs size={28} /> },
  { name: 'TypeScript', color: '#3178C6', icon: <SiTypescript size={28} /> },
  { name: 'PostgreSQL', color: '#4169E1', icon: <SiPostgresql size={28} /> },
  { name: 'HTML5', color: '#E34F26', icon: <SiHtml5 size={28} /> },
  { name: 'CSS', color: '#1572B6', icon: <SiCss size={28} /> },
  { name: 'SASS', color: '#CC6699', icon: <SiSass size={28} /> },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: <SiTailwindcss size={28} /> },
  { name: 'System Arch', color: 'var(--primary)', icon: <FaNetworkWired size={28} /> },
  { name: 'Bash / CLI', color: '#4EAA25', icon: <SiGnubash size={28} /> }
];

// Reusable 3D Tilt Badge Component
function SkillBadge3D({ skill }) {
  const ref = useRef(null);
  
  // Motion values for the 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a fluid, heavy feel
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map mouse position to rotation angle (max 15 degrees)
  const rotateX = useTransform(springY, [-1, 1], [15, -15]);
  const rotateY = useTransform(springX, [-1, 1], [-15, 15]);

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Mouse relative to center of element (-1 to 1)
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="skill-badge"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        display: 'flex'
      }}
    >
      <motion.div
        style={{
          width: '100%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backgroundColor: 'var(--surface-container)',
          borderRadius: '16px',
          border: '1px solid rgba(65, 71, 80, 0.15)', // Ghost border
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '24px',
          cursor: 'none'
        }}
        whileHover={{
          scale: 1.05,
          borderColor: 'rgba(102, 168, 238, 0.5)' // subtle primary glow on hover
        }}
      >
        {/* Floating Icon layer (extrudes outward) */}
        <motion.div 
          style={{ 
            color: skill.color,
            transform: 'translateZ(40px)', // Pushes icon entirely off the background plane
            filter: `drop-shadow(0px 8px 10px ${skill.color}33)` // 33 is 20% opacity of the brand color for a matching glow
          }}
        >
          {skill.icon}
        </motion.div>
        
        {/* Floating Text layer */}
        <motion.span 
          className="title-sm"
          style={{ 
            transform: 'translateZ(20px)', // Middle floating text
            color: 'var(--on-surface)'
          }}
        >
          {skill.name}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile(768);
  const isSmall = useIsMobile(480);

  useEffect(() => {
    const badges = containerRef.current.querySelectorAll('.skill-badge');
    
    gsap.fromTo(badges, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="skills" className="section-padding" style={{
      backgroundColor: 'var(--surface-container-low)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="headline-lg" style={{ 
          marginBottom: isMobile ? '2rem' : '4rem', 
          color: 'var(--on-surface)',
          fontSize: isMobile ? '1.5rem' : '2rem',
        }}>
          Technical Arsenal
        </h2>

        <div ref={containerRef} style={{
          display: 'grid',
          gridTemplateColumns: isSmall ? '1fr' : isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: isMobile ? '16px' : '28px'
        }}>
          {skills.map((skill, index) => (
            <SkillBadge3D key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
