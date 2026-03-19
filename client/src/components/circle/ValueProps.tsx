import { motion } from "framer-motion";

const stats = [
  { value: "$2.5B+", label: "In Construction Experience" },
  { value: "1,000+", label: "Contractors Trained" },
  { value: "Daily", label: "Live Execution Rooms" },
];

const featuredIn = ["Yahoo Finance", "Business Insider", "Forbes", "The Daily Pod"];

const easeOutCubic = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function ValueProps() {
  return (
    <section className="relative z-10 py-16 sm:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: easeOutCubic, delay: i * 0.15 }}
              className="text-center"
            >
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-ember mb-1"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-cream-muted/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeOutCubic, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-cream-muted/50 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {featuredIn.map((name) => (
              <span
                key={name}
                className="text-sm sm:text-base text-cream-muted/40 font-medium"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.5 }}
          className="mt-14 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent"
        />
      </div>
    </section>
  );
}
