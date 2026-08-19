import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Instagram, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/spark-scale-sticker.png";
import { NAV_ITEMS, WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock background scroll while the menu is open */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  /* Escape to close, focus management */
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 transition-all ${
        scrolled ? "top-2" : "top-4"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <a
          href="#home"
          aria-label="Spark Scale"
          className="shrink-0 flex items-center"
        >
          <img
            src={logo}
            alt="Spark Scale"
            className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain drop-shadow-[0_0_22px_rgba(160,120,255,0.55)]"
          />
        </a>

        {/* Center nav (desktop) */}
        <nav className="liquid-glass rounded-full px-1.5 py-1.5 hidden lg:flex items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-white/85 hover:text-white font-body transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex items-center gap-1 bg-white text-black rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap hover:bg-white/90 transition"
          >
            Free Demo <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>

        {/* Right CTA / menu */}
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="lg:hidden inline-flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-2.5 text-xs font-medium whitespace-nowrap"
          >
            WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            ref={toggleRef}
            onClick={() => setOpen(!open)}
            className="lg:hidden liquid-glass rounded-full h-12 w-12 flex items-center justify-center text-white"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="hidden lg:block h-12 w-12 opacity-0" />
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: MENU_EASE }}
            className="fixed inset-0 lg:hidden bg-black/70 backdrop-blur-2xl z-[60] flex flex-col"
          >
            {/* ambient layers */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#150d2e]/90 via-[#0a0716]/95 to-black"
            />
            <div
              aria-hidden
              className="absolute inset-0 grid-bg opacity-40"
            />
            <div
              aria-hidden
              className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[var(--violet)]/25 blur-[120px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[var(--ice)]/15 blur-[120px]"
            />

            <div className="relative flex flex-col h-full px-6 pb-safe pt-4">
              {/* top row */}
              <div className="flex items-center justify-between">
                <img
                  src={logo}
                  alt="Spark Scale"
                  className="h-12 w-auto object-contain drop-shadow-[0_0_22px_rgba(160,120,255,0.55)]"
                />
                <button
                  ref={closeRef}
                  onClick={close}
                  className="liquid-glass rounded-full h-12 w-12 flex items-center justify-center text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* nav items */}
              <motion.nav
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                className="flex-1 flex flex-col justify-center gap-1"
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    variants={{
                      hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.5, ease: MENU_EASE },
                      },
                    }}
                    className="group flex items-center justify-between gap-4 border-b border-white/10 py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs text-white/40 font-body tracking-widest">
                        0{i + 1}
                      </span>
                      <span className="font-heading italic text-white text-4xl sm:text-5xl tracking-[-2px] leading-none group-hover:text-[var(--violet-glow)] transition-colors">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-6 w-6 text-white/40 group-hover:text-white transition-colors shrink-0" />
                  </motion.a>
                ))}
              </motion.nav>

              {/* bottom CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: MENU_EASE }}
                className="flex flex-col gap-3 pt-4"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-5 py-4 text-sm font-semibold"
                >
                  Start scaling on WhatsApp <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 liquid-glass rounded-full px-5 py-4 text-sm font-medium text-white/90"
                >
                  <Instagram className="h-4 w-4" />
                  @scale.with.spark
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
