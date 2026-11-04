import React from 'react';
import { ArrowRight, Link2, UserCheck, Layers, Share2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      stage: 'CONNECT',
      headline: 'Bring it in',
      icon: <Link2 className="w-4 h-4 text-primary" />,
      items: [
        'Profile links & OAuth',
        'Document uploads (PDF/DOCX)',
        'Guided manual entry',
        'Review before saving'
      ]
    },
    {
      step: '02',
      stage: 'BUILD IDENTITY',
      headline: 'My Profile',
      icon: <UserCheck className="w-4 h-4 text-primary" />,
      items: [
        'One verified source of truth',
        'Edit every single section',
        'Real-time completion score',
        'Zero invented facts'
      ]
    },
    {
      step: '03',
      stage: 'CREATE',
      headline: 'Three studios',
      icon: <Layers className="w-4 h-4 text-primary" />,
      items: [
        'Portfolio Studio (Live site)',
        'CV Studio (Split live editor)',
        'Cover Letter Studio (Tone tailored)',
        '100% structured & editable'
      ]
    },
    {
      step: '04',
      stage: 'PUBLISH',
      headline: 'Share and keep',
      icon: <Share2 className="w-4 h-4 text-primary" />,
      items: [
        'Publish one-page portfolio',
        'Export vector PDF or DOCX',
        'Central My Documents library',
        'Version history & snapshots'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-dim mb-2">Mental Model & Flow</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
            How PROFILEOS Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-primary-muted leading-relaxed">
            A deterministic four-stage lifecycle designed to keep your career assets always synchronized and verifiable.
          </p>
        </div>

        {/* 4 Cards with Flow Arrows matching Page 4 of UI Designs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-charcoal border border-border hover:border-white/20 transition-all duration-150 flex flex-col justify-between group relative shadow-minimal"
            >
              <div>
                {/* Stage Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-primary-dim">
                    {s.step} {s.stage}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-raised flex items-center justify-center text-primary-muted group-hover:text-primary transition-colors">
                    {s.icon}
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-primary mb-3">
                  {s.headline}
                </h3>

                <ul className="space-y-2 text-xs text-primary-dim">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-zinc-300 transition-colors" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow indicator between cards on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-raised border border-border items-center justify-center text-primary-dim shadow-sm">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

