/**
 * HeroSection — Cinematic full-viewport hero with parallax zoom,
 * dark overlay, cascading text reveal animation.
 * Design: Deep navy overlay on hero image, warm cream text, copper accent.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  heroImage: string;
}

export function HeroSection({ heroImage }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax zoom effect on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.85]);

  // Text animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
        delay: 1.0,
      },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
        delay: 1.2,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[85vh] min-h-[550px] max-h-[750px] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src={heroImage}
          alt="Marshall Wilkinson speaking at a conference"
          className="w-full h-full object-cover object-[center_20%]"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/70 to-[#08090D]/40" />
      </motion.div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090D] to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-end pb-16 sm:pb-20">
        <div className="w-full max-w-md mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Name */}
            <motion.h1
              variants={textVariants}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-cream leading-[1.1]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Marshall
              <br />
              Wilkinson
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={textVariants}
              className="mt-3 text-sm sm:text-base font-medium tracking-[0.15em] uppercase text-ember"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              CEO, ALP
            </motion.p>

            {/* Divider Line */}
            <motion.div
              variants={lineVariants}
              className="w-16 h-[1px] bg-gradient-to-r from-transparent via-ember to-transparent mt-5 mb-5 origin-center"
            />

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              className="text-cream-muted text-sm sm:text-base font-normal leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              $2.5 Billion in Construction Experience
            </motion.p>

            {/* Credibility Line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 1.6 }}
              className="mt-3 text-cream-muted/60 text-xs sm:text-sm font-medium tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Trusted by 500+ Contractors
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
