import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Printer, 
  CheckCircle2, 
  Edit3,
  Sliders,
  Sparkle,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Copy,
  ChevronDown
} from 'lucide-react';
import { CVTemplateId } from '../../types/profile';
import { exportCVToPdf } from '../../utils/exportPdf';
import { exportCVToDocx } from '../../utils/exportDocx';
import { XYZRewriterModal } from '../common/XYZRewriterModal';

export const CVStudioView: React.FC = () => {
  const { 
    profile, 
    activeCV, 
    setActiveCV,
    updateActiveCV, 
    updateBasicInfo,
    updateExperience,
    reorderExperiences,
    createCVVariant,
    deleteCVVariant,
    addSkill,
    showToast 
  } = useProfile();

  const [activeSection, setActiveSection] = useState<'summary' | 'experience' | 'education' | 'projects' | 'skills' | 'tailor'>('summary');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [tailorAnalysis, setTailorAnalysis] = useState<{ matchedKeywords: string[]; missingKeywords: string[]; score: number } | null>(null);

  // XYZ Rewriter Modal State
  const [rewriterTarget, setRewriterTarget] = useState<{
    expId: string;
    bulletIdx: number;
    bulletText: string;
    expTitle: string;
    companyName: string;
  } | null>(null);

  // Variant Modal State
  const [isCreatingVariant, setIsCreatingVariant] = useState(false);
  const [newVariantTitle, setNewVariantTitle] = useState('');
  const [newVariantRole, setNewVariantRole] = useState('');

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    showToast('Rendering PDF...', 'info');
    await exportCVToPdf('cv-render-paper', `${profile.fullName.replace(/\s+/g, '_')}_CV`);
    setIsExportingPdf(false);
    showToast('PDF Exported', 'success');
  };

  const handleExportDocx = async () => {
    setIsExportingDocx(true);
    showToast('Generating Word DOCX...', 'info');
    await exportCVToDocx(profile, activeCV);
    setIsExportingDocx(false);
    showToast('DOCX Exported', 'success');
  };

  const handleAnalyzeJobDesc = () => {
    if (!jobDescriptionInput.trim()) return;
    const commonTerms = ['TypeScript', 'React', 'Kubernetes', 'Rust', 'Kafka', 'System Architecture', 'Distributed Systems', 'PostgreSQL', 'Docker', 'AWS', 'LLM'];
    const matched = commonTerms.filter(t => jobDescriptionInput.toLowerCase().includes(t.toLowerCase()));
    const missing = commonTerms.filter(t => !jobDescriptionInput.toLowerCase().includes(t.toLowerCase())).slice(0, 3);
    setTailorAnalysis({
      matchedKeywords: matched,
      missingKeywords: missing,
      score: Math.min(Math.round((matched.length / (matched.length + 2)) * 100), 96)
    });
    showToast('Job description analyzed', 'success', `Matched ${matched.length} verified terms`);
  };

  const templates: { id: CVTemplateId; label: string }[] = [
    { id: 'modern', label: 'Modern Slate' },
    { id: 'ats', label: 'ATS Standard' },
    { id: 'minimal', label: 'Swiss Minimal' },
    { id: 'academic', label: 'Academic' },
    { id: 'executive', label: 'Executive' }
  ];

  const handleApplyXYZ = (newBullet: string) => {
    if (!rewriterTarget) return;
    const targetExp = profile.experiences.find(e => e.id === rewriterTarget.expId);
    if (!targetExp) return;
    const updatedBullets = [...targetExp.bulletPoints];
    updatedBullets[rewriterTarget.bulletIdx] = newBullet;
    updateExperience(rewriterTarget.expId, { bulletPoints: updatedBullets });
    showToast('Bullet point strengthened', 'success', 'XYZ formula applied');
    setRewriterTarget(null);
  };

  const handleCreateVariantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVariantTitle.trim()) return;
    createCVVariant(newVariantTitle.trim(), newVariantRole.trim() || activeCV.targetRole);
    setIsCreatingVariant(false);
    setNewVariantTitle('');
    setNewVariantRole('');
  };

  // Helper to render text with subtle keyword highlights if analyzed
  const highlightKeywords = (text: string) => {
    if (!tailorAnalysis || tailorAnalysis.matchedKeywords.length === 0) return text;
    
    // Simple regex replacement for matched terms
    const pattern = new RegExp(`\\b(${tailorAnalysis.matchedKeywords.join('|')})\\b`, 'gi');
    const parts = text.split(pattern);

    return parts.map((part, i) => {
      const isMatch = tailorAnalysis.matchedKeywords.some(k => k.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <mark key={i} className="bg-zinc-200 text-zinc-900 font-semibold px-0.5 rounded">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="h-full flex flex-col bg-obsidian text-primary overflow-hidden">
      {/* Top Header matching Page 3 of UI Designs */}
      <div className="h-14 px-5 bg-charcoal border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-primary-dim">CV Studio /</span>
          
          {/* Multi-Role CV Variant Selector */}
          <div className="relative">
            <select
              value={activeCV.id}
              onChange={(e) => {
                const found = profile.cvs.find(c => c.id === e.target.value);
                if (found) setActiveCV(found);
              }}
              className="appearance-none bg-raised border border-border text-primary text-xs font-semibold rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:border-white cursor-pointer max-w-[200px] truncate"
            >
              {profile.cvs.map(cv => (
                <option key={cv.id} value={cv.id}>
                  {cv.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-primary-dim absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={() => setIsCreatingVariant(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-[11px] text-primary-muted hover:text-primary transition-colors font-medium shrink-0"
            title="Create new targeted CV variant"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">New Variant</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-raised border border-border text-xs text-primary-dim mr-2">
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 15, 60))}
              className="p-1 hover:text-primary"
              title="Zoom out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="font-mono text-[10px] w-7 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 15, 130))}
              className="p-1 hover:text-primary"
              title="Zoom in"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Export DOCX Button */}
          <button
            onClick={handleExportDocx}
            disabled={isExportingDocx}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs font-semibold text-primary-muted hover:text-primary transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOCX</span>
          </button>

          {/* Export PDF Button (Clean High-Contrast White) */}
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

      {/* Split-Screen Body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* LEFT PANE: Controls & Section Editor */}
        <div className="w-full md:w-[420px] lg:w-[460px] border-r border-border bg-charcoal/80 flex flex-col h-full shrink-0 overflow-y-auto">
          {/* Sub-navigation tabs */}
          <div className="flex items-center gap-1 p-2.5 border-b border-border overflow-x-auto text-xs">
            <button
              onClick={() => setActiveSection('summary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeSection === 'summary' ? 'bg-raised text-primary font-semibold border border-border' : 'text-primary-dim hover:text-primary'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveSection('experience')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeSection === 'experience' ? 'bg-raised text-primary font-semibold border border-border' : 'text-primary-dim hover:text-primary'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveSection('education')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeSection === 'education' ? 'bg-raised text-primary font-semibold border border-border' : 'text-primary-dim hover:text-primary'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeSection === 'projects' ? 'bg-raised text-primary font-semibold border border-border' : 'text-primary-dim hover:text-primary'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSection('skills')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                activeSection === 'skills' ? 'bg-raised text-primary font-semibold border border-border' : 'text-primary-dim hover:text-primary'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveSection('tailor')}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-colors shrink-0 ${
                activeSection === 'tailor' ? 'bg-white text-black font-bold' : 'text-primary-muted hover:text-primary'
              }`}
            >
              Tailor
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-5 space-y-5 flex-1">
            {/* Target Role input */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Target role</label>
              <input
                type="text"
                value={activeCV.targetRole}
                onChange={(e) => updateActiveCV({ targetRole: e.target.value })}
                placeholder="Target role (e.g. Senior Systems Architect)"
                className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
              />
            </div>

            {/* SECTION: Summary */}
            {activeSection === 'summary' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-primary">Professional summary</label>
                  <button
                    type="button"
                    onClick={() => {
                      updateActiveCV({
                        summary: `Systems Architect with 7+ years of experience engineering high-throughput, low-latency streaming infrastructure and autonomous agent runtimes. Specializes in distributed systems serving 12M+ concurrent users.`
                      });
                      showToast('Summary Polished', 'success');
                    }}
                    className="flex items-center gap-1 text-[11px] text-primary-muted hover:text-primary transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Polish</span>
                  </button>
                </div>

                <textarea
                  rows={6}
                  value={activeCV.summary}
                  onChange={(e) => updateActiveCV({ summary: e.target.value })}
                  placeholder="Written from your verified profile. Edit any line."
                  className="w-full p-3 rounded-lg bg-raised border border-border text-xs text-primary leading-relaxed focus:border-white focus:outline-none font-sans"
                />

                <p className="text-[11px] text-primary-dim leading-relaxed">
                  Tip: You can also click directly on the live document sheet on the right to edit in place.
                </p>
              </div>
            )}

            {/* SECTION: Experience */}
            {activeSection === 'experience' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-primary">Included Experiences</h4>
                  <span className="text-[10px] text-primary-dim font-mono">{profile.experiences.length} total</span>
                </div>
                <div className="space-y-3">
                  {profile.experiences.map((exp, expIdx) => (
                    <div key={exp.id} className="p-3.5 rounded-xl bg-raised border border-border text-xs space-y-2.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-primary text-xs block">{exp.title}</span>
                          <span className="text-primary-dim text-[11px]">{exp.company} · {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        </div>
                        {/* Up/Down Reorder Grips */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => reorderExperiences(expIdx, expIdx - 1)}
                            disabled={expIdx === 0}
                            className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => reorderExperiences(expIdx, expIdx + 1)}
                            disabled={expIdx === profile.experiences.length - 1}
                            className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Bullets with XYZ button */}
                      <div className="space-y-1.5 pt-1.5 border-t border-border/50">
                        <span className="text-[10px] font-mono text-primary-dim uppercase tracking-wider block">Impact Bullets</span>
                        {exp.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className="p-2.5 rounded-lg bg-obsidian border border-border/60 flex items-start justify-between gap-2">
                            <p className="text-[11px] text-primary-muted font-sans leading-relaxed flex-1">
                              {bp}
                            </p>
                            <button
                              type="button"
                              onClick={() => setRewriterTarget({
                                expId: exp.id,
                                bulletIdx: bpIdx,
                                bulletText: bp,
                                expTitle: exp.title,
                                companyName: exp.company
                              })}
                              className="px-2 py-1 rounded bg-surface hover:bg-surface-hover border border-border text-emerald-400 text-[10px] font-mono flex items-center gap-1 shrink-0 font-medium transition-colors"
                              title="Transform with Google XYZ Formula"
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>XYZ</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: Tailor */}
            {activeSection === 'tailor' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <h4 className="text-xs font-semibold text-primary">ATS Keyword Match</h4>
                <p className="text-[11px] text-primary-dim">
                  Paste the job posting to highlight matching verified competencies directly on your CV preview.
                </p>

                <textarea
                  rows={4}
                  value={jobDescriptionInput}
                  onChange={(e) => setJobDescriptionInput(e.target.value)}
                  placeholder="Paste job description requirements..."
                  className="w-full p-2.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleAnalyzeJobDesc}
                  className="w-full py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Analyze & Highlight Keywords
                </button>

                {tailorAnalysis && (
                  <div className="p-3 rounded-lg bg-raised border border-border space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs font-semibold text-primary">
                      <span>Match Alignment</span>
                      <span className="font-mono text-emerald-400 font-bold">{tailorAnalysis.score}%</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-primary-dim uppercase font-bold tracking-wider">Matched Terms:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tailorAnalysis.matchedKeywords.map((k, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-charcoal text-emerald-400 border border-emerald-900/40">
                            ✓ {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {tailorAnalysis.missingKeywords.length > 0 && (
                      <div className="pt-2 border-t border-border/60">
                        <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Missing Competencies:</span>
                        <div className="space-y-1.5 mt-1.5">
                          {tailorAnalysis.missingKeywords.map((k, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-obsidian border border-border">
                              <span className="text-xs text-primary-muted font-medium">{k}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  addSkill({
                                    name: k,
                                    category: 'Core & Tools',
                                    level: 'Advanced',
                                    yearsExperience: 3
                                  });
                                  setTailorAnalysis(prev => prev ? {
                                    ...prev,
                                    matchedKeywords: [...prev.matchedKeywords, k],
                                    missingKeywords: prev.missingKeywords.filter(m => m !== k),
                                    score: Math.min(prev.score + 10, 100)
                                  } : null);
                                  showToast(`Added "${k}" to verified skills`, 'success', 'Skills matrix updated');
                                }}
                                className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface hover:bg-surface-hover border border-border text-[10px] font-mono text-emerald-400 font-semibold transition-colors"
                                title={`Add ${k} to CV skills matrix`}
                              >
                                <Plus className="w-2.5 h-2.5" />
                                <span>Add to CV</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Template Selection Pills */}
            <div className="pt-4 border-t border-border">
              <label className="block text-xs font-semibold text-primary mb-2">CV Template</label>
              <div className="flex flex-wrap gap-1.5">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateActiveCV({ template: t.id })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeCV.template === t.id
                        ? 'bg-white text-black font-semibold shadow-minimal'
                        : 'bg-raised text-primary-muted hover:text-primary border border-border'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Formatting */}
            <div className="pt-4 border-t border-border text-xs text-primary-dim space-y-3">
              <span className="font-semibold text-primary">Typography & Grid</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] mb-1">Font Family</label>
                  <select
                    value={activeCV.formatting.fontFamily}
                    onChange={(e) => updateActiveCV({
                      formatting: { ...activeCV.formatting, fontFamily: e.target.value as any }
                    })}
                    className="w-full px-2 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary"
                  >
                    <option value="Inter">Inter (Swiss Clean)</option>
                    <option value="Space Grotesk">Space Grotesk (Architectural)</option>
                    <option value="Merriweather">Merriweather (Classic Editorial)</option>
                    <option value="JetBrains Mono">JetBrains Mono (Monospace)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] mb-1">Font Size</label>
                  <select
                    value={activeCV.formatting.fontSize}
                    onChange={(e) => updateActiveCV({
                      formatting: { ...activeCV.formatting, fontSize: e.target.value as any }
                    })}
                    className="w-full px-2 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary"
                  >
                    <option value="9pt">9 pt (Compact)</option>
                    <option value="10pt">10 pt (Standard)</option>
                    <option value="11pt">11 pt (Spacious)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Live Paper Preview Canvas (WYSIWYG Interactive) */}
        <div className="flex-1 bg-obsidian p-5 sm:p-10 overflow-y-auto flex flex-col items-center">
          <div className="mb-3 text-[11px] text-primary-dim flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Direct In-Paper Editing enabled: Click any text directly to edit</span>
          </div>

          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150"
          >
            {/* The A4 Document Paper Sheet */}
            <div
              id="cv-render-paper"
              className="w-[600px] sm:w-[680px] min-h-[960px] bg-white text-zinc-950 rounded shadow-elevated p-10 sm:p-12 space-y-5 cv-sheet select-text border border-zinc-200"
              style={{
                fontFamily: activeCV.formatting.fontFamily === 'Inter' ? 'Inter, sans-serif' :
                            activeCV.formatting.fontFamily === 'Space Grotesk' ? '"Space Grotesk", sans-serif' :
                            activeCV.formatting.fontFamily === 'JetBrains Mono' ? '"JetBrains Mono", monospace' :
                            'Georgia, serif',
                fontSize: activeCV.formatting.fontSize === '9pt' ? '12px' : activeCV.formatting.fontSize === '11pt' ? '15px' : '13.5px'
              }}
            >
              {/* Header */}
              <div className="space-y-1">
                <h1 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateBasicInfo({ fullName: e.currentTarget.textContent || profile.fullName })}
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 leading-none outline-none hover:bg-zinc-100/80 rounded px-1 -mx-1"
                >
                  {profile.fullName}
                </h1>

                <p 
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateActiveCV({ targetRole: e.currentTarget.textContent || activeCV.targetRole })}
                  className="text-sm font-semibold text-zinc-600 outline-none hover:bg-zinc-100/80 rounded px-1 -mx-1"
                >
                  {activeCV.targetRole || profile.headline}
                </p>

                <div className="text-[11px] text-zinc-500 flex flex-wrap gap-x-2.5 pt-0.5">
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

              {/* Minimalist Hairline Separator */}
              <div className="w-full h-[1.5px] bg-zinc-900" />

              {/* Summary */}
              {activeCV.sections.summary && activeCV.summary && (
                <div className="space-y-1">
                  <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
                    SUMMARY
                  </h3>
                  <div 
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateActiveCV({ summary: e.currentTarget.textContent || activeCV.summary })}
                    className="text-zinc-700 leading-relaxed text-justify outline-none hover:bg-zinc-100/80 rounded px-1 -mx-1"
                  >
                    {highlightKeywords(activeCV.summary)}
                  </div>
                </div>
              )}

              {/* Experience */}
              {activeCV.sections.experience && profile.experiences.length > 0 && (
                <div className="space-y-3 pt-1">
                  <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
                    EXPERIENCE
                  </h3>

                  <div className="space-y-3.5">
                    {profile.experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-bold text-zinc-950">{exp.title}</h4>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-zinc-700">
                          {exp.company} <span className="font-normal text-zinc-500">· {exp.location}</span>
                        </p>
                        {exp.description && (
                          <p className="text-xs text-zinc-600 leading-relaxed">{highlightKeywords(exp.description)}</p>
                        )}
                        {exp.bulletPoints.length > 0 && (
                          <ul className="space-y-1 text-xs text-zinc-700 pl-1">
                            {exp.bulletPoints.map((bp, i) => (
                              <li key={i} className="group flex items-start gap-1 py-0.5">
                                <span className="text-zinc-400 select-none mr-1">•</span>
                                <span className="flex-1 leading-relaxed">{highlightKeywords(bp)}</span>
                                <button
                                  type="button"
                                  onClick={() => setRewriterTarget({
                                    expId: exp.id,
                                    bulletIdx: i,
                                    bulletText: bp,
                                    expTitle: exp.title,
                                    companyName: exp.company
                                  })}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 px-1.5 py-0.5 rounded bg-zinc-900 text-white text-[10px] font-mono flex items-center gap-1 shrink-0 shadow-sm"
                                  title="Strengthen with Google XYZ Formula"
                                >
                                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                                  <span>XYZ</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {activeCV.sections.projects && profile.projects.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
                    SELECTED PROJECTS
                  </h3>
                  <div className="space-y-2.5">
                    {profile.projects.slice(0, 2).map((proj) => (
                      <div key={proj.id} className="space-y-0.5">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-bold text-zinc-950">{proj.title}</h4>
                          {proj.tags.length > 0 && (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              [{proj.tags.slice(0, 3).join(', ')}]
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-700">{proj.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {activeCV.sections.education && profile.educations.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
                    EDUCATION
                  </h3>
                  {profile.educations.map((edu) => (
                    <div key={edu.id} className="flex items-baseline justify-between">
                      <div>
                        <h4 className="font-bold text-zinc-950">{edu.degree} in {edu.fieldOfStudy}</h4>
                        <p className="text-xs text-zinc-700">{edu.institution} {edu.grade ? `(${edu.grade})` : ''}</p>
                      </div>
                      <span className="text-[11px] text-zinc-500 font-mono">{edu.startDate} – {edu.endDate}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {activeCV.sections.skills && profile.skills.length > 0 && (
                <div className="space-y-1 pt-1">
                  <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest font-mono">
                    TECHNICAL SKILLS
                  </h3>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {profile.skills.map(s => s.name).join('  •  ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* XYZ Impact Rewriter Modal */}
      {rewriterTarget && (
        <XYZRewriterModal
          isOpen={!!rewriterTarget}
          onClose={() => setRewriterTarget(null)}
          initialBullet={rewriterTarget.bulletText}
          experienceTitle={rewriterTarget.expTitle}
          companyName={rewriterTarget.companyName}
          onApply={handleApplyXYZ}
        />
      )}

      {/* New Variant Creator Modal */}
      {isCreatingVariant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-charcoal border border-border rounded-2xl shadow-modal overflow-hidden text-primary p-6 space-y-4">
            <h3 className="text-sm font-semibold text-primary">Create Targeted CV Variant</h3>
            <p className="text-xs text-primary-dim">
              Fork this CV into a new role-specific variant (e.g. for Machine Learning, Staff Infrastructure, or Engineering Management).
            </p>
            <form onSubmit={handleCreateVariantSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Variant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Staff Infrastructure Lead"
                  value={newVariantTitle}
                  onChange={(e) => setNewVariantTitle(e.target.value)}
                  autoFocus
                  required
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Target Role Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Principal Distributed Systems Engineer"
                  value={newVariantRole}
                  onChange={(e) => setNewVariantRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsCreatingVariant(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-primary-muted hover:text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors"
                >
                  Create Variant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
