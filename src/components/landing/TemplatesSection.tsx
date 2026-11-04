import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { TEMPLATE_GALLERY } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export const TemplatesSection: React.FC = () => {
  const { setCurrentView, setCurrentWorkspaceTab } = useProfile();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Developer & Tech', 'Design & Creative', 'Corporate & Finance', 'Research & Academia'];

  const filteredTemplates = filter === 'All'
    ? TEMPLATE_GALLERY
    : TEMPLATE_GALLERY.filter(t => t.category === filter);

  return (
    <section id="templates" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-dim mb-2">Architectural Systems</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
            Curated Template Systems
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-primary-muted">
            Engineered for ATS compliance, executive presence, and modern web portfolios.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-charcoal text-primary-dim hover:text-primary border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-5 rounded-2xl bg-charcoal border border-border hover:border-white/20 transition-all flex flex-col justify-between group shadow-minimal"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-primary-dim">
                    {tpl.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-raised text-primary-dim border border-border">
                    {tpl.previewBadge}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-base text-primary">
                  {tpl.name}
                </h3>

                <p className="mt-1.5 text-xs text-primary-dim leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('workspace');
                  setCurrentWorkspaceTab(tpl.type.includes('Portfolio') ? 'portfolio-studio' : 'cv-studio');
                }}
                className="mt-6 w-full py-2 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs font-medium text-primary-muted hover:text-primary flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
