import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Globe, FileText, Mail, ArrowRight, Check } from 'lucide-react';

export const StudiosSection: React.FC = () => {
  const { setCurrentView, setCurrentWorkspaceTab, profile } = useProfile();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'cv' | 'cover-letter'>('cv');

  return (
    <section id="features" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-dim mb-2">Dedicated Workspaces</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
            Three Studios. Infinite Assets.
          </h2>
          <p className="mt-3 text-sm text-primary-muted leading-relaxed">
            The workspace is never a crowded dashboard. Each major discipline gets its own focused environment.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-xl bg-charcoal border border-border inline-flex gap-1">
            <button
              onClick={() => setActiveTab('cv')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cv'
                  ? 'bg-white text-black shadow-minimal'
                  : 'text-primary-muted hover:text-primary'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-white text-black shadow-minimal'
                  : 'text-primary-muted hover:text-primary'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Portfolio Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('cover-letter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cover-letter'
                  ? 'bg-white text-black shadow-minimal'
                  : 'text-primary-muted hover:text-primary'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Cover Letter Studio</span>
            </button>
          </div>
        </div>

        {/* Tab Content: CV Studio */}
        {activeTab === 'cv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal rounded-2xl border border-border p-6 lg:p-10 animate-in fade-in duration-150">
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-raised border border-border text-primary-dim uppercase tracking-wider mb-3">
                Split Live Editor
              </span>
              <h3 className="font-display font-bold text-2xl text-primary">
                CV & Resume Studio
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-primary-muted leading-relaxed">
                Build ATS-ready and designer-grade resumes with split-screen live editing. Direct in-paper editing with instant A4 updates.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-primary-dim">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-300" />
                  <span>5 templates: ATS Standard, Modern Slate, Swiss Minimal, Academic, Executive</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-300" />
                  <span>1-click export to PDF and native Microsoft Word (.docx)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Job description keyword match engine</span>
                </li>
              </ul>

              <button
                onClick={() => {
                  setCurrentView('workspace');
                  setCurrentWorkspaceTab('cv-studio');
                }}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
              >
                <span>Open CV Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual preview */}
            <div className="lg:col-span-7 bg-obsidian rounded-xl border border-border p-4 flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-1/2 bg-charcoal rounded-lg p-3 border border-border text-xs space-y-2">
                <span className="text-[10px] font-mono text-primary-dim">Controls & Sections</span>
                <div className="p-2 rounded bg-raised text-primary font-medium text-[11px]">Summary (Selected)</div>
                <div className="p-2 rounded bg-surface text-primary-dim text-[11px]">Experience (3 entries)</div>
                <div className="p-2 rounded bg-surface text-primary-dim text-[11px]">Projects (3 entries)</div>
                <div className="p-2 rounded bg-surface text-primary-dim text-[11px]">Skills (12 tags)</div>
              </div>

              <div className="w-full md:w-1/2 bg-white rounded-lg p-4 text-zinc-900 space-y-2 shadow-minimal">
                <div className="border-b border-zinc-900 pb-1.5">
                  <h4 className="font-bold text-xs">{profile.fullName}</h4>
                  <p className="text-[9px] text-zinc-500 font-mono">{profile.headline}</p>
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-900">Summary</div>
                <div className="h-1.5 w-full bg-zinc-200 rounded" />
                <div className="h-1.5 w-5/6 bg-zinc-200 rounded" />
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-900 mt-2">Experience</div>
                <div className="h-1.5 w-full bg-zinc-200 rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal rounded-2xl border border-border p-6 lg:p-10 animate-in fade-in duration-150">
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-raised border border-border text-primary-dim uppercase tracking-wider mb-3">
                Live Edge Hosting
              </span>
              <h3 className="font-display font-bold text-2xl text-primary">
                Portfolio Studio
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-primary-muted leading-relaxed">
                Generate clean, standalone web portfolios powered by your verified identity.
              </p>

              <button
                onClick={() => {
                  setCurrentView('workspace');
                  setCurrentWorkspaceTab('portfolio-studio');
                }}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
              >
                <span>Launch Portfolio Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-7 bg-obsidian rounded-xl border border-border p-5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border text-[10px] font-mono text-primary-dim">
                <span>profileos.me/p/{profile.portfolio.slug}</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="mt-3 p-4 rounded-lg bg-charcoal border border-border space-y-2">
                <h4 className="font-semibold text-primary">{profile.fullName}</h4>
                <p className="text-[11px] text-primary-dim">{profile.headline}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Cover Letter */}
        {activeTab === 'cover-letter' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal rounded-2xl border border-border p-6 lg:p-10 animate-in fade-in duration-150">
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-raised border border-border text-primary-dim uppercase tracking-wider mb-3">
                Targeted Alignment
              </span>
              <h3 className="font-display font-bold text-2xl text-primary">
                Cover Letter Studio
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-primary-muted leading-relaxed">
                Draft application letters tailored to any job role, strictly referencing verified experiences.
              </p>

              <button
                onClick={() => {
                  setCurrentView('workspace');
                  setCurrentWorkspaceTab('cover-letter-studio');
                }}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
              >
                <span>Write Cover Letter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-7 bg-charcoal rounded-xl border border-border p-4">
              <div className="p-4 rounded-lg bg-obsidian border border-border text-xs text-primary-dim font-mono space-y-1.5">
                <div className="text-primary font-sans font-semibold">Stripe Application</div>
                <div className="text-[11px] opacity-70">"I am writing to express my earnest enthusiasm for the role..."</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
