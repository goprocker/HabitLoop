import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useHabits } from './hooks/useHabits';
import { HabitManager } from './components/HabitManager';
import { DailyScore } from './components/DailyScore';
import { WeeklyHeatmap } from './components/WeeklyHeatmap';
import { SocialShareCard } from './components/SocialShareCard';
import { LandingPage } from './components/LandingPage';
import { exportToCSV } from './utils/exporting';
import { Download, RefreshCcw, Loader2, Share2, LogOut } from 'lucide-react';
import { format } from 'date-fns';

function Dashboard({ signOut, userEmail }: { signOut: () => void; userEmail: string }) {
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
        
        {/* Top Navigation */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              HabitLoop
            </h1>
            <span className="text-slate-500 font-medium border-l border-slate-800 pl-4 hidden sm:inline">
              {format(currentDate, 'EEEE, MMMM do')}
            </span>
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
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => exportToCSV(habits, logs)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-md transition-colors"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">CSV</span>
            </button>

            {/* User profile + Sign Out */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <span className="text-xs text-slate-500 font-medium hidden md:inline truncate max-w-[140px]">{userEmail}</span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
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

          {/* Stats Column */}
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

function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage onSignIn={signInWithGoogle} />;
  }

  return <Dashboard signOut={signOut} userEmail={user.email || 'User'} />;
}

export default App;
