import { motion } from "motion/react";

const STEPS = [
  { n: "01", title: "Audit", body: "We x-ray your funnel — ads, menu, reviews, repeat data — and find the bleed." },
  { n: "02", title: "Strategy", body: "A 90-day blueprint mapped to your AOV, capacity and seasonality." },
  { n: "03", title: "Campaign Launch", body: "Creative produced, pixels installed, campaigns live within 14 days." },
  { n: "04", title: "Lead Capture", body: "Every click routed into WhatsApp or your booking flow — nothing wasted." },
  { n: "05", title: "Automation", body: "Confirmations, reminders, win-backs running 24/7 without staff lifting a finger." },
  { n: "06", title: "Optimization", body: "Weekly creative refreshes. Daily bid tuning. Monthly funnel rebuilds." },
  { n: "07", title: "Scaling", body: "Once unit economics work, we pour fuel — new geographies, new dayparts, new menus." },
];

export function Process() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body text-white/70 mb-6"
        >
          // The process
        </motion.p>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading italic text-white text-fluid-h1 leading-[0.9] tracking-[-3px] max-w-4xl"
        >
          From audit to scale —<br />
          <span className="text-white/40">in 90 days.</span>
        </motion.h2>

        <div className="relative mt-16 md:mt-20">
          {/* vertical spine */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--violet)]/40 to-transparent" />

          <div className="flex flex-col gap-8 md:gap-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className={`relative flex md:items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* dot */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-[var(--violet)] violet-glow" />

                <div className="ml-14 md:ml-0 md:w-1/2 md:px-10">
                  <div className="liquid-glass rounded-[1.25rem] p-5 md:p-6">
                    <span className="font-heading italic text-white/40 text-xl md:text-2xl">{s.n}</span>
                    <h3 className="font-heading italic text-white text-2xl md:text-4xl tracking-[-1px] leading-none mt-2">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug">
                      {s.body}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
