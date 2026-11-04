import React from 'react';
import { X, Command, Keyboard, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useProfile, WorkspaceTab } from '../../context/ProfileContext';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentWorkspaceTab, setCurrentView, currentView } = useProfile();

  if (!isOpen) return null;

  const shortcutGroups = [
    {
      group: 'Workspace Navigation',
      items: [
        { key: '1', desc: 'Jump to Canonical Profile Editor', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('profile'); onClose(); } },
        { key: '2', desc: 'Jump to CV Studio (WYSIWYG Paper)', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('cv-studio'); onClose(); } },
        { key: '3', desc: 'Jump to Cover Letter Studio', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('cover-letter-studio'); onClose(); } },
        { key: '4', desc: 'Jump to Portfolio Studio', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('portfolio-studio'); onClose(); } },
        { key: '5', desc: 'Jump to Overview Dashboard', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('overview'); onClose(); } },
        { key: '6', desc: 'Jump to My Document Vault', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('documents'); onClose(); } },
        { key: '7', desc: 'Jump to Workspace Settings & Theme', action: () => { setCurrentView('workspace'); setCurrentWorkspaceTab('settings'); onClose(); } },
      ]
    },
    {
      group: 'Global & System',
      items: [
        { key: '⌘ K / Ctrl+K', desc: 'Open Unified Command Palette', action: null },
        { key: '?', desc: 'Show Keyboard Shortcuts (this modal)', action: null },
        { key: 'Esc', desc: 'Dismiss active modal or overlay', action: null },
      ]
    },
    {
      group: 'CV Studio Actions',
      items: [
        { key: 'Click Text', desc: 'Direct in-paper WYSIWYG editing', action: null },
        { key: 'Hover Bullet', desc: 'Invoke Google XYZ Formula Rewriter', action: null },
        { key: '⌘ E', desc: 'Export CV directly to vector PDF', action: null },
        { key: '⌘ D', desc: 'Export CV to Microsoft Word DOCX', action: null },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-charcoal border border-border rounded-2xl shadow-modal overflow-hidden text-primary flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary-muted">
              <Keyboard className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">Keyboard Shortcuts</h3>
              <p className="text-[11px] text-primary-dim">Power navigation and fast-path actions</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-primary-dim hover:text-primary hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <h4 className="text-[11px] font-mono text-primary-dim uppercase tracking-wider">
                {group.group}
              </h4>
              <div className="space-y-1.5">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={item.action ? item.action : undefined}
                    className={`p-2 rounded-xl bg-obsidian border border-border/80 flex items-center justify-between transition-colors ${
                      item.action ? 'cursor-pointer hover:border-white/40 hover:bg-raised' : ''
                    }`}
                  >
                    <span className="text-primary-muted font-medium flex items-center gap-2">
                      <span>{item.desc}</span>
                      {item.action && <ArrowRight className="w-3 h-3 text-primary-dim" />}
                    </span>
                    <kbd className="px-2 py-1 rounded bg-raised border border-border text-[11px] font-mono font-semibold text-primary shadow-xs">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between text-[11px] text-primary-dim bg-charcoal">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-primary">?</kbd> anywhere to reopen</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

