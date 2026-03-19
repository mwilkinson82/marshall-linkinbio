import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, ArrowDown } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663332724241/F8sHs44hWg957N49MHxas2/marshall_hero_6c478c8c.webp";

const easeOutCubic = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.8]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src={HERO_IMAGE}
          alt="Marshall Wilkinson speaking at a conference"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(180deg, oklch(0.13 0.02 260 / 0.7) 0%, oklch(0.13 0.02 260 / 0.85) 50%, oklch(0.13 0.02 260) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20">
        {/* Founding Members Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ember/30 bg-ember/10 mb-8"
        >
          <Users size={14} className="text-ember" />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ember" style={{ fontFamily: "'Sora', sans-serif" }}>
            Founding Members — Limited Spots
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutCubic, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          <span className="text-cream">The</span>{" "}
          <span className="text-ember">Contracting</span>{" "}
          <span className="text-cream">Circle</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutCubic, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-cream-muted font-light leading-relaxed mb-6 max-w-2xl mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          The elite contractor community & execution engine led by{" "}
          <span className="text-cream font-medium">Marshall Wilkinson</span>
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutCubic, delay: 0.8 }}
          className="text-sm sm:text-base text-cream-muted/70 tracking-wide mb-10"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Weekly calls. Monthly deal reviews. Battle-tested templates. A private community of serious operators.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutCubic, delay: 1.0 }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-3 px-8 py-4 bg-ember hover:bg-ember-light text-midnight font-bold text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.72_0.12_55/0.3)]"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Claim Your Founding Spot
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} className="text-cream-muted/40 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
