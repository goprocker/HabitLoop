import { Download, X } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { format } from 'date-fns';

interface SocialShareCardProps {
  onClose: () => void;
  progressPercentage: number;
  currentDate: Date;
  completedCount: number;
  totalCount: number;
}

export function SocialShareCard({ onClose, progressPercentage, currentDate, completedCount, totalCount }: SocialShareCardProps) {
  const handleDownload = async () => {
    const node = document.getElementById('share-card-node');
    if (node) {
      const dataUrl = await htmlToImage.toPng(node, { quality: 1, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `habitloop-score-${format(currentDate, 'yyyy-MM-dd')}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Options */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800">
          <h3 className="font-bold text-slate-200">Share Milestone</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capturable Card */}
        <div className="p-8 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden" id="share-card-node">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/30 blur-[50px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full"></div>
          
          <div className="relative z-10 w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col items-center shadow-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-6">Daily Score</span>
            
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle
                  cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="8" fill="transparent"
                  strokeDasharray={439.8}
                  strokeDashoffset={439.8 - (progressPercentage / 100) * 439.8}
                  className="drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
              </svg>
              <div className="absolute text-5xl font-black text-white">
                {progressPercentage}<span className="text-xl text-emerald-500">%</span>
              </div>
            </div>

            <p className="mt-6 text-slate-300 font-medium">Completed {completedCount} out of {totalCount} habits today.</p>
            
            <div className="mt-8 pt-6 border-t border-white/10 w-full flex justify-between items-center">
              <span className="text-xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">HabitLoop</span>
              <span className="text-xs text-slate-500 font-bold">{format(currentDate, 'MMM do, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2"
          >
            <Download className="w-4 h-4" /> Save Image
          </button>
        </div>
      </div>
    </div>
  );
}
