import React, { useState, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Download, 
  Upload,
  Trash2, 
  Moon, 
  Sun, 
  RotateCcw, 
  AlertTriangle,
  Lock,
  Globe,
  Bell,
  CheckCircle2,
  X
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    profile, 
    resetToDefaults, 
    showToast, 
    logout, 
    themePreference, 
    setThemePreference,
    importIdentityJson 
  } = useProfile();
  
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const [restoreCandidate, setRestoreCandidate] = useState<any | null>(null);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${profile.fullName.replace(/\s+/g, '_')}_profileos_identity.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Identity JSON Exported', 'success');
  };

  const handleJsonFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object') {
        showToast('Invalid JSON file', 'error');
        return;
      }
      setRestoreCandidate(parsed);
      setIsRestoreModalOpen(true);
    } catch (err) {
      showToast('Failed to parse JSON file', 'error');
    } finally {
      if (jsonInputRef.current) jsonInputRef.current.value = '';
    }
  };

  const handleConfirmRestore = () => {
    if (!restoreCandidate) return;
    const ok = importIdentityJson(restoreCandidate);
    if (ok) {
      setIsRestoreModalOpen(false);
      setRestoreCandidate(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-10 animate-in fade-in duration-200">
      <div className="pb-6 border-b border-border">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
          Settings & Sovereignty
        </h2>
        <p className="text-xs text-primary-muted mt-1">
          Manage credentials, connected APIs, privacy controls, and data portability.
        </p>
      </div>

      {/* Section 1: Data Sovereignty & Export */}
      <div className="p-5 rounded-2xl bg-charcoal border border-border space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-raised text-primary">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-primary">Complete Identity Data Export</h3>
            <p className="text-[11px] text-primary-dim">
              Download your entire verified career graph in standardized JSON format.
            </p>
          </div>
        </div>

        <p className="text-xs text-primary-dim leading-relaxed">
          PROFILEOS guarantees zero platform lock-in. Your data includes all verified experiences, skills, education, projects, GitHub links, and CV specifications.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <input
            type="file"
            ref={jsonInputRef}
            onChange={handleJsonFileSelected}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={handleExportJson}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Profile Data (.json)</span>
          </button>

          <button
            onClick={() => jsonInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-primary text-xs font-semibold transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-primary-muted" />
            <span>Restore from Backup (.json)</span>
          </button>
        </div>
      </div>

      {/* Section 2: Appearance & OLED Display Mode */}
      <div className="p-5 rounded-2xl bg-charcoal border border-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-raised text-primary">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-primary">Display Theme & Palette</h3>
            <p className="text-[11px] text-primary-dim">
              Refined minimalist dark palettes calibrated for extreme focus and low-glare reading.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setThemePreference('obsidian')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              themePreference === 'obsidian'
                ? 'bg-raised border-white/40 shadow-minimal'
                : 'bg-charcoal border-border hover:bg-raised/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-primary">01 Minimalist Obsidian</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-primary-dim">
                #09090B
              </span>
            </div>
            <p className="text-[11px] text-primary-dim leading-snug">
              Refined dark obsidian surface with subtle hairline borders and dark zinc panels.
            </p>
          </div>

          <div
            onClick={() => setThemePreference('oled')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              themePreference === 'oled'
                ? 'bg-black border-white/60 shadow-minimal ring-1 ring-white/20'
                : 'bg-black/60 border-border hover:border-zinc-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">02 Pitch-Black OLED</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-emerald-400">
                #000000 True Black
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Pure #000000 background with maximum contrast for OLED / Super Retina displays.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Privacy Guarantees */}
      <div className="p-5 rounded-2xl bg-charcoal border border-border space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-raised text-primary">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-primary">Privacy & Scraping Policy</h3>
            <p className="text-[11px] text-primary-dim">
              Sanctioned developer endpoints and zero unauthorized web scraping.
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-primary-dim">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>GitHub OAuth utilizes minimal read:user scopes.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AI generation calls use ephemeral stateless tokens with zero training on your career data.</span>
          </div>
        </div>
      </div>

      {/* Section 3: Reset Demo State */}
      <div className="p-6 rounded-2xl bg-charcoal border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-primary">Demo State Reset</h3>
            <p className="text-xs text-primary-muted mt-0.5">
              Reset the workspace back to Alex Chen's sample verified identity.
            </p>
          </div>
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-raised hover:bg-surface-hover border border-border text-xs font-semibold text-status-warning transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Section 4: Danger Zone */}
      <div className="p-6 rounded-2xl bg-charcoal border border-status-danger/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-status-danger/10 text-status-danger">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-status-danger">Danger Zone</h3>
            <p className="text-xs text-primary-muted">
              Irreversible account actions.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-primary">Delete Account & Data</h4>
            <p className="text-[11px] text-primary-muted">Permanently wipes all portfolio websites, CVs, and profile entries.</p>
          </div>

          <button
            onClick={() => setConfirmDeleteAccount(true)}
            className="px-4 py-2 rounded-xl bg-status-danger/20 hover:bg-status-danger text-status-danger hover:text-white text-xs font-semibold border border-status-danger/30 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setConfirmDeleteAccount(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-2xl bg-charcoal border border-status-danger/40 p-6 shadow-2xl z-10 space-y-4">
            <h3 className="font-display font-semibold text-base text-status-danger">Permanently Delete Account?</h3>
            <p className="text-xs text-primary-muted">
              This will remove all records from the database. This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteAccount(false)}
                className="flex-1 py-2 rounded-xl bg-raised border border-border text-xs text-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmDeleteAccount(false);
                  resetToDefaults();
                  logout();
                }}
                className="flex-1 py-2 rounded-xl bg-status-danger text-white text-xs font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Identity Confirmation Modal */}
      {isRestoreModalOpen && restoreCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-charcoal border border-border p-6 shadow-2xl z-10 space-y-4 text-primary">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-semibold text-sm">Restore Identity Graph</h3>
              </div>
              <button 
                onClick={() => setIsRestoreModalOpen(false)}
                className="p-1 rounded-lg text-primary-dim hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-primary-muted leading-relaxed">
              Show, then confirm: This will replace your current workspace identity with the verified records extracted from your backup file.
            </p>

            <div className="p-3.5 rounded-xl bg-obsidian border border-border space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-primary-dim">Full Name:</span>
                <span className="font-semibold text-primary">{restoreCandidate.fullName || 'Candidate'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-dim">Email:</span>
                <span className="font-mono text-primary-muted">{restoreCandidate.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-dim">Experiences:</span>
                <span className="font-mono text-primary-muted">{restoreCandidate.experiences?.length || 0} entries</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-dim">Skills:</span>
                <span className="font-mono text-primary-muted">{restoreCandidate.skills?.length || 0} skills</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-dim">CV Variants:</span>
                <span className="font-mono text-primary-muted">{restoreCandidate.cvs?.length || 1} documents</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRestoreModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-raised border border-border text-xs text-primary hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestore}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
              >
                Confirm & Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

