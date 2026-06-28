import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Gate Component (handles individual left/right gate pivot rotations)
const Gate: React.FC<{ isLeft: boolean; openProgress: number }> = ({ isLeft, openProgress }) => {
  const gateGroupRef = useRef<THREE.Group>(null);
  
  // Set hinge rotation based on open progress (from 0 to 1)
  useFrame(() => {
    if (gateGroupRef.current) {
      const maxRotation = Math.PI * 0.55; // Swing slightly past 90 degrees
      const targetRotation = isLeft ? -maxRotation * openProgress : maxRotation * openProgress;
      // Smooth lerp for buttery animations
      gateGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        gateGroupRef.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  const gateWidth = 1.95;
  const gateHeight = 4;
  const barsCount = 7;

  return (
    // The group represents the hinge pivot point on the side
    <group ref={gateGroupRef} position={[isLeft ? -gateWidth : gateWidth, 0, 0]}>
      {/* Outer frame */}
      <mesh position={[isLeft ? gateWidth / 2 : -gateWidth / 2, 0, 0]}>
        <boxGeometry args={[gateWidth, 0.1, 0.1]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[isLeft ? gateWidth / 2 : -gateWidth / 2, gateHeight, 0]}>
        <boxGeometry args={[gateWidth, 0.1, 0.1]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[isLeft ? 0.05 : -gateWidth + 0.05, gateHeight / 2, 0]}>
        <boxGeometry args={[0.1, gateHeight, 0.1]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[isLeft ? gateWidth - 0.05 : -0.05, gateHeight / 2, 0]}>
        <boxGeometry args={[0.1, gateHeight, 0.1]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Vertical bars */}
      {Array.from({ length: barsCount }).map((_, idx) => {
        const xPos = isLeft 
          ? (gateWidth / (barsCount + 1)) * (idx + 1)
          : -gateWidth + (gateWidth / (barsCount + 1)) * (idx + 1);
        return (
          <mesh key={idx} position={[xPos, gateHeight / 2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, gateHeight - 0.1, 8]} />
            <meshStandardMaterial color="#c5a880" metalness={0.95} roughness={0.1} />
          </mesh>
        );
      })}

      {/* Decorative center ring */}
      <mesh position={[isLeft ? gateWidth - 0.1 : -gateWidth + 0.1, gateHeight / 2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.4, 0.02, 8, 24]} />
        <meshStandardMaterial color="#ecdcb9" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Procedural Palace Archway structure
const PalaceModel: React.FC<{ openProgress: number; cameraZoom: number }> = ({ openProgress, cameraZoom }) => {
  const innerContentRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Zoom camera in towards the gates as scroll progresses
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 14 - cameraZoom * 8.5, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2 - cameraZoom * 0.4, 0.1);
    
    // Slow drift rotation for monogram to look alive
    if (innerContentRef.current) {
      innerContentRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08;
    }
  });

  return (
    <group position={[0, -1.8, 0]}>
      {/* Ambient environment */}
      <ambientLight intensity={0.4} color="#ecdcb9" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#fff" />
      <pointLight position={[0, 2, -2]} intensity={2.5} distance={10} color="#ecdcb9" />

      {/* Ground Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#080808" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Large Stone Pillars Left & Right */}
      <mesh position={[-2.4, 2.2, 0]}>
        <boxGeometry args={[0.6, 4.4, 0.6]} />
        <meshStandardMaterial color="#141414" roughness={0.8} />
      </mesh>
      <mesh position={[2.4, 2.2, 0]}>
        <boxGeometry args={[0.6, 4.4, 0.6]} />
        <meshStandardMaterial color="#141414" roughness={0.8} />
      </mesh>

      {/* Archway header */}
      <mesh position={[0, 4.6, 0]}>
        <boxGeometry args={[5.4, 0.6, 0.8]} />
        <meshStandardMaterial color="#141414" roughness={0.8} />
      </mesh>

      {/* Triangular Palace Pediment on top */}
      <mesh position={[0, 5.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.2, 0.8, 4]} />
        <meshStandardMaterial color="#181818" roughness={0.8} />
      </mesh>

      {/* Golden Arch lining decoration */}
      <mesh position={[0, 4.25, 0]}>
        <boxGeometry args={[4.2, 0.1, 0.7]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Slimmer Golden Columns in front of stone pillars */}
      <mesh position={[-2.0, 2.0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.12, 4.0, 16]} />
        <meshStandardMaterial color="#c5a880" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.0, 2.0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.12, 4.0, 16]} />
        <meshStandardMaterial color="#c5a880" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* THE 3D GATES */}
      <group position={[0, 2, 0]}>
        <Gate isLeft={true} openProgress={openProgress} />
        <Gate isLeft={false} openProgress={openProgress} />
      </group>

      {/* INSIDE THE GATE (Fades in / appears as gates open) */}
      <group ref={innerContentRef} position={[0, 2.2, -3]}>
        {/* Floating Monogram Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
          <meshStandardMaterial 
            color="#c5a880" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#c5a880"
            emissiveIntensity={Math.max(0, openProgress - 0.2) * 0.3} 
          />
        </mesh>
        {/* Monogram Outer Glow Ring */}
        <mesh>
          <torusGeometry args={[0.85, 0.04, 8, 32]} />
          <meshStandardMaterial 
            color="#ecdcb9" 
            metalness={0.9} 
            emissive="#ecdcb9"
            emissiveIntensity={Math.max(0, openProgress - 0.2) * 0.5}
          />
        </mesh>

        {/* Volumetric light ray cone representing emerge */}
        <mesh position={[0, -0.5, 0.5]} rotation={[Math.PI * 0.08, 0, 0]}>
          <coneGeometry args={[2.5, 5, 32, 1, true]} />
          <meshBasicMaterial
            color="#ecdcb9"
            transparent
            opacity={Math.max(0, openProgress - 0.3) * 0.18}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* SpotLight inside illuminating outwards */}
        <spotLight 
          position={[0, 0.5, 0.2]} 
          angle={Math.PI / 3}
          penumbra={0.8}
          intensity={Math.max(0, openProgress - 0.2) * 5.0} 
          color="#ecdcb9" 
          distance={12}
        />
      </group>
    </group>
  );
};

