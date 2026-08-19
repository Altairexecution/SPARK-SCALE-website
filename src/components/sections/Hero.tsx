import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { WHATSAPP_URL } from "@/lib/constants";
import { LogoMarquee } from "@/components/LogoMarquee";

const fadeUp = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export function Hero() {
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const durationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnd = () => {
    if (videoEnded) return; // avoid double trigger
    if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);
    if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);

    setVideoEnded(true);
    // Smooth transition: Wait for 1s fade-out to finish before unmounting video
    fadeTimeoutRef.current = setTimeout(() => {
      setVideoFinished(true);
    }, 1000);
  };

  const handlePlay = () => {
    setVideoStarted(true);
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current);
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = e.currentTarget.duration;
    if (duration && !isNaN(duration)) {
      if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);
      // Fallback timer: trigger handleEnd if ended doesn't fire (duration + 1.5 seconds)
      durationTimeoutRef.current = setTimeout(() => {
        handleEnd();
      }, (duration + 1.5) * 1000);
    }
  };

  const handleError = () => {
    console.warn("Hero video failed to load. Falling back to text.");
    setVideoEnded(true);
    setVideoFinished(true);
  };

  useEffect(() => {
    // If the video hasn't started playing within 3 seconds, assume autoplay is blocked or failed
    startTimeoutRef.current = setTimeout(() => {
      if (!videoStarted) {
        console.warn("Autoplay block or loading timeout. Revealing content.");
        setVideoEnded(true);
        setVideoFinished(true);
      }
    }, 3000);

    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [videoStarted]);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col justify-between">
      {!videoFinished && (
        <video
          src="/videos/spark-scale-hero.mp4"
          autoPlay
          muted
          playsInline
          onPlay={handlePlay}
          onEnded={handleEnd}
          onError={handleError}
          onLoadedMetadata={handleLoadedMetadata}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            videoEnded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Subtle atmospheric effects */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-black pointer-events-none" />
      <div className="absolute inset-0 z-[1] aurora opacity-50 pointer-events-none" />

      {videoEnded ? (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-28 md:pt-32 pb-16">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="liquid-glass rounded-full inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 mb-8 max-w-full"
          >
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold shrink-0">
              2026
            </span>
            <span className="text-xs sm:text-sm text-white/90 font-body">
              Growth infrastructure — for every kind of business
            </span>
          </motion.div>

          <BlurText
            text="Ready to Scale?"
            delay={0.4}
            className="text-fluid-display font-heading text-white leading-[0.85] max-w-5xl tracking-[-4px] font-black"
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
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 w-full sm:w-auto"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-3.5 text-sm font-medium text-white inline-flex items-center justify-center gap-2 violet-glow min-h-[48px]"
            >
              Start scaling on WhatsApp
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="#engine"
              className="inline-flex items-center justify-center gap-2 text-white text-sm font-medium px-2 py-3 min-h-[48px]"
            >
              See the engine
              <Play className="h-4 w-4 fill-current" />
            </a>
          </motion.div>

          {/* Single thin marquee-style tagline strip */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.15 }}
            className="mt-12 liquid-glass rounded-full px-5 py-2.5 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm text-white/85 font-body"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--violet)] animate-pulse-glow" />
            <span>Built for compounding revenue.</span>
            <span className="opacity-30 hidden sm:inline">/</span>
            <span>Measured in ROAS, not impressions.</span>
          </motion.div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {videoEnded && (
        <div className="relative z-10">
          <LogoMarquee />
        </div>
      )}
    </section>
  );
}
