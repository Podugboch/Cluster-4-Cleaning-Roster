import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Clock3, ArrowRight } from "lucide-react";
import type { Session, TableStatus } from "@/lib/schedule";
import { formatShortDate, formatTime } from "@/lib/schedule";

const STATUS_META: Record<TableStatus, { label: string; emoji: string; chip: string; icon: React.ComponentType<{ className?: string }> }> = {
  completed: { label: "Completed", emoji: "✅", chip: "bg-mint/20 text-emerald-700 border-mint/40", icon: CheckCircle2 },
  "on-duty": { label: "On Duty", emoji: "🧹", chip: "bg-sky/20 text-sky-700 border-sky/40", icon: Sparkles },
  next: { label: "Next Up", emoji: "🔜", chip: "bg-indigo/15 text-indigo border-indigo/40", icon: ArrowRight },
  upcoming: { label: "Coming Up", emoji: "🕐", chip: "bg-white/70 text-muted-foreground border-border", icon: Clock3 },
};

export function TableCard({
  tableNumber,
  session,
  status,
  index,
}: {
  tableNumber: number;
  session: Session;
  status: TableStatus;
  index: number;
}) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  const isUpcoming = status === "upcoming" || status === "next";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        isUpcoming
          ? { y: -8, scale: 1.025, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : { y: -3, transition: { duration: 0.2 } }
      }
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-shadow duration-300 ${
        status === "on-duty"
          ? "glass glow-border shadow-[var(--shadow-glow-sky)]"
          : "glass hover:shadow-[var(--shadow-glow-indigo)]"
      }`}
    >
      {/* Gradient sheen on hover for upcoming */}
      {isUpcoming && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.78_0.13_230/0.18),oklch(0.82_0.14_160/0.18),oklch(0.6_0.2_275/0.22))]" />
          {/* sparkle particles */}
          <span className="absolute left-4 top-3 h-1 w-1 rounded-full bg-white shadow-[0_0_8px_2px_oklch(0.78_0.13_230/0.8)] animate-ping" />
          <span className="absolute right-5 top-8 h-1 w-1 rounded-full bg-white shadow-[0_0_8px_2px_oklch(0.82_0.14_160/0.8)] animate-ping [animation-delay:.3s]" />
          <span className="absolute right-8 bottom-5 h-1 w-1 rounded-full bg-white shadow-[0_0_8px_2px_oklch(0.6_0.2_275/0.8)] animate-ping [animation-delay:.6s]" />
        </div>
      )}

      {status === "on-duty" && (
        <div className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-sky/30 blur-3xl animate-float-slow" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Table</div>
          <div className={`mt-1 text-3xl font-bold tracking-tight ${status === "on-duty" ? "text-gradient" : "text-foreground"}`}>
            {tableNumber}
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${meta.chip}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {meta.label}
        </span>
      </div>

      <div className="mt-5 border-t border-white/40 pt-4">
        <div
          className={`text-sm font-medium text-foreground/90 transition-all duration-300 ${
            isUpcoming ? "group-hover:text-indigo group-hover:drop-shadow-[0_0_8px_oklch(0.6_0.2_275/0.5)]" : ""
          }`}
        >
          {formatShortDate(session.date)}
        </div>
        <div className="text-xs text-muted-foreground">{formatTime(session.date)}</div>
      </div>
    </motion.div>
  );
}
