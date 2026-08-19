import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ScanSearch,
  Compass,
  Camera,
  Clapperboard,
  Share2,
  TrendingUp,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/**
 * Spark Scale — Social Media Marketing Approach.
 * Pair text with individual images in an alternating pattern on desktop,
 * and stacked vertically on mobile.
 */

type Phase = {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
  set: string;
  image?: string;
};

const PHASES: Phase[] = [
  {
    n: "01",
    title: "Research",
    body: "We start with the brand, the audience, the competitors and the market — before a single frame is shot.",
    icon: ScanSearch,
    set: "Whiteboard & audience maps",
    image: "/images/approach/approach_research.jpg",
  },
  {
    n: "02",
    title: "Strategy",
    body: "Content pillars, positioning, hooks and campaign direction — the plan every reel, post and ad is built from.",
    icon: Compass,
    set: "Pillar plan & hook bank",
    image: "/images/approach/approach_strategy.jpg",
  },
  {
    n: "03",
    title: "Production",
    body: "Concepts, scripts, locations and visual direction. Shoots planned and executed in your space, by our team.",
    icon: Camera,
    set: "Camera setup · on set",
    image: "/images/approach/approach_production.jpg",
  },
  {
    n: "04",
    title: "Editing",
    body: "Raw footage becomes polished, platform-native content — cut, colored and captioned for the way people scroll.",
    icon: Clapperboard,
    set: "Timeline & color grade",
    image: "/images/approach/approach_editing.jpg",
  },
  {
    n: "05",
    title: "Distribution",
    body: "Published and optimized for the right platforms, at the right times. Built for reach and response.",
    icon: Share2,
    set: "Platform rollout grid",
    image: "/images/approach/approach_distribution.jpg",
  },
  {
    n: "06",
    title: "Optimization",
    body: "Performance is analyzed. What works gets doubled down. What doesn't gets fixed.",
    icon: TrendingUp,
    set: "Analytics dashboard",
    image: "/images/approach/approach_optimization.jpg",
  },
  {
    n: "07",
    title: "Growth",
    body: "Attention converts into audience, leads and revenue — compounding with every post.",
    icon: Rocket,
    set: "The growth curve",
    image: "/images/approach/approach_growth.jpg",
  },
];

const textVariants = {
  active: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
  inactive: { opacity: 0.35, scale: 0.98, filter: "blur(2px)", y: 10 },
};

const imageVariants = {
  active: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
  inactive: { opacity: 0.3, scale: 0.96, filter: "blur(4px)", y: 15 },
};

function FrameArt({ phase, active }: { phase: Phase; active: boolean }) {
  const Icon = phase.icon;
  return (
    <div className="absolute inset-0">
      {/* cinematic backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,rgba(90,55,160,0.45),rgba(8,6,16,0.95)_65%)]" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[var(--violet)]/30 blur-[90px]" />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[var(--ice)]/20 blur-[90px]" />
      {/* ghost number */}
      <span
        aria-hidden
        className="absolute -bottom-10 -right-2 font-heading italic text-white/[0.05] text-[10rem] leading-none select-none"
      >
        {phase.n}
      </span>
      {/* icon */}
      <motion.div
        initial={false}
        animate={
          active
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0.55, scale: 0.97, filter: "blur(0px)" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="liquid-glass-strong rounded-full h-24 w-24 md:h-28 md:w-28 flex items-center justify-center violet-glow">
          <Icon className="h-9 w-9 md:h-10 md:w-10 text-white" strokeWidth={1.25} />
        </div>
      </motion.div>
    </div>
  );
}

function VisualFrame({
  phase,
  index,
  total,
  active,
  reduce,
}: {
  phase: Phase;
  index: number;
  total: number;
  active: boolean;
  reduce: boolean;
}) {
  const pct = ((index + 1) / total) * 100;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] liquid-glass-strong">
      {/* progress bar */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-white/5 z-20">
        <div
          className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--ice)] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* crossfading frame */}
      {reduce ? (
        <FrameArt phase={phase} active={active} />
      ) : (
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={phase.n}
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <FrameArt phase={phase} active={active} />
          </motion.div>
        </AnimatePresence>
      )}

      {/* image slot */}
      {phase.image && (
        <img
          src={phase.image}
          alt={`${phase.title} — Spark Scale production frame`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* chrome: top meta + bottom caption */}
      <div className="absolute inset-x-0 top-4 z-10 flex items-center justify-between px-5">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/60 font-body">
          Social production
        </span>
        <span className="text-[10px] font-body text-white/70 tabular-nums tracking-widest">
          {phase.n} / 07
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-5 pb-5">
        <div>
          <div className="font-heading italic text-white text-2xl md:text-3xl leading-none tracking-[-0.5px]">
            {phase.title}
          </div>
          <div className="mt-1.5 text-[11px] text-white/55 font-body tracking-wide">
            {phase.set}
          </div>
        </div>
        <span
          aria-hidden
          className="h-2 w-2 rounded-full bg-[var(--violet)] animate-pulse-glow shrink-0"
        />
      </div>
      {/* bottom fade for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-[5]" />
    </div>
  );
}

export function SocialMediaApproach() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;

  /* Track which phase is passing through the center of the viewport */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const blocks = Array.from(list.querySelectorAll<HTMLElement>("[data-phase]"));
    if (!blocks.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.phase));
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="approach"
      className="relative py-24 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 aurora opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        {/* header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body text-white/70 mb-6"
        >
          // How we work
        </motion.p>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading italic text-white text-fluid-h1 leading-[0.9] tracking-[-3px] max-w-4xl"
        >
          How we make
          <br />
          <span className="text-white/40">content that moves.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-white/75 font-body font-light"
        >
          Seven phases, one continuous system — how Spark Scale researches,
          plans, shoots, edits and scales the social content behind every brand
          we grow.
        </motion.p>

        {/* phases - responsive stack on mobile, alternating row grid on desktop */}
        <ol ref={listRef} className="mt-16 lg:mt-24 flex flex-col gap-20 lg:gap-32">
          {PHASES.map((p, i) => {
            const isActive = i === active;
            return (
              <li
                key={p.n}
                data-phase={i}
                className="scroll-mt-28 w-full"
              >
                <div
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
                    i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Column */}
                  <motion.div
                    variants={textVariants}
                    animate={isActive ? "active" : "inactive"}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 w-full flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-heading italic text-3xl md:text-4xl tracking-[-1px] ${
                          isActive ? "text-[var(--violet-glow)]" : "text-white/35"
                        } transition-colors duration-500`}
                      >
                        {p.n}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                      <span className="text-[10px] uppercase tracking-[0.22em] text-white/45 font-body">
                        Phase {p.n}
                      </span>
                    </div>
                    <h3 className="mt-6 font-heading italic text-white text-4xl sm:text-5xl md:text-6xl tracking-[-2px] leading-none">
                      {p.title}
                    </h3>
                    <p className="mt-5 max-w-[46ch] text-white/80 font-body font-light leading-relaxed text-sm md:text-base">
                      {p.body}
                    </p>
                  </motion.div>

                  {/* Image Column */}
                  <motion.div
                    variants={imageVariants}
                    animate={isActive ? "active" : "inactive"}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 w-full max-w-[500px] lg:max-w-none"
                  >
                    <div className="relative aspect-[4/3] md:aspect-[16/10] w-full">
                      <VisualFrame
                        phase={p}
                        index={i}
                        total={PHASES.length}
                        active={isActive}
                        reduce={reduce}
                      />
                    </div>
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
