import { motion, useScroll, useTransform } from 'framer-motion';

interface FloralCornerProps {
  className?: string;
  rotation?: number;
}

const FloralCorner: React.FC<FloralCornerProps> = ({ className, rotation = 0 }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="floral-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecdcb9" />
          <stop offset="50%" stopColor="#c5a880" />
          <stop offset="100%" stopColor="#886c26" />
        </linearGradient>
      </defs>
      {/* Elegant curves representing vines */}
      <path
        d="M 6,6 C 30,15 50,10 65,30 C 75,40 80,55 83,70"
        stroke="url(#floral-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 6,6 C 15,30 10,50 30,65 C 40,75 55,80 70,83"
        stroke="url(#floral-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      
      {/* Rose outlines / abstract luxury flower petals */}
      <path
        d="M 14,14 C 12,10 16,7 20,9 C 24,11 26,16 22,20 C 18,24 12,22 14,14 Z"
        stroke="url(#floral-gold)"
        strokeWidth="1"
        fill="url(#floral-gold)"
        fillOpacity="0.15"
      />
      <path
        d="M 18,18 C 16,14 20,11 24,13 C 28,15 30,20 26,24 C 22,28 16,26 18,18 Z"
        stroke="url(#floral-gold)"
        strokeWidth="1"
        fill="url(#floral-gold)"
        fillOpacity="0.2"
      />
      
      {/* Outer petal flourishes */}
      <path
        d="M 10,20 C 6,16 8,10 14,8 C 20,6 24,10 22,16 C 20,22 14,24 10,20 Z"
        stroke="url(#floral-gold)"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <path
        d="M 16,16 A 3,3 0 1 1 19,19 A 2,2 0 1 1 17,17"
        stroke="url(#floral-gold)"
        strokeWidth="1"
      />
      
      {/* Leaves */}
      <path
        d="M 38,20 C 45,15 53,18 55,19 C 53,25 45,27 38,20 Z"
        fill="url(#floral-gold)"
        opacity="0.75"
      />
      <path
        d="M 20,38 C 15,45 18,53 19,55 C 25,53 27,45 20,38 Z"
        fill="url(#floral-gold)"
        opacity="0.75"
      />
      <path
        d="M 55,36 C 61,31 69,33 71,34 C 69,40 61,42 55,36 Z"
        fill="url(#floral-gold)"
        opacity="0.6"
      />
      <path
        d="M 36,55 C 31,61 33,69 34,71 C 40,69 42,61 36,55 Z"
        fill="url(#floral-gold)"
        opacity="0.6"
      />
      
      {/* Swirly branches */}
      <path
        d="M 48,13 C 58,10 63,20 61,26 C 59,32 51,30 53,24"
        stroke="url(#floral-gold)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M 13,48 C 10,58 20,63 26,61 C 32,59 30,51 24,53"
        stroke="url(#floral-gold)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      
      {/* Elegant accent dots */}
      <circle cx="71" cy="20" r="2" fill="url(#floral-gold)" />
      <circle cx="20" cy="71" r="2" fill="url(#floral-gold)" />
      <circle cx="81" cy="40" r="1.5" fill="url(#floral-gold)" />
      <circle cx="40" cy="81" r="1.5" fill="url(#floral-gold)" />
    </svg>
  );
};

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
      {/* Luxury Animated Floral Frame */}
      <motion.div
        initial={{ scale: 1.35, rotate: -3, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute inset-3 sm:inset-6 pointer-events-none z-10 select-none will-change-transform"
      >
        {/* Double geometric border */}
        <div className="absolute inset-0 border border-luxury-gold/15">
          <div className="absolute inset-[3px] border border-luxury-gold/30" />
        </div>

        {/* Primary Corners */}
        <FloralCorner className="absolute -top-3 -left-3 w-20 h-20 sm:w-28 sm:h-28 text-luxury-gold" rotation={0} />
        <FloralCorner className="absolute -bottom-3 -right-3 w-20 h-20 sm:w-28 sm:h-28 text-luxury-gold" rotation={180} />

        {/* Secondary Corners (for unique asymmetric look, smaller and softer) */}
        <FloralCorner className="absolute -top-3 -right-3 w-14 h-14 sm:w-20 sm:h-20 text-luxury-gold opacity-60" rotation={90} />
        <FloralCorner className="absolute -bottom-3 -left-3 w-14 h-14 sm:w-20 sm:h-20 text-luxury-gold opacity-60" rotation={270} />
      </motion.div>

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
