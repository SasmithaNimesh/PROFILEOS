import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileCheck2, UserCheck2, RefreshCw } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      title: 'No Unauthorized Scraping',
      desc: 'We never scrape private data or scrape platforms without permission. PROFILEOS connects only via official, authorized developer APIs.',
      icon: <EyeOff className="w-4 h-4 text-primary" />
    },
    {
      title: 'Human Review Principle',
      desc: 'Imported data always lands in an isolated review state. Nothing enters your verified profile graph until you explicitly accept it.',
      icon: <UserCheck2 className="w-4 h-4 text-primary" />
    },
    {
      title: 'Zero AI Fabrication',
      desc: 'Our generation engine is constrained to verified evidence. We never invent titles, metrics, or credentials to fill blanks.',
      icon: <ShieldCheck className="w-4 h-4 text-primary" />
    },
    {
      title: 'Full Data Portability',
      desc: 'Your career records are never locked in. Export your entire profile as raw JSON, ATS-ready DOCX, or vector PDF whenever you want.',
      icon: <FileCheck2 className="w-4 h-4 text-primary" />
    }
  ];

  return (
    <section id="trust" className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-dim mb-2">Integrity & Privacy</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight">
            Built on Truth Over Polish.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-primary-muted leading-relaxed">
            The core tenet of PROFILEOS: articulate your real accomplishments with precision, never invent falsehoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-charcoal border border-border flex flex-col items-start text-left shadow-minimal"
            >
              <div className="p-2 rounded-lg bg-raised border border-border mb-3 text-primary">
                {item.icon}
              </div>
              <h3 className="font-semibold text-sm text-primary mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-primary-dim leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

