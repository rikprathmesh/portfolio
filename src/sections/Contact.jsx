import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { SiDiscord, SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
// import emailjs from '@emailjs/browser'; // Uncomment this once EmailJS maintenance (or your .env setup) is done

export default function Contact() {
  const formRef = useRef();
  const [focused, setFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  // --- SUBMISSION HANDLER (Currently using Formspree) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // [OPTION 1: FORMSPREE - ACTIVE]
    // Reads from VITE_FORMSPREE_URL in your .env file
    const formEndpoint = import.meta.env.VITE_FORMSPREE_URL || "https://formspree.io/f/xqegrnoj";

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }

    /* 
    // [OPTION 2: EMAILJS - COMMENTED OUT]
    // To use this, comment out the Formspree block above and uncomment this block.
    // Ensure you have VITE_EMAILJS_... variables set in your .env or Vercel dashboard.
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; 
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus('success');
        setIsSubmitting(false);
        formRef.current.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setIsSubmitting(false);
        setStatus('error');
      });
    */
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '16px 20px',
    backgroundColor: focused === fieldName ? 'var(--surface)' : 'var(--surface-container-highest)',
    border: focused === fieldName ? '1px solid var(--primary)' : '1px solid rgba(65, 71, 80, 0.15)',
    borderRadius: '12px',
    color: 'var(--on-surface)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif'
  });

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--surface-container-low)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="display-sm" style={{ marginBottom: '1.5rem', color: 'var(--on-surface)' }}>
            Let's Architect Together.
          </motion.h2>
          <motion.p variants={itemVariants} className="body-lg" style={{ marginBottom: '3rem', maxWidth: '440px', color: 'var(--on-surface-variant)' }}>
            Open to exploring new opportunities, discussing optimal system designs, or just connecting with fellow engineers.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '24px', marginBottom: '4rem' }}>
            {[
              { icon: <FaLinkedin size={28} />, href: "https://www.linkedin.com/in/prathmesh-rikame-77035a207/" },
              { icon: <SiGithub size={28} />, href: "https://github.com/rikprathmesh" },
              { icon: <SiDiscord size={28} />, href: "https://discord.gg/38dscQ4e" },
              { icon: <Mail size={28} />, href: "mailto:prathmeshrikame44@gmail.com" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4, color: 'var(--primary)' }}
                style={{ color: 'var(--on-surface-variant)', transition: 'color 0.3s ease' }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
           variants={itemVariants}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  backgroundColor: 'var(--surface-container)',
                  padding: '60px 40px',
                  borderRadius: '24px',
                  border: '1px solid var(--primary)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px'
                }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '10px' }}>
                  <CheckCircle2 size={64} />
                </div>
                <h3 className="headline-md" style={{ color: 'var(--on-surface)' }}>Message Transmitted.</h3>
                <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Architectural handshake initialized. I will reach out shortly.</p>
                <button 
                  onClick={() => setStatus(null)}
                  style={{ 
                    marginTop: '20px', 
                    background: 'none', 
                    border: '1px solid var(--outline-variant)', 
                    color: 'var(--on-surface)',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    cursor: 'none'
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  backgroundColor: 'var(--surface-container)',
                  padding: '40px',
                  borderRadius: '24px',
                  border: '1px solid rgba(65, 71, 80, 0.15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              >
                <div>
                  <label className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    placeholder="YOUR NAME / ALIAS"
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div>
                  <label className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    placeholder="YOUR COMMUNICATION PROTOCOL"
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div>
                  <label className="label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
                  <textarea 
                    required
                    name="message"
                    placeholder="INITIALIZE HANDSHAKE..."
                    rows={4}
                    style={{ ...inputStyle('message'), resize: 'none' }}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="bg-gradient"
                  type="submit"
                  style={{
                    padding: '18px',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'var(--surface-container-lowest)',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '0.5rem',
                    cursor: isSubmitting ? 'wait' : 'none',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'TRANSFUSING...' : 'Deploy Message'} 
                  {!isSubmitting && <Send size={18} />}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
