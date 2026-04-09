import { motion } from 'framer-motion';
import { CheckCircle2, Flame, BarChart3, Share2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onSignIn: () => void;
}

const features = [
  {
    icon: CheckCircle2,
    title: 'Daily Check-in',
    desc: 'Toggle habits with a single tap. See your to-do vs done list update in real time.',
    color: '#10b981',
  },
  {
    icon: Flame,
    title: 'Streak Tracking',
    desc: 'Never break the chain. Watch your consistency streaks grow day after day.',
    color: '#f59e0b',
  },
  {
    icon: BarChart3,
    title: 'Weekly Heatmap',
    desc: 'A GitHub-style contribution grid showing your last 7 days of performance.',
    color: '#3b82f6',
  },
  {
    icon: Share2,
    title: 'Share Progress',
    desc: 'Generate beautiful image cards of your stats and share them on social media.',
    color: '#8b5cf6',
  },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
} as const;

export function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      
      {/* Ambient background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[40vw] h-[40vw] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h2 className="text-xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          HabitLoop
        </h2>
        <button
          onClick={onSignIn}
          className="text-sm font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-36 text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Built for high-performance builders</span>
        </motion.div>
        
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8">
          <span className="block">Build habits that</span>
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">actually stick.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          A streamlined daily accountability dashboard. Track habits, visualize your consistency
          through heatmaps, and export your data — all in one clean interface.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onSignIn}
            className="group relative flex items-center gap-3 bg-white text-slate-900 font-bold text-lg px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:shadow-[0_0_60px_rgba(139,92,246,0.3)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-32"
      >
        <motion.h2 variants={fadeUp} className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] text-center mb-12">
          The core loop
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${f.color}15` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How-it-works strip */}
      <section className="relative z-10 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { step: '01', label: 'Add your habits', sub: 'Define habits and assign categories.' },
            { step: '02', label: 'Check in daily', sub: 'Toggle them off as you complete each one.' },
            { step: '03', label: 'Grow your streak', sub: 'Watch your consistency compound over time.' },
          ].map((s) => (
            <div key={s.step}>
              <span className="text-4xl font-black text-white/10">{s.step}</span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">{s.label}</h4>
              <p className="text-sm text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h3 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Ready to build momentum?</h3>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join the habit builders who don't settle. Start tracking today — it's free.</p>
          <button
            onClick={onSignIn}
            className="group flex items-center gap-3 mx-auto bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Get Started with Google
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-slate-600">&copy; {new Date().getFullYear()} HabitLoop</span>
          <span className="text-xs font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            HabitLoop
          </span>
        </div>
      </footer>
    </div>
  );
}
