import { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { AudioPlayer } from './components/AudioPlayer';
import { Envelope } from './components/Envelope';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { SaveTheDateCalendar } from './components/SaveTheDateCalendar';
import { Timeline } from './components/Timeline';
import { PalaceShowcase } from './components/PalaceShowcase';
import { MemoryBook } from './components/MemoryBook';
// import { Gallery } from './components/Gallery';
import { Venue } from './components/Venue';
import Lenis from 'lenis';

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Initialize Lenis smooth scroll once the envelope is opened
  useEffect(() => {
    if (!envelopeOpened) {
      // Disable scrolling on body while envelope is closed
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [envelopeOpened]);

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
    setAudioPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-luxury-charcoal text-luxury-ivory overflow-hidden selection:bg-luxury-gold/30 selection:text-luxury-ivory">
      {/* Global Background Elements */}
      <BackgroundParticles />
      
      {/* Background Music System */}
      <AudioPlayer isPlaying={audioPlaying} />

      {/* Fullscreen Envelope Opening Experience */}
      <Envelope onOpen={handleEnvelopeOpen} />

      {/* Main Wedding Content Container */}
      <div 
        className={`transition-all duration-[2000ms] ease-[0.25,1,0.5,1] ${
          envelopeOpened 
            ? 'opacity-100 filter-none pointer-events-auto' 
            : 'opacity-0 blur-2xl pointer-events-none max-h-screen overflow-hidden'
        }`}
      >
        {envelopeOpened && (
          <>
            {/* Cinematic Hero Header */}
            <Hero />

            {/* Premium Countdown */}
            <Countdown />

            {/* Save The Date Calendar */}
            <SaveTheDateCalendar />

            {/* Story Timeline */}
            <Timeline />

            {/* 3D Royal Palace Gates Opening */}
            <PalaceShowcase />

            {/* Interactive Story Memory Book */}
            <MemoryBook />

            {/* Masonry Image Gallery */}
            {/* <Gallery /> */}

            {/* Logistics & RSVP Form */}
            <Venue />

            {/* Luxury Footer */}
            <footer className="relative py-16 bg-[#070707] border-t border-luxury-gold/15 text-center px-4">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-12 h-12 border border-luxury-gold/30 rounded-full flex items-center justify-center font-serif text-sm tracking-widest text-luxury-gold mb-6 select-none">
                  H&Y
                </div>
                <h4 className="font-serif text-xl text-luxury-ivory tracking-wide mb-2">
                  Helmy & Yasmina
                </h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold/50 mb-8">
                  July 19, 2026 • AGA, Egypt
                </p>
                <div className="h-[1px] w-8 bg-luxury-gold/30 mb-8" />
                <p className="text-[9px] uppercase tracking-[0.25em] text-luxury-beige/40 mb-3">
                  Made with love • Thank you for celebrating with us
                </p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-luxury-gold/45">
                  Developed by{' '}
                  <a 
                    href="https://dev-mohamed-salama.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-luxury-gold-light transition-colors underline decoration-luxury-gold/20"
                  >
                    Mohamed Salama
                  </a>
                </p>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
