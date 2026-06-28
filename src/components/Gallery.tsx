import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import local gallery images
import img1 from '../assets/gallary/H-Y (1).jpg';
import img2 from '../assets/gallary/H-Y (2).jpg';
import img3 from '../assets/gallary/H-Y (3).jpg';
import img4 from '../assets/gallary/H-Y (4).jpg';
import img5 from '../assets/gallary/H-Y (5).jpg';
import img6 from '../assets/gallary/H-Y (6).jpg';
import img7 from '../assets/gallary/H-Y (7).jpg';
import img8 from '../assets/gallary/H-Y (8).jpg';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const images: GalleryImage[] = [
    { id: 1, url: img1, title: 'Golden Moments', category: 'Portrait' },
    { id: 2, url: img2, title: 'The Royal Entrance', category: 'Venue' },
    { id: 3, url: img3, title: 'In Your Eyes', category: 'Candid' },
    { id: 4, url: img4, title: 'Hand in Hand', category: 'Portrait' },
    { id: 5, url: img5, title: 'A Blessed Journey', category: 'Ceremony' },
    { id: 6, url: img6, title: 'Unconditional Love', category: 'Candid' },
    { id: 7, url: img7, title: 'Pure Joy', category: 'Celebration' },
    { id: 8, url: img8, title: 'The Beginning of Us', category: 'Portrait' },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
    }
  };

  // Tilt effect for desktop hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 25;
    const rotateY = (x - centerX) / 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section className="relative py-32 w-full bg-[#0d0d0d] overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="text-center mb-20">
        <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-3 block">Gallery</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-ivory tracking-wide leading-tight">
          Captured Memories
        </h2>
        <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-6" />
      </div>

      {/* Masonry Layout on Desktop / Horizontal Scroll on Mobile */}
      <div 
        className="max-w-6xl mx-auto flex md:block overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-5 pb-8 md:pb-0 md:columns-2 lg:columns-3 md:gap-6 md:space-y-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: (idx % 3) * 0.15, ease: 'easeOut' }}
            className="w-[280px] shrink-0 snap-center md:w-full md:break-inside-avoid relative overflow-hidden rounded-xl border border-luxury-gold/10 bg-luxury-charcoal cursor-pointer transition-all duration-350 ease-out"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveImageIdx(idx)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image */}
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-72 md:h-auto object-cover filter brightness-[0.75] hover:brightness-[0.9] transition-all duration-700 pointer-events-none"
              loading="lazy"
            />

            {/* Hover Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-6 pointer-events-none">
              <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold mb-1 font-light">
                {img.category}
              </span>
              <h4 className="font-serif text-lg text-luxury-ivory tracking-wide">
                {img.title}
              </h4>
            </div>
            
            {/* Corner border accents */}
            <div className="absolute inset-4 border border-luxury-gold/0 hover:border-luxury-gold/15 pointer-events-none transition-all duration-350" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md cursor-pointer px-4"
            onClick={() => setActiveImageIdx(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIdx(null)}
              className="absolute top-6 right-6 text-luxury-ivory hover:text-luxury-gold p-2 cursor-pointer z-50"
              aria-label="Close gallery lightbox"
            >
              <X size={28} />
            </button>

            {/* Navigation Controls (Durable backdrop-shielded touch targets for Mobile) */}
            <button
              onClick={handlePrev}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full border border-luxury-gold/30 bg-black/70 backdrop-blur-sm flex items-center justify-center text-luxury-gold hover:text-luxury-ivory active:scale-90 transition-all cursor-pointer z-50 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              aria-label="Previous gallery image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full border border-luxury-gold/30 bg-black/70 backdrop-blur-sm flex items-center justify-center text-luxury-gold hover:text-luxury-ivory active:scale-90 transition-all cursor-pointer z-50 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              aria-label="Next gallery image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-lg pointer-events-auto border border-luxury-gold/20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeImageIdx].url}
                alt={images[activeImageIdx].title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              {/* Bottom Caption Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 p-4 border-t border-luxury-gold/10 flex justify-between items-center text-xs">
                <span className="font-serif text-sm text-luxury-ivory">
                  {images[activeImageIdx].title}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold">
                  {activeImageIdx + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
