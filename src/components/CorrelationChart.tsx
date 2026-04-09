import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import type { Database } from '../types/database';
import { Activity } from 'lucide-react';

type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
type Habit = Database['public']['Tables']['habits']['Row'];
type SleepLog = Database['public']['Tables']['sleep_logs']['Row'];

interface CorrelationChartProps {
  sleepLogs: SleepLog[];
  habitLogs: HabitLog[];
  habits: Habit[];
}

export function CorrelationChart({ sleepLogs, habitLogs, habits }: CorrelationChartProps) {
  
  const chartData = useMemo(() => {
    return sleepLogs.map(sleep => {
      const dateLogs = habitLogs.filter(hl => hl.logged_date === sleep.logged_date && hl.status === true);
      const activeHabitsOnDate = habits.filter(h => {
        const createdDateStr = h.created_at.split('T')[0];
        return createdDateStr <= sleep.logged_date;
      }).length;
      
      const completionPercent = activeHabitsOnDate === 0 ? 0 : Math.round((dateLogs.length / activeHabitsOnDate) * 100);

      return {
        date: sleep.logged_date,
        hours: sleep.hours_slept,
        completion: completionPercent,
        isRestful: sleep.is_restful ? 1 : 0
      };
    }).filter(d => d.hours > 0); // Only plot days where sleep was logged
  }, [sleepLogs, habitLogs, habits]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <p className="font-bold text-slate-300 mb-1">{data.date}</p>
          <p className="text-sky-400">Sleep: <span className="font-bold">{data.hours} hrs</span> ({data.isRestful ? 'Restful' : 'Restless'})</p>
          <p className="text-emerald-400">Output: <span className="font-bold">{data.completion}%</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl h-80 flex flex-col relative overflow-hidden">
      <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4" /> Velocity Correlation (Sleep vs Output)
      </h2>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-sm font-medium">
          Insufficient biometric data for correlation.
        </div>
      ) : (
        <div className="flex-1 w-full relative z-10 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                type="number" 
                dataKey="hours" 
                name="Sleep (hrs)" 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 12]}
              />
              <YAxis 
                type="number" 
                dataKey="completion" 
                name="Output (%)" 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <ZAxis type="number" dataKey="isRestful" range={[60, 150]} />
              <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#475569' }} content={<CustomTooltip />} />
              <Scatter 
                name="Timeline" 
                data={chartData} 
                fill="#38bdf8" 
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
