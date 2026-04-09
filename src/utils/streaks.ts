import { differenceInDays, parseISO, startOfDay, isBefore } from 'date-fns';
import type { Database } from '../types/database';

type HabitLog = Database['public']['Tables']['habit_logs']['Row'];

export function calculateStreaks(habitId: string, allLogs: HabitLog[], currentDate: Date) {
  // Get all completed logs for this habit
  const completedDates = allLogs
    .filter(log => log.habit_id === habitId && log.status)
    .map(log => log.logged_date)
    .sort((a, b) => (a < b ? 1 : -1)); // descending

  if (completedDates.length === 0) return { current: 0, highest: 0 };

  let currentStreak = 0;
  let highestStreak = 0;
  let runningStreak = 1;

  // Calculate highest streak
  for (let i = 0; i < completedDates.length - 1; i++) {
    const diff = differenceInDays(
      parseISO(completedDates[i]),
      parseISO(completedDates[i + 1])
    );
    
    if (diff === 1) {
      runningStreak++;
    } else {
      highestStreak = Math.max(highestStreak, runningStreak);
      runningStreak = 1;
    }
  }
  highestStreak = Math.max(highestStreak, runningStreak);

  // Calculate current streak
  let currentRun = 0;
  const todayStr = currentDate.toISOString().split('T')[0];
  const todayIndex = completedDates.indexOf(todayStr);
  
  // To avoid breaking streak if today isn't logged yet, we check from yesterday or today
  let startIndex = 0;
  
  // If recent log is more than 1 day ago (excluding today), current streak is 0
  const mostRecent = completedDates[0];
  const daysSinceMostRecent = differenceInDays(currentDate, parseISO(mostRecent));
  
  if (daysSinceMostRecent > 1) {
    currentStreak = 0;
  } else {
    currentRun = 1;
    for (let i = 0; i < completedDates.length - 1; i++) {
      const diff = differenceInDays(
        parseISO(completedDates[i]),
        parseISO(completedDates[i + 1])
      );
      if (diff === 1) {
        currentRun++;
      } else {
        break;
      }
    }
    currentStreak = currentRun;
  }

  return {
    current: currentStreak,
    highest: highestStreak
  };
}
