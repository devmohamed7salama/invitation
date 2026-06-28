import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Helper component for gold leaf path drawing
interface LeafProps {
  x: number;
  y: number;
  rotate: number;
  delay: number;
  scale?: number;
}

const Leaf: React.FC<LeafProps> = ({ x, y, rotate, delay, scale = 1 }) => {
  return (
    <motion.path
      d="M0,0 Q15,-10 20,-35 Q5,-25 0,0"
      fill="url(#goldGradientCorner)"
      initial={{ pathLength: 0, opacity: 0, scale: 0 }}
      animate={{ pathLength: 1, opacity: 0.85, scale: scale }}
      transition={{
        pathLength: { duration: 1.2, delay: delay, ease: "easeOut" },
        scale: { duration: 0.8, delay: delay, ease: "backOut" },
        opacity: { duration: 0.5, delay: delay }
      }}
      style={{
        transformOrigin: "0px 0px",
        x: x,
        y: y,
        rotate: rotate,
      }}
    />
  );
};

// Helper component for gold rose blooming
interface RoseProps {
  x: number;
  y: number;
  scale: number;
  delay: number;
}

const Rose: React.FC<RoseProps> = ({ x, y, scale, delay }) => {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Outer Petals */}
      <motion.path
        d="M -15,-5 C -25,-25 25,-25 15,-5 C 25,15 -25,15 -15,-5 Z"
        fill="url(#goldGradientCorner)"
        stroke="#886c26"
        strokeWidth="0.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 1.5, delay: delay, ease: "backOut" }}
        style={{ transformOrigin: "center" }}
      />
      {/* Mid Petals */}
      <motion.path
        d="M -10,-3 C -18,-18 18,-18 10,-3 C 18,12 -18,12 -10,-3 Z"
        fill="url(#goldGradientCorner)"
        stroke="#886c26"
        strokeWidth="0.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.95 }}
        transition={{ duration: 1.3, delay: delay + 0.3, ease: "backOut" }}
        style={{ transformOrigin: "center" }}
      />
      {/* Inner Petals / Bud */}
      <motion.circle
        cx="0"
        cy="0"
        r="5"
        fill="url(#goldGradientCorner)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.0, delay: delay + 0.6, ease: "backOut" }}
      />
    </g>
  );
};

interface CornerBouquetProps {
  className?: string;
  delay?: number;
}

const CornerBouquet: React.FC<CornerBouquetProps> = ({ className = '', delay = 0 }) => {
  return (
    <div className={`absolute w-36 h-36 sm:w-64 sm:h-64 md:w-80 md:h-80 pointer-events-none select-none z-10 ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-luxury-gold"
      >
        <defs>
          <linearGradient id="goldGradientCorner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e7c4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c5a880" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#886c26" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 10,10 Q 70,30 100,100 T 200,200"
          stroke="url(#goldGradientCorner)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: delay + 0.1, ease: "easeInOut" }}
        />

        <motion.path
          d="M 80,75 Q 150,50 180,70"
          stroke="url(#goldGradientCorner)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: delay + 0.8, ease: "easeInOut" }}
        />

        <motion.path
          d="M 50,60 Q 20,130 50,170"
          stroke="url(#goldGradientCorner)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: delay + 0.6, ease: "easeInOut" }}
        />

        <Leaf x={45} y={35} rotate={15} delay={delay + 0.4} scale={0.9} />
        <Leaf x={90} y={85} rotate={-45} delay={delay + 0.7} scale={1.0} />
        <Leaf x={140} y={145} rotate={35} delay={delay + 1.0} scale={0.8} />
        <Leaf x={120} y={60} rotate={-25} delay={delay + 1.1} scale={0.8} />
        <Leaf x={35} y={105} rotate={120} delay={delay + 0.9} scale={0.8} />

        <Rose x={200} y={200} scale={1.0} delay={delay + 0.8} />
        <Rose x={180} y={70} scale={0.72} delay={delay + 1.2} />
        <Rose x={50} y={170} scale={0.52} delay={delay + 1.0} />
      </svg>
    </div>
  );
};

interface SideBouquetProps {
  className?: string;
  delay?: number;
}

const SideBouquet: React.FC<SideBouquetProps> = ({ className = '', delay = 0 }) => {
  return (
    <div className={`absolute w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 pointer-events-none select-none z-10 ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-luxury-gold"
      >
        <defs>
          <linearGradient id="goldGradientCorner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e7c4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c5a880" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#886c26" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 0,100 Q 50,80 80,100 T 130,90"
          stroke="url(#goldGradientCorner)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: delay + 0.1, ease: "easeInOut" }}
        />

        <motion.path
          d="M 40,90 Q 60,40 85,50"
          stroke="url(#goldGradientCorner)"
          strokeWidth="1.0"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, delay: delay + 0.6, ease: "easeInOut" }}
        />

        <Leaf x={30} y={90} rotate={30} delay={delay + 0.3} scale={0.7} />
        <Leaf x={60} y={60} rotate={-45} delay={delay + 0.5} scale={0.8} />

        <Rose x={130} y={90} scale={0.7} delay={delay + 0.6} />
        <Rose x={85} y={50} scale={0.45} delay={delay + 0.8} />
      </svg>
    </div>
  );
};

