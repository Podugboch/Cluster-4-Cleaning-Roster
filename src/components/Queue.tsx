import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import type { Session } from "@/lib/schedule";
import { formatTime } from "@/lib/schedule";

function dayName(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "long" });
}
function shortDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function Queue({ upcoming }: { upcoming: Session[] }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Coming Up Queue</h2>
          <p className="mt-1 text-sm text-muted-foreground">The order after the current duty table.</p>
        </div>
        <div className="hidden h-1 flex-1 rounded-full bg-[image:var(--gradient-underline)] opacity-70 sm:block" />
      </div>

      <ol className="glass relative overflow-hidden rounded-2xl border border-white/50 p-2 sm:p-3">
        <span className="pointer-events-none absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-sky/60 via-mint/60 to-indigo/60 sm:left-9" />
        {upcoming.map((s, i) => (
          <motion.li
            key={s.index}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.45 }}
            className="group relative flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/60 sm:gap-5 sm:px-4"
          >
            <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white bg-[image:var(--gradient-underline)] text-xs font-bold text-white shadow-md sm:h-10 sm:w-10 sm:text-sm">
              {i + 1}
            </div>
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="text-base font-semibold text-foreground sm:text-lg">
                Table {s.tableNumber}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <CalendarDays className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground/80">{dayName(s.date)}</span>
                <span>·</span>
                <span>{shortDate(s.date)}</span>
                <span>·</span>
                <span>{formatTime(s.date)}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