// Main container component
export const PalaceShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openProgress, setOpenProgress] = useState(0);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [revealText, setRevealText] = useState(false);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    // Create GSAP ScrollTrigger to pin the canvas and update open state
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%', // Scroll depth for pinning
        pin: true,
        scrub: 1.0, // Smooth scrubbing
        onUpdate: (self) => {
          const progress = self.progress;

          // Gate starts opening after 25% of scroll, fully open at 75%
          const gateStart = 0.2;
          const gateEnd = 0.75;
          if (progress < gateStart) {
            setOpenProgress(0);
          } else if (progress > gateEnd) {
            setOpenProgress(1);
          } else {
            setOpenProgress((progress - gateStart) / (gateEnd - gateStart));
          }

          // Camera zooms in progressively from start to finish
          setZoomProgress(progress);

          // Reveal text once gates start opening significantly
          if (progress > 0.45) {
            setRevealText(true);
          } else {
            setRevealText(false);
          }
        },
      },
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#070707] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas 
          camera={{ position: [0, 2, 14], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={['#070707']} />
          <fog attach="fog" args={['#070707', 8, 22]} />
          
          <PalaceModel openProgress={openProgress} cameraZoom={zoomProgress} />
          
          {/* Drifting star dust in 3D */}
          <Stars radius={100} depth={50} count={300} factor={4} saturation={0.5} fade speed={1.5} />
        </Canvas>
      </div>

      {/* Volumetric volumetric background particle overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#070707] opacity-60 pointer-events-none" />

      {/* Quote and Monogram overlay text (fading in based on scroll progress) */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 px-6 text-center ${
          revealText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-xl glass-panel p-8 md:p-12 rounded-2xl border border-luxury-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none">
          {/* Mini monogram */}
          <p className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold mb-4 font-light">
            Helmy & Yasmina
          </p>
          
          {/* Quote */}
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-luxury-ivory tracking-wide leading-relaxed font-light mb-6 italic">
            "Once in a while, right in the middle of an ordinary life, love gives us a fairytale."
            <br />
            <small className="text-sm sm:text-md md:text-lg text-luxury-beige/70">"بين الحين والآخر، وفي خضم الحياة العادية، يمنحنا الحب قصة خيالية."</small>
          </h3>
          
          {/* Gold Divider */}
          <div className="h-[1px] w-12 bg-luxury-gold/50 mx-auto" />
          
          <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-beige/60 mt-4 font-light">
            We Invite You to Share the Magic
          </p>
        </div>
      </div>

      {/* Floating scroll reminder in corner */}
      <div className="absolute bottom-6 left-6 z-20 text-[9px] uppercase tracking-[0.25em] text-luxury-gold/40">
        Scroll to Reveal
      </div>
    </div>
  );
};
