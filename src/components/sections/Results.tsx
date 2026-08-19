import { motion } from "motion/react";
import { TrendingUp, MessageCircle, Users, Eye } from "lucide-react";

type Case = {
  tag: string;
  title: string;
  metric: string;
  metric_label: string;
  body: string;
  icon: typeof TrendingUp;
  spark: number[];
};

const CASES: Case[] = [
  {
    tag: "D2C Brand · India",
    title: "Quiet weekdays turned into a second peak",
    metric: "+186%",
    metric_label: "weekday orders",
    body: "Geo-targeted Meta funnel + WhatsApp win-backs filled the slow half of the week.",
    icon: TrendingUp,
    spark: [12, 14, 13, 18, 22, 28, 35, 41, 52, 60, 72, 84],
  },
  {
    tag: "Multi-location Café",
    title: "WhatsApp inquiries replaced phone tag",
    metric: "+12×",
    metric_label: "inbound chats",
    body: "An AI concierge handles menu, hours and bookings 24/7 — in two languages.",
    icon: MessageCircle,
    spark: [5, 7, 6, 9, 11, 16, 20, 28, 36, 48, 62, 80],
  },
  {
    tag: "Premium Services",
    title: "Repeat clients, not just first visits",
    metric: "+42%",
    metric_label: "return rate",
    body: "Lifecycle CRM with timed win-backs lifted second-purchase conversion across the season.",
    icon: Users,
    spark: [22, 24, 26, 28, 30, 33, 36, 40, 44, 48, 52, 56],
  },
  {
    tag: "Local Retail · 6 stores",
    title: "Local visibility, lower cost per sale",
    metric: "−38%",
    metric_label: "CAC",
    body: "Search + map pack optimization brought high-intent buyers at half the previous CAC.",
    icon: Eye,
    spark: [80, 76, 70, 66, 60, 56, 52, 48, 46, 44, 42, 40],
  },
];

function Sparkline({ data, invert = false }: { data: number[]; invert?: boolean }) {
  const w = 120;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = invert ? "rgb(255,180,180)" : "rgb(190,170,255)";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-90">
      <defs>
        <linearGradient id={`g-${invert ? "d" : "u"}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <polygon
        fill={`url(#g-${invert ? "d" : "u"})`}
        points={`0,${h} ${points} ${w},${h}`}
      />
    </svg>
  );
}

export function Results() {
  return (
    <section id="results" className="relative py-24 md:py-32 px-5 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 aurora opacity-40" />
      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-body text-white/60 mb-4 tracking-widest uppercase"
        >
          // 90-day snapshot
        </motion.p>
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading text-white text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-[-1.5px] max-w-2xl font-bold"
        >
          A quarter with Spark Scale, at a glance.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 max-w-xl text-sm text-white/70 font-body font-light"
        >
          Four anonymized scenarios from across categories — what compounding looks
          like when the system actually runs.
        </motion.p>

        <div className="mt-12 liquid-glass rounded-[1.5rem] divide-y divide-white/5 overflow-hidden">
          {CASES.map((c, i) => {
            const Icon = c.icon;
            const isNegative = c.metric.startsWith("−");
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid grid-cols-12 gap-x-3 gap-y-4 md:gap-4 items-center px-4 sm:px-7 py-5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-12 md:col-span-1 flex md:block">
                  <div className="liquid-glass h-9 w-9 rounded-lg flex items-center justify-center">
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="text-[10px] text-white/50 font-body uppercase tracking-widest">
                    {c.tag}
                  </div>
                  <h3 className="mt-1 font-body font-medium text-white text-base md:text-lg leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/65 font-body font-light leading-snug max-w-[44ch]">
                    {c.body}
                  </p>
                </div>
                <div className="col-span-7 md:col-span-3 flex items-center">
                  <Sparkline data={c.spark} invert={isNegative} />
                </div>
                <div className="col-span-5 md:col-span-3 text-right">
                  <div className="font-heading text-white text-xl sm:text-2xl md:text-3xl tracking-[-1px] leading-none font-bold text-violet-glow">
                    {c.metric}
                  </div>
                  <div className="mt-1 text-[10px] text-white/55 font-body uppercase tracking-wider">
                    {c.metric_label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] text-white/40 font-body mt-5 max-w-2xl"
        >
          Illustrative scenarios based on the Spark Scale Growth Engine playbook.
          Live numbers shared on your demo call.
        </motion.p>
      </div>
    </section>
  );
}
