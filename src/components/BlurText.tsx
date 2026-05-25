import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          style={{ display: "inline-block", marginRight: "0.28em" }}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            inView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : undefined
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: delay + (i * 100) / 1000,
          }}
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}
