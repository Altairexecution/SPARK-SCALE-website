import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ScrollBackground } from "@/components/ScrollBackground";

const GrowthEngine = lazy(() =>
  import("@/components/sections/GrowthEngine").then((m) => ({ default: m.GrowthEngine }))
);
const Process = lazy(() =>
  import("@/components/sections/Process").then((m) => ({ default: m.Process }))
);
const Results = lazy(() =>
  import("@/components/sections/Results").then((m) => ({ default: m.Results }))
);
const WhySparkScale = lazy(() =>
  import("@/components/sections/WhySparkScale").then((m) => ({ default: m.WhySparkScale }))
);
const Team = lazy(() =>
  import("@/components/sections/Team").then((m) => ({ default: m.Team }))
);
const FinalCTA = lazy(() =>
  import("@/components/sections/FinalCTA").then((m) => ({ default: m.FinalCTA }))
);

const Skeleton = () => <div className="h-[60vh]" />;

export default function App() {
  return (
    <main className="relative bg-background text-foreground min-h-screen overflow-x-hidden">
      <ScrollBackground />
      <Navbar />
      <Hero />
      <Problem />
      <Suspense fallback={<Skeleton />}>
        <GrowthEngine />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Process />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Results />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <WhySparkScale />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Team />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <FinalCTA />
      </Suspense>
      <WhatsAppFab />
    </main>
  );
}
