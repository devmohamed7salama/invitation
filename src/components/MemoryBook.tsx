import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookPage {
  title: string;
  subtitle?: string;
  arabicSubtitle?: string;
  content: string;
  quote?: string;
  image?: string;
}

export const MemoryBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const pages: BookPage[] = [
    {
      title: "The First Meeting",
      subtitle: "Chapter I — July 15, 2022",
      arabicSubtitle: "أول لقاء جمعنا وبداية حكايتنا",
      content: "On this day, our paths crossed, and our world became brighter. It was the spark of a beautiful connection that grew into a lifetime bond, changing our lives forever as we began our journey side by side.",
      quote: "“Two hearts, one destiny. The day the adventure of our lifetime began.”",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Reading Al-Fatiha",
      subtitle: "Chapter II — April 16, 2024",
      arabicSubtitle: "قراءة الفاتحة والعهد المبارك",
      content: "With the blessing of our families, we bound our promises with the sacred words of Al-Fatiha. A beautiful day of prayer, commitment, and a vow to build our future home on love, respect, and faith.",
      quote: "“In the name of blessings, we promise our futures to one another.”",
      image: "https://images.unsplash.com/photo-1574155204999-0ef31e698aee?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "The Engagement",
      subtitle: "Chapter III — April 18, 2024",
      arabicSubtitle: "حفل خطوبتنا وإعلان فرحتنا",
      content: "We exchanged rings and declared our love to the world. A celebration of pure joy, shared laughter, and the beautiful realization that we are stepping into our tomorrow hand in hand.",
      quote: "“A promise sealed with gold, a joy shared with everyone we love.”",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "The Wedding Day",
      subtitle: "Chapter IV — July 19, 2026",
      arabicSubtitle: "ليلة زفافنا وبداية عمرنا معاً",
      content: "The day we pledge our vows and become husband and wife at Al Wadi Hall. We invite you to witness the beginning of our forever, written with love and shared with those closest to our hearts.",
      quote: "“The beginning of forever. Hand in hand, writing our endless story.”",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <section className="relative py-32 w-full bg-luxury-charcoal overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="text-center mb-20">
        <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-3 block">Memory Book</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-ivory tracking-wide leading-tight">
          Our Love Album
        </h2>
        <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto mt-6" />
      </div>

      {/* Main book frame */}
      <div className="max-w-5xl mx-auto relative flex flex-col items-center justify-center">
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between pointer-events-none px-2 sm:px-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0 || isFlipping}
            className={`pointer-events-auto w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center bg-luxury-charcoal/80 text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/40 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 ${
              currentPage === 0 ? 'invisible' : ''
            }`}
            aria-label="Previous story page"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1 || isFlipping}
            className={`pointer-events-auto w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center bg-luxury-charcoal/80 text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/40 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 ${
              currentPage === pages.length - 1 ? 'invisible' : ''
            }`}
            aria-label="Next story page"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* The 3D Album Container */}
        <div className="w-full max-w-4xl h-[520px] md:h-[580px] rounded-2xl relative shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-luxury-gold/15 bg-[#121212] overflow-hidden p-2 sm:p-4">
          
          {/* Middle spine shadow (visual luxury detail) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-r from-black/40 via-black/80 to-black/40 -translate-x-1/2 z-20" />
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/20 -translate-x-[0.5px] z-20" />

          {/* Page Display */}
          <div className="w-full h-full flex flex-col md:flex-row relative z-10">
            
            {/* Desktop Left Side / Mobile Active Side */}
            <div className="w-full md:w-1/2 h-full bg-[#1b1a18] p-6 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: flipDirection === 'next' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: flipDirection === 'next' ? 20 : -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 flex flex-col justify-between z-10"
                >
                  <div>
                    {/* Mobile Image (Only visible on mobile screens) */}
                    {pages[currentPage].image && (
                      <div className="block md:hidden relative w-full h-44 rounded-lg overflow-hidden mb-5 border border-luxury-gold/15 shadow-inner">
                        <img
                          src={pages[currentPage].image}
                          alt={pages[currentPage].title}
                          className="w-full h-full object-cover filter brightness-[0.8] sepia-[0.1]"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-light block mb-1">
                      {pages[currentPage].subtitle}
                    </span>
                    {pages[currentPage].arabicSubtitle && (
                      <span className="text-[11px] text-luxury-gold-light/80 block mb-3 font-sans font-light">
                        {pages[currentPage].arabicSubtitle}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl sm:text-3xl text-luxury-ivory tracking-wide mb-6">
                      {pages[currentPage].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-luxury-beige/75 font-light leading-relaxed mb-6">
                      {pages[currentPage].content}
                    </p>
                  </div>
                  
                  {pages[currentPage].quote && (
                    <div className="border-l-2 border-luxury-gold/30 pl-4 py-1 mt-auto">
                      <p className="font-serif italic text-sm text-luxury-gold-light/95 leading-relaxed">
                        {pages[currentPage].quote}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Right Side (Photo) / Hidden on Mobile (Mobile turns pages sequentially) */}
            <div className="hidden md:block w-1/2 h-full bg-[#141414] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={pages[currentPage].image}
                    alt={pages[currentPage].title}
                    className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] grayscale-[20%]"
                    loading="lazy"
                  />
                  {/* Luxury soft gold frame border overlay */}
                  <div className="absolute inset-8 border border-luxury-gold/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>

        {/* Small book pagination dots */}
        <div className="flex gap-2.5 mt-8 z-20">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFlipDirection(idx > currentPage ? 'next' : 'prev');
                setCurrentPage(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx 
                  ? 'bg-luxury-gold scale-125 shadow-[0_0_8px_rgba(197,168,128,0.6)]' 
                  : 'bg-luxury-gold/30 hover:bg-luxury-gold/60'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