interface DriftingPetalProps {
  delay?: number;
  left: string;
  top: string;
  duration?: number;
  scale?: number;
  isPink?: boolean;
}

const DriftingPetal: React.FC<DriftingPetalProps> = ({
  delay = 0,
  left,
  top,
  duration = 15,
  scale = 1,
  isPink = false,
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-10 text-luxury-gold/30"
      style={{ left: left, top: top }}
      initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -40, -80, -120, -160],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0, 0.4, 0.5, 0.2, 0],
        scale: [0, scale, scale * 1.1, scale * 0.9, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd1dc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f48fb1" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M 12,4 C 6,4 4,12 12,18 C 20,12 18,4 12,4 Z"
          fill={isPink ? "url(#pinkGradient)" : "url(#goldGradientCorner)"}
          stroke={isPink ? "url(#pinkGradient)" : "url(#goldGradientCorner)"}
          strokeWidth="0.5"
          opacity={isPink ? 0.75 : 0.85}
        />
      </svg>
    </motion.div>
  );
};

const MagicalFlowers: React.FC = () => {
  return (
    <div className="flowers">
      <style dangerouslySetInnerHTML={{
        __html: `
        .flowers {
          --dark-color: #0a0a0a;
          --fl-color-1: #faf8f5;
          --fl-color-2: #ffe4e6;
          --fl-color-3: #ffd1dc;
          --fl-color-stem: #c5a880;
          --fl-color-leaf: #8fa493;
          --fl-color-leaf-dark: #6e8272;
          position: relative;
          transform: scale(0.9);
        }

        .flower {
          position: absolute;
          bottom: 10vmin;
          transform-origin: bottom center;
          z-index: 10;
          --fl-speed: 0.8s;
        }

        .flower--1 {
          animation: moving-flower-1 4s linear infinite;
        }
        .flower--1 .flower__line {
          height: 70vmin;
          animation-delay: 0.3s;
        }
        .flower--1 .flower__line__leaf--1 {
          animation: blooming-leaf-right var(--fl-speed) 1.6s backwards;
        }
        .flower--1 .flower__line__leaf--2 {
          animation: blooming-leaf-right var(--fl-speed) 1.4s backwards;
        }
        .flower--1 .flower__line__leaf--3 {
          animation: blooming-leaf-left var(--fl-speed) 1.2s backwards;
        }
        .flower--1 .flower__line__leaf--4 {
          animation: blooming-leaf-left var(--fl-speed) 1s backwards;
        }
        .flower--1 .flower__line__leaf--5 {
          animation: blooming-leaf-right var(--fl-speed) 1.8s backwards;
        }
        .flower--1 .flower__line__leaf--6 {
          animation: blooming-leaf-left var(--fl-speed) 2s backwards;
        }

        .flower--2 {
          left: 50%;
          transform: rotate(20deg);
          animation: moving-flower-2 4s linear infinite;
        }
        .flower--2 .flower__line {
          height: 60vmin;
          animation-delay: 0.6s;
        }
        .flower--2 .flower__line__leaf--1 {
          animation: blooming-leaf-right var(--fl-speed) 1.9s backwards;
        }
        .flower--2 .flower__line__leaf--2 {
          animation: blooming-leaf-right var(--fl-speed) 1.7s backwards;
        }
        .flower--2 .flower__line__leaf--3 {
          animation: blooming-leaf-left var(--fl-speed) 1.5s backwards;
        }
        .flower--2 .flower__line__leaf--4 {
          animation: blooming-leaf-left var(--fl-speed) 1.3s backwards;
        }

        .flower--3 {
          left: 50%;
          transform: rotate(-15deg);
          animation: moving-flower-3 4s linear infinite;
        }
        .flower--3 .flower__line {
          animation-delay: 0.9s;
        }
        .flower--3 .flower__line__leaf--1 {
          animation: blooming-leaf-right var(--fl-speed) 2.5s backwards;
        }
        .flower--3 .flower__line__leaf--2 {
          animation: blooming-leaf-right var(--fl-speed) 2.3s backwards;
        }
        .flower--3 .flower__line__leaf--3 {
          animation: blooming-leaf-left var(--fl-speed) 2.1s backwards;
        }
        .flower--3 .flower__line__leaf--4 {
          animation: blooming-leaf-left var(--fl-speed) 1.9s backwards;
        }

        .flower__leafs {
          position: relative;
          animation: blooming-flower 2s backwards;
        }
        .flower__leafs--1 {
          animation-delay: 1.1s;
        }
        .flower__leafs--2 {
          animation-delay: 1.4s;
        }
        .flower__leafs--3 {
          animation-delay: 1.7s;
        }

        .flower__leafs::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -100%);
          width: 8vmin;
          height: 8vmin;
          background-color: var(--fl-color-3);
          filter: blur(10vmin);
          opacity: 0.3;
        }

        .flower__leaf {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 8vmin;
          height: 11vmin;
          border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
          background-color: var(--fl-color-2);
          background-image: linear-gradient(to top, var(--fl-color-3), var(--fl-color-1));
          transform-origin: bottom center;
          opacity: 0.9;
          box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
        }

        .flower__leaf--1 {
          transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
        }
        .flower__leaf--2 {
          transform: translate(-50%, -4%) rotateX(40deg);
        }
        .flower__leaf--3 {
          transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
        }
        .flower__leaf--4 {
          width: 8vmin;
          height: 8vmin;
          transform-origin: bottom left;
          border-radius: 4vmin 10vmin 4vmin 4vmin;
          transform: translate(-0%, 18%) rotateX(70deg) rotate(-43deg);
          background-image: linear-gradient(to top, var(--fl-color-leaf), var(--fl-color-1));
          z-index: 1;
          opacity: 0.8;
        }

        .flower__white-circle {
          position: absolute;
          left: -3.5vmin;
          top: -3vmin;
          width: 9vmin;
          height: 4vmin;
          border-radius: 50%;
          background-color: #fff;
        }
        .flower__white-circle::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          border-radius: inherit;
          background-image: repeating-linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 12px
            ),
            repeating-linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 12px
            ),
            linear-gradient(90deg, #f3e7c4, #c5a880);
        }

        .flower__line {
          height: 55vmin;
          width: 1.5vmin;
          background-image: linear-gradient(
              to left,
              rgba(0, 0, 0, 0.2),
              transparent,
              rgba(255, 255, 255, 0.2)
            ),
            linear-gradient(to top, transparent 10%, var(--fl-color-leaf-dark), var(--fl-color-stem));
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
          animation: grow-flower-tree 4s backwards;
        }

        .flower__line__leaf {
          --w: 7vmin;
          --h: calc(var(--w) + 2vmin);
          position: absolute;
          top: 20%;
          left: 90%;
          width: var(--w);
          height: var(--h);
          border-top-right-radius: var(--h);
          border-bottom-left-radius: var(--h);
          background-image: linear-gradient(
            to top,
            rgba(110, 130, 114, 0.4),
            var(--fl-color-leaf)
          );
        }

        .flower__line__leaf--1 {
          transform: rotate(70deg) rotateY(30deg);
        }
        .flower__line__leaf--2 {
          top: 45%;
          transform: rotate(70deg) rotateY(30deg);
        }
        .flower__line__leaf--3,
        .flower__line__leaf--4,
        .flower__line__leaf--6 {
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          border-top-left-radius: var(--h);
          border-bottom-right-radius: var(--h);
          left: -460%;
          top: 12%;
          transform: rotate(-70deg) rotateY(30deg);
        }
        .flower__line__leaf--4 {
          top: 40%;
        }
        .flower__line__leaf--5 {
          top: 0;
          transform-origin: left;
          transform: rotate(70deg) rotateY(30deg) scale(0.6);
        }
        .flower__line__leaf--6 {
          top: -2%;
          left: -450%;
          transform-origin: right;
          transform: rotate(-70deg) rotateY(30deg) scale(0.6);
        }

        .flower__light {
          display: none;
          position: absolute;
          bottom: 0vmin;
          width: 1vmin;
          height: 1vmin;
          background-color: var(--fl-color-stem);
          border-radius: 50%;
          filter: blur(0.2vmin);
          animation: light-ans 4s linear infinite backwards;
        }
        .flower__light:nth-child(odd) {
          background-color: var(--fl-color-3);
        }
        .flower__light--1 { left: -2vmin; animation-delay: 1s; }
        .flower__light--2 { left: 3vmin; animation-delay: 0.5s; }
        .flower__light--3 { left: -6vmin; animation-delay: 0.3s; }
        .flower__light--4 { left: 6vmin; animation-delay: 0.9s; }
        .flower__light--5 { left: -1vmin; animation-delay: 1.5s; }
        .flower__light--6 { left: -4vmin; animation-delay: 3s; }
        .flower__light--7 { left: 3vmin; animation-delay: 2s; }
        .flower__light--8 { left: -6vmin; animation-delay: 3.5s; }

        .flower__grass {
          --c: var(--fl-color-leaf-dark);
          --line-w: 1.5vmin;
          position: absolute;
          bottom: 12vmin;
          left: -7vmin;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          z-index: 20;
          transform-origin: bottom center;
          transform: rotate(-48deg) rotateY(40deg);
        }
        .flower__grass--1 {
          /* Static grass */
        }
        .flower__grass--2 {
          left: 2vmin;
          bottom: 10vmin;
          transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
          opacity: 0.8;
          z-index: 0;
          /* Static grass */
        }
        .flower__grass--top {
          width: 7vmin;
          height: 10vmin;
          border-top-right-radius: 100%;
          border-right: var(--line-w) solid var(--c);
          transform-origin: bottom center;
          transform: rotate(-2deg);
        }
        .flower__grass--bottom {
          margin-top: -2px;
          width: var(--line-w);
          height: 25vmin;
          background-image: linear-gradient(to top, transparent, var(--c));
        }
        .flower__grass__leaf {
          --size: 10vmin;
          position: absolute;
          width: calc(var(--size) * 2.1);
          height: var(--size);
          border-top-left-radius: var(--size);
          border-top-right-radius: var(--size);
          background-image: linear-gradient(
            to top,
            transparent,
            transparent 30%,
            var(--c)
          );
          z-index: 100;
          --speed-leaf: 2s;
        }
        .flower__grass__leaf--1 {
          top: -6%;
          left: 30%;
          --size: 6vmin;
          transform: rotate(-20deg);
          animation: growing-grass-ans--1 var(--speed-leaf) 2.6s backwards;
        }
        @keyframes growing-grass-ans--1 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-20deg) scale(0);
          }
        }
        .flower__grass__leaf--2 {
          top: -5%;
          left: -110%;
          --size: 6vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--2 var(--speed-leaf) 2.4s linear backwards;
        }
        @keyframes growing-grass-ans--2 {
          0% {
            transform-origin: bottom right;
            transform: rotate(10deg) scale(0);
          }
        }
        .flower__grass__leaf--3 {
          top: 5%;
          left: 60%;
          --size: 8vmin;
          transform: rotate(-18deg) rotateX(-20deg);
          animation: growing-grass-ans--3 var(--speed-leaf) 2.2s linear backwards;
        }
        @keyframes growing-grass-ans--3 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-18deg) rotateX(-20deg) scale(0);
          }
        }
        .flower__grass__leaf--4 {
          top: 6%;
          left: -135%;
          --size: 8vmin;
          transform: rotate(2deg);
          animation: growing-grass-ans--4 var(--speed-leaf) 2s linear backwards;
        }
        @keyframes growing-grass-ans--4 {
          0% {
            transform-origin: bottom right;
            transform: rotate(2deg) scale(0);
          }
        }
        .flower__grass__leaf--5 {
          top: 20%;
          left: 60%;
          --size: 10vmin;
          transform: rotate(-24deg) rotateX(-20deg);
          animation: growing-grass-ans--5 var(--speed-leaf) 1.8s linear backwards;
        }
        @keyframes growing-grass-ans--5 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-24deg) rotateX(-20deg) scale(0);
          }
        }
        .flower__grass__leaf--6 {
          top: 22%;
          left: -180%;
          --size: 10vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--6 var(--speed-leaf) 1.6s linear backwards;
        }
        @keyframes growing-grass-ans--6 {
          0% {
            transform-origin: bottom right;
            transform: rotate(10deg) scale(0);
          }
        }
        .flower__grass__leaf--7 {
          top: 39%;
          left: 70%;
          --size: 10vmin;
          transform: rotate(-10deg);
          animation: growing-grass-ans--7 var(--speed-leaf) 1.4s linear backwards;
        }
        @keyframes growing-grass-ans--7 {
          0% {
            transform-origin: bottom left;
            transform: rotate(-10deg) scale(0);
          }
        }
        .flower__grass__leaf--8 {
          top: 40%;
          left: -215%;
          --size: 11vmin;
          transform: rotate(10deg);
          animation: growing-grass-ans--8 var(--speed-leaf) 1.2s linear backwards;
        }
        @keyframes growing-grass-ans--8 {
          0% {
            transform-origin: bottom right;
            transform: rotate(10deg) scale(0);
          }
        }
        .flower__grass__overlay {
          position: absolute;
          top: -10%;
          right: 0%;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          filter: blur(1.5vmin);
          z-index: 100;
        }

        .flower__g-long {
          --w: 2vmin;
          --h: 6vmin;
          --c: var(--fl-color-leaf-dark);
          position: absolute;
          bottom: 10vmin;
          left: -3vmin;
          transform-origin: bottom center;
          transform: rotate(-30deg) rotateY(-20deg);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          /* Static stem */
        }
        .flower__g-long__top {
          top: calc(var(--h) * -1);
          width: calc(var(--w) + 1vmin);
          height: var(--h);
          border-top-right-radius: 100%;
          border-right: 0.7vmin solid var(--c);
          transform: translate(-0.7vmin, 1vmin);
        }
        .flower__g-long__bottom {
          width: var(--w);
          height: 50vmin;
          transform-origin: bottom center;
          background-image: linear-gradient(to top, transparent 30%, var(--c));
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
          clip-path: polygon(35% 0, 65% 1%, 100% 100%, 0% 100%);
        }

        .flower__g-right {
          position: absolute;
          bottom: 6vmin;
          left: -2vmin;
          transform-origin: bottom left;
          transform: rotate(20deg);
        }
        .flower__g-right .leaf {
          width: 30vmin;
          height: 50vmin;
          border-top-left-radius: 100%;
          border-left: 2vmin solid var(--fl-color-leaf-dark);
          background-image: linear-gradient(
            to bottom,
            transparent,
            var(--dark-color) 60%
          );
          -webkit-mask-image: linear-gradient(to top, transparent 30%, var(--fl-color-leaf-dark) 60%);
        }
        .flower__g-right--1 {
          /* Static stem */
        }
        .flower__g-right--2 {
          left: 5vmin;
          transform: rotateY(-180deg);
          /* Static stem */
        }
        .flower__g-right--2 .leaf {
          height: 75vmin;
          filter: blur(0.3vmin);
          opacity: 0.8;
        }

        .flower__g-front {
          position: absolute;
          bottom: 6vmin;
          left: 2.5vmin;
          z-index: 100;
          transform-origin: bottom center;
          transform: rotate(-28deg) rotateY(30deg) scale(1.04);
          /* Static stem */
        }
        .flower__g-front__line {
          width: 0.3vmin;
          height: 20vmin;
          background-image: linear-gradient(
            to top,
            transparent,
            var(--fl-color-leaf-dark),
            transparent 100%
          );
          position: relative;
        }
        .flower__g-front__leaf-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: bottom left;
          transform: rotate(10deg);
        }
        .flower__g-front__leaf-wrapper:nth-child(even) {
          left: 0vmin;
          transform: rotateY(-180deg) rotate(5deg);
          animation: flower__g-front__leaf-left-ans 1s ease-in backwards;
        }
        .flower__g-front__leaf-wrapper:nth-child(odd) {
          animation: flower__g-front__leaf-ans 1s ease-in backwards;
        }
        .flower__g-front__leaf-wrapper--1 {
          top: -8vmin;
          transform: scale(0.7);
          animation: flower__g-front__leaf-ans 1s 5.5s ease-in backwards !important;
        }
        .flower__g-front__leaf-wrapper--2 {
          top: -8vmin;
          transform: rotateY(-180deg) scale(0.7) !important;
          animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important;
        }
        .flower__g-front__leaf-wrapper--3 {
          top: -3vmin;
          animation: flower__g-front__leaf-ans 1s 4.6s ease-in backwards;
        }
        .flower__g-front__leaf-wrapper--4 {
          top: -3vmin;
          transform: rotateY(-180deg) scale(0.9) !important;
          animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important;
        }
        .flower__g-front__leaf-wrapper--5,
        .flower__g-front__leaf-wrapper--6 {
          top: 2vmin;
        }
        .flower__g-front__leaf-wrapper--7,
        .flower__g-front__leaf-wrapper--8 {
          top: 6.5vmin;
        }
        .flower__g-front__leaf-wrapper--2 {
          animation-delay: 5.2s !important;
        }
        .flower__g-front__leaf-wrapper--3 {
          animation-delay: 4.9s !important;
        }
        .flower__g-front__leaf-wrapper--5 {
          animation-delay: 4.3s !important;
        }
        .flower__g-front__leaf-wrapper--6 {
          animation-delay: 4.1s !important;
        }
        .flower__g-front__leaf-wrapper--7 {
          animation-delay: 3.8s !important;
        }
        .flower__g-front__leaf-wrapper--8 {
          animation-delay: 3.5s !important;
        }

        .flower__g-front__leaf {
          width: 10vmin;
          height: 10vmin;
          border-radius: 100% 0% 0% 100% / 100% 100% 0% 0%;
          box-shadow: inset 0 2px 1vmin rgba(197, 168, 128, 0.2);
          background-image: linear-gradient(
              to bottom left,
              transparent,
              var(--dark-color)
            ),
            linear-gradient(
              to bottom right,
              var(--fl-color-leaf) 50%,
              transparent 50%,
              transparent
            );
          -webkit-mask-image: linear-gradient(
            to bottom right,
            var(--fl-color-leaf) 50%,
            transparent 50%,
            transparent
          );
          mask-image: linear-gradient(
            to bottom right,
            var(--fl-color-leaf) 50%,
            transparent 50%,
            transparent
          );
        }

        .flower__g-fr {
          position: absolute;
          bottom: -4vmin;
          left: 10vmin;
          transform-origin: bottom left;
          z-index: 10;
          /* Static stem */
        }
        .flower__g-fr .leaf {
          width: 30vmin;
          height: 50vmin;
          border-top-left-radius: 100%;
          border-left: 2vmin solid var(--fl-color-leaf-dark);
          -webkit-mask-image: linear-gradient(to top, transparent 25%, var(--fl-color-leaf-dark) 50%);
          position: relative;
          z-index: 1;
        }
        .flower__g-fr__leaf {
          position: absolute;
          top: 0;
          left: 0;
          width: 10vmin;
          height: 10vmin;
          border-radius: 100% 0% 0% 100% / 100% 100% 0% 0%;
          box-shadow: inset 0 2px 1vmin rgba(197, 168, 128, 0.2);
          background-image: linear-gradient(
              to bottom left,
              transparent,
              var(--dark-color) 98%
            ),
            linear-gradient(
              to bottom right,
              var(--fl-color-stem) 45%,
              transparent 50%,
              transparent
            );
          -webkit-mask-image: linear-gradient(
            135deg,
            var(--fl-color-leaf) 40%,
            transparent 50%,
            transparent
          );
        }
        .flower__g-fr__leaf--1 {
          left: 20vmin;
          transform: rotate(45deg);
          animation: flower__g-fr-leaft-ans-1 0.5s 5.2s linear backwards;
        }
        .flower__g-fr__leaf--2 {
          left: 12vmin;
          top: -7vmin;
          transform: rotate(25deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-6 0.5s 5s linear backwards;
        }
        .flower__g-fr__leaf--3 {
          left: 15vmin;
          top: 6vmin;
          transform: rotate(55deg);
          animation: flower__g-fr-leaft-ans-5 0.5s 4.8s linear backwards;
        }
        .flower__g-fr__leaf--4 {
          left: 6vmin;
          top: -2vmin;
          transform: rotate(25deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-6 0.5s 4.6s linear backwards;
        }
        .flower__g-fr__leaf--5 {
          left: 10vmin;
          top: 14vmin;
          transform: rotate(55deg);
          animation: flower__g-fr-leaft-ans-5 0.5s 4.4s linear backwards;
        }
        .flower__g-fr__leaf--6 {
          left: 0vmin;
          top: 6vmin;
          transform: rotate(25deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-6 0.5s 4.2s linear backwards;
        }
        .flower__g-fr__leaf--7 {
          left: 5vmin;
          top: 22vmin;
          transform: rotate(45deg);
          animation: flower__g-fr-leaft-ans-7 0.5s 4s linear backwards;
        }
        .flower__g-fr__leaf--8 {
          left: -4vmin;
          top: 15vmin;
          transform: rotate(15deg) rotateY(-180deg);
          animation: flower__g-fr-leaft-ans-8 0.5s 3.8s linear backwards;
        }

        .long-g {
          position: absolute;
          bottom: 25vmin;
          left: -42vmin;
          transform-origin: bottom left;
        }
        .long-g--1 {
          bottom: 0vmin;
          transform: scale(0.8) rotate(-5deg);
        }
        .long-g--1 .leaf {
          -webkit-mask-image: linear-gradient(
            to top,
            transparent 40%,
            var(--fl-color-leaf-dark) 80%
          ) !important;
        }
        .long-g--1 .leaf--1 {
          --w: 5vmin;
          --h: 60vmin;
          left: -2vmin;
          transform: rotate(3deg) rotateY(-180deg);
        }

        .long-g--2,
        .long-g--3 {
          bottom: -3vmin;
          left: -35vmin;
          transform-origin: center;
          transform: scale(0.6) rotateX(60deg);
        }
        .long-g--2 .leaf,
        .long-g--3 .leaf {
          -webkit-mask-image: linear-gradient(
            to top,
            transparent 50%,
            var(--fl-color-leaf-dark) 80%
          ) !important;
        }
        .long-g--2 .leaf--1,
        .long-g--3 .leaf--1 {
          left: -1vmin;
          transform: rotateY(-180deg);
        }
        .long-g--3 {
          left: -17vmin;
          bottom: 0vmin;
        }
        .long-g--3 .leaf {
          -webkit-mask-image: linear-gradient(
            to top,
            transparent 40%,
            var(--fl-color-leaf-dark) 80%
          ) !important;
        }
        .long-g--4 {
          left: 25vmin;
          bottom: -3vmin;
          transform-origin: center;
          transform: scale(0.6) rotateX(60deg);
        }
        .long-g--4 .leaf {
          -webkit-mask-image: linear-gradient(
            to top,
            transparent 50%,
            var(--fl-color-leaf-dark) 80%
          ) !important;
        }
        .long-g--5 {
          left: 42vmin;
          bottom: 0vmin;
          transform: scale(0.8) rotate(2deg);
        }
        .long-g--6 {
          left: 0vmin;
          bottom: -20vmin;
          z-index: 100;
          filter: blur(0.3vmin);
          transform: scale(0.8) rotate(2deg);
        }
        .long-g--7 {
          left: 35vmin;
          bottom: 20vmin;
          z-index: -1;
          filter: blur(0.3vmin);
          transform: scale(0.6) rotate(2deg);
          opacity: 0.7;
        }

        .long-g .leaf {
          --w: 15vmin;
          --h: 40vmin;
          --c: var(--fl-color-leaf);
          position: absolute;
          bottom: 0;
          width: var(--w);
          height: var(--h);
          border-top-left-radius: 100%;
          border-left: 2vmin solid var(--c);
          -webkit-mask-image: linear-gradient(
            to top,
            transparent 20%,
            var(--dark-color)
          );
          transform-origin: bottom center;
        }
        .long-g .leaf--0 {
          left: 2vmin;
        }
        .long-g .leaf--1 {
          --w: 5vmin;
          --h: 60vmin;
        }
        .long-g .leaf--2 {
          --w: 10vmin;
          --h: 40vmin;
          left: -0.5vmin;
          bottom: 5vmin;
          transform-origin: bottom left;
          transform: rotateY(-180deg);
        }
        .long-g .leaf--3 {
          --w: 5vmin;
          --h: 30vmin;
          left: -1vmin;
          bottom: 3.2vmin;
          transform-origin: bottom left;
          transform: rotate(-10deg) rotateY(-180deg);
        }

        .grow-ans {
          animation: grow-ans 2s var(--d) backwards;
        }

        @keyframes grow-ans {
          0% {
            transform: scale(0);
            opacity: 0;
          }
        }

        @keyframes light-ans {
          0% {
            opacity: 0;
            transform: translateY(0vmin);
          }
          25% {
            opacity: 1;
            transform: translateY(-5vmin) translateX(-2vmin);
          }
          50% {
            opacity: 1;
            transform: translateY(-15vmin) translateX(2vmin);
            filter: blur(0.2vmin);
          }
          75% {
            transform: translateY(-20vmin) translateX(-2vmin);
            filter: blur(0.2vmin);
          }
          100% {
            transform: translateY(-30vmin);
            opacity: 0;
            filter: blur(1vmin);
          }
        }

        @keyframes moving-flower-1 {
          0%, 100% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
        }
        @keyframes moving-flower-2 {
          0%, 100% { transform: rotate(18deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes moving-flower-3 {
          0%, 100% { transform: rotate(-18deg); }
          50% { transform: rotate(-20deg) rotateY(-10deg); }
        }

        @keyframes blooming-leaf-right {
          0% {
            transform-origin: left;
            transform: rotate(70deg) rotateY(30deg) scale(0);
          }
        }
        @keyframes blooming-leaf-left {
          0% {
            transform-origin: right;
            transform: rotate(-70deg) rotateY(30deg) scale(0);
          }
        }
        @keyframes grow-flower-tree {
          0% {
            height: 0;
            border-radius: 1vmin;
          }
        }
        @keyframes blooming-flower {
          0% { transform: scale(0); }
        }
        @keyframes moving-grass {
          0%, 100% { transform: rotate(-48deg) rotateY(40deg); }
          50% { transform: rotate(-50deg) rotateY(40deg); }
        }
        @keyframes moving-grass--2 {
          0%, 100% { transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg); }
          50% { transform: scale(0.5) rotate(79deg) rotateX(10deg) rotateY(-200deg); }
        }

        .growing-grass {
          animation: growing-grass-ans 1s 2s backwards;
        }
        @keyframes growing-grass-ans {
          0% { transform: scale(0); }
        }

        @keyframes leaf-ans-1 {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.1); }
        }
        @keyframes leaf-ans-2 {
          0%, 100% { transform: rotateY(-180deg) rotate(5deg); }
          50% { transform: rotateY(-180deg) rotate(0deg) scale(1.1); }
        }
        @keyframes leaf-ans-3 {
          0%, 100% { transform: rotate(-10deg) rotateY(-180deg); }
          50% { transform: rotate(-20deg) rotateY(-180deg); }
        }

        @keyframes flower-g-long-ans {
          0%, 100% { transform: rotate(-30deg) rotateY(-20deg); }
          50% { transform: rotate(-32deg) rotateY(-20deg); }
        }
        @keyframes flower-g-right-ans {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(24deg) rotateX(-20deg); }
        }
        @keyframes flower-g-right-ans--2 {
          0%, 100% { transform: rotateY(-180deg) rotate(0deg) rotateX(-20deg); }
          50% { transform: rotateY(-180deg) rotate(6deg) rotateX(-20deg); }
        }
        @keyframes flower__g-front-ans {
          0%, 100% { transform: rotate(-28deg) rotateY(30deg) scale(1.04); }
          50% { transform: rotate(-35deg) rotateY(40deg) scale(1.04); }
        }
        @keyframes flower__g-front__leaf-left-ans-2 {
          0% { transform-origin: left; transform: rotateY(-180deg) scale(0); }
        }
        @keyframes flower__g-front__leaf-ans {
          0% { transform-origin: left; transform: rotate(10deg) scale(0); }
        }
        @keyframes flower__g-front__leaf-left-ans {
          0% { transform-origin: left; transform: rotateY(-180deg) rotate(5deg) scale(0); }
        }
        @keyframes flower__g-fr-ans {
          0%, 100% { transform: rotate(2deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes flower__g-fr-leaft-ans-1 {
          0% { transform-origin: left; transform: rotate(45deg) scale(0); }
        }
        @keyframes flower__g-fr-leaft-ans-5 {
          0% { transform-origin: left; transform: rotate(55deg) scale(0); }
        }
        @keyframes flower__g-fr-leaft-ans-6 {
          0% { transform-origin: right; transform: rotate(25deg) rotateY(-180deg) scale(0); }
        }
        @keyframes flower__g-fr-leaft-ans-7 {
          0% { transform-origin: left; transform: rotate(45deg) scale(0); }
        }
        @keyframes flower__g-fr-leaft-ans-8 {
          0% { transform-origin: right; transform: rotate(15deg) rotateY(-180deg) scale(0); }
        }
      ` }} />

      <div className="flower flower--1">
        <div className="flower__leafs flower__leafs--1">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
          <div className="flower__line__leaf flower__line__leaf--5"></div>
          <div className="flower__line__leaf flower__line__leaf--6"></div>
        </div>
      </div>

      <div className="flower flower--2">
        <div className="flower__leafs flower__leafs--2">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>

      <div className="flower flower--3">
        <div className="flower__leafs flower__leafs--3">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
          <div className="flower__line__leaf flower__line__leaf--4"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "1.2s" } as React.CSSProperties}>
        <div className="flower__g-long">
          <div className="flower__g-long__top"></div>
          <div className="flower__g-long__bottom"></div>
        </div>
      </div>

      <div className="growing-grass">
        <div className="flower__grass flower__grass--1">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          <div className="flower__grass__leaf flower__grass__leaf--1"></div>
          <div className="flower__grass__leaf flower__grass__leaf--2"></div>
          <div className="flower__grass__leaf flower__grass__leaf--3"></div>
          <div className="flower__grass__leaf flower__grass__leaf--4"></div>
          <div className="flower__grass__leaf flower__grass__leaf--5"></div>
          <div className="flower__grass__leaf flower__grass__leaf--6"></div>
          <div className="flower__grass__leaf flower__grass__leaf--7"></div>
          <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          <div className="flower__grass__overlay"></div>
        </div>
      </div>

      <div className="growing-grass">
        <div className="flower__grass flower__grass--2">
          <div className="flower__grass--top"></div>
          <div className="flower__grass--bottom"></div>
          <div className="flower__grass__leaf flower__grass__leaf--1"></div>
          <div className="flower__grass__leaf flower__grass__leaf--2"></div>
          <div className="flower__grass__leaf flower__grass__leaf--3"></div>
          <div className="flower__grass__leaf flower__grass__leaf--4"></div>
          <div className="flower__grass__leaf flower__grass__leaf--5"></div>
          <div className="flower__grass__leaf flower__grass__leaf--6"></div>
          <div className="flower__grass__leaf flower__grass__leaf--7"></div>
          <div className="flower__grass__leaf flower__grass__leaf--8"></div>
          <div className="flower__grass__overlay"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.4s" } as React.CSSProperties}>
        <div className="flower__g-right flower__g-right--1">
          <div className="leaf"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-right flower__g-right--2">
          <div className="leaf"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "2.8s" } as React.CSSProperties}>
        <div className="flower__g-front">
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
            <div className="flower__g-front__leaf"></div>
          </div>
          <div className="flower__g-front__line"></div>
        </div>
      </div>

      <div className="grow-ans" style={{ "--d": "3.2s" } as React.CSSProperties}>
        <div className="flower__g-fr">
          <div className="leaf"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
          <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
        </div>
      </div>

      {/* Optimized base grass layer: Reduced from 8 to 3 elements */}
      <div className="long-g long-g--1">
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.8s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--3">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>

      <div className="long-g long-g--5">
        <div className="grow-ans" style={{ "--d": "4s" } as React.CSSProperties}>
          <div className="leaf leaf--0"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "4.2s" } as React.CSSProperties}>
          <div className="leaf leaf--1"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3s" } as React.CSSProperties}>
          <div className="leaf leaf--2"></div>
        </div>
        <div className="grow-ans" style={{ "--d": "3.6s" } as React.CSSProperties}>
          <div className="leaf leaf--3"></div>
        </div>
      </div>
    </div>
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

        {/* Corner Bouquets */}
        <CornerBouquet className="top-[-10px] left-[-10px] sm:top-0 sm:left-0" delay={0.2} />
        <CornerBouquet className="top-[-10px] right-[-10px] sm:top-0 sm:right-0 scale-x-[-1]" delay={0.4} />

        {/* Magical CSS Blossoming Flowers (Growing diagonally from bottom corners) - Scaled larger and positioned on-screen */}
        <div className="absolute bottom-[-1vmin] left-[3vmin] pointer-events-none select-none z-10 scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1.0] origin-bottom-left rotate-[12deg] opacity-90">
          <MagicalFlowers />
        </div>
        <div className="absolute bottom-[-1vmin] right-[3vmin] pointer-events-none select-none z-10 scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-[1.0] origin-bottom-right rotate-[-12deg] scale-x-[-1] opacity-90">
          <MagicalFlowers />
        </div>

        {/* Side Bouquets */}
        <SideBouquet className="top-[35%] left-0 hidden md:block opacity-70" delay={0.5} />
        <SideBouquet className="top-[45%] right-0 scale-x-[-1] hidden md:block opacity-70" delay={0.7} />

        {/* Drifting Gold Petals (Optimized count) */}
        <DriftingPetal left="15%" top="75%" delay={0} duration={14} scale={0.9} />
        <DriftingPetal left="80%" top="60%" delay={3} duration={18} scale={0.7} />
        <DriftingPetal left="30%" top="45%" delay={6} duration={16} scale={0.8} />
        <DriftingPetal left="70%" top="30%" delay={1.5} duration={15} scale={1.0} />
        <DriftingPetal left="20%" top="25%" delay={8} duration={20} scale={0.6} />
        <DriftingPetal left="85%" top="80%" delay={4.5} duration={13} scale={0.85} />

        {/* Drifting Pink Petals (Optimized count) */}
        <DriftingPetal left="5%" top="80%" delay={1} duration={16} scale={0.8} isPink={true} />
        <DriftingPetal left="90%" top="55%" delay={4} duration={19} scale={0.65} isPink={true} />
        <DriftingPetal left="25%" top="35%" delay={7} duration={17} scale={0.75} isPink={true} />
        <DriftingPetal left="75%" top="20%" delay={2.5} duration={14} scale={0.9} isPink={true} />
        <DriftingPetal left="10%" top="15%" delay={9} duration={21} scale={0.55} isPink={true} />
        <DriftingPetal left="95%" top="75%" delay={5} duration={12} scale={0.8} isPink={true} />
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
