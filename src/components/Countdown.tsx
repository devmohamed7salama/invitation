import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  // Wedding Date - July 19, 2026, 9:00 PM (July is month index 6)
  const targetDate = new Date(2026, 6, 19, 21, 0, 0);

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - Date.now();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Flip-like motion transitions
  const numberVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  const renderCard = (value: number, label: string) => {
    const stringValue = formatNumber(value);

    return (
      <div className="flex flex-col items-center">
        {/* Glass card container */}
        <div className="relative w-20 h-24 sm:w-28 sm:h-32 rounded-xl glass-panel flex items-center justify-center overflow-hidden border border-luxury-gold/20 shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
          {/* Subtle overlay lines for realistic premium look */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-luxury-gold/15 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Animating digits */}
          <div className="font-serif text-3xl sm:text-5xl md:text-6xl text-luxury-gold-light font-light z-0 flex select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {stringValue.split('').map((char, index) => (
              <div key={`${index}-${char}`} className="relative h-12 sm:h-16 overflow-hidden w-[0.6em] flex justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={char}
                    variants={numberVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute"
                  >
                    {char}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Card label */}
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-luxury-gold mt-4 font-light">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="relative py-24 w-full flex flex-col items-center justify-center bg-luxury-charcoal overflow-hidden px-4">
      {/* Decorative background circle glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-luxury-gold-dark/5 blur-[120px] pointer-events-none" />

      {/* Intro text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-3">Count Down</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-ivory tracking-wide leading-tight">
          Counting Down to Forever
        </h2>
        <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-6" />
      </motion.div>

      {/* Countdown Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
        className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-2xl w-full justify-center px-2"
      >
        {renderCard(timeLeft.days, 'Days')}
        {renderCard(timeLeft.hours, 'Hours')}
        {renderCard(timeLeft.minutes, 'Minutes')}
        {renderCard(timeLeft.seconds, 'Seconds')}
      </motion.div>

      {/* Small wedding footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="text-xs text-luxury-beige/70 font-light mt-12 tracking-widest text-center"
      >
        July 19, 2026 • Ceremony commences at 9:00 PM
      </motion.p>
    </section>
  );
};
