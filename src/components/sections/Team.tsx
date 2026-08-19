import { motion } from "motion/react";

const TEAM = [
  {
    name: "Darsh",
    role: "Founder",
    bio: "Strategy, sales direction, and growth engineering. Builds the systems clients run on.",
    initial: "D",
  },
  {
    name: "Video Editor",
    role: "Creative",
    bio: "Cinematic edits, ad creative, short-form content that earns the scroll.",
    initial: "V",
  },
  {
    name: "Social Lead",
    role: "Channel",
    bio: "Daily posting, community engagement, content consistency across platforms.",
    initial: "S",
  },
  {
    name: "Outreach",
    role: "Pipeline",
    bio: "Prospecting, first-touch and qualification — keeps the demo calendar full.",
    initial: "O",
  },
  {
    name: "Advisor",
    role: "Strategy",
    bio: "Operational guidance and growth playbook validation. Calls the audibles.",
    initial: "A",
  },
];

export function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 aurora opacity-30" />
      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-body text-white/70 mb-6"
        >
          // The team
        </motion.p>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading italic text-white text-fluid-h1 leading-[0.9] tracking-[-3px] max-w-4xl"
        >
          Lean operators.
          <br />
          <span className="text-white/40">Elite execution.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-white/75 font-body font-light"
        >
          Small by design. Each role is owned, accountable, and senior — no account
          managers playing telephone with strategy.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-12 md:mt-16">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="liquid-glass rounded-[1.5rem] p-6 md:p-7 flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div className="liquid-glass-strong h-14 w-14 rounded-full flex items-center justify-center violet-glow">
                  <span className="font-heading italic text-white text-2xl">{m.initial}</span>
                </div>
                <div>
                  <h3 className="font-heading italic text-white text-2xl tracking-[-0.5px] leading-none">
                    {m.name}
                  </h3>
                  <span className="text-xs text-white/60 font-body uppercase tracking-widest">
                    {m.role}
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/80 font-body font-light leading-snug">
                {m.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
