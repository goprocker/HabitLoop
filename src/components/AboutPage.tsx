import React from 'react';
import { ArrowLeft, Zap, BarChart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div 
      className="relative min-h-screen bg-[hsl(var(--cinema-background))] text-[hsl(var(--cinema-foreground))] overflow-x-hidden flex flex-col font-sans selection:bg-white/10"
      style={{
        '--cinema-background': '201 100% 13%',
        '--cinema-foreground': '0 0% 100%',
        '--cinema-muted-foreground': '240 4% 66%',
        fontFamily: 'var(--font-body)',
      } as React.CSSProperties}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-900/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-900/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-row items-center px-8 py-8 max-w-7xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[hsl(var(--cinema-muted-foreground))] hover:text-[hsl(var(--cinema-foreground))] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-xl font-medium text-[hsl(var(--cinema-muted-foreground))] tracking-[0.2em] uppercase mb-4">
            The Visionary
          </h2>
          <h1 
            className="text-6xl sm:text-7xl md:text-8xl font-normal leading-tight tracking-[-0.04em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Architect <br />
            <em className="not-italic text-[hsl(var(--cinema-muted-foreground))]">of the Silence</em>
          </h1>
        </motion.div>

        {/* Manifesto Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-center mb-24"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-[hsl(var(--cinema-foreground))] opacity-90 mb-8">
            HabitLoop Pro is the work of <span className="text-white font-semibold">Gopinath</span>, 
            an AI Product Builder and Frontend Developer dedicated to creating digital spaces for those 
            who think deeply and build quietly.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-[hsl(var(--cinema-muted-foreground))] italic">
            "I believe that dreams rise through the silence. In a world designed to distract, my mission is to provide the infrastructure for your consistency. I build tools for the quiet rebels—the ones who know that greatness isn't found in a single loud moment, but in the thousand invisible hours of a daily protocol."
          </p>
        </motion.div>

        {/* Philosophy Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Sharp Focus",
              desc: "An interface that disappears so your work can take center stage. No clutter, no noise—just the data that moves the needle."
            },
            {
              icon: BarChart,
              title: "Data-Driven Momentum",
              desc: "Leveraging the logic of heatmaps and velocity tracking to turn abstract effort into concrete evidence of growth."
            },
            {
              icon: ShieldCheck,
              title: "Modern Resilience",
              desc: "Built with a high-performance stack—React, Supabase, and Tailwind CSS—to ensure your progress is logged securely and displayed beautifully."
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
              className="p-8 liquid-glass rounded-3xl border border-white/[0.02] flex flex-col items-center text-center group hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 mb-6 group-hover:bg-white/10 transition-colors">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[hsl(var(--cinema-muted-foreground))]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Signature */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-32 text-center"
        >
          <div 
            className="text-4xl text-white opacity-40 mb-2 italic"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gopinath
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-[hsl(var(--cinema-muted-foreground))]">
            The Vision Remains
          </p>
        </motion.div>
      </main>
    </div>
  );
}
