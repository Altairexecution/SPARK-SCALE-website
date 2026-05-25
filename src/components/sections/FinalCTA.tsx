import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { WHATSAPP_URL } from "@/lib/constants";
import logo from "@/assets/spark-scale-mark.png";
import { ContactForm } from "@/components/ContactForm";

const InteractiveRobotSpline = lazy(() =>
  import("@/components/ui/interactive-3d-robot").then((m) => ({
    default: m.InteractiveRobotSpline,
  })),
);

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 aurora opacity-60" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.img
            src={logo}
            alt="Spark Scale"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="h-20 w-20 mx-auto object-contain animate-float drop-shadow-[0_0_30px_rgba(160,120,255,0.55)]"
          />
          <motion.h2
            initial={{ filter: "blur(12px)", opacity: 0, y: 30 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mt-8 font-heading font-extrabold text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-3px]"
          >
            Book your free
            <br />
            <span className="shimmer-text">growth strategy call.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-white/80 font-body font-light max-w-2xl mx-auto"
          >
            One 20-minute call. We walk your funnel, map a 90-day plan, and show you the
            numbers that move. No deck. No fluff. Real strategy — for any business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 3D Robot */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative h-[460px] md:h-[560px] rounded-[2rem] overflow-hidden liquid-glass"
          >
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm font-body">
                  Loading 3D scene…
                </div>
              }
            >
              <InteractiveRobotSpline
                scene={ROBOT_SCENE_URL}
                className="!w-full !h-full"
              />
            </Suspense>
            <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-white/70 font-body pointer-events-none">
              Meet Whobee — drag, click and play
            </div>
          </motion.div>

          {/* Registration menu */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>

      <footer className="relative mt-32 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-body">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-7 w-7 object-contain" />
          <span>
            © {new Date().getFullYear()} Spark Scale. Growth infrastructure for ambitious businesses.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#engine" className="hover:text-white">Growth Engine</a>
          <a href="#results" className="hover:text-white">Results</a>
          <a href="#team" className="hover:text-white">Team</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-white">
            WhatsApp
          </a>
        </div>
      </footer>
    </section>
  );
}
