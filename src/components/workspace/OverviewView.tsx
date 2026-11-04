import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  Globe, 
  FileText, 
  Mail, 
  UserCircle, 
  ArrowRight, 
  FileCheck,
  Eye,
  QrCode as QrIcon,
  DownloadCloud,
  TrendingUp
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { 
    profile, 
    documents, 
    setCurrentWorkspaceTab, 
    setCurrentView 
  } = useProfile();

  const actionCards = [
    {
      title: 'Create Portfolio',
      desc: 'Publish a responsive one-page site.',
      icon: <Globe className="w-4 h-4 text-primary" />,
      action: () => setCurrentWorkspaceTab('portfolio-studio'),
      badge: profile.portfolio.published ? 'Live' : 'Draft'
    },
    {
      title: 'Create CV',
      desc: 'Build, edit, and export an ATS CV.',
      icon: <FileText className="w-4 h-4 text-primary" />,
      action: () => setCurrentWorkspaceTab('cv-studio'),
      badge: `${profile.cvs.length} Saved`
    },
    {
      title: 'Create Cover Letter',
      desc: 'Tailor a targeted application letter.',
      icon: <Mail className="w-4 h-4 text-primary" />,
      action: () => setCurrentWorkspaceTab('cover-letter-studio'),
      badge: `${profile.coverLetters.length} Saved`
    },
    {
      title: 'Manage Profile',
      desc: 'Update your verified identity source.',
      icon: <UserCircle className="w-4 h-4 text-primary" />,
      action: () => setCurrentWorkspaceTab('profile'),
      badge: `${profile.completionScore}% Score`
    },
  ];

  const recentDocs = documents.slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-150">
      {/* Welcome Heading (UI Designs Page 2) */}
      <div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight">
          Welcome back. Let’s build your <br className="hidden sm:inline" />
          professional identity.
        </h2>
        <p className="mt-2 text-sm text-primary-muted">
          Your professional information, portfolio, and career documents — all in one place.
        </p>
      </div>

      {/* 4 Clickable Action Cards (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {actionCards.map((card, idx) => (
          <div
            key={idx}
            onClick={card.action}
            className="p-5 rounded-2xl bg-charcoal border border-border hover:border-white/20 transition-all duration-150 cursor-pointer flex flex-col justify-between group shadow-minimal"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-raised border border-border text-primary group-hover:bg-white group-hover:text-black transition-colors">
                  {card.icon}
                </div>
                <span className="text-[10px] font-mono font-medium text-primary-dim px-2 py-0.5 rounded bg-surface border border-border">
                  {card.badge}
                </span>
              </div>
              <h3 className="font-display font-semibold text-base text-primary">
                {card.title}
              </h3>
              <p className="text-xs text-primary-muted mt-0.5">
                {card.desc}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-end text-xs font-medium text-primary-dim group-hover:text-primary transition-colors">
              <span className="mr-1">Open</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion Indicator */}
      <div className="p-5 rounded-2xl bg-charcoal border border-border space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-primary">Profile completion</span>
          <button
            onClick={() => setCurrentWorkspaceTab('profile')}
            className="text-primary-muted hover:text-white transition-colors text-[11px]"
          >
            {profile.nextStepPrompt} →
          </button>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-raised overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${profile.completionScore}%` }}
          />
        </div>

        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-primary-dim">
          <span>{profile.completionScore}% completed</span>
          <span>Verified source of truth</span>
        </div>
      </div>

      {/* Recruiter Activity & Minimalist Traffic Pulse */}
      <div className="p-5 rounded-2xl bg-charcoal border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-sm text-primary">Recruiter Pulse & Portfolio Traffic</h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-surface border border-border px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[11px] text-primary-dim mt-0.5">14-day discovery cadence across your published assets</p>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-primary-muted">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>+24.8% this week</span>
          </div>
        </div>

        {/* 3 Metric Tiles */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-obsidian border border-border/80 space-y-1">
            <div className="flex items-center gap-1.5 text-primary-dim text-[11px]">
              <Eye className="w-3.5 h-3.5" />
              <span>Portfolio Visits</span>
            </div>
            <div className="text-xl font-bold font-mono text-primary">342</div>
            <p className="text-[10px] text-primary-dim">Avg. session 2m 40s</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian border border-border/80 space-y-1">
            <div className="flex items-center gap-1.5 text-primary-dim text-[11px]">
              <QrIcon className="w-3.5 h-3.5" />
              <span>QR Code Scans</span>
            </div>
            <div className="text-xl font-bold font-mono text-primary">48</div>
            <p className="text-[10px] text-primary-dim">Direct badge & print</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian border border-border/80 space-y-1">
            <div className="flex items-center gap-1.5 text-primary-dim text-[11px]">
              <DownloadCloud className="w-3.5 h-3.5" />
              <span>Resume Downloads</span>
            </div>
            <div className="text-xl font-bold font-mono text-primary">29</div>
            <p className="text-[10px] text-primary-dim">PDF & DOCX exports</p>
          </div>
        </div>

        {/* Minimalist Monochrome Sparkline Chart */}
        <div className="p-3 rounded-xl bg-obsidian border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-primary-dim">
            <span>Oct 22</span>
            <span>14-Day Traffic Trajectory</span>
            <span>Nov 04</span>
          </div>

          <div className="w-full h-16 flex items-end">
            <svg viewBox="0 0 400 60" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="monochrome-pulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FAFAFA" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FAFAFA" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Subtle Hairline Grid */}
              <line x1="0" y1="15" x2="400" y2="15" stroke="#27272A" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1="35" x2="400" y2="35" stroke="#27272A" strokeDasharray="3 3" strokeWidth="0.8" />
              {/* Filled Area */}
              <path
                d="M0,52 C30,48 50,42 80,45 C110,48 130,36 160,32 C190,28 220,38 250,26 C280,18 310,24 340,16 C370,10 390,8 400,6 L400,60 L0,60 Z"
                fill="url(#monochrome-pulse)"
              />
              {/* Foreground Hairline Stroke */}
              <path
                d="M0,52 C30,48 50,42 80,45 C110,48 130,36 160,32 C190,28 220,38 250,26 C280,18 310,24 340,16 C370,10 390,8 400,6"
                fill="none"
                stroke="#FAFAFA"
                strokeWidth="1.8"
              />
              {/* Current Point Dot */}
              <circle cx="400" cy="6" r="3" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Referral Channels Breakdown */}
          <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-between text-[11px] text-primary-dim">
            <span className="font-medium text-primary">Top Referrals:</span>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span>LinkedIn: <strong className="text-primary font-semibold">48%</strong></span>
              <span>•</span>
              <span>GitHub: <strong className="text-primary font-semibold">32%</strong></span>
              <span>•</span>
              <span>Direct / QR: <strong className="text-primary font-semibold">20%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents Section */}
      {recentDocs.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm text-primary">Recent Documents</h3>
            <button
              onClick={() => setCurrentWorkspaceTab('documents')}
              className="text-xs text-primary-dim hover:text-primary transition-colors"
            >
              View all ({documents.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  if (doc.type === 'cv') setCurrentWorkspaceTab('cv-studio');
                  else if (doc.type === 'cover_letter') setCurrentWorkspaceTab('cover-letter-studio');
                  else if (doc.type === 'portfolio') setCurrentView('published-portfolio');
                  else setCurrentWorkspaceTab('documents');
                }}
                className="p-3.5 rounded-xl bg-charcoal border border-border hover:border-white/20 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-md bg-raised text-primary-dim shrink-0 group-hover:text-primary">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-semibold text-primary truncate">
                      {doc.title}
                    </h4>
                    <p className="text-[10px] text-primary-dim mt-0.5 truncate">{doc.meta}</p>
                  </div>
                </div>

                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-raised text-primary-dim shrink-0 ml-2">
                  {doc.format}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
