import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ShieldCheck, Heart, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/BrandIcons';

export const PublicFooter: React.FC = () => {
  const { setCurrentView } = useProfile();

  return (
    <footer className="border-t border-border bg-charcoal/50 text-primary-muted py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-black font-display font-bold text-xs">
              P
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-primary">
              PROFILEOS
            </span>
          </div>
          <p className="text-xs text-primary-muted max-w-sm leading-relaxed">
            The professional identity platform. Unify your verified credentials, publications, projects, and work history into one authoritative source of truth.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary-dim mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>All systems operational · v2.4 Enterprise</span>
          </div>
        </div>

        {/* Column 1: Studios */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Studios</h4>
          <button onClick={() => setCurrentView('workspace')} className="text-left text-sm hover:text-primary transition-colors">Portfolio Studio</button>
          <button onClick={() => setCurrentView('workspace')} className="text-left text-sm hover:text-primary transition-colors">CV & Resume Studio</button>
          <button onClick={() => setCurrentView('workspace')} className="text-left text-sm hover:text-primary transition-colors">Cover Letter Studio</button>
          <button onClick={() => setCurrentView('workspace')} className="text-left text-sm hover:text-primary transition-colors">Identity Engine</button>
        </div>

        {/* Column 2: Integrations */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Integrations</h4>
          <span className="text-sm">GitHub Official API</span>
          <span className="text-sm">LinkedIn OAuth Verified</span>
          <span className="text-sm">PDF / DOCX Resume Parser</span>
          <span className="text-sm">Custom Domain Hosting</span>
        </div>

        {/* Column 3: Trust & Security */}
        <div className="flex flex-col gap-3 text-xs">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-primary">Security & Legal</h4>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-zinc-300" /> Zero Scraping Guarantee</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Data Portability (JSON Export)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-dim gap-4">
        <p>© 2026 PROFILEOS Inc. All rights reserved. Your career. Your identity. Your future.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-primary cursor-pointer transition-colors">Status</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Changelog</span>
          <span className="hover:text-primary cursor-pointer transition-colors">API Docs</span>
        </div>
      </div>
    </footer>
  );
};
