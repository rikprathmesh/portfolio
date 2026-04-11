import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/rikprathmesh/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        // Exclude the profile readme repo "rikprathmesh/rikprathmesh" if wanted, 
        // but let's just grab the 6 most recently updated repositories.
        const validRepos = Array.isArray(data) ? data.filter(repo => repo.name !== "rikprathmesh") : [];
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
        <h2 className="headline-lg" style={{ marginBottom: '6rem' }}>Selected Works from GitHub</h2>

        {loading ? (
          <p className="body-lg" style={{ color: 'var(--primary)' }}>[ _SYNCING_REPOSITORIES... ]</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.5fr',
                  gap: '4rem',
                  alignItems: 'center',
                  // Intentional Asymmetry: alternate layout for odd/even
                  direction: index % 2 === 0 ? 'ltr' : 'rtl' 
                }}
              >
                
                {/* Content side */}
                <div style={{ direction: 'ltr' }}>
                  <span className="label-sm" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SiGithub size={16} /> 
                    {project.language || 'Architecture'} // {new Date(project.updated_at).getFullYear()}
                  </span>
                  <h3 className="title-lg" style={{ marginBottom: '1.5rem', fontSize: '2.5rem', textTransform: 'capitalize' }}>
                    {project.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="body-lg" style={{ marginBottom: '2rem' }}>
                    {project.description || 'A highly scalable software repository demonstrating standard architecture and clean code practices.'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <motion.a 
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'var(--on-surface)',
                        textDecoration: 'none',
                        fontWeight: '600',
                        borderBottom: '2px solid var(--primary)',
                        paddingBottom: '4px'
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
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: 'var(--on-surface-variant)',
                          textDecoration: 'none',
                          fontSize: '0.875rem'
                        }}
                      >
                        <ExternalLink size={16} /> Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Visual side Placeholder container */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  style={{
                    backgroundColor: 'var(--surface-container-low)',
                    height: '400px',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(65, 71, 80, 0.15)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--primary)',
                    opacity: 0.05,
                    zIndex: 2
                  }} />
                  
                  <div style={{
                    position: 'absolute',
                    inset: '20px',
                    border: '1px dotted var(--outline-variant)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}>
                    <SiGithub size={48} color="var(--outline-variant)" />
                    <span className="label-md" style={{ color: 'var(--outline)' }}>
                       _REPO_REFERENCE
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
