import { motion } from "framer-motion";
import { Check, Zap, Shield } from "lucide-react";

const included = [
  "Weekly group call with Marshall (Thursday evenings)",
  "Monthly deal reviews — get expert eyes on your proposals",
  "Monthly bootcamp — intensive deep-dive training",
  "Full template library — SOPs, contracts, spreadsheets",
  "Private Discord community — 24/7 access",
  "Complete replay library — never miss a session",
  "Founding member pricing locked in for life",
];

const easeOutCubic = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 py-16 sm:py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeOutCubic }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-ember mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
            Founding Member Pricing
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Join The Circle
          </h2>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, ease: easeOutCubic, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Ember border glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-ember/20 via-ember/5 to-transparent p-px">
            <div className="w-full h-full rounded-2xl bg-midnight" />
          </div>

          <div className="relative glass-card rounded-2xl p-8 sm:p-10 border border-ember/15">
            {/* Founding Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ember/10 border border-ember/20">
                <Shield size={14} className="text-ember" />
                <span className="text-xs font-semibold tracking-wider uppercase text-ember" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Founding Member — Price Locked Forever
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl sm:text-6xl font-bold text-cream" style={{ fontFamily: "'Sora', sans-serif" }}>
                  $497
                </span>
                <span className="text-lg text-cream-muted/60">/mo</span>
              </div>
              <p className="text-sm text-cream-muted/50 mt-2">Cancel anytime. No contracts. No commitments.</p>
            </div>

            {/* Included List */}
            <div className="space-y-3 mb-8">
              {included.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easeOutCubic, delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-ember/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-ember" />
                  </div>
                  <span className="text-sm sm:text-base text-cream/80">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOutCubic, delay: 0.6 }}
            >
              <a
                href="#"
                className="flex items-center justify-center gap-3 w-full py-4 bg-ember hover:bg-ember-light text-midnight font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_oklch(0.72_0.12_55/0.3)]"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <Zap size={18} />
                Claim Your Founding Spot
              </a>
            </motion.div>

            {/* Urgency Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center text-xs text-cream-muted/40 mt-4"
            >
              Limited founding member spots available. Once filled, price increases.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
