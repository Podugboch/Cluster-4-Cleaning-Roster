import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  TOTAL_TABLES,
  getCurrentSession,
  getSessionByOffset,
  getNextSessionForEachTable,
  getUpcoming,
  getCountdown,
  statusForTable,
} from "@/lib/schedule";
import { CountdownBanner } from "@/components/CountdownBanner";
import { HeroCard } from "@/components/Hero";
import { TableCard } from "@/components/TableCard";
import { Queue } from "@/components/Queue";

export const Route = createFileRoute("/")({
  component: Index,
});

function BroomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 4l6 6" />
      <path d="M11 7l6 6" />
      <path d="M5 21l5-5" />
      <path d="M9 12l3 3-6 6-3-3z" />
      <path d="M14 4c2-2 5-2 6-1s1 4-1 6" />
    </svg>
  );
}

function Index() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const current = useMemo(() => getCurrentSession(now), [now]);
  const nextSession = useMemo(() => getSessionByOffset(current, 1), [current]);
  const perTable = useMemo(() => getNextSessionForEachTable(current), [current]);
  const queue = useMemo(() => getUpcoming(current, 8), [current]);
  const countdown = useMemo(() => getCountdown(nextSession.date, now), [nextSession, now]);

  return (
    <div className="min-h-screen">
      <CountdownBanner countdown={countdown} />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Cluster 4
          </div>
          <h1 className="mt-4 flex items-center justify-center gap-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <BroomIcon className="h-8 w-8 text-indigo sm:h-10 sm:w-10" />
            <span className="text-gradient">Cluster 4 Cleaning Roster</span>
            <Sparkles className="h-6 w-6 text-mint sm:h-7 sm:w-7" />
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 h-1 w-40 origin-left rounded-full bg-[image:var(--gradient-underline)]"
          />
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Maintaining cleanliness through teamwork.
          </p>
        </motion.header>

        {/* Hero */}
        <section className="mt-10">
          <HeroCard current={current} next={nextSession} />
        </section>

        {/* Roster grid */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Roster</h2>
              <p className="mt-1 text-sm text-muted-foreground">All {TOTAL_TABLES} tables and their next scheduled cleaning.</p>
            </div>
            <div className="hidden h-1 flex-1 rounded-full bg-[image:var(--gradient-underline)] opacity-70 sm:block" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: TOTAL_TABLES }).map((_, i) => {
              const session = perTable[i];
              const status = statusForTable(i, current);
              return (
                <TableCard
                  key={i}
                  tableNumber={i + 1}
                  session={session}
                  status={status}
                  index={i}
                />
              );
            })}
          </div>
        </section>

        {/* Queue */}
        <Queue upcoming={queue} />

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Sessions every Monday & Thursday at 7:00 AM · Auto-updating in real time
        </footer>
      </main>
    </div>
  );
}
