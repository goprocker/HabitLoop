import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useHabits } from './hooks/useHabits';
import { HabitManager } from './components/HabitManager';
import { DailyScore } from './components/DailyScore';
import { ConsistencyHeatmap } from './components/ConsistencyHeatmap';
import { SleepTracker } from './components/SleepTracker';
import { CorrelationChart } from './components/CorrelationChart';
import { SocialShareCard } from './components/SocialShareCard';
import { LoginPage } from './components/LoginPage';
import { AboutPage } from './components/AboutPage';
import { IdeaPage } from './components/IdeaPage';
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
    sleepLogs,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleHabitLog,
    updateSleepLog,
    todayStr,
    todaySleep,
    progressPercentage,
    completedHabitsToday,
    activeHabitsToday
  } = useHabits(currentDate);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans p-4 sm:p-8 md:p-12 w-full flex justify-center relative overflow-hidden selection:bg-sky-500/30">
      
      {/* Immersive Deep Blue Cyberpunk bg */}
      <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-900/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-teal-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {isShareModalOpen && (
        <SocialShareCard 
          onClose={() => setIsShareModalOpen(false)}
          progressPercentage={progressPercentage}
          currentDate={currentDate}
          completedCount={completedHabitsToday}
          totalCount={activeHabitsToday}
        />
      )}

      <div className="w-full max-w-[1400px] flex flex-col gap-8 relative z-10">
        
        {/* Top Navigation */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-900/30">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-tighter text-white">
              HabitLoop <span className="text-sky-500">PRO</span>
            </h1>
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs border-l border-slate-800 pl-4 hidden sm:inline">
              {format(currentDate, 'EEEE, MMM do')}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-1.5 rounded flex items-center gap-2 font-bold font-mono shadow-xl">
                <RefreshCcw className="w-3 h-3 animate-spin" /> SYNC_ERR
              </span>
            )}
            
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-sky-500/50 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-slate-300 hidden sm:inline uppercase">Share</span>
            </button>

            <button
              onClick={() => exportToCSV(habits, logs, sleepLogs)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-sky-500/50 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-slate-300 hidden sm:inline uppercase">Database</span>
            </button>

            <div className="flex items-center gap-2 pl-4 ml-2 border-l border-slate-800">
              <span className="text-xs text-slate-500 font-bold hidden md:inline truncate max-w-[140px] uppercase">{userEmail}</span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Pro-Builder Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Main Habit Queue & Sleep (Left 8 cols) */}
          <main className="xl:col-span-8 flex flex-col gap-8">
            <HabitManager 
              habits={habits}
              logs={logs}
              todayStr={todayStr}
              addHabit={addHabit}
              deleteHabit={deleteHabit}
              toggleHabitLog={toggleHabitLog}
              currentDate={currentDate}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SleepTracker todaySleep={todaySleep} onUpdateSleep={(hours, restful) => updateSleepLog(currentDate, hours, restful)} />
              <DailyScore percentage={progressPercentage} />
            </div>
          </main>

          {/* Advanced Analytics Sidebar (Right 4 cols) */}
          <aside className="xl:col-span-4 flex flex-col gap-8">
            <ConsistencyHeatmap 
              logs={logs} 
              habits={habits} 
              currentDate={currentDate} 
            />
            
            <CorrelationChart 
              sleepLogs={sleepLogs} 
              habitLogs={logs} 
              habits={habits} 
            />
          </aside>
          
        </div>
      </div>
    </div>
  );
}

function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [view, setView] = useState<'landing' | 'login' | 'about' | 'idea'>('landing');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    if (view === 'login') {
      return <LoginPage onSignIn={signInWithGoogle} onBack={() => setView('landing')} />;
    }
    if (view === 'about') {
      return <AboutPage onBack={() => setView('landing')} />;
    }
    if (view === 'idea') {
      return <IdeaPage onBack={() => setView('landing')} />;
    }
    return (
      <LandingPage 
        onNavigateLogin={() => setView('login')} 
        onNavigateAbout={() => setView('about')}
        onNavigateIdea={() => setView('idea')}
      />
    );
  }

  return <Dashboard signOut={signOut} userEmail={user.email || 'User'} />;
}

export default App;
