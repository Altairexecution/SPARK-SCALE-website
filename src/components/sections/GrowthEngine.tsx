import { motion } from "motion/react";
import {
  Target,
  Search,
  LayoutTemplate,
  MessageCircle,
  Bot,
  Database,
  Camera,
} from "lucide-react";
import { FadingVideo } from "@/components/FadingVideo";

const CAPS_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

const MODULES = [
  {
    icon: Target,
    title: "Meta Ads",
    body: "Hyper-local creative tested daily. Reach diners within 3km of your door — not tourists, not bots.",
    tags: ["Local Targeting", "Daily Creatives", "Pixel Tuned", "ROAS Focused"],
  },
  {
    icon: Search,
    title: "Google Ads",
    body: "Capture high-intent searches the moment a guest looks for 'best dinner near me'.",
    tags: ["Search Intent", "Map Pack", "Geo Bids", "Call Tracking"],
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    body: "Cinematic, mobile-first menus and booking flows engineered to convert ad clicks into reservations.",
    tags: ["A/B Tested", "Sub-1s Load", "Booking Flow", "Mobile First"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    body: "Instant confirmations, reminders and re-engagement — turning one visit into a relationship.",
    tags: ["Auto Reply", "Reminders", "Re-engage", "Templates"],
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    body: "An always-on concierge that answers menu, timing and booking questions in your brand voice.",
    tags: ["24/7 Concierge", "Brand Voice", "Multi-lingual", "Smart Handoff"],
  },
  {
    icon: Database,
    title: "CRM & Lead Mgmt",
    body: "Every guest, every visit, every preference — a single source of truth that compounds.",
    tags: ["Unified Profile", "Segments", "Lifecycle", "Owned Data"],
  },
  {
    icon: Camera,
    title: "Content Creation",
    body: "Short-form video, dish photography and ad creative — produced in your kitchen, deployed in days.",
    tags: ["Short Form", "Dish Reels", "Ad Variants", "Brand System"],
  },
];

export function GrowthEngine() {
  return (
    <section id="engine" className="relative min-h-screen w-full overflow-hidden bg-black">
      <FadingVideo
        src={CAPS_VIDEO}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black via-black/60 to-black pointer-events-none" />

      <div className="relative z-10 px-5 md:px-12 lg:px-20 pt-20 md:pt-24 pb-24 flex flex-col">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-body text-white/80 mb-6"
          >
            // The Spark Scale Growth Engine
          </motion.p>
          <motion.h2
            initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading italic text-white text-fluid-h1 leading-[0.9] tracking-[-3px]"
          >
            One engine.
            <br />
            Every channel.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl text-white/80 font-body font-light"
          >
            Seven integrated modules working as a single growth ecosystem — not seven
            disconnected vendors fighting for credit.
          </motion.p>
        </div>

        <div id="capabilities" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-12 md:mt-16">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="liquid-glass rounded-[1.25rem] p-5 sm:p-6 min-h-[280px] sm:min-h-[300px] md:min-h-[320px] flex flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass rounded-[0.75rem] h-11 w-11 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/90 font-body whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1" />
                <div className="mt-6">
                  <h3 className="font-heading italic text-white text-2xl sm:text-3xl md:text-[2rem] tracking-[-1px] leading-none">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/85 font-body font-light leading-snug max-w-[36ch]">
                    {m.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
