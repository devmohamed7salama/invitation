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
const IS_MAINTENANCE = false;
// ==========================================

function App() {
  if (IS_MAINTENANCE) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans flex flex-col justify-between p-6 md:p-12 selection:bg-[#333] selection:text-white">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#222] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ea4335] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#888] font-mono">Status: Offline</span>
          </div>
          <span className="text-xs font-mono text-[#666]">HTTP 503 SERVICE UNAVAILABLE</span>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full py-12">
          {/* Main Error Title */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
              Error: Connection Refused
            </h1>
            <p className="text-sm md:text-base text-[#a0a0a0] leading-relaxed">
              The application server is currently not responding. This could be due to scheduled maintenance, server overload, or configuration updates.
            </p>
          </div>

          {/* Details / Arabic Explanation */}
          <div className="mt-8 bg-[#111] border border-[#222] rounded-lg p-6 font-mono text-xs md:text-sm text-[#888] space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-[#ea4335] select-none">▶</span>
              <p className="text-[#ccc]">
                <strong className="text-white">تفاصيل الخطأ:</strong> السيرفر متوقف حالياً. يرجى التواصل مع المطور (محمد سلامة) لإعادة تفعيل السيرفر.
              </p>
            </div>
            <div className="flex items-start gap-2 border-t border-[#222] pt-4 mt-2">
              <span className="text-[#888] select-none">▶</span>
              <p>
                <strong>Contact Developer To ReActive Site :</strong>{' '}
                <a href="https://wa.me/201016981295" target="_blank" rel="noopener noreferrer" className="text-[#c5a880] hover:underline">
                  WhatsApp: 01016981295
                </a>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#888] select-none">▶</span>
              <p>
                <strong>Host System:</strong> Vercel Edge Network Deployment
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#888] select-none">▶</span>
              <p>
                <strong>Timestamp:</strong> {new Date().toISOString()}
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="border-t border-[#222] pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#666] font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} System Administrator. All rights reserved.
          </div>
          <div>
            Need assistance?{' '}
            <a
              href="https://dev-mohamed-salama.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a880] hover:text-[#fff] underline transition-colors"
            >
              Click here to contact Developer: Mohamed Salama
            </a>{' '}
            (<a href="https://wa.me/201016981295" target="_blank" rel="noopener noreferrer" className="text-[#c5a880] hover:text-[#fff] transition-colors">WhatsApp</a>)
          </div>
        </div>
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
