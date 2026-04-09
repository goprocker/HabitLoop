import { useMemo } from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import type { Database } from '../types/database';

type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
type Habit = Database['public']['Tables']['habits']['Row'];

interface ConsistencyHeatmapProps {
  logs: HabitLog[];
  habits: Habit[];
  currentDate: Date;
}

export function ConsistencyHeatmap({ logs, habits, currentDate }: ConsistencyHeatmapProps) {
  const days = useMemo(() => {
    const endDate = currentDate;
    // ~6 months = 182 days
    const startDate = subDays(currentDate, 181); 
    
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
    // Cyberpunk teal scales
    if (score === 0) return 'bg-slate-800/50 hover:bg-slate-700/80';
    if (score <= 0.25) return 'bg-teal-900/60 border border-teal-800/30';
    if (score <= 0.5) return 'bg-teal-700 border border-teal-600/50';
    if (score <= 0.75) return 'bg-teal-500 border border-teal-400 group-hover:bg-teal-400';
    return 'bg-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.6)] border border-teal-200 z-10'; // 100%
  };

  // Group days into columns of 7 (representing weeks vertically)
  const columns = [];
  for (let i = 0; i < days.length; i += 7) {
    columns.push(days.slice(i, i + 7));
  }

  return (
    <div className="p-6 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl relative overflow-hidden">
      <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">6-Month Consistency Protocol</h2>
      
      {/* Scroll container for the massive grid */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="flex gap-1 min-w-max">
          {columns.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day) => (
                <div key={day.dateStr} className="relative group">
                  <div className={`w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-[3px] transition-colors cursor-crosshair ${getCellClasses(day.score)}`} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-slate-700 text-slate-200 text-[11px] py-1.5 px-3 rounded-lg font-medium pointer-events-none z-50 whitespace-nowrap shadow-2xl">
                    <span className="font-bold text-teal-400">{format(day.date, 'MMM do, yyyy')}</span>
                    <br />
                    {day.completed}/{day.total} Routines Completed
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
