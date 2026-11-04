import React, { useState } from 'react';
import { useProfile, WorkspaceTab } from '../../context/ProfileContext';
import { 
  Bell, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  LogOut, 
  RotateCcw, 
  User, 
  Globe, 
  SlidersHorizontal,
  ChevronDown,
  Menu,
  Command
} from 'lucide-react';

interface WorkspaceTopBarProps {
  onOpenMobileMenu: () => void;
  onOpenCommandPalette: () => void;
}

export const WorkspaceTopBar: React.FC<WorkspaceTopBarProps> = ({ 
  onOpenMobileMenu,
  onOpenCommandPalette 
}) => {
  const { 
    currentWorkspaceTab, 
    setCurrentWorkspaceTab, 
    profile, 
    logout, 
    resetToDefaults, 
    setCurrentView,
    acceptImportedItem,
    discardImportedItem
  } = useProfile();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getPageTitle = (tab: WorkspaceTab) => {
    switch (tab) {
      case 'overview': return 'Overview';
      case 'profile': return 'My Profile';
      case 'portfolio-studio': return 'Portfolio Studio';
      case 'cv-studio': return 'CV & Resume Studio';
      case 'cover-letter-studio': return 'Cover Letter Studio';
      case 'documents': return 'My Documents';
      case 'settings': return 'Settings';
    }
  };

  const pendingImports = profile.importedQueue.filter(i => i.status === 'pending');

  return (
    <header className="h-14 px-5 bg-charcoal/80 backdrop-blur-md border-b border-border flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile trigger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-primary-muted hover:text-primary hover:bg-raised transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-primary-dim hidden sm:inline">Workspace</span>
          <span className="text-primary-dim hidden sm:inline">/</span>
          <h1 className="font-display font-semibold text-sm text-primary">
            {getPageTitle(currentWorkspaceTab)}
          </h1>
        </div>
      </div>

      {/* Middle: Command Palette Quick Trigger */}
      <div className="hidden sm:flex items-center">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-all w-48 sm:w-64 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-primary-dim" />
            <span className="text-[11px] truncate">Search commands...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-charcoal text-primary-dim border border-border">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Profile Completion Badge */}
        <button
          onClick={() => setCurrentWorkspaceTab('profile')}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[11px]">{profile.completionScore}% Complete</span>
        </button>

        {/* View Published Portfolio if live */}
        {profile.portfolio.published && (
          <button
            onClick={() => setCurrentView('published-portfolio')}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs font-medium text-primary-muted hover:text-primary transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-primary-dim" />
          </button>
        )}

        {/* Notifications / Import Queue Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 rounded-lg text-primary-muted hover:text-primary hover:bg-raised transition-colors relative"
            title="Import Review Queue & Notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingImports.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-charcoal border border-border shadow-modal p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-primary">Import Queue</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-raised text-primary-muted border border-border">
                    {pendingImports.length} pending
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-primary-dim hover:text-primary"
                >
                  Close
                </button>
              </div>

              <div className="py-2 max-h-72 overflow-y-auto flex flex-col gap-2">
                {pendingImports.length === 0 ? (
                  <div className="py-6 text-center text-xs text-primary-dim">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                    All imported items reviewed.
                  </div>
                ) : (
                  pendingImports.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-raised border border-border flex flex-col gap-2"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-mono text-primary-dim">
                          {item.category} · {item.source}
                        </span>
                        <h4 className="text-xs font-semibold text-primary">{item.title}</h4>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-border/50">
                        <button
                          onClick={() => acceptImportedItem(item.id)}
                          className="flex-1 py-1 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => discardImportedItem(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-surface hover:bg-border text-primary-muted text-xs transition-colors"
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-raised transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-raised border border-border flex items-center justify-center text-primary font-semibold text-xs">
              {profile.fullName.charAt(0)}
            </div>
            <ChevronDown className="w-3 h-3 text-primary-dim" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-charcoal border border-border shadow-modal p-1.5 z-50 animate-in fade-in slide-in-from-top-2 flex flex-col gap-0.5">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold text-primary">{profile.fullName}</p>
                <p className="text-[10px] text-primary-dim truncate">{profile.email}</p>
              </div>

              <button
                onClick={() => { setUserMenuOpen(false); setCurrentWorkspaceTab('profile'); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-primary-muted hover:text-primary hover:bg-raised text-left transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => { setUserMenuOpen(false); setCurrentWorkspaceTab('settings'); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-primary-muted hover:text-primary hover:bg-raised text-left transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Account Settings</span>
              </button>

              <button
                onClick={() => { setUserMenuOpen(false); resetToDefaults(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-primary-dim hover:text-primary hover:bg-raised text-left transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Identity</span>
              </button>

              <div className="my-1 border-t border-border" />

              <button
                onClick={() => { setUserMenuOpen(false); logout(); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/20 text-left transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
