import { motion } from "motion/react";

const PROBLEMS = [
  {
    n: "01",
    title: "Flat weeks, lumpy months",
    body: "Beautiful product, beautiful brand — but demand swings wildly and forecasting feels like guesswork.",
  },
  {
    n: "02",
    title: "Platform dependency",
    body: "Marketplaces and aggregators take the margin and the customer. You rent reach instead of owning it.",
  },
  {
    n: "03",
    title: "No repeat system",
    body: "First-time buyers vanish into the noise. No follow-up. No second purchase. No data flywheel.",
  },
  {
    n: "04",
    title: "Invisible online",
    body: "Inconsistent content, weak landing pages, no funnel — discovery happens on someone else's terms.",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 aurora opacity-40" />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-body text-white/70 mb-6"
        >
          // The friction
        </motion.p>

        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading italic text-white text-fluid-h1 leading-[0.9] tracking-[-3px] max-w-4xl"
        >
          Marketing is loud.
          <br />
          <span className="text-white/40">Growth is quiet.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-base md:text-lg text-white/75 font-body font-light leading-relaxed"
        >
          Most businesses don't have a marketing problem. They have a system problem —
          disconnected ads, no follow-up, no data, no compounding. We engineer the system.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-14 md:mt-20">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="liquid-glass rounded-[1.5rem] p-6 md:p-7 group"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-heading italic text-white/40 text-2xl md:text-3xl">{p.n}</span>
                <div className="h-2 w-2 rounded-full bg-[var(--violet)] animate-pulse-glow" />
              </div>
              <h3 className="font-heading italic text-white text-2xl md:text-4xl tracking-[-1px] leading-none">
                {p.title}
              </h3>
              <p className="mt-4 text-sm text-white/80 font-body font-light leading-snug max-w-[40ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
