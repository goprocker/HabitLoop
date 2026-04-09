import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { CheckCircle2, Flame, BarChart3, Share2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigateLogin: () => void;
  onNavigateAbout: () => void;
  onNavigateIdea: () => void;
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
    desc: 'A GitHub-style contribution grid showing your last 6 months of performance.',
    color: '#3b82f6',
  },
  {
    icon: Share2,
    title: 'Share Progress',
    desc: 'Generate beautiful image cards of your stats and share them on social media.',
    color: '#8b5cf6',
  },
];

/* ─── Magnetic Button Wrapper ─── */
function MagneticButton({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 300 });
  const springY = useSpring(y, { damping: 15, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ─── Tilt Card Wrapper ─── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scroll-Reveal Wrapper ─── */
function ScrollReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage({ onNavigateLogin, onNavigateAbout, onNavigateIdea }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[hsl(var(--cinema-background))] text-[hsl(var(--cinema-foreground))] overflow-x-hidden flex flex-col font-sans"
      style={{
        '--cinema-background': '201 100% 13%',
        '--cinema-foreground': '0 0% 100%',
        '--cinema-muted-foreground': '240 4% 66%',
        fontFamily: 'var(--font-body)',
      } as React.CSSProperties}
    >
      
      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col w-full">
        {/* Background Video Layer confined to Hero */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 mix-blend-screen"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          />
          {/* Subtle gradient to transition video into the dark background below */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--cinema-background))/20] to-[hsl(var(--cinema-background))] z-10 pointer-events-none" />
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
          <div 
            className="text-3xl tracking-tight text-[hsl(var(--cinema-foreground))]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            HabitLoop<sup className="text-[10px]">PRO</sup>
          </div>
          <div className="hidden md:flex flex-row gap-8 items-center">
            <a href="#" className="text-sm text-[hsl(var(--cinema-foreground))] transition-colors">Home</a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateIdea(); }}
              className="text-sm text-[hsl(var(--cinema-muted-foreground))] hover:text-[hsl(var(--cinema-foreground))] transition-colors"
            >
              Idea
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateAbout(); }}
              className="text-sm text-[hsl(var(--cinema-muted-foreground))] hover:text-[hsl(var(--cinema-foreground))] transition-colors"
            >
              About Me
            </a>
          </div>
          <button
            onClick={onNavigateLogin}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-[hsl(var(--cinema-foreground))] hover:scale-[1.03] transition-transform cursor-pointer"
          >
            Begin Journey
          </button>
        </nav>

        {/* Hero Content Box */}
        <motion.main 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 pt-10 pb-40"
        >
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise text-[hsl(var(--cinema-foreground))]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Where <em className="not-italic text-[hsl(var(--cinema-muted-foreground))]">progress</em> grows in the quiet, and <em className="not-italic text-[hsl(var(--cinema-muted-foreground))]">discipline speaks</em> when the world is asleep.
          </h1>
          <p className="text-[hsl(var(--cinema-muted-foreground))] text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            We're designing tools for deep thinkers, bold creators, and quiet rebels. 
            Amid the chaos, we build digital spaces for sharp focus and inspired work.
          </p>
          <button
            onClick={onNavigateLogin}
            className="liquid-glass rounded-full px-14 py-5 text-base text-[hsl(var(--cinema-foreground))] mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2"
          >
            Begin Journey
          </button>
        </motion.main>
      </section>

      {/* --- RESTORED LANDING CONTENT --- */}
      
      {/* Ambient background mix for lower sections */}
      <div className="absolute top-[120vh] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Features Grid — scroll reveal + tilt on hover */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 border-t border-[hsl(var(--cinema-muted-foreground))/10]">
        <ScrollReveal>
          <h2 className="text-sm font-bold text-[hsl(var(--cinema-muted-foreground))] uppercase tracking-[0.3em] text-center mb-16">
            The core loop
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <TiltCard className="bg-[hsl(var(--cinema-foreground))/0.02] border border-[hsl(var(--cinema-foreground))/0.05] rounded-2xl p-6 backdrop-blur-sm hover:border-[hsl(var(--cinema-foreground))/0.15] transition-colors h-full cursor-default">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${f.color}15` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold text-[hsl(var(--cinema-foreground))] mb-2">{f.title}</h3>
                <p className="text-sm text-[hsl(var(--cinema-muted-foreground))] leading-relaxed">{f.desc}</p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How-it-works — staggered scroll animation */}
      <section className="relative z-10 border-t border-[hsl(var(--cinema-muted-foreground))/10]">
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { step: '01', label: 'Add your habits', sub: 'Define habits and assign categories.' },
            { step: '02', label: 'Check in daily', sub: 'Toggle them off as you complete each one.' },
            { step: '03', label: 'Grow your streak', sub: 'Watch your consistency compound over time.' },
          ].map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="cursor-default"
              >
                <span className="text-5xl font-black text-[hsl(var(--cinema-foreground))/0.05]">{s.step}</span>
                <h4 className="text-lg font-bold text-[hsl(var(--cinema-foreground))] mt-3 mb-2">{s.label}</h4>
                <p className="text-sm text-[hsl(var(--cinema-muted-foreground))]">{s.sub}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 border-t border-[hsl(var(--cinema-muted-foreground))/10]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <ScrollReveal>
            <h3 
              className="text-4xl sm:text-5xl tracking-normal font-normal text-[hsl(var(--cinema-foreground))] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready to build momentum?
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[hsl(var(--cinema-muted-foreground))] mb-10 max-w-lg mx-auto">Join the habit builders who don't settle. Start tracking today — it's free.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <MagneticButton
              onClick={onNavigateLogin}
              className="group inline-flex items-center gap-3 mx-auto liquid-glass hover:scale-[1.03] text-[hsl(var(--cinema-foreground))] font-bold text-lg px-8 py-4 rounded-xl transition-transform"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Get Started with Google
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[hsl(var(--cinema-muted-foreground))/10] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-[hsl(var(--cinema-muted-foreground))]">&copy; {new Date().getFullYear()} HabitLoop</span>
          <span className="text-xs font-bold text-[hsl(var(--cinema-foreground))]">
            HabitLoop
          </span>
        </div>
      </footer>
    </div>
  );
}
