import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Heart } from 'lucide-react';

export const SaveTheDateCalendar: React.FC = () => {
  // July 2026: 1st of July is Wednesday. Total days = 31.
  const daysInJuly = 31;
  const startDayOffset = 3; // Wednesday offset (Sun=0, Mon=1, Tue=2, Wed=3)
  
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Create blank days for the calendar start
  const calendarCells = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInJuly; d++) {
    calendarCells.push(d);
  }

  // Google Calendar URL generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Wedding of Helmy & Yasmina")}&dates=20260719T190000Z/20260719T230000Z&details=${encodeURIComponent("We are joyfully hosting our wedding ceremony and celebration. Please join us!")}&location=${encodeURIComponent("قاعة قرية الوادي، أجا، الدقهلية")}`;

  return (
    <section className="relative py-28 w-full bg-[#faf8f5] text-luxury-charcoal overflow-hidden px-4 sm:px-6 lg:px-8 border-y border-luxury-gold/20">
      {/* Soft background luxury patterns */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
        
        {/* Left Side: Callout & Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full md:w-[45%] text-left"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold-dark font-medium">Save The Date</span>
            <div className="h-[1px] w-8 bg-luxury-gold-dark/40" />
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl text-luxury-charcoal tracking-wide leading-tight mb-6">
            Mark Your <br />
            <span className="italic font-light text-luxury-gold-dark">Calendar</span>
          </h2>
          
          <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
            We are so excited to celebrate our love story with you. Please save the date for our wedding day in Dakahlia, Egypt.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-luxury-gold-dark font-medium">19</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">July 2026</p>
                <p className="text-[10px] text-gray-400 font-light">Sunday • 9:00 PM</p>
              </div>
            </div>
            <p className="text-xs text-luxury-gold-dark font-medium uppercase tracking-wider">
              Aga, Dakahlia Governorate, Egypt
            </p>
          </div>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-luxury-gold-dark hover:bg-luxury-gold text-white text-xs font-semibold tracking-widest uppercase py-3 px-6 rounded-full transition-colors shadow-md focus:outline-none"
          >
            <CalendarIcon size={14} />
            Add to Google Calendar
          </a>
        </motion.div>

        {/* Right Side: Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
          className="w-full md:w-[50%] flex justify-center"
        >
          {/* Calendar Plate Frame */}
          <div className="w-full max-w-[360px] bg-white rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(197,168,128,0.12)] border border-luxury-gold/20 relative overflow-hidden">
            {/* Soft decorative shadow inside */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold" />
            
            {/* Calendar Header */}
            <div className="text-center mb-6 select-none">
              <h3 className="font-serif text-lg text-luxury-charcoal tracking-widest uppercase">July 2026</h3>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Egypt Time</p>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-y-2 mb-4 text-center select-none">
              {weekdays.map((day, idx) => (
                <span key={idx} className="text-[10px] font-bold text-gray-400 uppercase">
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-3 text-center items-center">
              {calendarCells.map((day, idx) => {
                const isWeddingDay = day === 19;

                return (
                  <div key={idx} className="relative h-8 flex items-center justify-center">
                    {day !== null ? (
                      isWeddingDay ? (
                        // Highlighted Wedding Day with Beating Heart Frame
                        <div className="relative w-9 h-9 flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                            className="absolute inset-0 flex items-center justify-center text-red-500/10 pointer-events-none"
                          >
                            <Heart size={34} fill="currentColor" stroke="none" />
                          </motion.div>
                          <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full border border-red-500/40 z-0 pointer-events-none"
                          />
                          <span className="font-serif text-sm font-semibold text-red-650 z-10 relative">
                            {day}
                          </span>
                        </div>
                      ) : (
                        // Standard Day
                        <span className="text-xs font-light text-gray-700">
                          {day}
                        </span>
                      )
                    ) : (
                      // Empty offset cell
                      <span />
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Small Monogram Signature */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-light">
              <span>Helmy & Yasmina</span>
              <span className="flex items-center gap-1 text-red-500 font-medium">
                19.07.2026 <Heart size={10} fill="currentColor" />
              </span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};
