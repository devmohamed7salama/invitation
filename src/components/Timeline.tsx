import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import imgEngaged from '../assets/engag.jpeg';
interface Milestone {
  date: string;
  title: string;
  description: string;
  image: string;
}

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress inside the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Smooth out scroll progress transitions
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const milestones: Milestone[] = [
    {
      date: '15/7/2022',
      title: 'Our First Meeting',
      description: 'The beautiful day our paths crossed for the very first time, starting a conversation that would grow to define our lives.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
    },
    {
      date: '16/4/2024',
      title: 'Reading Al-Fatiha ',
      description: 'A blessed day surrounded by family as we officially read Al-Fatiha, sealing our promise and commitment to build our future together.',
      image: 'https://images.unsplash.com/photo-1574155204999-0ef31e698aee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      date: '18/4/2024',
      title: 'The Engagement',
      description: 'Declaring our love to the world, exchanging rings, and taking the next major step on the road to our lifetime journey.',
      image: imgEngaged,
    },
    {
      date: '19/7/2026',
      title: 'The Wedding Day',
      description: 'Exchanging our lifetime vows and celebrating the official union of our hearts as husband and wife at Al Wadi Hall.',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-32 w-full bg-[#0d0d0d] overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Decorative ambient background glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-luxury-gold/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-24">
        <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-3 block">Our Journey</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-ivory tracking-wide leading-tight">
          How Forever Began
        </h2>
        <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-6" />
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Background Track Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/15 -translate-x-[0.5px]" />
        
        {/* Dynamic Progress Line */}
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-luxury-gold via-luxury-gold-light to-luxury-gold -translate-x-[1px] shadow-[0_0_8px_rgba(197,168,128,0.5)] z-10"
        />

        {/* Milestones list */}
        <div className="space-y-16 md:space-y-24">
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node on the line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[7px] top-1 md:top-2 z-20">
                  {/* Outer glowing pulsing ring triggered on viewport view */}
                  <motion.div 
                    initial={{ scale: 0.7, opacity: 0.3 }}
                    whileInView={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3, delay: idx * 0.5 }}
                    viewport={{ once: false, margin: '-100px' }}
                    className="w-[16px] h-[16px] rounded-full border border-luxury-gold bg-[#0d0d0d] absolute -left-[1px] -top-[1px] pointer-events-none"
                  />
                  <div className="w-[14px] h-[14px] rounded-full border-2 border-luxury-gold bg-luxury-charcoal flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                  className={`w-[calc(100%-2.5rem)] md:w-[45%] ml-10 md:ml-0 ${
                    isEven ? 'md:text-right md:pr-12' : 'md:pl-12'
                  }`}
                >
                  {/* Glass Card styling */}
                  <div className="glass-panel p-6 sm:p-8 rounded-xl border border-luxury-gold/10 hover:border-luxury-gold/30 hover:shadow-[0_10px_25px_rgba(197,168,128,0.05)] transition-all duration-500 text-left">
                    {item.image && (
                      <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden mb-4 border border-luxury-gold/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover filter brightness-[0.75] hover:brightness-[0.9] hover:scale-102 transition-all duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="font-serif italic text-xs md:text-sm text-luxury-gold font-light tracking-wider">
                      {item.date}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-luxury-ivory tracking-wide mt-2 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-luxury-beige/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
                
                {/* Spacer for layout centering on desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
