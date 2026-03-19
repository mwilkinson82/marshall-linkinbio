import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const easeOutCubic = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function FinalCTA() {
  return (
    <section className="relative z-10 py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutCubic }}
          className="h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent mb-16"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeOutCubic }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-ember mb-4"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Stop Guessing. Start Executing.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeOutCubic, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-6"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Your Competition Won't{" "}
          <span className="text-ember">Wait</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeOutCubic, delay: 0.2 }}
          className="text-base sm:text-lg text-cream-muted/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Every week you're not in The Circle is a week of deals left on the table, problems solved the hard way, and growth that could have been faster. Founding member spots are limited.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOutCubic, delay: 0.3 }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-3 px-10 py-4 bg-ember hover:bg-ember-light text-midnight font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_oklch(0.72_0.12_55/0.3)]"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <Zap size={18} />
            Claim Your Founding Spot — $497/mo
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xs text-cream-muted/40 mt-4"
        >
          Cancel anytime. No contracts. Founding rate locked forever.
        </motion.p>
      </div>
    </section>
  );
}
