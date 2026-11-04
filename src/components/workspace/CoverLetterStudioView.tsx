import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck,
  Printer,
  FileText,
  Plus,
  ChevronDown
} from 'lucide-react';
import { CoverLetterTone } from '../../types/profile';
import { exportCoverLetterToDocx } from '../../utils/exportDocx';
import { exportCVToPdf } from '../../utils/exportPdf';

export const CoverLetterStudioView: React.FC = () => {
  const { 
    profile, 
    activeCoverLetter, 
    setActiveCoverLetter,
    updateActiveCoverLetter, 
    generateAICoverLetter, 
    createCoverLetter,
    showToast,
    addDocumentAsset 
  } = useProfile();

  const [company, setCompany] = useState(activeCoverLetter.company || 'Stripe');
  const [jobTitle, setJobTitle] = useState(activeCoverLetter.jobTitle || 'Staff Distributed Systems Engineer');
  const [jobDesc, setJobDesc] = useState(activeCoverLetter.jobDescription || '');
  const [tone, setTone] = useState<CoverLetterTone>(activeCoverLetter.tone || 'Confident & Impactful');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [newCompanyInput, setNewCompanyInput] = useState('');
  const [newRoleInput, setNewRoleInput] = useState('');

  // Sync state when active cover letter changes
  React.useEffect(() => {
    setCompany(activeCoverLetter.company || '');
    setJobTitle(activeCoverLetter.jobTitle || '');
    setJobDesc(activeCoverLetter.jobDescription || '');
    setTone(activeCoverLetter.tone || 'Confident & Impactful');
  }, [activeCoverLetter.id]);

  const tones: CoverLetterTone[] = [
    'Formal & Direct',
    'Warm & Engaging',
    'Confident & Impactful',
    'Concise & Technical'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 600));
    await generateAICoverLetter(company, jobTitle, jobDesc, tone);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCoverLetter.content);
    setCopied(true);
    showToast('Cover letter copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    showToast('Rendering Cover Letter PDF...', 'info');
    const safeCompany = (company || 'Application').replace(/\s+/g, '_');
    await exportCVToPdf('cover-letter-render-paper', `${profile.fullName.replace(/\s+/g, '_')}_${safeCompany}_Letter`);
    setIsExportingPdf(false);
    showToast('PDF Exported', 'success');
  };

  const handleExportDocx = async () => {
    setIsExportingDocx(true);
    showToast('Generating Word DOCX letter...', 'info');
    await exportCoverLetterToDocx(profile, activeCoverLetter);
    setIsExportingDocx(false);
    showToast('DOCX Exported', 'success');
  };

  const handleCreateNewLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyInput.trim()) return;
    createCoverLetter(newCompanyInput.trim(), newRoleInput.trim() || 'Software Engineer');
    setIsCreatingModalOpen(false);
    setNewCompanyInput('');
    setNewRoleInput('');
  };

  const wordCount = activeCoverLetter.content.trim().split(/\s+/).filter(Boolean).length;
  const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="h-full flex flex-col bg-obsidian text-primary overflow-hidden">
      {/* Studio Header */}
      <div className="h-14 px-5 bg-charcoal border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary-dim">Cover Letter Studio /</span>
          
          {/* Target Application Switcher */}
          <div className="relative">
            <select
              value={activeCoverLetter.id}
              onChange={(e) => {
                const found = profile.coverLetters.find(c => c.id === e.target.value);
                if (found) setActiveCoverLetter(found);
              }}
              className="appearance-none bg-raised border border-border text-primary text-xs font-semibold rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:border-white cursor-pointer max-w-[200px] truncate"
            >
              {profile.coverLetters.map(cl => (
                <option key={cl.id} value={cl.id}>
                  {cl.company ? `${cl.company} (${cl.jobTitle})` : cl.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-primary-dim absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={() => setIsCreatingModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-[11px] text-primary-muted hover:text-primary transition-colors font-medium shrink-0"
            title="Create targeted letter for a new company"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">New Application</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleExportDocx}
            disabled={isExportingDocx}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary font-semibold transition-colors disabled:opacity-50"
            title="Export Microsoft Word letterhead"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOCX</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all disabled:opacity-50"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Left Inputs Pane */}
        <div className="w-full md:w-80 lg:w-96 border-r border-border bg-charcoal/80 p-5 flex flex-col gap-4 shrink-0 overflow-y-auto text-xs">
          <div>
            <h3 className="font-display font-semibold text-sm text-primary">Targeting & Voice</h3>
            <p className="text-[11px] text-primary-dim mt-0.5">
              Drafts a letter strictly bound to your verified career history.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                updateActiveCoverLetter({ company: e.target.value });
              }}
              placeholder="e.g. Stripe, Apple, OpenAI"
              className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Target Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                updateActiveCoverLetter({ jobTitle: e.target.value });
              }}
              placeholder="e.g. Staff Distributed Systems Engineer"
              className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Voice & Tone</label>
            <div className="grid grid-cols-2 gap-1.5">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTone(t);
                    updateActiveCoverLetter({ tone: t });
                  }}
                  className={`p-2 rounded-lg text-[11px] font-medium text-left transition-all ${
                    tone === t
                      ? 'bg-white text-black font-semibold'
                      : 'bg-raised text-primary-muted hover:text-primary border border-border'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Job Description Requirements</label>
            <textarea
              rows={4}
              value={jobDesc}
              onChange={(e) => {
                setJobDesc(e.target.value);
                updateActiveCoverLetter({ jobDescription: e.target.value });
              }}
              placeholder="Paste requirements to align verified accomplishments..."
              className="w-full p-2.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 mt-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Synthesizing with verified facts...' : 'Generate Letter'}</span>
          </button>

          <div className="p-2.5 rounded-lg bg-raised border border-border flex items-start gap-2 text-[10px] text-primary-dim">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>Zero hallucination guardrail: References only confirmed experience and projects.</span>
          </div>
        </div>

        {/* Right Document Editor (Executive Stationery Canvas) */}
        <div className="flex-1 bg-obsidian p-6 sm:p-10 overflow-y-auto flex flex-col items-center">
          <div
            id="cover-letter-render-paper"
            className="w-[600px] sm:w-[680px] min-h-[960px] bg-white text-zinc-950 rounded shadow-elevated p-10 sm:p-12 space-y-6 select-text border border-zinc-200"
          >
            {/* Executive Letterhead Header */}
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 leading-tight">
                {profile.fullName}
              </h2>
              <p className="text-xs text-zinc-600">
                {profile.headline}
              </p>
              <div className="text-[11px] text-zinc-500 flex flex-wrap gap-x-2 pt-0.5">
                <span>{profile.email}</span>
                <span>•</span>
                <span>{profile.phone}</span>
                <span>•</span>
                <span>{profile.location}</span>
                {profile.website && (
                  <>
                    <span>•</span>
                    <span>{profile.website}</span>
                  </>
                )}
              </div>
            </div>

            {/* Hairline Separator */}
            <div className="w-full h-[1.5px] bg-zinc-900" />

            {/* Formal Date & Recipient Details */}
            <div className="space-y-3 text-xs text-zinc-800">
              <p className="font-mono text-[11px] text-zinc-500">{todayFormatted}</p>
              <div className="space-y-0.5">
                <p className="font-semibold text-zinc-950">Hiring Leadership / Technical Team</p>
                <p className="text-zinc-700">{company || 'Prospective Company'}</p>
              </div>
              {jobTitle && (
                <p className="font-bold text-zinc-900 pt-1 border-b border-zinc-100 pb-1">
                  RE: Application for {jobTitle}
                </p>
              )}
            </div>

            {/* Editable Letter Body Content */}
            <textarea
              rows={16}
              value={activeCoverLetter.content}
              onChange={(e) => updateActiveCoverLetter({ content: e.target.value })}
              className="w-full text-xs sm:text-[13px] text-zinc-800 leading-relaxed font-sans focus:outline-none resize-none bg-transparent"
              style={{ minHeight: '440px' }}
            />

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>{wordCount} words · {tone}</span>
              <span>Updated {activeCoverLetter.updatedAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Application Creation Modal */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-charcoal border border-border rounded-2xl shadow-modal overflow-hidden text-primary p-6 space-y-4">
            <h3 className="text-sm font-semibold text-primary">Target New Company Application</h3>
            <p className="text-xs text-primary-dim">
              Create a dedicated cover letter tailored for a specific role and company.
            </p>
            <form onSubmit={handleCreateNewLetter} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anthropic, OpenAI, Linear"
                  value={newCompanyInput}
                  onChange={(e) => setNewCompanyInput(e.target.value)}
                  autoFocus
                  required
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Target Position</label>
                <input
                  type="text"
                  placeholder="e.g. Staff Systems Architect"
                  value={newRoleInput}
                  onChange={(e) => setNewRoleInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-primary-muted hover:text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
