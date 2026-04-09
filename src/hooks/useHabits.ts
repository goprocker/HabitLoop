import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import type { Database } from '../types/database';
import { calculateStreaks } from '../utils/streaks';

type Habit = Database['public']['Tables']['habits']['Row'];
type HabitLog = Database['public']['Tables']['habit_logs']['Row'];
export type SleepLog = Database['public']['Tables']['sleep_logs']['Row'];

export interface HabitWithMetrics extends Habit {
  currentStreak: number;
  highestStreak: number;
}

export function useHabits(currentDate: Date) {
  const [habits, setHabits] = useState<HabitWithMetrics[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabitsAndLogs = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: true });

      if (habitsError) throw habitsError;
      
      const { data: logsData, error: logsError } = await supabase
        .from('habit_logs')
        .select('*');

      if (logsError) throw logsError;

      const { data: sleepData, error: sleepError } = await supabase
        .from('sleep_logs')
        .select('*');

      if (sleepError) throw sleepError;

      const fullLogs = logsData || [];
      const fullSleepLogs = sleepData || [];

      // Augment habits with streaks
      const augmentedHabits = ((habitsData || []) as Habit[]).map((h: Habit) => {
        const streaks = calculateStreaks(h.id, fullLogs as HabitLog[], currentDate);
        return {
          ...h,
          currentStreak: streaks.current,
          highestStreak: streaks.highest
        };
      });

      setHabits(augmentedHabits);
      setLogs(fullLogs);
      setSleepLogs(fullSleepLogs);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchHabitsAndLogs();
  }, [fetchHabitsAndLogs]);

  const addHabit = async (title: string, category: string = 'Uncategorized', color: string = '#8b5cf6') => {
    try {
      const { data, error } = await supabase
        .from('habits')
        .insert([{ title, category, color }] as any)
        .select()
        .single();

      if (error) throw error;
      setHabits((prev) => [...prev, { ...(data as Habit), currentStreak: 0, highestStreak: 0 }]);
    } catch (err: any) {
      console.error('Error adding habit:', err);
      throw err;
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      const { error } = await supabase.from('habits').delete().eq('id', id);
      if (error) throw error;
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setLogs((prev) => prev.filter((l) => l.habit_id !== id));
    } catch (err: any) {
      console.error('Error deleting habit:', err);
      throw err;
    }
  };

  const toggleHabitLog = async (habitId: string, date: Date, noteText?: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const existingLog = logs.find((l) => l.habit_id === habitId && l.logged_date === dateStr);
    
    // If we're strictly adding a note to an existing completed log without toggling
    let newStatus = existingLog ? !existingLog.status : true;
    if (noteText !== undefined && existingLog) {
      newStatus = existingLog.status; // remain same status if just updating note
    }

    const finalNote = noteText !== undefined ? noteText : (existingLog?.note || null);

    const updatedLog: HabitLog = {
      id: existingLog?.id || crypto.randomUUID(),
      habit_id: habitId,
      status: newStatus,
      logged_date: dateStr,
      note: finalNote
    };

    setLogs((prev) => {
      const filtered = prev.filter((l) => !(l.habit_id === habitId && l.logged_date === dateStr));
      return [...filtered, updatedLog];
    });

    try {
      const { error } = await supabase
        .from('habit_logs')
        .upsert({
          ...(existingLog?.id ? { id: existingLog.id } : {}),
          habit_id: habitId,
          logged_date: dateStr,
          status: newStatus,
          note: finalNote
        } as any);

      if (error) throw error;
      fetchHabitsAndLogs();
    } catch (err: any) {
      console.error('Error toggling habit:', err);
      fetchHabitsAndLogs(); 
    }
  };

  const updateSleepLog = async (date: Date, hours_slept: number, is_restful: boolean) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const existingLog = sleepLogs.find((s) => s.logged_date === dateStr);
    
    const updatedLog: SleepLog = {
      id: existingLog?.id || crypto.randomUUID(),
      logged_date: dateStr,
      hours_slept,
      is_restful
    };

    setSleepLogs((prev) => {
      const filtered = prev.filter((s) => s.logged_date !== dateStr);
      return [...filtered, updatedLog];
    });

    try {
      const { error } = await supabase
        .from('sleep_logs')
        .upsert({
          ...(existingLog?.id ? { id: existingLog.id } : {}),
          logged_date: dateStr,
          hours_slept,
          is_restful
        } as any);
      if (error) throw error;
      fetchHabitsAndLogs();
    } catch (err: any) {
      console.error('Error updating sleep:', err);
      fetchHabitsAndLogs();
    }
  };

  const todayStr = format(currentDate, 'yyyy-MM-dd');
  const activeHabitsToday = habits.length;
  const completedHabitsToday = logs.filter(
    (l) => l.logged_date === todayStr && l.status === true
  ).length;

  const todaySleep = sleepLogs.find(s => s.logged_date === todayStr);

  const progressPercentage = activeHabitsToday === 0 
    ? 0 
    : Math.round((completedHabitsToday / activeHabitsToday) * 100);

  return {
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
    activeHabitsToday,
    completedHabitsToday
  };
}
