import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ArrowRight, CheckCircle2, Shield, FileCheck, Layers } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setAuthModal, setCurrentView, profile } = useProfile();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden">
      {/* Refined subtle radial vignette (no neon blur orbs) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised border border-border text-[11px] font-mono text-primary-muted tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CONNECT · BUILD · CREATE · PUBLISH</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.08] text-primary tracking-tight">
            Everything you’ve built. <br />
            <span className="text-primary-muted font-normal">
              One powerful professional identity.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-primary-muted max-w-xl leading-relaxed font-sans">
            Connect your professional world. Create your portfolio, CV, and personal brand — all from one verified source of truth.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setAuthModal('signup')}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-sm font-semibold transition-all duration-150 active:scale-[0.98] group"
            >
              <span>Create Your Identity</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => scrollTo('features')}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal hover:bg-raised border border-border text-primary-muted hover:text-primary text-sm font-medium transition-colors"
            >
              <span>Explore Features</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-primary-dim">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Single Source of Truth</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Live Standalone Portfolios</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>Vector PDF & Native Word DOCX</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Minimalist Composition (Page 1 of UI Designs) */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[500px] select-none">
          <div className="relative w-full max-w-[460px]">
            {/* Card 1: Portfolio One-Page Card (Dark zinc surface) */}
            <div className="w-[330px] sm:w-[370px] rounded-2xl bg-charcoal border border-border p-6 relative z-10 transition-transform hover:-translate-y-1 duration-200 shadow-elevated">
              <div className="w-12 h-1 rounded-full bg-white/40 mb-4" />
              <h3 className="font-display font-bold text-lg text-primary">{profile.fullName}</h3>
              <p className="text-[11px] text-primary-muted font-mono mt-0.5">Portfolio · One-Page</p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="h-14 rounded-xl bg-raised border border-border/60 flex items-center justify-center">
                  <div className="w-5 h-1.5 rounded bg-zinc-700" />
                </div>
                <div className="h-14 rounded-xl bg-raised border border-border/60 flex items-center justify-center">
                  <div className="w-5 h-1.5 rounded bg-zinc-700" />
                </div>
                <div className="h-14 rounded-xl bg-raised border border-border/60 flex items-center justify-center">
                  <div className="w-5 h-1.5 rounded bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Card 2: Minimalist Tilted CV Document Sheet (Right & elevated) */}
            <div 
              className="absolute -top-8 -right-2 sm:-right-6 w-[230px] sm:w-[260px] h-[320px] rounded-xl bg-zinc-100 text-zinc-900 shadow-modal p-5 z-20 transform rotate-2 hover:rotate-0 transition-all duration-200 cursor-pointer border border-zinc-300"
              onClick={() => setCurrentView('workspace')}
              title="Click to explore CV Studio"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-zinc-900 leading-tight">{profile.fullName}</h4>
                  <p className="text-[10px] text-zinc-500 font-medium">Target role</p>
                </div>
                <FileCheck className="w-3.5 h-3.5 text-zinc-700" />
              </div>

              {/* Minimalist Divider */}
              <div className="w-full h-[1.5px] bg-zinc-900 my-3" />

              <div className="space-y-1.5">
                <div className="h-1.5 w-12 bg-zinc-400 rounded" />
                <div className="h-1 w-full bg-zinc-300 rounded" />
                <div className="h-1 w-5/6 bg-zinc-300 rounded" />
                <div className="h-1 w-4/6 bg-zinc-300 rounded" />
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-14 bg-zinc-400 rounded" />
                <div className="h-1 w-full bg-zinc-300 rounded" />
                <div className="h-1 w-11/12 bg-zinc-300 rounded" />
                <div className="h-1 w-3/4 bg-zinc-300 rounded" />
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-10 bg-zinc-400 rounded" />
                <div className="flex gap-1 flex-wrap">
                  <div className="h-2.5 w-9 bg-zinc-300 rounded-full" />
                  <div className="h-2.5 w-11 bg-zinc-300 rounded-full" />
                  <div className="h-2.5 w-8 bg-zinc-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Card 3: Minimalist Professional Identity Pill Card (Bottom) */}
            <div className="absolute -bottom-8 left-4 sm:left-8 rounded-2xl bg-charcoal border border-border shadow-elevated p-3.5 flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-full bg-raised border border-border flex items-center justify-center text-primary font-bold text-sm">
                {profile.fullName.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-xs text-primary">{profile.fullName}</h4>
                <p className="text-[11px] text-primary-dim">Verified identity</p>
              </div>
              <div className="ml-3 pl-3 border-l border-border flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
