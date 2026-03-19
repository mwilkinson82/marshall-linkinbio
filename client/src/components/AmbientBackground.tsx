/**
 * AmbientBackground — Floating warm amber/copper glow orbs that drift slowly,
 * creating a cinematic "alive" feeling. Fixed position behind all content.
 */

import { motion } from "framer-motion";

const glowOrbs = [
  {
    size: 300,
    x: "15%",
    y: "20%",
    color: "rgba(212, 145, 92, 0.06)",
    duration: 20,
    delay: 0,
  },
  {
    size: 250,
    x: "75%",
    y: "35%",
    color: "rgba(201, 169, 110, 0.05)",
    duration: 25,
    delay: 5,
  },
  {
    size: 200,
    x: "50%",
    y: "65%",
    color: "rgba(212, 145, 92, 0.04)",
    duration: 22,
    delay: 8,
  },
  {
    size: 350,
    x: "30%",
    y: "80%",
    color: "rgba(139, 111, 71, 0.05)",
    duration: 28,
    delay: 3,
  },
];

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {glowOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -30, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
            opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
