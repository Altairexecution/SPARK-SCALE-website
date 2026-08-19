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
const SocialMediaApproach = lazy(() =>
  import("@/components/sections/SocialMediaApproach").then((m) => ({
    default: m.SocialMediaApproach,
  }))
);
const BranchNetwork = lazy(() =>
  import("@/components/sections/BranchNetwork").then((m) => ({
    default: m.BranchNetwork,
  }))
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

/** Purple light trail that connects the How-we-work and Where-we-execute sections */
function LightTrailConnector() {
  return (
    <div aria-hidden className="relative h-36 md:h-44 flex flex-col items-center">
      <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[var(--violet)]/50 to-[var(--violet)]" />
      <span className="relative -mt-px h-2 w-2 rounded-full bg-[var(--violet)] violet-glow animate-pulse-glow" />
    </div>
  );
}

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
        <SocialMediaApproach />
      </Suspense>
      <LightTrailConnector />
      <Suspense fallback={<Skeleton />}>
        <BranchNetwork />
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
