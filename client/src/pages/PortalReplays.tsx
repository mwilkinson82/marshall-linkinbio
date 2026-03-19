/**
 * Replay Library — Watch past Contracting Circle calls and bootcamp sessions.
 * Placeholder content that Marshall can populate with real recordings.
 */
import { useState, useMemo } from "react";
import {
  PlayCircle,
  Clock,
  Calendar,
  Search,
  Filter,
  Lock,
  Star,
  ChevronRight,
} from "lucide-react";

type ReplayCategory = "all" | "weekly_calls" | "bootcamp" | "masterclass" | "q_and_a";

interface Replay {
  id: string;
  title: string;
  description: string;
  category: Exclude<ReplayCategory, "all">;
  duration: string;
  date: string;
  thumbnail?: string;
  featured?: boolean;
  locked?: boolean;
}

// Placeholder replays — Marshall will replace with real content
const REPLAYS: Replay[] = [
  {
    id: "1",
    title: "Scaling Your Contracting Business to $10M+",
    description: "Marshall breaks down the exact systems and processes needed to scale past the $10M revenue mark in construction.",
    category: "masterclass",
    duration: "1h 24m",
    date: "2026-03-13",
    featured: true,
  },
  {
    id: "2",
    title: "Weekly Call — Closing High-Ticket Contracts",
    description: "Live coaching session on proposal strategies and closing techniques for $500K+ contracts.",
    category: "weekly_calls",
    duration: "58m",
    date: "2026-03-06",
  },
  {
    id: "3",
    title: "Sales Bootcamp Session 1: The ALP Framework",
    description: "Introduction to the Altitude Logic Pressure sales methodology and how to apply it in construction.",
    category: "bootcamp",
    duration: "1h 45m",
    date: "2026-02-27",
    featured: true,
  },
  {
    id: "4",
    title: "Weekly Call — Handling Objections in Construction Sales",
    description: "Real-world objection handling scenarios and role-play exercises with Circle members.",
    category: "weekly_calls",
    duration: "52m",
    date: "2026-02-20",
  },
  {
    id: "5",
    title: "Q&A: Bidding Strategy for Government Contracts",
    description: "Open Q&A session focused on winning government and municipal construction bids.",
    category: "q_and_a",
    duration: "45m",
    date: "2026-02-13",
  },
  {
    id: "6",
    title: "Sales Bootcamp Session 2: Building Your Pipeline",
    description: "Creating a predictable pipeline of qualified leads and managing your sales funnel effectively.",
    category: "bootcamp",
    duration: "1h 32m",
    date: "2026-02-06",
  },
  {
    id: "7",
    title: "Masterclass: Negotiation Tactics That Win",
    description: "Advanced negotiation strategies specifically designed for construction contracts and change orders.",
    category: "masterclass",
    duration: "1h 15m",
    date: "2026-01-30",
  },
  {
    id: "8",
    title: "Weekly Call — Building Your Team",
    description: "Hiring, training, and retaining top talent in your contracting business.",
    category: "weekly_calls",
    duration: "1h 02m",
    date: "2026-01-23",
  },
];

const CATEGORIES: { value: ReplayCategory; label: string }[] = [
  { value: "all", label: "All Replays" },
  { value: "weekly_calls", label: "Weekly Calls" },
  { value: "bootcamp", label: "Bootcamp" },
  { value: "masterclass", label: "Masterclass" },
  { value: "q_and_a", label: "Q&A Sessions" },
];

function categoryColor(cat: string): string {
  const colors: Record<string, string> = {
    weekly_calls: "bg-blue-accent/10 text-blue-accent",
    bootcamp: "bg-ember/10 text-ember",
    masterclass: "bg-purple-500/10 text-purple-400",
    q_and_a: "bg-success/10 text-success",
  };
  return colors[cat] || "bg-white/5 text-cream-muted";
}

function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    weekly_calls: "Weekly Call",
    bootcamp: "Bootcamp",
    masterclass: "Masterclass",
    q_and_a: "Q&A",
  };
  return labels[cat] || cat;
}

export default function PortalReplays() {
  const [activeCategory, setActiveCategory] = useState<ReplayCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReplays = useMemo(() => {
    return REPLAYS.filter(r => {
      if (activeCategory !== "all" && r.category !== activeCategory) return false;
      if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !r.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  const featuredReplays = REPLAYS.filter(r => r.featured);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-cream">
          Replay Library
        </h1>
        <p className="text-cream-muted mt-1">
          Watch past calls, bootcamp sessions, and masterclasses at your own pace.
        </p>
      </div>

      {/* Featured Section */}
      {featuredReplays.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-ember" />
            <h2 className="font-heading text-sm font-semibold text-ember uppercase tracking-wider">Featured</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredReplays.map(replay => (
              <button
                key={replay.id}
                className="group glass-card rounded-xl p-5 text-left hover:bg-white/[0.03] transition-all duration-300 border border-ember/10"
                onClick={() => {
                  // TODO: Open video player
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-ember/10 flex items-center justify-center shrink-0 group-hover:bg-ember/20 transition-colors">
                    <PlayCircle className="w-7 h-7 text-ember" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider mb-2 ${categoryColor(replay.category)}`}>
                      {categoryLabel(replay.category)}
                    </span>
                    <h3 className="font-heading text-sm font-semibold text-cream group-hover:text-ember transition-colors line-clamp-2">
                      {replay.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-cream-muted text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {replay.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(replay.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted" />
          <input
            type="text"
            placeholder="Search replays..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-ember/30 focus:ring-1 focus:ring-ember/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.value
                  ? "bg-ember/15 text-ember border border-ember/20"
                  : "bg-white/5 text-cream-muted hover:text-cream border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Replay List */}
      <div className="space-y-3">
        {filteredReplays.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <Filter className="w-8 h-8 text-cream-muted mx-auto mb-3" />
            <p className="text-cream-muted text-sm">No replays match your search.</p>
          </div>
        ) : (
          filteredReplays.map(replay => (
            <button
              key={replay.id}
              className="group w-full glass-card rounded-xl p-4 md:p-5 text-left hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-4"
              onClick={() => {
                // TODO: Open video player
              }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-ember/10 transition-colors">
                {replay.locked ? (
                  <Lock className="w-5 h-5 text-cream-muted" />
                ) : (
                  <PlayCircle className="w-5 h-5 md:w-6 md:h-6 text-cream-muted group-hover:text-ember transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${categoryColor(replay.category)}`}>
                    {categoryLabel(replay.category)}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-semibold text-cream group-hover:text-ember transition-colors truncate">
                  {replay.title}
                </h3>
                <p className="text-cream-muted text-xs mt-1 line-clamp-1 hidden sm:block">
                  {replay.description}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden md:flex flex-col items-end gap-1 text-cream-muted text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {replay.duration}
                  </span>
                  <span>{new Date(replay.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-cream-muted group-hover:text-ember transition-colors" />
              </div>
            </button>
          ))
        )}
      </div>

      {/* Info Note */}
      <div className="glass-card rounded-xl p-5 text-center">
        <p className="text-cream-muted text-sm">
          New recordings are added after each Thursday call. Check back regularly for fresh content.
        </p>
      </div>
    </div>
  );
}
