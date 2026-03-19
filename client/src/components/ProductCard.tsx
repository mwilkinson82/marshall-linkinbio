/**
 * ProductCard — Frosted glass card with glow border, scroll-triggered
 * stagger animation, hover/tap micro-interactions.
 * Design: Semi-transparent dark surface, copper accent border glow,
 * subtle scale on hover, arrow indicator for links.
 */

import { motion } from "framer-motion";
import { BookOpen, Target, GraduationCap, Users, FileText, Gem, ArrowUpRight, Lock } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  link: string;
  icon: "book" | "target" | "graduation" | "circle" | "file" | "diamond";
  iconImage?: string;
  comingSoon?: boolean;
  index: number;
  isInView: boolean;
}

const iconMap = {
  book: BookOpen,
  target: Target,
  graduation: GraduationCap,
  circle: Users,
  file: FileText,
  diamond: Gem,
};

export function ProductCard({
  title,
  price,
  description,
  link,
  icon,
  iconImage,
  comingSoon = false,
  index,
  isInView,
}: ProductCardProps) {
  const IconComponent = iconMap[icon];

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      whileHover={!comingSoon ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!comingSoon ? { scale: 0.98 } : undefined}
      className={`
        relative group rounded-xl overflow-hidden
        bg-[#12141A]/80 backdrop-blur-xl
        border border-white/[0.06]
        transition-all duration-500
        ${comingSoon ? "opacity-70" : "hover:border-ember/20 hover:shadow-[0_0_30px_-5px_rgba(212,145,92,0.15)]"}
      `}
    >
      {/* Inner glow gradient on hover */}
      {!comingSoon && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-ember/[0.04] via-transparent to-transparent pointer-events-none" />
      )}

      <div className="relative p-4 sm:p-5 flex items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center overflow-hidden">
          {iconImage ? (
            <img src={iconImage} alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          ) : (
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-ember" strokeWidth={1.5} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3
              className="text-[15px] sm:text-base font-semibold text-cream"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {title}
            </h3>
            {comingSoon && (
              <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ember/10 border border-ember/20 text-ember text-[10px] font-semibold uppercase tracking-wider"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <Lock className="w-2.5 h-2.5" />
                Soon
              </span>
            )}
          </div>
          <p className="text-[13px] sm:text-sm text-cream-muted/80 leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        {/* Price & Arrow */}
        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          {price && (
            <span
              className="text-sm sm:text-base font-bold text-ember whitespace-nowrap"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {price}
            </span>
          )}
          {!comingSoon && (
            <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-ember/10 group-hover:border-ember/20 transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-cream-muted group-hover:text-ember transition-colors duration-300" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (comingSoon) {
    return <div className="cursor-default">{cardContent}</div>;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline"
    >
      {cardContent}
    </a>
  );
}
