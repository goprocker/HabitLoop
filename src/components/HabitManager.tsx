import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Flame, MessageSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Database } from '../types/database';
import { HabitWithMetrics } from '../hooks/useHabits';
import { format } from 'date-fns';

type HabitLog = Database['public']['Tables']['habit_logs']['Row'];

interface HabitManagerProps {
  habits: HabitWithMetrics[];
  logs: HabitLog[];
  todayStr: string;
  addHabit: (title: string, category?: string, color?: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitLog: (habitId: string, date: Date, noteText?: string) => Promise<void>;
  currentDate: Date;
}

const CATEGORIES = [
  { name: 'Health', color: '#10b981' },
  { name: 'Work', color: '#3b82f6' },
  { name: 'Mind', color: '#f59e0b' },
  { name: 'Routine', color: '#8b5cf6' }
];

export function HabitManager({ 
  habits, 
  logs, 
  todayStr, 
  addHabit, 
  deleteHabit, 
  toggleHabitLog,
  currentDate
}: HabitManagerProps) {
  const [newTitle, setNewTitle] = useState('');
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await addHabit(newTitle.trim(), selectedCat.name, selectedCat.color);
    setNewTitle('');
  };

  const toDos = habits.filter(h => {
    const log = logs.find(l => l.habit_id === h.id && l.logged_date === todayStr);
    return !log?.status;
  });

  const dones = habits.filter(h => {
    const log = logs.find(l => l.habit_id === h.id && l.logged_date === todayStr);
    return log?.status === true;
  });

  const HabitItem = ({ habit, isDone }: { habit: HabitWithMetrics; isDone: boolean }) => {
    const currentLog = logs.find(l => l.habit_id === habit.id && l.logged_date === todayStr);
    const isAddingNote = activeNoteId === habit.id;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`group flex items-start justify-between p-4 mb-2 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors ${
          isDone ? 'opacity-70' : ''
        }`}
      >
        <div className="flex items-start gap-4 flex-1">
          <button 
            onClick={() => toggleHabitLog(habit.id, currentDate)}
            className="pt-1 mt-0.5"
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
            )}
          </button>
          
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3">
              <span className={`text-[15px] font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {habit.title}
              </span>
              <span 
                className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${habit.color}20`, color: habit.color || '#fff' }}
              >
                {habit.category}
              </span>
              
              {habit.currentStreak > 0 && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">
                  <Flame className="w-3 h-3" /> {habit.currentStreak}
                </span>
              )}
            </div>

            {/* Note Section */}
            {isDone && (
              <div className="mt-2">
                {!isAddingNote && !currentLog?.note && (
                  <button 
                    onClick={() => setActiveNoteId(habit.id)}
                    className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" /> Add Reflection
                  </button>
                )}

                {!isAddingNote && currentLog?.note && (
                  <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded-md border border-slate-700/50 flex justify-between items-center group/note">
                    <span>{currentLog.note}</span>
                    <button 
                      onClick={() => { setActiveNoteId(habit.id); setNoteText(currentLog.note || ''); }}
                      className="opacity-0 group-hover/note:opacity-100 text-slate-500 hover:text-slate-300"
                    >
                      Edit
                    </button>
                  </div>
                )}

                {isAddingNote && (
                  <div className="flex gap-2 mt-2">
                    <input
                      autoFocus
                      type="text"
                      placeholder="How did it go?"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          toggleHabitLog(habit.id, currentDate, noteText);
                          setActiveNoteId(null);
                          setNoteText('');
                        } else if (e.key === 'Escape') {
                          setActiveNoteId(null);
                        }
                      }}
                      className="text-xs bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 focus:border-violet-500 outline-none flex-1 text-slate-200"
                    />
                    <button 
                      onClick={() => {
                        toggleHabitLog(habit.id, currentDate, noteText);
                        setActiveNoteId(null);
                        setNoteText('');
                      }}
                      className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => confirm('Delete habit?') && deleteHabit(habit.id)}
          className="p-1 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleAdd} className="flex gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl shadow-lg">
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setShowCatDropdown(!showCatDropdown)}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider pl-3 pr-2 py-2 text-slate-300 hover:text-white"
          >
             <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: selectedCat.color }}></span>
             {selectedCat.name}
             <ChevronDown className="w-3 h-3 ml-1 text-slate-500" />
          </button>
          
          <AnimatePresence>
            {showCatDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-12 left-0 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-20"
              >
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => { setSelectedCat(cat); setShowCatDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs font-bold uppercase text-slate-300 hover:bg-slate-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-[1px] h-6 bg-slate-800 my-auto mx-1"></div>

        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New habit..."
          className="flex-1 bg-transparent border-none text-slate-200 outline-none px-2 text-sm"
        />
        <button 
          type="submit"
          disabled={!newTitle.trim()}
          className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <div className="flex flex-col text-sm">
        {toDos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-widest pl-1">Remaining</h3>
            <AnimatePresence mode="popLayout">
              {toDos.map(habit => (
                <HabitItem key={habit.id} habit={habit} isDone={false} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {dones.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-widest pl-1">Completed</h3>
            <AnimatePresence mode="popLayout">
              {dones.map(habit => (
                <HabitItem key={habit.id} habit={habit} isDone={true} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
