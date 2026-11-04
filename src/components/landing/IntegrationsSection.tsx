import React from 'react';
import { Globe, FileText, Code2, Database, ShieldCheck, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';

export const IntegrationsSection: React.FC = () => {
  const integrations = [
    { name: 'GitHub', desc: 'Sync repos, commits & stars', icon: <GithubIcon className="w-5 h-5 text-white" />, status: 'Official API' },
    { name: 'LinkedIn', desc: 'Verified profile credentials', icon: <LinkedinIcon className="w-5 h-5 text-zinc-300" />, status: 'OAuth 2.0' },
    { name: 'Resume PDF', desc: 'Multi-page document parser', icon: <FileText className="w-5 h-5 text-zinc-300" />, status: 'Instant OCR' },
    { name: 'Personal Domain', desc: 'Custom CNAME & SSL', icon: <Globe className="w-5 h-5 text-zinc-300" />, status: 'Edge DNS' },
    { name: 'Dribbble / Behance', desc: 'Creative design showcases', icon: <Code2 className="w-5 h-5 text-zinc-300" />, status: 'Direct Sync' },
    { name: 'Google Scholar', desc: 'Citations & peer reviews', icon: <Database className="w-5 h-5 text-zinc-300" />, status: 'DOI Lookup' },
  ];

  return (
    <section className="py-20 px-6 border-y border-border bg-charcoal/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary-dim mb-2">Supported Integrations</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight">
            Bring in what you already have.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-primary-muted">
            Connect verified accounts or paste links. Data is always extracted via sanctioned APIs and presented for your confirmation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-charcoal border border-border hover:border-white/20 transition-all duration-150 flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-lg bg-raised flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-sm font-semibold text-primary">{item.name}</h4>
              <p className="text-[11px] text-primary-muted mt-1 leading-snug">{item.desc}</p>
              <span className="mt-3 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-raised text-primary-dim border border-border/50">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
