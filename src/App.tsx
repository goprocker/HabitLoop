import { useState } from 'react';
import { useHabits } from './hooks/useHabits';
import { HabitManager } from './components/HabitManager';
import { DailyScore } from './components/DailyScore';
import { WeeklyHeatmap } from './components/WeeklyHeatmap';
import { SocialShareCard } from './components/SocialShareCard';
import { exportToCSV } from './utils/exporting';
import { Download, RefreshCcw, Loader2, Share2 } from 'lucide-react';
import { format } from 'date-fns';

function App() {
  const [currentDate] = useState(new Date());
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const {
    habits,
    logs,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleHabitLog,
    todayStr,
    progressPercentage,
    completedHabitsToday,
    activeHabitsToday
  } = useHabits(currentDate);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 sm:p-8 md:p-12 w-full flex justify-center">
      
      {isShareModalOpen && (
        <SocialShareCard 
          onClose={() => setIsShareModalOpen(false)}
          progressPercentage={progressPercentage}
          currentDate={currentDate}
          completedCount={completedHabitsToday}
          totalCount={activeHabitsToday}
        />
      )}

      <div className="w-full max-w-[1000px] flex flex-col gap-8">
        
        {/* Sleek Top Navigation */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              HabitLoop
            </h1>
            <span className="text-slate-500 font-medium border-l border-slate-800 pl-4">{format(currentDate, 'EEEE, MMMM do')}</span>
          </div>
          
          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1.5 rounded flex items-center gap-2 font-bold font-mono">
                <RefreshCcw className="w-3 h-3 animate-spin" /> DB_SYNC_ERROR
              </span>
            )}
            
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-md transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-300">Share</span>
            </button>

            <button
              onClick={() => exportToCSV(habits, logs)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-md transition-colors"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-300">CSV Export</span>
            </button>
          </div>
        </header>

        {/* Feature-Dense Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Content Area */}
          <main className="md:col-span-8">
            <HabitManager 
              habits={habits}
              logs={logs}
              todayStr={todayStr}
              addHabit={addHabit}
              deleteHabit={deleteHabit}
              toggleHabitLog={toggleHabitLog}
              currentDate={currentDate}
            />
          </main>

          {/* Detailed Data Column */}
          <aside className="md:col-span-4 flex flex-col gap-6">
            <DailyScore percentage={progressPercentage} />
            <WeeklyHeatmap 
              logs={logs} 
              habits={habits} 
              currentDate={currentDate} 
            />
            
            <div className="p-5 bg-slate-900/50 border border-slate-800/50 rounded-xl">
              <h3 className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-2">Metrics Protocol</h3>
              <p className="text-xs leading-relaxed text-slate-400 font-medium">
                Tracking {habits.length} vital protocols. Use the Share button to post your momentum.
              </p>
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}

export default App;
