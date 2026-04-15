import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import HeroVisual from './components/HeroVisual';
import Footer from './components/Footer';
import ResumeButton from './components/ResumeButton';
import RobotChatbot from './components/RobotChatbot';
import Loader from './components/Loader/Loader';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <>
      <CustomCursor />
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <ResumeButton />
      <HeroVisual />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      {!isLoading && <RobotChatbot />}
      <Footer />
    </>
  );
}

export default App;
