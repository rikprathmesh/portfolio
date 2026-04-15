import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [binaryData, setBinaryData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Generate rapidly shifting binary numbers (0s and 1s) inside the core
    const interval = setInterval(() => {
      const generateRow = () => Array.from({length: 4}).map(() => Math.random() > 0.5 ? '1' : '0').join(' ');
      setBinaryData([generateRow(), generateRow(), generateRow()]);
    }, 80); // Updates very fast like rapid processing

    // After 2.5 seconds, start the fade out process
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 700); // give the AnimatePresence fade out time to finish
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="binary-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="binary-orb"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Outer Rotating Electric Blue Rings */}
            <div className="electric-ring outer-ring" />
            <div className="electric-ring inner-ring" />
            
            {/* Center Core displaying fast-changing Binary */}
            <div className="binary-core">
              {binaryData.map((row, idx) => (
                <div key={idx} className="binary-row">{row}</div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
