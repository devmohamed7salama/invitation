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
import { Gallery } from './components/Gallery';
import { Venue } from './components/Venue';
import Lenis from 'lenis';

// ==========================================
// CONFIGURATION: TEMPORARY SITE DISABLE (MAINTENANCE MODE)
// To activate the site again, change the value below from true to false.
// لتفعيل الموقع مرة أخرى، قم بتغيير القيمة بالأسفل من true إلى false.
const IS_MAINTENANCE = true;
// ==========================================

function App() {
  if (IS_MAINTENANCE) {
    return (
      <div className="relative min-h-screen bg-luxury-charcoal text-luxury-ivory overflow-hidden flex flex-col justify-between selection:bg-luxury-gold/30 selection:text-luxury-ivory">
        {/* Global Background Elements */}
        <BackgroundParticles />

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-4 relative z-10">
          <div className="max-w-xl w-full text-center py-16 px-8 rounded-2xl glass-panel relative overflow-hidden gold-border-glow">
            {/* Subtle glow effect in the card background */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-luxury-gold/5 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-luxury-gold/5 rounded-full filter blur-3xl pointer-events-none" />

            {/* Decorative Corner Ornaments */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-luxury-gold/30" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-luxury-gold/30" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-luxury-gold/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-luxury-gold/30" />

            {/* Premium Logo / Monogram */}
            <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center font-serif text-lg tracking-widest text-luxury-gold mb-8 mx-auto select-none animate-pulse">
              H&Y
            </div>

            {/* Arabic Message */}
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-gold tracking-wide mb-4 gold-gradient-text">
              السيرفر متوقف حالياً
            </h1>
            <p className="font-sans text-base md:text-lg text-luxury-ivory/80 leading-relaxed mb-8 font-light">
              الموقع غير متوفر مؤقتاً بالوقت الحالي، يرجى التواصل مع المطور لمزيد من التفاصيل.
            </p>

            {/* Divider line */}
            <div className="h-[1px] w-12 bg-luxury-gold/30 mx-auto mb-8" />

            {/* English Message */}
            <h2 className="font-serif text-xl text-luxury-ivory tracking-wide mb-2">
              Server Temporarily Offline
            </h2>
            <p className="font-sans text-xs md:text-sm text-luxury-beige/60 tracking-wider leading-relaxed max-w-sm mx-auto font-light">
              The service is currently unavailable. Please contact the developer  for further details.
            </p>

            <a
              href="https://dev-mohamed-salama.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-luxury-gold-light transition-colors underline decoration-luxury-gold/20"
            >
              Click here to contact Developer : Mohamed Salama
            </a>
          </div>
        </div>

        {/* Luxury Footer matching site identity */}
        <footer className="relative py-12 bg-[#070707] border-t border-luxury-gold/15 text-center px-4 z-10">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold/50 mb-4 select-none">
              July 19, 2026 • AGA, Egypt
            </p>
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
      </div>
    );
  }

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
        className={`transition-all duration-[2000ms] ease-[0.25,1,0.5,1] ${envelopeOpened
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
            <Gallery />

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
