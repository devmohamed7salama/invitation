import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  opacity: number;
}

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Gold color palette for particles
    const goldColors = [
      'rgba(197, 168, 128, ', // #c5a880
      'rgba(236, 220, 185, ', // #ecdcb9
      'rgba(136, 108, 38, ',  // #886c26
      'rgba(244, 237, 217, ', // warm ivory-gold
    ];

    const particles: Particle[] = [];
    const maxParticles = 60; // Keep it light and elegant

    const createParticle = (init = false): Particle => {
      const size = Math.random() * 4 + 2;
      return {
        x: Math.random() * width,
        y: init ? Math.random() * height : -10,
        size,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 0.6 - 0.3,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.4 + 0.2,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.2;
        p.angle += p.spin;

        // Draw particle (drift and rotation)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Gold gradient or solid color
        const colorBase = goldColors[index % goldColors.length];
        ctx.fillStyle = `${colorBase}${p.opacity})`;
        
        ctx.beginPath();
        // Draw diamond-like or leaf-like shapes instead of simple circles for luxury feel
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.6, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Recycle particles that go off-screen
        if (p.y > height + 10 || p.x < -10 || p.x > width + 10) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
