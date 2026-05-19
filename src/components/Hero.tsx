import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import type { Session } from "@/lib/schedule";
import { formatLongDate, formatTime } from "@/lib/schedule";

export function HeroCard({ current, next }: { current: Session; next: Session }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass glow-border relative overflow-hidden rounded-3xl p-6 sm:p-10"
    >
      {/* Floating ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-sky/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-mint/30 blur-3xl animate-float-slow [animation-delay:-3s]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/20 blur-3xl animate-float-slow [animation-delay:-6s]" />

      <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-10">
        {/* Current */}
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Current Turn
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky/40 to-mint/40 blur-xl" />
              <div className="animate-pulse-ring relative grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-lg sm:h-20 sm:w-20 sm:text-4xl">
                🧹
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold leading-none tracking-tight text-gradient sm:text-6xl">
                Table {current.tableNumber}
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                Cleaning Duty Active
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-foreground/80">
            <span className="font-medium">{formatLongDate(current.date)}</span>
            <span className="mx-2 text-muted-foreground">·</span>
            <span>{formatTime(current.date)}</span>
          </div>
        </div>

        {/* Next */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative flex flex-col rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-md sm:p-6"
        >
          <div className="inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <ArrowRight className="h-3.5 w-3.5" /> Next Up
          </div>
          <div className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Table {next.tableNumber}
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="font-medium text-foreground/90">{formatLongDate(next.date)}</div>
            <div className="text-muted-foreground">{formatTime(next.date)}</div>
          </div>
          <div className="mt-5 h-1 w-16 rounded-full bg-[image:var(--gradient-underline)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}
