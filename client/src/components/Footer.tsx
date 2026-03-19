/**
 * Footer — Simple copyright with premium styling.
 */

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-10 pb-10 pt-4 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />
        <p
          className="text-xs text-cream-muted/40 tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          &copy; 2026 Altitude Logic Pressure
        </p>
      </motion.div>
    </footer>
  );
}
