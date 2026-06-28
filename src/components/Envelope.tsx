import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
}

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  spinSpeed: number;
  opacity: number;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isCracked, setIsCracked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // 3D Card Hover Rotation states
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiAnimationFrameRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCracked) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Maximum 12 degrees tilt for subtle luxury feeling
    setRotateX(-(y - centerY) / 12);
    setRotateY((x - centerX) / 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Confetti trigger
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: ConfettiParticle[] = [];
    const colors = [
      '#c5a880', // champagne gold
      '#ecdcb9', // light gold
      '#faf8f5', // ivory
      '#bfa13f', // dark gold
      '#d4af37', // metallic gold
    ];

    const centerX = width / 2;
    const centerY = height / 2;

    // Spawn 120 premium paper particles in a burst from the center
    for (let i = 0; i < 110; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 9 + 4;
      particles.push({
        x: centerX,
        y: centerY - 50,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.sin(angle) * velocity - Math.random() * 4,
        speedX: Math.cos(angle) * velocity,
        rotation: Math.random() * 360,
        spinSpeed: Math.random() * 12 - 6,
        opacity: 1,
      });
    }

    const animateConfetti = () => {
      ctx.clearRect(0, 0, width, height);

      let activeParticles = 0;

      particles.forEach((p) => {
        if (p.opacity <= 0) return;
        activeParticles++;

        // Update physics
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.16; // gravity
        p.speedX *= 0.985; // air resistance
        p.rotation += p.spinSpeed;
        p.opacity -= 0.01; // smooth fade

        // Render particle (paper flake)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);

        ctx.beginPath();
        // Luxury rectangular gold flakes
        ctx.rect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.fill();
        ctx.restore();
      });

      if (activeParticles > 0) {
        confettiAnimationFrameRef.current = requestAnimationFrame(animateConfetti);
      }
    };

    animateConfetti();
  };

  useEffect(() => {
    return () => {
      if (confettiAnimationFrameRef.current) {
        cancelAnimationFrame(confettiAnimationFrameRef.current);
      }
    };
  }, []);

  const handleOpenClick = () => {
    if (isCracked) return;
    
    setIsCracked(true);
    setRotateX(0);
    setRotateY(0);
    
    // Step 1: Split/crack wax seal (takes 0.5s)
    // Step 2: Open top envelope flap (at 0.5s)
    setTimeout(() => {
      setIsOpen(true);
      
      // Step 3: Slide letter out (at 1.5s, allowing flap to open beautifully first)
      setTimeout(() => {
        setLetterRevealed(true);
        triggerConfetti();
        onOpen(); // Trigger audio fade-in
        
        // Step 4: Cinematic camera zoom and transition to main page
        setTimeout(() => {
          setIsCompleted(true);
        }, 5500); // Extended presentation time for music & confetti
      }, 1000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070707] overflow-hidden"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Confetti overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-30"
          />

          {/* Luxury background paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Self-Drawing Floral Vines & Hearts Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
            {/* Left Floral Vine */}
            <svg className="absolute left-[-20px] top-[10%] w-[300px] h-[500px] text-luxury-gold/25 hidden sm:block" viewBox="0 0 100 200">
              <motion.path
                d="M 10,180 Q 30,120 15,80 T 45,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.0, delay: 0.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M 15,80 Q 5,60 10,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M 30,120 Q 45,110 40,90"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
              />
              {/* Left Side little heart */}
              <motion.path
                d="M 40,90 C 40,88 38,85 35,87 C 32,85 30,88 30,90 C 30,93 35,96 35,96 C 35,96 40,93 40,90 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
              />
              {/* Little rose bud at the top */}
              <motion.path
                d="M 45,20 C 42,15 48,10 50,15 C 52,10 58,15 55,20 C 52,25 48,25 45,20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
              />
            </svg>

            {/* Right Floral Vine with Hearts */}
            <svg className="absolute right-[-20px] bottom-[10%] w-[300px] h-[500px] text-luxury-gold/25 hidden sm:block" viewBox="0 0 100 200">
              <motion.path
                d="M 90,20 Q 70,80 85,120 T 55,180"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.0, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M 85,120 Q 95,140 90,160"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
              />
              {/* Little heart at the bottom */}
              <motion.path
                d="M 55,180 C 55,178 53,175 50,177 C 47,175 45,178 45,180 C 45,183 50,186 50,186 C 50,186 55,183 55,180 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
              />
            </svg>
          </div>

          {/* Ambient light dust particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-luxury-gold/35 rounded-full"
                style={{
                  left: `${15 + (i * 73) % 70}%`,
                  top: `${20 + (i * 47) % 65}%`,
                }}
                animate={{
                  y: [-20, -100, -20],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 8 + (i % 4) * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Invitation text header */}
          <div className="absolute top-12 left-0 right-0 text-center px-4 select-none">
            <motion.p
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.35em] text-luxury-gold mb-2 font-light"
            >
              You Are Invited
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-4xl text-luxury-ivory tracking-wider"
            >
              To Celebrate Our Wedding
            </motion.h2>
          </div>

          {/* Envelope wrapper with 3D perspective and initial cinematic entrance */}
          <motion.div 
            initial={{ y: 100, scale: 0.85, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-12"
          >
            {/* Secondary continuous micro-float and mouse hover tilt */}
            <motion.div
              className="relative w-[330px] h-[230px] md:w-[460px] md:h-[310px] perspective-1500 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleOpenClick}
              animate={!isCracked ? {
                y: [0, -6, 0],
              } : { y: 0 }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                }
              }}
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
                transition: isCracked ? 'all 0.5s ease-out' : 'transform 0.1s ease-out',
              }}
            >
              {/* The Envelope Body */}
              <div className="relative w-full h-full preserve-3d">
                
                {/* Back Flap (Background of the envelope) */}
                <div 
                  className="absolute inset-0 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-luxury-gold/10"
                  style={{
                    backgroundColor: '#161616',
                    backgroundImage: 'radial-gradient(circle, #202020 0%, #111111 100%)',
                  }}
                />

                {/* Inside paper pocket lining (velvet champagne) */}
                <div 
                  className="absolute inset-[4px] rounded-md overflow-hidden pointer-events-none"
                  style={{
                    backgroundColor: '#1b1a18',
                    border: '1px solid rgba(197, 168, 128, 0.1)',
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(45deg,rgba(197,168,128,0.2)_25%,transparent_25%,transparent_50%,rgba(197,168,128,0.2)_50%,rgba(197,168,128,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
                </div>

                {/* THE LETTER (Slides out elegantly with micro rotational swing) */}
                <motion.div
                  className="absolute inset-x-5 h-[200px] md:h-[270px] bg-luxury-ivory p-6 md:p-8 rounded-md shadow-2xl flex flex-col justify-between items-center text-luxury-charcoal z-10 select-none"
                  initial={{ y: 15, rotate: 0 }}
                  animate={{
                    y: letterRevealed ? (window.innerWidth < 768 ? -130 : -170) : 15,
                    rotate: letterRevealed ? [0, -2, 0] : 0, // tiny human-like pull tilt
                    scale: letterRevealed ? 1.04 : 0.96,
                    boxShadow: letterRevealed 
                      ? '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 25px rgba(197, 168, 128, 0.15)' 
                      : '0 5px 15px rgba(0, 0, 0, 0.2)'
                  }}
                  transition={{ 
                    y: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                    rotate: { duration: 1.4, delay: 0.1, ease: 'easeOut' }
                  }}
                >
                  {/* Border line */}
                  <div className="absolute inset-2 border border-luxury-gold/30 rounded pointer-events-none" />
                  <div className="absolute inset-3 border border-luxury-gold/10 rounded pointer-events-none" />

                  <div className="text-center flex-1 flex flex-col justify-center items-center">
                    {/* Monogram */}
                    <div className="w-10 h-10 border border-luxury-gold/50 rounded-full flex items-center justify-center font-serif text-sm tracking-widest text-luxury-gold-dark mb-4">
                      H&Y
                    </div>

                    <p className="font-serif text-xs md:text-sm italic text-gray-500 mb-2">
                      Save the Date
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl text-luxury-charcoal tracking-wide mb-1 font-medium">
                      Helmy & Yasmina
                    </h3>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400">
                      Are getting married
                    </p>
                  </div>

                  <div className="text-center w-full mt-auto">
                    <div className="h-[1px] w-12 bg-luxury-gold/40 mx-auto mb-3" />
                    <p className="font-serif text-xs md:text-sm text-luxury-gold-dark tracking-widest uppercase">
                      July 19, 2026
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500 mt-1">
                      AGA, Egypt
                    </p>
                  </div>
                </motion.div>

                {/* Envelope Folds (Left, Right, Bottom) - Layered above letter when inside */}
                {/* Bottom flap */}
                <div 
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
                    backgroundColor: '#1b1b1b',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 -4px 10px rgba(0,0,0,0.15)'
                  }}
                />
                {/* Left flap */}
                <div 
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                    backgroundColor: '#1d1d1d',
                    boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
                  }}
                />
                {/* Right flap */}
                <div 
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                    backgroundColor: '#1d1d1d',
                    boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
                  }}
                />

                {/* Top Flap (Opens upwards) */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-1/2 origin-top z-25 pointer-events-none"
                  style={{
                    clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
                    backgroundColor: '#1b1b1b',
                    borderBottom: '1px solid rgba(197, 168, 128, 0.1)',
                  }}
                  animate={{
                    rotateX: isOpen ? -180 : 0,
                    zIndex: isOpen ? 0 : 25,
                  }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Wax Seal (Placed exactly where the top flap meets the folds) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <AnimatePresence>
                    {!isCracked ? (
                      // Initial Seal
                      <motion.button
                        className="relative w-16 h-16 md:w-20 md:h-20 focus:outline-none flex items-center justify-center cursor-pointer"
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        aria-label="Open wedding invitation"
                      >
                        {/* Melted wax shadow edge */}
                        <div className="absolute inset-0 rounded-full bg-red-950/40 blur-[3px] scale-105" />

                        {/* Wax Stamp Body */}
                        <svg 
                          viewBox="0 0 100 100" 
                          className="w-full h-full fill-red-800 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] hover:fill-red-700 transition-colors"
                        >
                          <path d="M 50,5 C 65,3 82,12 90,26 C 98,42 94,64 86,78 C 78,92 60,98 45,95 C 28,92 12,81 6,66 C 0,50 4,32 14,18 C 24,4 35,7 50,5 Z" />
                          <path 
                            d="M 50,12 C 71,12 88,29 88,50 C 88,71 71,88 50,88 C 29,88 12,71 12,50 C 12,29 29,12 50,12 Z" 
                            fill="none" 
                            stroke="#721c1c" 
                            strokeWidth="1.5" 
                            opacity="0.7"
                          />
                          <path 
                            d="M 50,12 C 71,12 88,29 88,50 C 88,71 71,88 50,88 C 29,88 12,71 12,50 C 12,29 29,12 50,12 Z" 
                            fill="none" 
                            stroke="#c5a880" 
                            strokeWidth="1" 
                            opacity="0.35"
                          />
                          <text x="32" y="57" fontFamily="serif" fontSize="23" fill="#4c0505" fontWeight="bold" letterSpacing="1" opacity="0.95">H</text>
                          <text x="55" y="57" fontFamily="serif" fontSize="23" fill="#4c0505" fontWeight="bold" letterSpacing="1" opacity="0.95">Y</text>
                          <path
                            d="M 45,43 C 45,40 48,37 51,40 C 54,37 57,40 57,43 C 57,48 51,52 51,52 C 51,52 45,48 45,43 Z"
                            fill="none"
                            stroke="#c5a880"
                            strokeWidth="1"
                            opacity="0.8"
                          />
                        </svg>
                        
                        <span className="absolute inset-0 rounded-full border border-luxury-gold/40 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2.2s' }} />
                      </motion.button>
                    ) : (
                      // Realistically cracked/falling split seal
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex pointer-events-none">
                        {/* Left half - breaks out, drops down slightly and fades */}
                        <motion.div
                          className="w-1/2 h-full overflow-hidden"
                          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                          animate={{ x: -45, y: 25, rotate: -40, opacity: 0 }}
                          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <svg viewBox="0 0 100 100" className="w-[200%] h-full fill-red-800">
                            <path d="M 50,5 C 65,3 82,12 90,26 C 98,42 94,64 86,78 C 78,92 60,98 45,95 C 28,92 12,81 6,66 C 0,50 4,32 14,18 C 24,4 35,7 50,5 Z" />
                            <text x="32" y="57" fontFamily="serif" fontSize="23" fill="#4c0505" fontWeight="bold">H</text>
                          </svg>
                        </motion.div>
                        {/* Right half - breaks out, drops down slightly and fades */}
                        <motion.div
                          className="w-1/2 h-full overflow-hidden"
                          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                          animate={{ x: 45, y: 25, rotate: 40, opacity: 0 }}
                          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        >
                          <svg viewBox="0 0 100 100" className="w-[200%] h-full fill-red-800 -translate-x-1/2">
                            <path d="M 50,5 C 65,3 82,12 90,26 C 98,42 94,64 86,78 C 78,92 60,98 45,95 C 28,92 12,81 6,66 C 0,50 4,32 14,18 C 24,4 35,7 50,5 Z" />
                            <text x="55" y="57" fontFamily="serif" fontSize="23" fill="#4c0505" fontWeight="bold">Y</text>
                          </svg>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive hints */}
          <div className="absolute bottom-12 text-center text-luxury-gold/50 text-xs tracking-[0.2em] uppercase font-light select-none">
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              {!isCracked ? 'Tap to Open' : 'Revealing Invitation...'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
