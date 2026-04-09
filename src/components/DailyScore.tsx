import { motion } from 'framer-motion';

interface DailyScoreProps {
  percentage: number;
}

export function DailyScore({ percentage }: DailyScoreProps) {
  const strokeColor = percentage > 0 ? '#10b981' : 'transparent'; 
  
  return (
    <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group">
      
      <div className="flex flex-col gap-1 z-10">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Daily Velocity</h2>
        <div className="text-3xl font-black text-slate-200">
          {percentage}<span className="text-lg text-emerald-500">%</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">Consistency is key.</p>
      </div>
      
      <div className="relative flex items-center justify-center w-24 h-24 z-10 shrink-0">
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="48" cy="48" r="40"
            stroke="currentColor" strokeWidth="6" fill="transparent"
            className="text-slate-800"
          />
          <motion.circle
            cx="48" cy="48" r="40"
            stroke={strokeColor} strokeWidth="6" fill="transparent" strokeLinecap="round"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (percentage / 100) * 251.2}
            className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (percentage / 100) * 251.2 }}
            transition={{ duration: 1, ease: 'easeOut' }} 
          />
        </svg>
      </div>

    </div>
  );
}
