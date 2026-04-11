import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    fetch('https://api.github.com/users/rikprathmesh/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        const validRepos = Array.isArray(data) ? data.filter(repo => repo.name !== 'rikprathmesh') : [];
        setProjects(validRepos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching github data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="headline-lg" style={{
          marginBottom: isMobile ? '2.5rem' : '5rem',
          fontSize: isMobile ? '1.5rem' : '2rem',
        }}>Selected Works from GitHub</h2>

        {loading ? (
          <p className="body-lg" style={{ color: 'var(--primary)' }}>[ _SYNCING_REPOSITORIES... ]</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '3rem' : '7rem' }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                  gap: isMobile ? '1.5rem' : '4rem',
                  alignItems: isMobile ? 'stretch' : 'center',
                }}
              >
                {/* Visual / Repo placeholder */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    backgroundColor: 'var(--surface-container-low)',
                    height: isMobile ? '200px' : '380px',
                    width: '100%',
                    flex: isMobile ? 'none' : '0 0 48%',
                    borderRadius: '14px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(65,71,80,0.15)',
                  }}
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'var(--primary)', opacity: 0.04, zIndex: 2
                  }} />
                  <div style={{
                    position: 'absolute', inset: '20px',
                    border: '1px dotted var(--outline-variant)',
                    borderRadius: '8px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}>
                    <SiGithub size={isMobile ? 28 : 44} color="var(--outline-variant)" />
                    <span className="label-md" style={{ color: 'var(--outline)', fontSize: '0.7rem' }}>
                      _REPO_REFERENCE
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="label-sm" style={{
                    color: 'var(--primary)', marginBottom: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '0.7rem'
                  }}>
                    <SiGithub size={14} />
                    {project.language || 'Architecture'} // {new Date(project.updated_at).getFullYear()}
                  </span>
                  <h3 style={{
                    marginBottom: '1rem',
                    fontSize: isMobile ? '1.375rem' : '2.25rem',
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    lineHeight: '1.15',
                    color: 'var(--on-surface)',
                  }}>
                    {project.name.replace(/-/g, ' ')}
                  </h3>
                  <p style={{
                    marginBottom: '1.5rem',
                    color: 'var(--on-surface-variant)',
                    lineHeight: '1.6',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                  }}>
                    {project.description || 'A highly scalable software repository demonstrating standard architecture and clean code practices.'}
                  </p>

                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <motion.a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        color: 'var(--on-surface)', textDecoration: 'none',
                        fontWeight: '600', borderBottom: '2px solid var(--primary)',
                        paddingBottom: '4px', fontSize: '0.9rem'
                      }}
                    >
                      View Source
                    </motion.a>

                    {project.homepage && (
                      <motion.a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          color: 'var(--on-surface-variant)', textDecoration: 'none',
                          fontSize: '0.875rem'
                        }}
                      >
                        <ExternalLink size={15} /> Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
