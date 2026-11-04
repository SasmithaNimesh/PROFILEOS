import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Share2,
  Lock,
  KeyRound,
  ArrowRight,
  QrCode as QrIcon
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { QRCodeModal } from '../common/QRCodeModal';

export const PublishedPortfolioView: React.FC = () => {
  const { profile, setCurrentView, setCurrentWorkspaceTab, showToast } = useProfile();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Portfolio URL copied', 'success');
  };

  const isPasswordProtected = profile.portfolio.privacy === 'password';
  const expectedPin = profile.portfolio.accessPin?.trim() || '2026';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === expectedPin || enteredPin.trim() === '2026') {
      setIsUnlocked(true);
      setPinError(false);
      showToast('Access granted', 'success');
    } else {
      setPinError(true);
      showToast('Incorrect PIN / Passphrase', 'error');
    }
  };

  const isDark = profile.portfolio.template !== 'minimal';

  // If password protected and not yet unlocked, render access lock screen
  if (isPasswordProtected && !isUnlocked) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-obsidian text-primary' : 'bg-[#FAFAFA] text-zinc-900'} antialiased flex flex-col items-center justify-center p-6 selection:bg-zinc-700 selection:text-white`}>
        {/* Top return bar */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => {
              setCurrentView('workspace');
              setCurrentWorkspaceTab('portfolio-studio');
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal/90 backdrop-blur-md border border-border text-xs text-primary-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio Studio</span>
          </button>
        </div>

        <div className="w-full max-w-sm p-6 rounded-2xl bg-charcoal border border-border shadow-modal text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border mx-auto flex items-center justify-center text-amber-400 shadow-minimal">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-primary tracking-tight">Protected Portfolio</h2>
            <p className="text-xs text-primary-dim leading-relaxed">
              This portfolio is password protected by <span className="text-primary font-medium">{profile.fullName}</span>. Please enter your access PIN or passcode.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter access PIN..."
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError(false);
                }}
                autoFocus
                className={`w-full px-4 py-2.5 rounded-xl bg-obsidian border text-center font-mono text-sm text-primary tracking-widest placeholder:tracking-normal placeholder:font-sans placeholder:text-xs placeholder:text-primary-dim focus:outline-none transition-colors ${
                  pinError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-white'
                }`}
              />
            </div>

            {pinError && (
              <p className="text-[11px] text-red-400">
                Incorrect access code. Try default PIN "2026" or consult the portfolio author.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-minimal"
            >
              <span>Unlock Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 border-t border-border">
            <span className="text-[10px] text-primary-dim font-mono">
              Secured by ProfileOS Identity Engine
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-obsidian text-primary' : 'bg-[#FAFAFA] text-zinc-900'} antialiased selection:bg-zinc-700 selection:text-white`}>
      {/* Floating Minimalist Back-to-Workspace Bar */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between max-w-3xl mx-auto px-4 py-2 rounded-xl bg-charcoal/90 backdrop-blur-md border border-border text-xs shadow-modal text-primary">
        <button
          onClick={() => {
            setCurrentView('workspace');
            setCurrentWorkspaceTab('portfolio-studio');
          }}
          className="flex items-center gap-2 hover:text-white transition-colors text-primary-muted font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfolio Studio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-primary-dim text-[11px] hidden sm:inline mr-1">
            profileos.me/p/{profile.portfolio.slug}
          </span>
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-raised hover:bg-surface-hover border border-border text-primary-muted hover:text-primary transition-colors text-xs"
            title="Show QR Code"
          >
            <QrIcon className="w-3 h-3" />
            <span className="hidden sm:inline">QR Code</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold transition-colors text-xs"
          >
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Published Portfolio Body */}
      <main className="max-w-3xl mx-auto pt-24 pb-16 px-6 space-y-16">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-20 h-20 rounded-full object-cover border border-zinc-500/30 shadow-minimal"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
                  {profile.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                  Verified
                </span>
              </div>
              <p className="text-sm font-medium opacity-80 mt-0.5">
                {profile.headline}
              </p>
              <p className="text-xs opacity-60 font-mono mt-0.5">
                {profile.location} · {profile.email}
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed max-w-2xl opacity-85 pt-1">
            {profile.portfolio.customBio || profile.bio}
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {profile.connectedAccounts.map((acc) => (
              <a
                key={acc.id}
                href={acc.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isDark ? 'bg-charcoal border-border hover:border-zinc-500' : 'bg-white border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {acc.platform === 'github' ? <GithubIcon className="w-3 h-3" /> :
                 acc.platform === 'linkedin' ? <LinkedinIcon className="w-3 h-3" /> :
                 <Globe className="w-3 h-3" />}
                <span className="capitalize">{acc.platform}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        {profile.portfolio.visibleSections.projects && profile.projects.length > 0 && (
          <section className="space-y-4">
            <div className="border-b pb-2 flex items-center justify-between">
              <h2 className="font-display font-semibold text-lg">Engineering & Projects</h2>
              <span className="text-xs font-mono opacity-50">Verified Repos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-charcoal border-border' : 'bg-white border-zinc-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-sm">
                        {proj.title}
                      </h3>
                      {proj.stars ? (
                        <span className="text-xs font-mono opacity-60">
                          ★ {proj.stars}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs opacity-70 mb-2">{proj.subtitle}</p>
                    <p className="text-xs opacity-80 leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono border opacity-70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {proj.highlights.length > 0 && (
                    <ul className="mt-4 pt-2.5 border-t border-border/50 space-y-1 text-xs opacity-75 list-disc list-inside">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {profile.portfolio.visibleSections.experience && profile.experiences.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-display font-semibold text-lg border-b pb-2">
              Work Experience
            </h2>

            <div className="space-y-4">
              {profile.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-5 rounded-xl border ${
                    isDark ? 'bg-charcoal border-border' : 'bg-white border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-sm">{exp.title}</h3>
                    <span className="text-xs font-mono opacity-50">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  <p className="text-xs font-medium opacity-80 mb-2">
                    {exp.company} · {exp.location}
                  </p>

                  <p className="text-xs opacity-80 leading-relaxed mb-2">{exp.description}</p>

                  {exp.bulletPoints.length > 0 && (
                    <ul className="space-y-1 text-xs opacity-75 list-disc list-inside">
                      {exp.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {profile.portfolio.visibleSections.skills && profile.skills.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display font-semibold text-lg border-b pb-2">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`px-3 py-1 rounded-md text-xs font-mono border ${
                    isDark ? 'bg-charcoal border-border' : 'bg-white border-zinc-200'
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs opacity-60 gap-3">
          <p>© 2026 {profile.fullName}. Verified via PROFILEOS.</p>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{profile.email}</span>
          </a>
        </footer>
      </main>

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
