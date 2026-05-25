import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "@/assets/spark-scale-sticker.png";
import { NAV_ITEMS, WHATSAPP_URL } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className="h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-[0_0_22px_rgba(160,120,255,0.55)]"
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
            className="lg:hidden inline-flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-2 text-xs font-medium whitespace-nowrap"
          >
            WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden liquid-glass rounded-full h-12 w-12 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="hidden lg:block h-12 w-12 opacity-0" />
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-3 liquid-glass-strong rounded-3xl p-4 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-full text-white/90 font-body hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
