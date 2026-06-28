import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax transformations driven by scroll
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const bgY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  // Letter reveal animations
  const titleText = "The Beginning of Forever";
  const titleWords = titleText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1.0] as [number, number, number, number], // custom bezier for smooth luxury reveal
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-charcoal">
      {/* Background Volumetric Light Ray and Parallax Layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/10 via-transparent to-transparent opacity-80"
          style={{ backgroundImage: 'radial-gradient(circle 800px at 50% 30%, rgba(197, 168, 128, 0.12), transparent 75%)' }}
        />
        {/* Soft light rays overlay */}
        <div className="absolute inset-0 light-ray-effect opacity-60 mix-blend-screen" />

        {/* Abstract luxury gold lines in background */}
        <svg className="absolute w-full h-full opacity-20 pointer-events-none stroke-luxury-gold/30 stroke-[0.5]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M-10,30 Q50,70 110,30" fill="none" />
          <path d="M-10,50 Q50,30 110,50" fill="none" />
        </svg>
      </motion.div>

      {/* Main Text Content */}
      <motion.div
        style={{ y: textY, opacity: opacityText }}
        className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center"
      >
        {/* Tiny top monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="w-22 h-22 mb-6 border border-luxury-gold/40 rounded-full flex items-center justify-center font-serif text-2xl tracking-widest text-luxury-gold gold-border-glow"
        >
          H&Y
        </motion.div>

        {/* Date and Place Ribbon */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 0.7, letterSpacing: '0.3em' }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-[10px] md:text-xs uppercase text-luxury-gold-light mb-6 tracking-[0.3em] font-light"
        >
          July 19, 2026 • AGA, Egypt
        </motion.p>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 0.7, letterSpacing: '0.3em' }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-[10px] md:text-xs uppercase text-luxury-gold-light mb-6 tracking-[0.3em] font-light"
        >
          Helmy & Yasmina
        </motion.p>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 0.7, letterSpacing: '0.3em' }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-[10px] md:text-xs uppercase text-luxury-beige mb-6 tracking-[0.3em] font-light"
        >
          Al Wadi Hall, Aga
        </motion.p>

        {/* Main Title Reveal (Word by Word) */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-6xl md:text-8xl text-luxury-ivory tracking-wide mb-8 leading-tight gold-glow"
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-3 sm:mr-5">
              <motion.span
                variants={childVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
          className="h-[1px] bg-luxury-gold mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.5, delay: 1.4, ease: 'easeOut' }}
          className="text-sm md:text-lg text-luxury-beige/80 max-w-xl font-light leading-relaxed tracking-wide"
        >
          Together with our families, we invite you to celebrate our wedding day.
        </motion.p>
      </motion.div>

      {/* Elegant scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-luxury-gold">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold via-luxury-gold/50 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-4 bg-luxury-gold-light"
          />
        </div>
      </motion.div>
    </section>
  );
};
