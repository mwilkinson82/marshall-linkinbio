import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Marshall runs 1-on-1 consulting the way a real executive should. Every session had a clear agenda, priorities were set immediately, and there was no wasted time. What stood out most was how quickly he identified the root problems in my operation — not symptoms, but the actual structural flaws. The clarity he gave me around what to do next was worth more than any course or program I've ever purchased.",
    attribution: "1-on-1 Consulting Client",
  },
  {
    quote: "I've worked with a lot of people in construction who talk a good game. Marshall is the real deal. He knows contracting inside and out and can spot the problem fast. He didn't just talk theory — he gave me real fixes that I could implement immediately. Best part is he keeps you moving. No fluff. No wasting time.",
    attribution: "Contractor Coaching Client",
  },
  {
    quote: "Before working with Marshall I felt completely overwhelmed. I had a business that was growing but it felt like I was constantly reacting and putting out fires. Marshall helped me see what was actually happening underneath everything. The biggest value wasn't even the advice — it was the clarity and confidence I got from finally understanding what mattered and what didn't.",
    attribution: "1-on-1 Mentorship Client",
  },
  {
    quote: "This was hands down the best consulting experience I've ever had. He doesn't give generic business advice — he gets into nuance. He asked questions nobody else would ask and identified blind spots I didn't even know existed. It felt like having a world-class expert step inside my company and rewrite the operating system.",
    attribution: "Private Advisory Client",
  },
];

const easeOutCubic = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Testimonials() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: easeOutCubic }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-ember mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
            Real Results
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            What Operators Are{" "}
            <span className="text-ember">Saying</span>
          </h2>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, ease: easeOutCubic, delay: i * 0.12 }}
              className="glass-card rounded-xl p-6 sm:p-8 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote size={32} className="text-ember" />
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-cream/85 leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ember/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-ember" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {t.attribution.charAt(0)}
                  </span>
                </div>
                <p className="text-xs font-medium text-cream-muted/60 tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>
                  — {t.attribution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
