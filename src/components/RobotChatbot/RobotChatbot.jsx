import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import './RobotChatbot.css';

const WALK_DURATION_MS = 6000;
const MORPH_DURATION_MS = 600;

/* ─── Shared face component (Sleek Capsule) ─────────────────────── */
function RobotFace({ docked = false }) {
  return (
    <div className={`robot-capsule ${docked ? 'robot-capsule--docked' : ''}`}>
      <div className="robot-visor">
        <div className="robot-eye" />
      </div>
    </div>
  );
}

/* ─── Walking robot ─────────────────────────────────────────────── */
function WalkingRobot({ isMobile, isMorphing }) {
  return (
    <motion.div
      className="robot-chatbot__journey"
      initial={{ x: '-20vw', opacity: 0 }}
      animate={{
        x: ['-20vw', isMobile ? 'calc(100vw - 80px)' : 'calc(100vw - 120px)'],
        opacity: [0, 1, 1],
      }}
      transition={{
        x: { duration: WALK_DURATION_MS / 1000, ease: 'linear' }, // linear prevents any glitchy stall
        opacity: { duration: 0.5, ease: 'easeOut' }
      }}
    >
      <div className="robot-chatbot__walker">
        {/* The body that bounces while walking */}
        <motion.div 
          animate={{ y: isMorphing ? 0 : [0, -6, 0] }}
          transition={{ y: { duration: 0.35, repeat: isMorphing ? 0 : Infinity, ease: "easeInOut" } }}
        >
          {/* LayoutId Master for seamless morph */}
          <motion.div
            layoutId="robot-chatbot-morph"
            style={{ zIndex: 10, position: 'relative' }}
          >
            <RobotFace />
            
            {/* Legs retract inside when morphing */}
            <motion.div 
              className="robot-legs" 
              animate={{ scaleY: isMorphing ? 0 : 1, opacity: isMorphing ? 0 : 1 }} 
              style={{ transformOrigin: 'top center' }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
            >
              <div className="robot-leg left" />
              <div className="robot-leg right" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Soft shadow that fades out during morph */}
        <motion.div 
          className="robot-shadow" 
          animate={{ scale: isMorphing ? 0 : [1, 0.85, 1], opacity: isMorphing ? 0 : 0.5 }} 
          transition={{ duration: 0.35, repeat: isMorphing ? 0 : Infinity, ease: "easeInOut" }} 
        />
      </div>
    </motion.div>
  );
}

/* ─── Main export ───────────────────────────────────────────────── */
export default function RobotChatbot() {
  const isMobile = useIsMobile(768);
  const [phase, setPhase] = useState('walking'); // 'walking' -> 'morphing' -> 'docked'
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Walk finishes -> Stop bobbing and retract legs
    const morphTimer = window.setTimeout(() => {
      setPhase('morphing');
    }, WALK_DURATION_MS);

    // 2. Legs retracted -> swap the LayoutId master to the button
    const dockTimer = window.setTimeout(() => {
      setPhase('docked');
    }, WALK_DURATION_MS + MORPH_DURATION_MS);

    return () => {
      window.clearTimeout(morphTimer);
      window.clearTimeout(dockTimer);
    };
  }, []);

  return (
    <LayoutGroup>
      <div style={{ position: 'fixed', zIndex: 1050 }}>
        {phase !== 'docked' && <WalkingRobot isMobile={isMobile} isMorphing={phase === 'morphing'} />}
      </div>

      {/* Docked widget */}
      <motion.div
        className="robot-chatbot"
        initial={false}
        animate={{
          pointerEvents: phase === 'docked' ? 'auto' : 'none'
        }}
      >
        {/* Chat panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="robot-chatbot__panel glass"
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="robot-chatbot__panel-header">
                <div>
                  <p>System Assistant</p>
                  <span>Chatbot is online</span>
                </div>
                <button
                  type="button"
                  className="robot-chatbot__icon-button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="robot-chatbot__message">
                <Sparkles size={16} />
                <p>Hello! I am your AI assistant, smoothly transformed and ready to chat.</p>
              </div>

              <button
                type="button"
                className="robot-chatbot__cta"
                onClick={() => setIsOpen(false)}
              >
                Keep it parked
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Launcher pill */}
        <AnimatePresence>
          {phase === 'docked' && (
            <motion.button
              type="button"
              className="robot-chatbot__launcher"
              onClick={() => setIsOpen((current) => !current)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open chatbot"
            >
              <div className="robot-chatbot__launcher-face">
                <motion.div layoutId="robot-chatbot-morph" className="robot-chatbot__launcher-face-inner">
                  <div className="robot-chatbot__face-ring" />
                  <RobotFace docked />
                </motion.div>
              </div>

              <motion.div 
                className="robot-chatbot__launcher-copy"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <strong>AI Chatbot</strong>
                <span>{isOpen ? 'Minimize' : 'System standby'}</span>
              </motion.div>

              <motion.div 
                className="robot-chatbot__badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring" }}
              >
                <MessageCircle size={14} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
