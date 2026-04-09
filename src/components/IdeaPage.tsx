import React from 'react';
import { ArrowLeft, Mountain, Activity, Layout, Repeat, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface IdeaPageProps {
  onBack: () => void;
}

const RisingContent = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export function IdeaPage({ onBack }: IdeaPageProps) {
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
      {/* Code Ascend Badge */}
      <div className="fixed top-8 right-8 z-50 animate-fade-rise-delay-2">
        <div className="flex items-center gap-2 px-4 py-2 liquid-glass rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
          <Trophy className="w-3.5 h-3.5 text-yellow-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
            Official Entry: Code Ascend
          </span>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[60vw] h-[60vw] bg-sky-900/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[50vw] h-[50vw] bg-teal-900/5 blur-[150px] rounded-full" />
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

      <main className="relative z-10 max-w-4xl mx-auto px-8 pt-20 pb-40 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-24">
          <RisingContent>
            <h2 className="text-xl font-medium text-[hsl(var(--cinema-muted-foreground))] tracking-[0.2em] uppercase mb-4">
              The Proving Ground
            </h2>
          </RisingContent>
          <RisingContent delay={0.2}>
            <h1 
              className="text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.1] tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Genesis: <br />
              <em className="not-italic text-[hsl(var(--cinema-muted-foreground))]">From Code Ascend to HabitLoop</em>
            </h1>
          </RisingContent>
        </div>

        {/* The Story */}
        <section className="mb-32">
          <RisingContent>
            <p className="text-xl sm:text-2xl leading-relaxed text-white/90 mb-12 font-light">
              HabitLoop was forged during Code Ascend, a technical challenge designed for builders 
              to push the boundaries of intentional software. The mission was clear: create a tool 
              that solves a core human problem through elegant engineering.
            </p>
          </RisingContent>
          <RisingContent delay={0.1}>
            <p className="text-lg sm:text-xl leading-relaxed text-[hsl(var(--cinema-muted-foreground))]">
              The problem I identified was "Productivity Noise." Most tools are too loud, 
              distracting users with notifications and complex UI. HabitLoop was built to be the 
              antithesis—a tool that lives in the silence so your dreams can rise.
            </p>
          </RisingContent>
        </section>

        {/* The Ascend Philosophy */}
        <section className="w-full mb-32 border-t border-white/5 pt-20">
          <RisingContent>
            <h3 
              className="text-4xl text-white mb-16 italic"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The "Ascend" Philosophy
            </h3>
          </RisingContent>
          
          <div className="flex flex-col gap-20">
            {[
              {
                icon: Mountain,
                title: "1. The Architecture of Consistency",
                desc: "We moved away from simple 'Checklists' and moved toward 'Systems.' By using a GitHub-style Contribution Grid, we turn your silent daily efforts into a visual mountain. Every teal block represents a step taken during your ascent."
              },
              {
                icon: Activity,
                title: "2. Physiological Guardrails",
                desc: "A high-performance 'Ascend' requires recovery. We integrated Sleep Tracking as a core metric, not an afterthought. The idea is to visualize the correlation between your rest and your 'Velocity.' To ascend higher, you must sleep deeper."
              },
              {
                icon: Layout,
                title: "3. Minimalist Engineering",
                desc: "Built using React, Supabase, and Tailwind CSS, the project was optimized for speed and focus. We stripped away every unnecessary click to ensure that the friction between 'Thinking' and 'Tracking' is near zero."
              }
            ].map((item, i) => (
              <RisingContent key={item.title} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-4 text-white tracking-tight">{item.title}</h4>
                    <p className="text-lg leading-relaxed text-[hsl(var(--cinema-muted-foreground))]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RisingContent>
            ))}
          </div>
        </section>

        {/* The Closed-Loop System */}
        <section className="w-full mb-40 border-t border-white/5 pt-20">
          <RisingContent>
            <h3 
              className="text-4xl text-white mb-16 italic"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Closed-Loop System
            </h3>
          </RisingContent>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Log", desc: "Record the silent work in the Command Center." },
              { label: "Analyze", desc: "Watch the patterns emerge in the Heatmap." },
              { label: "Optimize", desc: "Adjust your sleep and habits based on your Velocity Plot." },
              { label: "Repeat", desc: "Enter the loop again, stronger than the day before." }
            ].map((step, i) => (
              <RisingContent key={step.label} delay={i * 0.1}>
                <div className="p-8 liquid-glass rounded-3xl h-full flex flex-col gap-4 border border-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <Repeat className="w-5 h-5 text-sky-400 opacity-50" />
                  <h5 className="text-xl font-bold text-white uppercase tracking-widest text-[12px]">{step.label}</h5>
                  <p className="text-sm text-[hsl(var(--cinema-muted-foreground))] leading-relaxed">{step.desc}</p>
                </div>
              </RisingContent>
            ))}
          </div>
        </section>

        {/* Credits & Quote */}
        <section className="w-full text-center">
          <RisingContent>
            <div className="inline-flex flex-col items-center gap-6 p-12 liquid-glass rounded-[40px] border border-white/5 mb-20 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-2xl text-center">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-bold">Event</p>
                  <p className="text-lg text-white font-medium">Code Ascend ’26</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-bold">Developer</p>
                  <p className="text-lg text-white font-medium">Gopinath R</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-bold">Objective</p>
                  <p className="text-lg text-white font-medium">The Digital Foundation</p>
                </div>
              </div>
            </div>
          </RisingContent>

          <RisingContent delay={0.2}>
            <blockquote className="max-w-xl mx-auto mb-12">
              <p 
                className="text-3xl sm:text-4xl leading-tight text-white italic mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                "Execution is the only bridge between a dream and its reality. We built the bridge."
              </p>
            </blockquote>
          </RisingContent>
        </section>

      </main>
    </div>
  );
}
