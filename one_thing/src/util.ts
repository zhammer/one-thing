import { startOfWeek, addWeeks } from 'date-fns';

export function weekTimeRange(now: Date): { from: Date; to: Date } {
  const lastSunday = startOfWeek(now);
  const nextSunday = addWeeks(lastSunday, 1);
  return {
    from: lastSunday,
    to: nextSunday
  };
}
