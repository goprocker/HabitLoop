import { useState } from 'react';
import { Moon, Sun, BedDouble } from 'lucide-react';
import type { SleepLog } from '../hooks/useHabits';

interface SleepTrackerProps {
  todaySleep?: SleepLog;
  onUpdateSleep: (hours: number, isRestful: boolean) => void;
}

export function SleepTracker({ todaySleep, onUpdateSleep }: SleepTrackerProps) {
  const [hours, setHours] = useState(todaySleep?.hours_slept || 7);
  const [isRestful, setIsRestful] = useState(todaySleep?.is_restful ?? true);

  const handleSave = () => {
    onUpdateSleep(hours, isRestful);
  };

  return (
    <div className="p-6 bg-slate-900/80 backdrop-blur-md border border-sky-900/30 rounded-2xl shadow-2xl relative overflow-hidden group">
      
      {/* Immersive glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 blur-[80px] rounded-full pointer-events-none transition-colors duration-700 ${isRestful ? 'bg-sky-500/20' : 'bg-indigo-500/20'}`}></div>

      <div className="relative z-10">
        <h2 className="text-[11px] font-bold text-sky-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <BedDouble className="w-4 h-4" /> Sleep Protocol
        </h2>

        <div className="flex flex-col gap-8">
          
          {/* Hours Slider */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-semibold text-slate-400">Duration</span>
              <span className="text-3xl font-black text-white">{hours}<span className="text-sm text-sky-500 ml-1">hrs</span></span>
            </div>
            
            <input 
              type="range" 
              min="0" max="12" step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              onMouseUp={handleSave}
              onTouchEnd={handleSave}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400 transition-all"
            />
          </div>

          {/* Quality Toggle */}
          <div>
             <span className="text-sm font-semibold text-slate-400 block mb-3">Quality Base</span>
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setIsRestful(true); onUpdateSleep(hours, true); }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    isRestful 
                      ? 'bg-sky-500/10 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 opacity-60'
                  }`}
                >
                  <Sun className={`w-6 h-6 mb-2 ${isRestful ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isRestful ? 'text-sky-300' : 'text-slate-500'}`}>Restful</span>
                </button>
                <button 
                  onClick={() => { setIsRestful(false); onUpdateSleep(hours, false); }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    !isRestful 
                      ? 'bg-indigo-500/10 border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 opacity-60'
                  }`}
                >
                  <Moon className={`w-6 h-6 mb-2 ${!isRestful ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${!isRestful ? 'text-indigo-300' : 'text-slate-500'}`}>Restless</span>
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
