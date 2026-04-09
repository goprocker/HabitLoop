export const exportToCSV = (habits: any[], logs: any[], sleepLogs?: any[]) => {
  // We'll create a composite CSV that includes habit logs and sleep context
  const headers = ['Date', 'Habit ID', 'Habit Title', 'Category', 'Status', 'Note', 'Hours Slept', 'Is Restful'];
  
  const rows = logs.map(log => {
    const habit = habits.find(h => h.id === log.habit_id);
    const title = habit?.title || 'Unknown Habit';
    const category = habit?.category || 'Uncategorized';
    
    const sleep = sleepLogs?.find(s => s.logged_date === log.logged_date);
    const hoursSlept = sleep?.hours_slept || '';
    const isRestful = sleep ? (sleep.is_restful ? 'Yes' : 'No') : '';

    return [
      log.logged_date,
      log.habit_id,
      `"${title.replace(/"/g, '""')}"`,
      `"${category}"`,
      log.status ? 'Completed' : 'Remaining',
      `"${(log.note || '').replace(/"/g, '""')}"`,
      hoursSlept,
      isRestful
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `habitloop-pro-export-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
