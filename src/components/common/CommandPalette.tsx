import React, { useState, useEffect } from 'react';
import { useProfile, WorkspaceTab } from '../../context/ProfileContext';
import { 
  Search, 
  LayoutDashboard, 
  UserCircle, 
  Globe, 
  FileText, 
  Mail, 
  FolderArchive, 
  Settings, 
  Download, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  Command,
  X
} from 'lucide-react';
import { exportCVToDocx } from '../../utils/exportDocx';
import { exportCVToPdf } from '../../utils/exportPdf';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { 
    setCurrentView, 
    setCurrentWorkspaceTab, 
    resetToDefaults, 
    showToast,
    profile,
    activeCV
  } = useProfile();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandItems = [
    {
      id: 'nav-overview',
      category: 'Navigation',
      label: 'Overview',
      desc: 'Workspace dashboard and quick actions',
      icon: <LayoutDashboard className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('overview'); onClose(); }
    },
    {
      id: 'nav-profile',
      category: 'Navigation',
      label: 'My Profile',
      desc: 'Manage verified single source of truth',
      icon: <UserCircle className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('profile'); onClose(); }
    },
    {
      id: 'nav-cv-studio',
      category: 'Navigation',
      label: 'CV & Resume Studio',
      desc: 'Split-screen live CV editor',
      icon: <FileText className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('cv-studio'); onClose(); }
    },
    {
      id: 'nav-portfolio',
      category: 'Navigation',
      label: 'Portfolio Studio',
      desc: 'Build & publish personal website',
      icon: <Globe className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('portfolio-studio'); onClose(); }
    },
    {
      id: 'nav-cover-letter',
      category: 'Navigation',
      label: 'Cover Letter Studio',
      desc: 'Generate targeted cover letters',
      icon: <Mail className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('cover-letter-studio'); onClose(); }
    },
    {
      id: 'nav-docs',
      category: 'Navigation',
      label: 'My Documents',
      desc: 'Library of generated assets and exports',
      icon: <FolderArchive className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('documents'); onClose(); }
    },
    {
      id: 'nav-settings',
      category: 'Navigation',
      label: 'Settings & Sovereignty',
      desc: 'Data export, preferences and accounts',
      icon: <Settings className="w-4 h-4" />,
      action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('settings'); onClose(); }
    },
    {
      id: 'act-export-pdf',
      category: 'Actions',
      label: 'Export Current CV to PDF',
      desc: 'Generate vector-rendered PDF document',
      icon: <Download className="w-4 h-4" />,
      action: async () => {
        onClose();
        showToast('Exporting PDF...', 'info');
        await exportCVToPdf('cv-render-paper', `${profile.fullName.replace(/\s+/g, '_')}_CV`);
        showToast('PDF Export complete', 'success');
      }
    },
    {
      id: 'act-export-docx',
      category: 'Actions',
      label: 'Export Current CV to DOCX',
      desc: 'Native Microsoft Word format',
      icon: <Download className="w-4 h-4" />,
      action: async () => {
        onClose();
        showToast('Exporting Word DOCX...', 'info');
        await exportCVToDocx(profile, activeCV);
        showToast('DOCX Export complete', 'success');
      }
    },
    {
      id: 'act-live-portfolio',
      category: 'Actions',
      label: 'View Published Live Portfolio',
      desc: `Open profileos.me/p/${profile.portfolio.slug}`,
      icon: <Globe className="w-4 h-4" />,
      action: () => { setCurrentView('published-portfolio'); onClose(); }
    },
    {
      id: 'act-reset-demo',
      category: 'Actions',
      label: 'Reset Demo Identity',
      desc: 'Restore Alex Chen verified profile defaults',
      icon: <RotateCcw className="w-4 h-4" />,
      action: () => { resetToDefaults(); onClose(); }
    }
  ];

  const filteredCommands = commandItems.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative w-full max-w-xl rounded-2xl bg-charcoal border border-border/80 shadow-modal overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-4 h-4 text-primary-dim shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            autoFocus
            className="w-full py-4 bg-transparent text-sm text-primary placeholder:text-primary-dim focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-raised text-primary-muted border border-border">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-primary-dim">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-raised text-primary border border-white/10' 
                      : 'text-primary-muted hover:bg-raised/40 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'bg-surface text-primary-dim'}`}>
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-primary">{item.label}</span>
                      <p className="text-[11px] text-primary-dim truncate">{item.desc}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-primary-dim px-2 py-0.5 rounded bg-surface shrink-0 ml-2">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-obsidian border-t border-border flex items-center justify-between text-[11px] text-primary-dim">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>esc Dismiss</span>
          </div>
          <span className="font-mono text-[10px]">PROFILEOS Command Engine</span>
        </div>
      </div>
    </div>
  );
};

