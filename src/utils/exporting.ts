export function exportToCSV(habits: any[], logs: any[]) {
  // Simple CSV generation: Header
  const headers = ['Habit ID', 'Habit Title', 'Date Logged', 'Status'];
  
  const rows = logs.map(log => {
    const habit = habits.find(h => h.id === log.habit_id);
    return [
      log.habit_id,
      `"${habit?.title || 'Unknown'}"`,
      log.logged_date,
      log.status ? 'Completed' : 'Skipped'
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `habitloop-export-${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
