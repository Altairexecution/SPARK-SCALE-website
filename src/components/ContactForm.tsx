import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Send } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

/**
 * 3D-tilting glassmorphic registration / contact card.
 * Tracks the mouse to add depth, with floating layered glow plates.
 */
export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 14 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className="relative w-full max-w-md mx-auto [transform-style:preserve-3d]"
    >
      {/* Layered glow plates for 3D depth */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[var(--violet)]/40 via-transparent to-[var(--ice)]/30 blur-2xl opacity-70"
        style={{ transform: "translateZ(-60px)" }}
      />
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[1.75rem] bg-white/5 backdrop-blur-md"
        style={{ transform: "translateZ(-20px)" }}
      />

      <form
        onSubmit={handleSubmit}
        className="liquid-glass-strong relative rounded-[1.75rem] p-7 md:p-8 flex flex-col gap-4 violet-glow"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-heading text-white text-2xl font-extrabold tracking-tight leading-none">
              Register interest
            </div>
            <div className="text-xs text-white/60 mt-1 font-body">
              We reply within 1 business hour.
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
            <Send className="h-4 w-4 text-white" />
          </div>
        </div>

        <Field label="Full name" name="name" placeholder="Alex Carter" />
        <Field label="Restaurant" name="restaurant" placeholder="The Olive Room" />
        <Field label="Email" name="email" type="email" placeholder="you@restaurant.com" />
        <Field label="WhatsApp" name="phone" placeholder="+1 555 010 2030" />

        <label className="text-xs uppercase tracking-[0.18em] text-white/60 mt-1">
          What do you need?
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Fill tables on weeknights, launch new location, automate bookings…"
          className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition resize-none font-body text-sm"
        />

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-bold hover:bg-white/90 transition"
        >
          {sent ? "We'll be in touch ✓" : "Request my growth demo"}
          {!sent && <ArrowUpRight className="h-4 w-4" />}
        </button>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="text-center text-xs text-white/60 hover:text-white transition"
        >
          or chat instantly on WhatsApp →
        </a>
      </form>
    </motion.div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.18em] text-white/60" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition font-body text-sm"
      />
    </div>
  );
}
