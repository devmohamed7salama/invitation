import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

interface AudioPlayerProps {
  isPlaying: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying }) => {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [usingSynth, setUsingSynth] = useState(false);

  // URL of a premium, royalty-free classical wedding piano track (Chopin Nocturne in E-flat Major)
  const trackUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'; // Instrumental ambient track

  useEffect(() => {
    // Initialize Audio element
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.volume = 0; // Start silent for fade-in
    audioRef.current = audio;

    // If loading fails, we will fallback to our procedural Web Audio synthesizer
    audio.addEventListener('error', () => {
      console.warn('Audio URL failed to load, falling back to procedural Web Audio synthesizer.');
      setUsingSynth(true);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
      if (synthIntervalRef.current) {
        window.clearInterval(synthIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Web Audio Procedural Synthesizer for elegant piano arpeggios
  const startSynthMelody = () => {
    if (synthIntervalRef.current) return;

    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Chord progression: G - D - Em - C (Romantic ambient arpeggio)
    const chords = [
      [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
      [146.83, 220.00, 293.66, 369.99], // D3, A3, D4, F#4
      [164.81, 246.94, 329.63, 392.00], // E3, B3, E4, G4
      [130.81, 196.00, 261.63, 329.63], // C3, G3, C4, E4
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playTone = (freq: number, time: number, duration: number) => {
      if (ctx.state === 'suspended') return;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle'; // Soft flute/piano tone
      osc.frequency.setValueAtTime(freq, time);

      // Lowpass filter to make it softer
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, time);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Volume envelope (soft attack, long decay/release like a piano harp)
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(muted ? 0 : 0.08, time + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.start(time);
      osc.stop(time + duration);
    };

    // Arpeggiate
    synthIntervalRef.current = window.setInterval(() => {
      if (ctx.state === 'suspended' || muted) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[noteIndex];
      
      playTone(freq, ctx.currentTime, 2.5);

      noteIndex++;
      if (noteIndex >= currentChord.length) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    }, 450); // Play a note every 450ms
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      window.clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      if (usingSynth) {
        // Start procedural synth
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        startSynthMelody();
      } else if (audio) {
        // Play MP3
        audio.play().then(() => {
          // Smooth volume fade-in from 0 to 0.4 over 2.5s using GSAP
          gsap.killTweensOf(audio);
          gsap.to(audio, {
            volume: muted ? 0 : 0.4,
            duration: 2.5,
            ease: 'power1.inOut',
          });
        }).catch((err) => {
          console.warn('Playback error, trying synth fallback...', err);
          setUsingSynth(true);
        });
      }
    } else {
      if (usingSynth) {
        stopSynthMelody();
      } else if (audio) {
        // Smooth volume fade-out to 0 before pausing
        gsap.killTweensOf(audio);
        gsap.to(audio, {
          volume: 0,
          duration: 1.5,
          ease: 'power1.inOut',
          onComplete: () => {
            audio.pause();
          },
        });
      }
    }
  }, [isPlaying, usingSynth]);

  // Handle Mute/Unmute
  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (usingSynth) {
      // If using synth, just let the interval run but mute the gain nodes
    } else if (audioRef.current) {
      const audio = audioRef.current;
      gsap.killTweensOf(audio);
      gsap.to(audio, {
        volume: nextMuted ? 0 : 0.4,
        duration: 1.0,
        ease: 'power1.inOut',
      });
    }
  };

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Sound waves visualizer */}
      <div className="flex items-end gap-[3px] h-5 px-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-[2px] bg-luxury-gold rounded-full transition-all duration-300 ${
              !muted && isPlaying ? 'animate-bounce' : 'h-1'
            }`}
            style={{
              height: !muted && isPlaying ? '100%' : '4px',
              animationDuration: `${0.6 + i * 0.15}s`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Button */}
      <button
        onClick={toggleMute}
        className="glass-panel text-luxury-gold p-3 rounded-full hover:bg-luxury-gold/10 active:scale-95 transition-all duration-300 cursor-pointer border border-luxury-gold/30 hover:border-luxury-gold/60 focus:outline-none"
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? <VolumeX size={20} className="animate-pulse" /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};
