import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Spark Scale — Branch Network.
 * A scroll-driven network map: glowing location nodes connected by a
 * purple light trail that fills as the user travels from city to city.
 */

const BRANCHES = ["BHOPAL", "MYSORE", "BANGALORE", "GANJ BASODA", "MUMBAI"];

export function BranchNetwork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;

  /* Light trail fill follows scroll through the section */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  /* Track which station is passing through the center of the viewport */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const stations = Array.from(
      list.querySelectorAll<HTMLElement>("[data-station]"),
    );
    if (!stations.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.station));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stations.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="network"
      className="relative py-24 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 aurora opacity-40" />
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[var(--violet)]/15 blur-[140px]"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body text-white/70 mb-6"
        >
          // Where we execute
        </motion.p>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading italic text-white text-fluid-h1 leading-[0.9] tracking-[-3px] max-w-4xl"
        >
          The Spark Scale
          <br />
          <span className="text-white/40">network.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-white/75 font-body font-light"
        >
          Spark Scale starts at one point — and the network grows with every
          brand we scale. These are the cities we execute from today.
        </motion.p>

        {/* network map */}
        <div ref={trackRef} className="relative mt-10 md:mt-16 pb-8">
          {/* base rail */}
          <div
            aria-hidden
            className="absolute left-[1.35rem] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10"
          />
          {/* light trail fill */}
          {reduce ? (
            <div
              aria-hidden
              className="absolute left-[1.35rem] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--violet)] via-[var(--violet-glow)] to-[var(--ice)]"
            />
          ) : (
            <motion.div
              aria-hidden
              style={{ scaleY }}
              className="absolute left-[1.35rem] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--violet)] via-[var(--violet-glow)] to-[var(--ice)] shadow-[0_0_12px_rgba(160,120,255,0.7)]"
            />
          )}

          <div ref={listRef} className="relative">
            {BRANCHES.map((city, i) => {
              const isActive = i === active;
              const leftSide = i % 2 === 0;
              return (
                <div
                  key={city}
                  data-station={i}
                  className="relative flex items-center py-14 md:py-16"
                >
                  {/* node */}
                  <motion.div
                    aria-hidden
                    initial={false}
                    animate={{
                      scale: isActive ? 1.4 : 1,
                      opacity: isActive ? 1 : 0.55,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute left-[1.35rem] -translate-x-1/2 h-3 w-3 rounded-full bg-[var(--violet)] ${
                      isActive ? "violet-glow" : ""
                    }`}
                  />
                  {/* pulsing halo on active node */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-[1.35rem] -translate-x-1/2 h-7 w-7 rounded-full bg-[var(--violet)]/30 blur-[2px] animate-pulse-glow"
                    />
                  )}

                  <div
                    className={`ml-12 md:ml-0 w-full md:w-1/2 ${
                      leftSide
                        ? "md:pr-16 md:text-right md:flex md:flex-col md:items-end"
                        : "md:pl-16 md:ml-auto"
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/45 font-body">
                      Branch 0{i + 1}
                    </span>
                    <h3
                      className={`mt-2 font-heading italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-2px] leading-none transition-colors duration-500 ${
                        isActive
                          ? "text-white text-violet-glow"
                          : "text-white/45"
                      }`}
                    >
                      {city}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* end cap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center gap-3 pt-6 md:pt-10"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--ice)] shadow-[0_0_14px_rgba(150,200,255,0.8)]" />
          <p className="text-xs font-body text-white/50 tracking-wide">
            The network keeps growing with the brands we scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}