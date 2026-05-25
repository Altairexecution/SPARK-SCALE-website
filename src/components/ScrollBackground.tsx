import { motion, useScroll, useTransform } from "motion/react";

/**
 * Fixed background that smoothly lightens from deep black to a soft
 * violet-tinted glow as the user scrolls down the page.
 */
export function ScrollBackground() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [
      "radial-gradient(120% 80% at 50% 0%, rgba(60,30,100,0.25), rgba(0,0,0,1) 60%)",
      "radial-gradient(120% 80% at 50% 10%, rgba(90,55,160,0.35), rgba(10,8,20,1) 70%)",
      "radial-gradient(120% 90% at 50% 30%, rgba(130,90,220,0.40), rgba(22,18,40,1) 75%)",
      "radial-gradient(120% 100% at 50% 50%, rgba(170,140,255,0.45), rgba(38,30,70,1) 80%)",
      "radial-gradient(120% 110% at 50% 70%, rgba(210,190,255,0.55), rgba(70,55,120,1) 85%)",
    ],
  );

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="fixed inset-0 -z-10 pointer-events-none transition-colors"
    />
  );
}
