import React from 'react';
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

function App() {
  return (
    <>
      <CustomCursor />
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
      <Footer />
    </>
  );
}

export default App;
