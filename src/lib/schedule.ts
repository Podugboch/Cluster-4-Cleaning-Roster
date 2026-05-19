// Schedule logic for Cluster 4 Cleaning Roster
// Sessions: every Monday & Thursday at 7:00 AM, rotating Table 1..10 forever.
// Anchor: Table 3 is on duty for Thursday, May 21, 2026 at 07:00 local time.

export const TOTAL_TABLES = 10;

// Anchor session
const ANCHOR_DATE = new Date(2026, 4, 21, 7, 0, 0, 0); // May=4
const ANCHOR_TABLE_INDEX = 2; // Table 3 (0-indexed)

// Build sessions by stepping Mon<->Thu (+3 / +4 days)
function stepNext(d: Date): Date {
  const n = new Date(d);
  // Mon (1) -> Thu (+3); Thu (4) -> Mon (+4)
  const day = n.getDay();
  n.setDate(n.getDate() + (day === 1 ? 3 : 4));
  return n;
}
function stepPrev(d: Date): Date {
  const n = new Date(d);
  const day = n.getDay();
  n.setDate(n.getDate() - (day === 1 ? 4 : 3));
  return n;
}

export interface Session {
  index: number; // session # relative to anchor (anchor = 0)
  date: Date;
  tableIndex: number; // 0..9
  tableNumber: number; // 1..10
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function getCurrentSession(now: Date = new Date()): Session {
  // The "current" session is the most recent one whose start time has occurred.
  // Before the anchor time, we still treat the anchor as current per spec.
  let date = new Date(ANCHOR_DATE);
  let index = 0;
  if (now < ANCHOR_DATE) {
    return { index, date, tableIndex: ANCHOR_TABLE_INDEX, tableNumber: ANCHOR_TABLE_INDEX + 1 };
  }
  while (true) {
    const next = stepNext(date);
    if (next > now) break;
    date = next;
    index += 1;
  }
  const tableIndex = mod(ANCHOR_TABLE_INDEX + index, TOTAL_TABLES);
  return { index, date, tableIndex, tableNumber: tableIndex + 1 };
}

export function getSessionByOffset(current: Session, offset: number): Session {
  let date = new Date(current.date);
  if (offset > 0) for (let i = 0; i < offset; i++) date = stepNext(date);
  else for (let i = 0; i < -offset; i++) date = stepPrev(date);
  const tableIndex = mod(current.tableIndex + offset, TOTAL_TABLES);
  return { index: current.index + offset, date, tableIndex, tableNumber: tableIndex + 1 };
}

export function getUpcoming(current: Session, count: number): Session[] {
  const arr: Session[] = [];
  for (let i = 1; i <= count; i++) arr.push(getSessionByOffset(current, i));
  return arr;
}

// For each table (1..10), find the next time it cleans (>= current session).
export function getNextSessionForEachTable(current: Session): Session[] {
  const result: Session[] = new Array(TOTAL_TABLES);
  // Walk forward up to TOTAL_TABLES sessions; each table appears exactly once.
  for (let i = 0; i < TOTAL_TABLES; i++) {
    const s = getSessionByOffset(current, i);
    if (!result[s.tableIndex]) result[s.tableIndex] = s;
  }
  return result;
}

export type TableStatus = "completed" | "on-duty" | "next" | "upcoming";

export function statusForTable(tableIndex: number, current: Session): TableStatus {
  if (tableIndex === current.tableIndex) return "on-duty";
  const nextIdx = mod(current.tableIndex + 1, TOTAL_TABLES);
  if (tableIndex === nextIdx) return "next";
  // "completed" = the (TOTAL_TABLES - 1) tables immediately preceding current in rotation
  // i.e. everyone except the current and the upcoming ones. We mark the two most recent as completed visually.
  // Spec: at launch Table 1 & 2 are Completed, Table 3 on-duty. So completed = previous 2 in rotation.
  const prev1 = mod(current.tableIndex - 1, TOTAL_TABLES);
  const prev2 = mod(current.tableIndex - 2, TOTAL_TABLES);
  if (tableIndex === prev1 || tableIndex === prev2) return "completed";
  return "upcoming";
}

export interface Countdown {
  days: number; hours: number; minutes: number; seconds: number; total: number;
}
export function getCountdown(target: Date, now: Date = new Date()): Countdown {
  const total = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(total / 86400000);
  const hours = Math.floor((total % 86400000) / 3600000);
  const minutes = Math.floor((total % 3600000) / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  return { days, hours, minutes, seconds, total };
}

export function formatLongDate(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}
export function formatShortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
export function formatTime(d: Date): string {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
