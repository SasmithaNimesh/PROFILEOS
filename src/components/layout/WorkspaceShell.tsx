import React, { useState } from 'react';
import { useProfile, WorkspaceTab } from '../../context/ProfileContext';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WorkspaceTopBar } from './WorkspaceTopBar';
import { 
  LayoutDashboard, 
  UserCircle, 
  Globe, 
  FileText, 
  Mail, 
  FolderArchive, 
  Settings,
  X
} from 'lucide-react';

interface WorkspaceShellProps {
  children: React.ReactNode;
  onOpenCommandPalette: () => void;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({ 
  children,
  onOpenCommandPalette
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentWorkspaceTab, setCurrentWorkspaceTab, setCurrentView } = useProfile();

  const navItems: { id: WorkspaceTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile', icon: <UserCircle className="w-4 h-4" /> },
    { id: 'portfolio-studio', label: 'Portfolio Studio', icon: <Globe className="w-4 h-4" /> },
    { id: 'cv-studio', label: 'CV Studio', icon: <FileText className="w-4 h-4" /> },
    { id: 'cover-letter-studio', label: 'Cover Letter Studio', icon: <Mail className="w-4 h-4" /> },
    { id: 'documents', label: 'My Documents', icon: <FolderArchive className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-screen bg-obsidian text-primary overflow-hidden">
      {/* Desktop Sidebar */}
      <WorkspaceSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar */}
        <WorkspaceTopBar 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCommandPalette={onOpenCommandPalette}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-64 max-w-[80vw] bg-charcoal h-full p-5 flex flex-col gap-5 shadow-modal z-10 border-r border-border animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div 
                onClick={() => { setMobileMenuOpen(false); setCurrentView('landing'); }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-white text-black font-display font-bold text-xs flex items-center justify-center">
                  P
                </div>
                <span className="font-display font-bold text-base text-primary">PROFILEOS</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-primary-dim hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentWorkspaceTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentWorkspaceTab === item.id
                      ? 'bg-raised text-primary font-semibold border border-border'
                      : 'text-primary-muted hover:text-primary hover:bg-raised/40'
                  }`}
                >
                  <span className={currentWorkspaceTab === item.id ? 'text-white' : 'text-primary-dim'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-charcoal border-t border-border z-30 px-2 py-1.5 flex items-center justify-around text-xs">
        <button
          onClick={() => setCurrentWorkspaceTab('overview')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded text-[10px] ${
            currentWorkspaceTab === 'overview' ? 'text-white font-bold' : 'text-primary-dim'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setCurrentWorkspaceTab('profile')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded text-[10px] ${
            currentWorkspaceTab === 'profile' ? 'text-white font-bold' : 'text-primary-dim'
          }`}
        >
          <UserCircle className="w-4 h-4" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => setCurrentWorkspaceTab('cv-studio')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded text-[10px] ${
            currentWorkspaceTab === 'cv-studio' ? 'text-white font-bold' : 'text-primary-dim'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>CV</span>
        </button>

        <button
          onClick={() => setCurrentWorkspaceTab('portfolio-studio')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded text-[10px] ${
            currentWorkspaceTab === 'portfolio-studio' ? 'text-white font-bold' : 'text-primary-dim'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Portfolio</span>
        </button>

        <button
          onClick={() => setCurrentWorkspaceTab('documents')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded text-[10px] ${
            currentWorkspaceTab === 'documents' ? 'text-white font-bold' : 'text-primary-dim'
          }`}
        >
          <FolderArchive className="w-4 h-4" />
          <span>Docs</span>
        </button>
      </div>
    </div>
  );
};
