import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { HlsVideo } from "@/components/HlsVideo";
import { BlurText } from "@/components/BlurText";
import { WHATSAPP_URL } from "@/lib/constants";
import { LogoMarquee } from "@/components/LogoMarquee";

const HERO_STREAM =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const fadeUp = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      <HlsVideo
        src={HERO_STREAM}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-black pointer-events-none" />
      <div className="absolute inset-0 z-[1] aurora opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="liquid-glass rounded-full inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 mb-8"
          >
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">
              2026
            </span>
            <span className="text-sm text-white/90 font-body">
              Growth infrastructure — for every kind of business
            </span>
          </motion.div>

          <BlurText
            text="Ready to Scale?"
            delay={0.4}
            className="text-6xl md:text-8xl lg:text-[8rem] font-heading text-white leading-[0.85] max-w-5xl tracking-[-4px] font-black"
          />

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.75 }}
            className="mt-6 text-sm md:text-base text-white/85 max-w-2xl font-body font-light leading-relaxed"
          >
            Spark Scale is a performance growth engine for ambitious brands —
            restaurants, retail, services, D2C, B2B. Paid acquisition, AI automation,
            and conversion infrastructure engineered to compound revenue.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.95 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-3 text-sm font-medium text-white inline-flex items-center gap-2 violet-glow"
            >
              Start scaling on WhatsApp
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="#engine"
              className="inline-flex items-center gap-2 text-white text-sm font-medium px-2 py-3"
            >
              See the engine
              <Play className="h-4 w-4 fill-current" />
            </a>
          </motion.div>

          {/* Single thin marquee-style tagline strip instead of two glossy cards */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.15 }}
            className="mt-12 liquid-glass rounded-full px-5 py-2.5 inline-flex items-center gap-3 text-xs md:text-sm text-white/85 font-body"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--violet)] animate-pulse-glow" />
            <span>Built for compounding revenue.</span>
            <span className="opacity-30">/</span>
            <span>Measured in ROAS, not impressions.</span>
          </motion.div>
        </div>
      </div>
      <div className="relative z-10">
        <LogoMarquee />
      </div>
    </section>
  );
}
