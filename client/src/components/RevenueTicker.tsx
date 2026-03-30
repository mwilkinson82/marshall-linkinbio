/**
 * RevenueTicker — Infinite horizontal scrolling ticker showing
 * contractor revenue scaling achievements. Matches the style from
 * alpcontractorcircle.com: copper company names, muted stats,
 * diamond separators, edge fade gradients.
 *
 * Uses pure CSS animation for buttery-smooth 60fps performance.
 */

import { motion } from "framer-motion";

interface TickerEntry {
  company: string;
  stat: string;
}

const TICKER_DATA: TickerEntry[] = [
  { company: "CNY Group", stat: "$600K → $20M in 18 months" },
  { company: "Trojan Roofing", stat: "$300K → $10M first year" },
  { company: "Sage Construction", stat: "$2M revenue — 1st year as contractor" },
  { company: "Davis Contracting", stat: "$1M → $4M in 6 months" },
  { company: "ALP Members", stat: "$2.5B+ in construction experience behind every call" },
];

function TickerItem({ entry }: { entry: TickerEntry }) {
  return (
    <span className="inline-flex items-center gap-3 px-6 sm:px-8 shrink-0">
      <span
        className="text-[11px] sm:text-xs font-semibold text-ember/80 tracking-wide whitespace-nowrap"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {entry.company}
      </span>
      <span className="text-cream/20 text-xs">—</span>
      <span
        className="text-[11px] sm:text-xs text-cream/50 whitespace-nowrap"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {entry.stat}
      </span>
      <span className="text-ember/20 text-sm sm:text-base ml-2 sm:ml-4">◆</span>
    </span>
  );
}

export function RevenueTicker() {
  // Duplicate entries for seamless infinite loop
  const items = [...TICKER_DATA, ...TICKER_DATA];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 w-full overflow-hidden py-3 border-y border-cream/[0.06]"
    >
      {/* Left edge fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, oklch(0.10 0.01 270), transparent)",
        }}
      />

      {/* Right edge fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(-90deg, oklch(0.10 0.01 270), transparent)",
        }}
      />

      {/* Scrolling track */}
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {items.map((entry, i) => (
          <TickerItem key={`${entry.company}-${i}`} entry={entry} />
        ))}
      </div>
    </motion.div>
  );
}
