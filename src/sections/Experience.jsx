import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const experiences = [
  {
    role: "Software Engineer",
    company: "Newel Technologies Pvt. Ltd.",
    period: "December 2024 – Present",
    location: "Mumbai, Maharashtra, India",
    description: [
      "Develop and maintain scalable full stack features using React.js and Node.js, contributing to product modules used by enterprise clients.",
      "Architected RESTful APIs with NestJS and PostgreSQL, improving data retrieval efficiency by implementing optimised query patterns.",
      "Collaborated with design and product teams in agile sprints to translate requirements into pixel-perfect, accessible UI components.",
      "Integrated third-party services and libraries, reducing development time for recurring feature sets by reusing modular component architecture.",
      "Participated in code reviews and established coding standards that improved team-wide code consistency and reduced bug count."
    ]
  },
  {
    role: "React Front End Developer",
    company: "Brained",
    period: "May 2023 – December 2024",
    location: "Mumbai, Maharashtra, India",
    description: [
      "Built and shipped multiple production-ready React.js applications with a focus on performance, accessibility, and mobile responsiveness.",
      "Implemented dynamic, data-driven dashboards consuming REST APIs with real-time state management using React hooks and context.",
      "Utilised Tailwind CSS to create reusable design systems, cutting styling overhead and ensuring visual consistency across products.",
      "Optimised page load performance through code splitting, lazy loading, and image optimisation, achieving measurable improvements in Core Web Vitals.",
      "Worked closely with backend engineers to define API contracts and reduce integration friction across the development lifecycle."
    ]
  },
  {
    role: "Internship Trainee",
    company: "April Innovations",
    period: "September 2022 – May 2023",
    location: "Mumbai, Maharashtra, India",
    description: [
      "Gained hands-on experience in frontend development with HTML, CSS, JavaScript, and ReactJS under senior developer mentorship.",
      "Contributed to building responsive UI layouts and resolved cross-browser compatibility issues across client projects.",
      "Participated in requirement gathering and sprint planning, developing a strong foundation in agile software development practices."
    ]
  }
];

export default function Experience() {
  const isMobile = useIsMobile(768);

  return (
    <section id="experience" className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: isMobile ? '36px' : '60px' }}
        >
          <span className="label-md" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: isMobile ? '0.65rem' : '0.875rem' }}>
            Professional Journey
          </span>
          <h2 style={{ marginTop: '0.75rem', color: 'var(--on-surface)', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '600' }}>
            Architectural Experience
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ 
            position: 'absolute', 
            left: isMobile ? '22px' : '31px', 
            top: '0', bottom: '0', width: '2px', 
            background: 'linear-gradient(to bottom, var(--primary), rgba(102,168,238,0.1))',
            borderRadius: '1px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '36px' : '60px' }}>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                style={{ display: 'flex', gap: isMobile ? '14px' : '40px', position: 'relative' }}
              >
                {/* Timeline dot */}
                <div style={{ 
                  width: isMobile ? '44px' : '64px', 
                  height: isMobile ? '44px' : '64px', 
                  borderRadius: isMobile ? '10px' : '16px', 
                  backgroundColor: 'var(--surface-container-low)', 
                  border: '1px solid var(--outline-variant)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, flexShrink: 0,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  <Briefcase size={isMobile ? 18 : 24} color="var(--primary)" />
                </div>

                {/* Content Card */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    padding: isMobile ? '16px' : '32px', 
                    borderRadius: isMobile ? '14px' : '24px', 
                    backgroundColor: 'var(--surface-container-low)', 
                    border: '1px solid rgba(139,145,155,0.1)',
                  }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '1rem' : '1.25rem',
                        color: 'var(--on-surface)', marginBottom: '4px', fontWeight: '600',
                        lineHeight: '1.3'
                      }}>{exp.role}</h3>
                      <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: isMobile ? '0.875rem' : '1rem' }}>{exp.company}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', fontSize: '0.8125rem' }}>
                          <Calendar size={13} /> {exp.period}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', fontSize: '0.8125rem' }}>
                          <MapPin size={13} /> {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {exp.description.map((item, i) => (
                        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <ChevronRight size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ color: 'var(--on-surface-variant)', lineHeight: '1.55', fontSize: isMobile ? '0.8125rem' : '0.9375rem' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
