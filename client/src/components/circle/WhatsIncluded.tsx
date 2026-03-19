import { motion } from "framer-motion";
import { Calendar, BarChart3, GraduationCap, FileText, Users, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Weekly Group Call",
    subtitle: "Thursday Evenings",
    description: "Live hot seats, Q&A, and strategic teaching sessions led by Marshall. Bring your real problems — leave with real solutions.",
  },
  {
    icon: BarChart3,
    title: "Monthly Deal Reviews",
    subtitle: "Live Proposal Breakdowns",
    description: "Marshall reviews your actual proposals, bids, and deals. Get expert eyes on your numbers before you present to the client.",
  },
  {
    icon: GraduationCap,
    title: "Monthly Bootcamp",
    subtitle: "Deep-Dive Training",
    description: "One focused topic each month — estimating, hiring, sales process, marketing. Intensive sessions that move the needle.",
  },
  {
    icon: FileText,
    title: "Template Library",
    subtitle: "Battle-Tested Documents",
    description: "SOPs, contracts, spreadsheets, and operational docs built from $2.5B+ in real-world execution. Stop guessing — use what works.",
  },
  {
    icon: Users,
    title: "Private Community",
    subtitle: "24/7 Access via Discord",
    description: "A curated network of serious contractors. Share wins, ask questions, get accountability from operators who understand the game.",
  },
  {
    icon: MessageCircle,
    title: "Replay Library",
    subtitle: "Never Miss a Session",
    description: "Every call, bootcamp, and deal review recorded and organized. New members get instant access to the entire archive.",
  },
];

const easeOutCubic = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function WhatsIncluded() {
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
            What You Get
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Everything You Need to{" "}
            <span className="text-ember">Execute</span>
          </h2>
          <p className="text-base sm:text-lg text-cream-muted/70 max-w-2xl mx-auto">
            This isn't another course you watch and forget. This is a live execution environment where you show up, get coached, and leave with clarity.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, ease: easeOutCubic, delay: i * 0.1 }}
              className="glass-card ember-glow rounded-xl p-6 group cursor-default"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-lg bg-ember/10 flex items-center justify-center mb-4 group-hover:bg-ember/20 transition-colors duration-300">
                <feature.icon size={20} className="text-ember" />
              </div>

              {/* Title & Subtitle */}
              <h3
                className="text-lg font-bold text-cream mb-1"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-xs font-medium text-ember/80 tracking-wide uppercase mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                {feature.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-cream-muted/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
