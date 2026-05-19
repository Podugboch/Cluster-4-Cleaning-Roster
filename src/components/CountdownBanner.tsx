import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import type { Countdown } from "@/lib/schedule";

function Unit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex items-baseline gap-1">
      <div className="relative w-[2.2ch] text-center font-mono text-sm font-semibold tabular-nums sm:text-base">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">{label}</span>
    </div>
  );
}

export function CountdownBanner({ countdown }: { countdown: Countdown }) {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="animated-gradient border-b border-white/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 sm:gap-5">
          <Clock className="h-4 w-4 text-indigo" />
          <span className="text-xs font-medium text-foreground/80 sm:text-sm">
            Next cleaning session in:
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            <Unit value={countdown.days} label="d" />
            <span className="text-muted-foreground">:</span>
            <Unit value={countdown.hours} label="h" />
            <span className="text-muted-foreground">:</span>
            <Unit value={countdown.minutes} label="m" />
            <span className="text-muted-foreground">:</span>
            <Unit value={countdown.seconds} label="s" />
          </div>
        </div>
      </div>
    </div>
  );
}
