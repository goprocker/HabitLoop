import { useMemo } from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import type { Database } from '../types/database';

type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
type Habit = Database['public']['Tables']['habits']['Row'];

interface WeeklyHeatmapProps {
  logs: HabitLog[];
  habits: Habit[];
  currentDate: Date;
}

export function WeeklyHeatmap({ logs, habits, currentDate }: WeeklyHeatmapProps) {
  const days = useMemo(() => {
    const endDate = currentDate;
    const startDate = subDays(currentDate, 6); 
    
    return eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const activeLogs = logs.filter(l => l.logged_date === dateStr && l.status === true);
      const totalActiveHabits = habits.filter(h => {
        const createdDateStr = h.created_at.split('T')[0];
        return createdDateStr <= dateStr;
      }).length;
      const score = totalActiveHabits === 0 ? 0 : activeLogs.length / totalActiveHabits;
      return { date, dateStr, score, total: totalActiveHabits, completed: activeLogs.length };
    });
  }, [logs, habits, currentDate]);

  const getCellClasses = (score: number) => {
    if (score === 0) return 'bg-slate-800 hover:bg-slate-700';
    if (score < 0.5) return 'bg-emerald-500/40 border border-emerald-500/30';
    return 'bg-emerald-500 border border-emerald-400 text-emerald-950';
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Past 7 Days Output</h2>
      <div className="flex justify-between items-end gap-1.5 pb-1 relative">
        {days.map((day) => (
          <div key={day.dateStr} className="flex flex-col items-center gap-1.5 group flex-1">
            <div className={`w-full aspect-square max-w-[32px] rounded-[4px] transition-colors flex items-center justify-center text-[10px] font-bold ${getCellClasses(day.score)}`}>
               <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.completed || ''}
               </span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">
              {format(day.date, 'EE').charAt(0)}
            </span>
            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-slate-200 text-xs py-1 px-2 rounded-md font-medium pointer-events-none z-20 border border-slate-700 whitespace-nowrap">
              {format(day.date, 'MMM do')}: {day.completed}/{day.total} Executed
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
