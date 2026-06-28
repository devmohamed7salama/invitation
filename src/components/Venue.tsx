import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

export const Venue: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wedding' | 'henna'>('wedding');

  // Structured data for both venues
  const tabData = {
    wedding: {
      tag: "Venue & Ceremony",
      title: "The Wedding Day",
      locationName: "Al Wadi Hall",
      locationAddress: "AGA, Dakahlia Governorate, Egypt",
      locationSubtitle: "Al Wadi Village (قرية الوادي)",
      date: "Sunday, July 19, 2026",
      dateSubtitle: "Ceremony Commences",
      time: "Celebration reception begins at 9:00 PM.",
      timeSubtitle: "Wedding Ceremony Celebration",
      dressCode: "We request our guests to dress in formal evening attire to celebrate this special day with us.",
      directionsUrl: "https://maps.app.goo.gl/qGdRSZcB4n9C4udT7",
      mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.8221212576295!2d31.284749884863544!3d30.93845568156594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7990e1c2815d7%3A0xf04443343f8c6d3b!2z2YLYp9i52Kkg2KfZhNmI2KfYr9mKINij2KzYpw!5e1!3m2!1sar!2seg!4v1782644033662!5m2!1sar!2seg",
      mapTitle: "Al Wadi Hall Venue Map"
    },
    henna: {
      tag: "Pre-Wedding Celebration",
      title: "The Henna Night",
      locationName: "Al Wakeel Hall",
      locationAddress: "Baqtars, AGA, Dakahlia Governorate, Egypt",
      locationSubtitle: "Al Wakeel Hall (قاعة الوكيل ببقطارس)",
      date: "Wednesday, June 16, 2026",
      dateSubtitle: "Henna Celebration Commences",
      time: "Celebration starts at 9:00 PM.",
      timeSubtitle: "Bride's Henna Night (حنة العروسة)",
      dressCode: "Guests are warmly welcome to dress in festive, colorful, or traditional attire to celebrate this beautiful night.",
      directionsUrl: "https://maps.app.goo.gl/tMuCsRjbMth8vnu28",
      mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d203.3485442432679!2d31.301833968225257!3d30.91627395951056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2seg!4v1782645025816!5m2!1sar!2seg",
      mapTitle: "Al Wakeel Hall Henna Map"
    }
  };

  const current = tabData[activeTab];

  return (
    <section className="relative py-32 w-full bg-luxury-charcoal overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-luxury-gold/15">
      {/* Background glow elements */}
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-16 select-none">
          <div className="flex bg-[#121212] p-1 rounded-full border border-luxury-gold/15 gap-2 relative">
            
            {/* Wedding Tab */}
            <button
              onClick={() => setActiveTab('wedding')}
              className="relative px-5 sm:px-8 py-2.5 text-xs font-semibold tracking-widest uppercase focus:outline-none z-10 cursor-pointer rounded-full transition-colors"
            >
              {activeTab === 'wedding' && (
                <motion.div 
                  layoutId="activeVenueTab" 
                  className="absolute inset-0 bg-luxury-gold rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={activeTab === 'wedding' ? 'text-luxury-charcoal font-medium' : 'text-luxury-beige/65 hover:text-luxury-gold-light'}>
                يوم الزفاف • Wedding Day
              </span>
            </button>

            {/* Henna Tab */}
            <button
              onClick={() => setActiveTab('henna')}
              className="relative px-5 sm:px-8 py-2.5 text-xs font-semibold tracking-widest uppercase focus:outline-none z-10 cursor-pointer rounded-full transition-colors"
            >
              {activeTab === 'henna' && (
                <motion.div 
                  layoutId="activeVenueTab" 
                  className="absolute inset-0 bg-luxury-gold rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={activeTab === 'henna' ? 'text-luxury-charcoal font-medium' : 'text-luxury-beige/65 hover:text-luxury-gold-light'}>
                حنة العروسة • Bride's Henna
              </span>
            </button>

          </div>
        </div>

        {/* Tab Content Animating Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            {/* Logistics / Details Column */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-3 block">
                {current.tag}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-ivory tracking-wide leading-tight mb-8">
                {current.title}
              </h2>

              <div className="space-y-6">
                {/* Location details */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-luxury-ivory tracking-wide mb-1">
                      {current.locationName}
                    </h4>
                    <p className="text-xs sm:text-sm text-luxury-beige/70 font-light leading-relaxed mb-1">
                      {current.locationAddress}
                    </p>
                    <p className="text-[10px] text-luxury-gold font-light tracking-wider uppercase">
                      {current.locationSubtitle}
                    </p>
                  </div>
                </div>

                {/* Date Details */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-luxury-ivory tracking-wide mb-1">The Date</h4>
                    <p className="text-xs sm:text-sm text-luxury-beige/70 font-light leading-relaxed">
                      {current.date}
                    </p>
                    <p className="text-[10px] text-luxury-gold font-light tracking-wider uppercase">
                      {current.dateSubtitle}
                    </p>
                  </div>
                </div>

                {/* Time details */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-luxury-ivory tracking-wide mb-1">The Schedule</h4>
                    <p className="text-xs sm:text-sm text-luxury-beige/70 font-light leading-relaxed">
                      {current.time}
                    </p>
                    <p className="text-[10px] text-luxury-gold font-light tracking-wider uppercase">
                      {current.timeSubtitle}
                    </p>
                  </div>
                </div>

                {/* Dress code detail */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 mt-1">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-luxury-ivory tracking-wide mb-1">Theme & Attire</h4>
                    <p className="text-xs sm:text-sm text-luxury-beige/70 font-light leading-relaxed">
                      {current.dressCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Directions Link */}
              <div className="mt-12">
                <a
                  href={current.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-luxury-gold/30 hover:border-luxury-gold hover:bg-luxury-gold/15 py-3 px-8 rounded-full text-luxury-gold-light hover:text-luxury-ivory transition-all duration-350 text-sm font-medium tracking-widest uppercase"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map Column */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden border border-luxury-gold/20 p-2 glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <iframe
                  src={current.mapIframeSrc}
                  width="100%"
                  height="380"
                  style={{
                    border: 0,
                    filter: 'grayscale(1) invert(0.9) contrast(1.15) brightness(0.95)',
                    borderRadius: '12px'
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={current.mapTitle}
                />
                <div className="absolute top-6 right-6 glass-panel py-1.5 px-3 rounded-md text-[10px] text-luxury-gold uppercase tracking-widest border border-luxury-gold/20 select-none">
                  Map View
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
