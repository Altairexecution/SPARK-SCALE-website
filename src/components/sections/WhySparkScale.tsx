import { motion } from "motion/react";
import { Cpu, Zap, ShieldCheck, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: Cpu,
    title: "System-driven, not freelancer-driven",
    body: "Every restaurant gets the same engine — refined across campaigns, not invented from scratch.",
  },
  {
    icon: Zap,
    title: "AI-first operations",
    body: "Chatbots, creative automation, and CRM scoring built in. Less staffing, more compounding.",
  },
  {
    icon: ShieldCheck,
    title: "Performance accountability",
    body: "ROAS, cost per cover, return rate — we report the numbers that move your P&L.",
  },
  {
    icon: Sparkles,
    title: "Cinematic brand craft",
    body: "We don't post stock plates. Every reel, page and ad looks like your restaurant deserves it.",
  },
];

export function WhySparkScale() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body text-white/70 mb-6"
        >
          // Why Spark Scale
        </motion.p>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading italic text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-3px] max-w-4xl"
        >
          Not an agency.
          <br />
          <span className="text-white/40">A growth infrastructure.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="liquid-glass rounded-[1.5rem] p-7 flex gap-5 items-start"
              >
                <div className="liquid-glass h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-1px] leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
