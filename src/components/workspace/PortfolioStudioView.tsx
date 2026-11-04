import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  Globe, 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2,
  QrCode as QrIcon,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { PortfolioTemplateId } from '../../types/profile';
import { QRCodeModal } from '../common/QRCodeModal';

export const PortfolioStudioView: React.FC = () => {
  const { 
    profile, 
    updatePortfolioConfig, 
    togglePublishPortfolio, 
    setCurrentView, 
    showToast 
  } = useProfile();

  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'template' | 'sections' | 'styling' | 'privacy'>('template');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const templates: { id: PortfolioTemplateId; name: string; desc: string; previewBadge: string }[] = [
    { id: 'modern', name: '02 Monochrome Architect', desc: 'Obsidian dark, hairline wireframe borders, clean typography, structured layout.', previewBadge: 'Dark Minimal' },
    { id: 'minimal', name: '01 Swiss Minimalist', desc: 'Crisp light stone background, generous whitespace, asymmetric editorial composition.', previewBadge: 'Light Minimal' },
    { id: 'creative', name: '03 Vanguard Editorial', desc: 'High density, typographic emphasis, project wireframes without decorative noise.', previewBadge: 'Clean Monospace' }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://profileos.me/p/${profile.portfolio.slug}`);
    setCopiedLink(true);
    showToast('Link copied', 'success', `https://profileos.me/p/${profile.portfolio.slug}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isPublished = profile.portfolio.published;

  return (
    <div className="h-full flex flex-col bg-obsidian text-primary overflow-hidden">
      {/* Studio Top Control Bar */}
      <div className="h-14 px-5 bg-charcoal border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-mono text-primary-dim">Portfolio Studio /</span>
            <span className="font-semibold text-primary">
              profileos.me/p/{profile.portfolio.slug}
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 border ${
            isPublished 
              ? 'bg-surface border-border text-emerald-400'
              : 'bg-surface border-border text-primary-dim'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-400' : 'bg-primary-dim'}`} />
            <span>{isPublished ? 'Live' : 'Draft'}</span>
          </span>
        </div>

        {/* Center: Device Viewport Toggle */}
        <div className="hidden md:flex items-center gap-0.5 p-0.5 rounded-lg bg-raised border border-border">
          <button
            onClick={() => setDeviceViewport('desktop')}
            className={`p-1.5 rounded transition-colors ${deviceViewport === 'desktop' ? 'bg-charcoal text-white shadow-minimal' : 'text-primary-dim hover:text-primary'}`}
            title="Desktop view"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`p-1.5 rounded transition-colors ${deviceViewport === 'tablet' ? 'bg-charcoal text-white shadow-minimal' : 'text-primary-dim hover:text-primary'}`}
            title="Tablet view"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`p-1.5 rounded transition-colors ${deviceViewport === 'mobile' ? 'bg-charcoal text-white shadow-minimal' : 'text-primary-dim hover:text-primary'}`}
            title="Mobile view"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Vector QR Code Generator Trigger */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-colors"
            title="Generate Vector QR Code for business cards and resumes"
          >
            <QrIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QR Code</span>
          </button>

          {isPublished && (
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('published-portfolio')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live View</span>
          </button>

          <button
            onClick={togglePublishPortfolio}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isPublished
                ? 'bg-raised hover:bg-red-950/20 border border-border text-red-400'
                : 'bg-white hover:bg-zinc-200 text-black'
            }`}
          >
            <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* LEFT CONFIGURATION PANE */}
        <div className="w-full md:w-72 lg:w-80 border-r border-border bg-charcoal/80 flex flex-col h-full shrink-0 overflow-y-auto">
          {/* Sub-tabs */}
          <div className="flex items-center border-b border-border text-xs">
            <button
              onClick={() => setActiveTab('template')}
              className={`flex-1 py-2.5 font-medium text-center transition-colors border-b-2 -mb-[1px] ${
                activeTab === 'template' ? 'border-white text-white' : 'border-transparent text-primary-dim hover:text-primary'
              }`}
            >
              Archetype
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`flex-1 py-2.5 font-medium text-center transition-colors border-b-2 -mb-[1px] ${
                activeTab === 'sections' ? 'border-white text-white' : 'border-transparent text-primary-dim hover:text-primary'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActiveTab('styling')}
              className={`flex-1 py-2.5 font-medium text-center transition-colors border-b-2 -mb-[1px] ${
                activeTab === 'styling' ? 'border-white text-white' : 'border-transparent text-primary-dim hover:text-primary'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-2.5 font-medium text-center transition-colors border-b-2 -mb-[1px] flex items-center justify-center gap-1 ${
                activeTab === 'privacy' ? 'border-white text-white' : 'border-transparent text-primary-dim hover:text-primary'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>

          <div className="p-4 space-y-5 flex-1">
            {/* TAB: Template Selection */}
            {activeTab === 'template' && (
              <div className="space-y-3 animate-in fade-in">
                <span className="text-xs font-semibold text-primary">Minimalist Archetypes</span>
                <p className="text-[11px] text-primary-dim">
                  Structured layout systems without decorative gradients or color clutter.
                </p>

                <div className="space-y-2">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => updatePortfolioConfig({ template: tpl.id })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        profile.portfolio.template === tpl.id
                          ? 'bg-raised border-white/30 shadow-minimal'
                          : 'bg-charcoal border-border hover:bg-raised/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-semibold text-primary">{tpl.name}</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-primary-dim">
                          {tpl.previewBadge}
                        </span>
                      </div>
                      <p className="text-[11px] text-primary-dim leading-snug">{tpl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Section Visibility */}
            {activeTab === 'sections' && (
              <div className="space-y-3 animate-in fade-in">
                <span className="text-xs font-semibold text-primary">Visible Sections</span>
                <div className="space-y-2">
                  {Object.entries(profile.portfolio.visibleSections).map(([secKey, isVisible]) => (
                    <label
                      key={secKey}
                      className="p-2.5 rounded-lg bg-raised border border-border flex items-center justify-between text-xs text-primary-muted cursor-pointer hover:text-primary"
                    >
                      <span className="capitalize">{secKey}</span>
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) => updatePortfolioConfig({
                          visibleSections: {
                            ...profile.portfolio.visibleSections,
                            [secKey]: e.target.checked
                          }
                        })}
                        className="w-3.5 h-3.5 rounded text-white bg-charcoal border-border focus:ring-0"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Styling */}
            {activeTab === 'styling' && (
              <div className="space-y-4 animate-in fade-in text-xs">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">URL Slug</label>
                  <div className="flex items-center rounded-lg bg-raised border border-border px-2.5 py-1.5 font-mono text-[11px]">
                    <span className="text-primary-dim">profileos.me/p/</span>
                    <input
                      type="text"
                      value={profile.portfolio.slug}
                      onChange={(e) => updatePortfolioConfig({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                      className="bg-transparent text-primary font-semibold focus:outline-none flex-1 ml-0.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Introductory Statement</label>
                  <textarea
                    rows={4}
                    value={profile.portfolio.customBio || profile.bio}
                    onChange={(e) => updatePortfolioConfig({ customBio: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB: Privacy & Access Lock */}
            {activeTab === 'privacy' && (
              <div className="space-y-4 animate-in fade-in text-xs">
                <div>
                  <span className="text-xs font-semibold text-primary">Portfolio Access & Privacy</span>
                  <p className="text-[11px] text-primary-dim mt-0.5">
                    Control how recruiters, clients, and search engines access your live portfolio.
                  </p>
                </div>

                {/* Privacy Radios */}
                <div className="space-y-2">
                  <div
                    onClick={() => updatePortfolioConfig({ privacy: 'public' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      (profile.portfolio.privacy || 'public') === 'public'
                        ? 'bg-raised border-white/40 shadow-minimal'
                        : 'bg-charcoal border-border hover:bg-raised/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold text-primary text-xs">Public Access</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-emerald-400">
                        Default
                      </span>
                    </div>
                    <p className="text-[11px] text-primary-dim leading-snug">
                      Open to anyone with the link. Search engine indexed and publicly shareable.
                    </p>
                  </div>

                  <div
                    onClick={() => updatePortfolioConfig({ privacy: 'password' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      profile.portfolio.privacy === 'password'
                        ? 'bg-raised border-white/40 shadow-minimal'
                        : 'bg-charcoal border-border hover:bg-raised/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-primary text-xs">Password / PIN Protected</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-amber-400">
                        Restricted
                      </span>
                    </div>
                    <p className="text-[11px] text-primary-dim leading-snug">
                      Requires visitors to input a designated PIN or secret passcode before viewing.
                    </p>
                  </div>

                  <div
                    onClick={() => updatePortfolioConfig({ privacy: 'unlisted' })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      profile.portfolio.privacy === 'unlisted'
                        ? 'bg-raised border-white/40 shadow-minimal'
                        : 'bg-charcoal border-border hover:bg-raised/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-primary-muted" />
                        <span className="font-semibold text-primary text-xs">Unlisted (Noindex)</span>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-primary-dim">
                        Direct Only
                      </span>
                    </div>
                    <p className="text-[11px] text-primary-dim leading-snug">
                      Accessible only to those with the exact link. Hidden from search crawlers and aggregators.
                    </p>
                  </div>
                </div>

                {/* Password / PIN Input Box if password mode is selected */}
                {profile.portfolio.privacy === 'password' && (
                  <div className="p-3.5 rounded-xl bg-surface border border-border space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 text-primary">
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      <label className="text-xs font-semibold">Access PIN / Passphrase</label>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 2026 or stealth-access"
                      value={profile.portfolio.accessPin || ''}
                      onChange={(e) => updatePortfolioConfig({ accessPin: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary font-mono focus:border-white focus:outline-none"
                    />
                    <p className="text-[10px] text-primary-dim">
                      Share this PIN with hiring managers or NDA clients to grant access.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW CANVAS */}
        <div className="flex-1 bg-obsidian p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
          <div
            className={`transition-all duration-200 rounded-xl shadow-elevated overflow-hidden border border-border ${
              deviceViewport === 'desktop' ? 'w-full max-w-3xl' :
              deviceViewport === 'tablet' ? 'w-[680px]' :
              'w-[360px]'
            } ${profile.portfolio.template === 'minimal' ? 'bg-[#FAFAFA] text-zinc-900' : 'bg-charcoal text-primary'}`}
          >
            {/* Minimalist Top Bar Mock */}
            <div className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
              profile.portfolio.template === 'minimal' ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-raised border-border text-primary-dim'
            }`}>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
              </div>
              <span className="font-mono text-[10px] truncate">
                profileos.me/p/{profile.portfolio.slug}
              </span>
              <div />
            </div>

            {/* LIVE PORTFOLIO PREVIEW */}
            <div className="p-8 sm:p-10 space-y-10">
              {/* Hero */}
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-14 h-14 rounded-full object-cover border border-zinc-500/20"
                  />
                  <div>
                    <h1 className="font-display font-bold text-2xl tracking-tight">
                      {profile.fullName}
                    </h1>
                    <p className="text-xs font-medium text-primary-muted mt-0.5">
                      {profile.headline}
                    </p>
                    <p className="text-[10px] opacity-60 font-mono mt-0.5">
                      {profile.location} · {profile.email}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed max-w-xl opacity-80 pt-1">
                  {profile.portfolio.customBio || profile.bio}
                </p>
              </div>

              {/* Projects */}
              {profile.portfolio.visibleSections.projects && profile.projects.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-semibold text-sm border-b pb-1.5 flex items-center justify-between">
                    <span>Selected Projects</span>
                    <span className="text-[10px] font-mono opacity-50">Verified Repos</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className={`p-4 rounded-xl border ${
                          profile.portfolio.template === 'minimal' 
                            ? 'bg-white border-zinc-200' 
                            : 'bg-raised border-border'
                        }`}
                      >
                        <div className="flex items-baseline justify-between mb-1">
                          <h4 className="font-semibold text-xs">{proj.title}</h4>
                          {proj.stars ? (
                            <span className="text-[10px] font-mono opacity-60">★ {proj.stars}</span>
                          ) : null}
                        </div>
                        <p className="text-[11px] opacity-70 leading-snug">{proj.subtitle}</p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.tags.map((t, idx) => (
                            <span key={idx} className="px-1.5 py-0.2 rounded text-[9px] font-mono border opacity-70">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {profile.portfolio.visibleSections.experience && profile.experiences.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display font-semibold text-sm border-b pb-1.5">Experience</h3>
                  <div className="space-y-3">
                    {profile.experiences.map((exp) => (
                      <div key={exp.id} className="space-y-0.5">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-semibold text-xs">{exp.title}</h4>
                          <span className="text-[10px] font-mono opacity-50">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-70">{exp.company} · {exp.location}</p>
                        <p className="text-[11px] opacity-75 leading-relaxed pt-0.5">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {profile.portfolio.visibleSections.skills && profile.skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-sm border-b pb-1.5">Competencies</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono border opacity-80"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="pt-6 border-t flex items-center justify-between text-[11px] opacity-60">
                <span>© 2026 {profile.fullName}</span>
                <span className="font-mono">{profile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vector QR Code Modal */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        url={`https://profileos.me/p/${profile.portfolio.slug}`}
        title={`${profile.fullName} Portfolio`}
        subtitle={`profileos.me/p/${profile.portfolio.slug}`}
      />
    </div>
  );
};
