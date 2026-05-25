import { Sparkles } from "lucide-react";

const ITEMS = Array.from({ length: 8 });

export function LogoMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-white/10 bg-black/30 backdrop-blur-sm py-5"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="flex w-max animate-marquee gap-12">
        {[...ITEMS, ...ITEMS].map((_, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-heading italic text-3xl md:text-4xl tracking-tight text-white whitespace-nowrap drop-shadow-[0_0_20px_rgba(160,120,255,0.4)]">
              Spark Scale
            </span>
            <Sparkles className="h-5 w-5 text-white/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
