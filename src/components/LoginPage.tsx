import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onSignIn: () => void;
  onBack: () => void;
}

export function LoginPage({ onSignIn, onBack }: LoginPageProps) {
  return (
    <div 
      className="relative min-h-screen bg-[hsl(var(--cinema-background))] text-[hsl(var(--cinema-foreground))] overflow-hidden flex flex-col font-sans"
      style={{
        '--cinema-background': '201 100% 13%',
        '--cinema-foreground': '0 0% 100%',
        '--cinema-muted-foreground': '240 4% 66%',
        fontFamily: 'var(--font-body)',
      } as React.CSSProperties}
    >
      {/* Immersive ambient glows */}
      <div className="absolute top-[-20%] left-[20%] w-[40vw] h-[40vw] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex flex-row items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[hsl(var(--cinema-muted-foreground))] hover:text-[hsl(var(--cinema-foreground))] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
      </nav>

      {/* Auth Modal Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[420px] p-10 liquid-glass rounded-3xl border border-[hsl(var(--cinema-foreground))/5] text-center animate-fade-rise">
          
          <div 
            className="text-4xl tracking-tight text-[hsl(var(--cinema-foreground))] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            HabitLoop<sup className="text-xs">PRO</sup>
          </div>
          
          <p className="text-[hsl(var(--cinema-muted-foreground))] text-sm mb-10 leading-relaxed font-medium">
            Enter your deep work hub. Select a provider below to authenticate your session.
          </p>

          <button
            onClick={onSignIn}
            className="w-full flex items-center justify-center gap-3 bg-[hsl(var(--cinema-foreground))] text-[hsl(var(--cinema-background))] font-bold text-md px-6 py-4 rounded-xl hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
            <ArrowRight className="w-5 h-5 ml-1 opacity-50" />
          </button>
          
          <p className="mt-8 text-[11px] text-[hsl(var(--cinema-muted-foreground))/50] font-medium tracking-wide">
            BY CONTINUING, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY.
          </p>
        </div>
      </main>
    </div>
  );
}
