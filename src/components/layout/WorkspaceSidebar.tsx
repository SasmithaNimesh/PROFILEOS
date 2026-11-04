import React from 'react';
import { useProfile, WorkspaceTab } from '../../context/ProfileContext';
import { 
  LayoutDashboard, 
  UserCircle, 
  Globe, 
  FileText, 
  Mail, 
  FolderArchive, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface WorkspaceSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  collapsed,
  onToggleCollapse,
}) => {
  const { currentWorkspaceTab, setCurrentWorkspaceTab, setCurrentView, profile } = useProfile();

  const navItems: { id: WorkspaceTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile', icon: <UserCircle className="w-4 h-4" /> },
    { id: 'portfolio-studio', label: 'Portfolio Studio', icon: <Globe className="w-4 h-4" />, badge: profile.portfolio.published ? 'Live' : undefined },
    { id: 'cv-studio', label: 'CV Studio', icon: <FileText className="w-4 h-4" /> },
    { id: 'cover-letter-studio', label: 'Cover Letter Studio', icon: <Mail className="w-4 h-4" /> },
    { id: 'documents', label: 'My Documents', icon: <FolderArchive className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`relative hidden md:flex flex-col bg-charcoal border-r border-border transition-all duration-200 z-30 shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border">
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer overflow-hidden group"
        >
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0 text-black font-display font-bold text-xs">
            P
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-base tracking-tight text-primary truncate">
              PROFILEOS
            </span>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-primary-dim hover:text-primary hover:bg-raised transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentWorkspaceTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentWorkspaceTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-raised text-primary font-semibold border border-border shadow-minimal'
                  : 'text-primary-muted hover:text-primary hover:bg-raised/40'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className={`shrink-0 ${isActive ? 'text-white' : 'text-primary-dim group-hover:text-primary'}`}>
                {item.icon}
              </div>

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between truncate text-left">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-surface border border-border text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Published Portfolio Quick Link */}
      {!collapsed && profile.portfolio.published && (
        <div className="p-3 m-2.5 rounded-xl bg-raised border border-border flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] text-primary-dim">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Site
            </span>
          </div>
          <button
            onClick={() => setCurrentView('published-portfolio')}
            className="flex items-center justify-between text-[11px] font-mono text-primary-muted hover:text-primary transition-colors group text-left"
          >
            <span className="truncate">profileos.me/p/{profile.portfolio.slug}</span>
            <ExternalLink className="w-3 h-3 shrink-0 ml-1 opacity-60 group-hover:opacity-100" />
          </button>
        </div>
      )}

      {/* User profile capsule */}
      <div className="p-3 border-t border-border flex items-center gap-2.5">
        <img
          src={profile.avatarUrl}
          alt={profile.fullName}
          className="w-7 h-7 rounded-full object-cover border border-border shrink-0"
        />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-semibold text-primary truncate leading-tight">{profile.fullName}</h5>
            <p className="text-[10px] text-primary-dim truncate">{profile.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
