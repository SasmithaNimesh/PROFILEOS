import React, { useState } from 'react';
import { X, FileText, Check, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { ParsedResumeResult } from '../../utils/resumeParser';
import { useProfile } from '../../context/ProfileContext';

interface ResumeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  parsedData: ParsedResumeResult | null;
  filename: string;
}

export const ResumeImportModal: React.FC<ResumeImportModalProps> = ({
  isOpen,
  onClose,
  parsedData,
  filename
}) => {
  const { 
    updateBasicInfo, 
    addExperience, 
    addEducation, 
    addSkill, 
    addCertification,
    showToast 
  } = useProfile();

  const [acceptName, setAcceptName] = useState(true);
  const [acceptContact, setAcceptContact] = useState(true);
  const [selectedExps, setSelectedExps] = useState<number[]>([0]);
  const [selectedEdus, setSelectedEdus] = useState<number[]>([0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  React.useEffect(() => {
    if (parsedData) {
      setSelectedExps(parsedData.experiences.map((_, i) => i));
      setSelectedEdus(parsedData.educations.map((_, i) => i));
      setSelectedSkills(parsedData.skills.slice(0, 10));
    }
  }, [parsedData]);

  if (!isOpen || !parsedData) return null;

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleMerge = () => {
    // 1. Basic Info
    if (acceptName && parsedData.name) {
      updateBasicInfo({ fullName: parsedData.name });
    }
    if (acceptContact) {
      const updates: any = {};
      if (parsedData.email) updates.email = parsedData.email;
      if (parsedData.phone) updates.phone = parsedData.phone;
      if (parsedData.website) updates.website = parsedData.website;
      if (parsedData.summary) updates.bio = parsedData.summary;
      updateBasicInfo(updates);
    }

    // 2. Experiences
    selectedExps.forEach(idx => {
      const exp = parsedData.experiences[idx];
      if (exp) {
        addExperience(exp);
      }
    });

    // 3. Educations
    selectedEdus.forEach(idx => {
      const edu = parsedData.educations[idx];
      if (edu) {
        addEducation(edu);
      }
    });

    // 4. Skills
    selectedSkills.forEach(skillName => {
      addSkill({
        name: skillName,
        category: 'Core & Tools',
        level: 'Advanced',
        yearsExperience: 3
      });
    });

    showToast(
      'Resume data merged into Canonical Profile',
      'success',
      `Imported from ${filename} with verified verification standards`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-charcoal border border-border rounded-2xl shadow-modal overflow-hidden text-primary flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary-muted">
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">Review & Confirm Extracted Resume Data</h3>
              <p className="text-[11px] text-primary-dim">
                Design Standard: <span className="font-mono text-primary">"Show, then confirm"</span> · Source: {filename}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-primary-dim hover:text-primary hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Entity Review Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Identity & Contact Info */}
          <div className="p-4 rounded-xl bg-surface border border-border space-y-3">
            <span className="font-semibold text-primary block">Candidate Profile & Contact Details</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {parsedData.name && (
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-raised border border-border">
                  <input
                    type="checkbox"
                    checked={acceptName}
                    onChange={(e) => setAcceptName(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-white bg-charcoal border-border"
                  />
                  <span className="text-primary-muted truncate">Name: <strong className="text-primary">{parsedData.name}</strong></span>
                </label>
              )}

              {parsedData.email && (
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-raised border border-border">
                  <input
                    type="checkbox"
                    checked={acceptContact}
                    onChange={(e) => setAcceptContact(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-white bg-charcoal border-border"
                  />
                  <span className="text-primary-muted truncate">Email: <strong className="text-primary">{parsedData.email}</strong></span>
                </label>
              )}
            </div>

            {parsedData.summary && (
              <div className="p-2.5 rounded-lg bg-obsidian border border-border text-[11px] text-primary-dim leading-relaxed">
                <span className="text-primary-muted font-medium block mb-1">Parsed Summary:</span>
                "{parsedData.summary}"
              </div>
            )}
          </div>

          {/* Work Experiences */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">Extracted Work Experience ({parsedData.experiences.length})</span>
              <span className="text-[10px] font-mono text-primary-dim">Select items to import</span>
            </div>

            <div className="space-y-2">
              {parsedData.experiences.map((exp, idx) => (
                <label
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    selectedExps.includes(idx)
                      ? 'bg-raised border-white/40 shadow-minimal'
                      : 'bg-surface border-border opacity-70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedExps.includes(idx)}
                    onChange={() => {
                      if (selectedExps.includes(idx)) {
                        setSelectedExps(selectedExps.filter(i => i !== idx));
                      } else {
                        setSelectedExps([...selectedExps, idx]);
                      }
                    }}
                    className="mt-0.5 w-3.5 h-3.5 rounded text-white bg-charcoal border-border"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-primary">{exp.title}</h4>
                      <span className="font-mono text-[10px] text-primary-dim">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-[11px] text-primary-muted">{exp.company} · {exp.location}</p>
                    {exp.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-primary-dim pt-1">
                        {exp.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">{bp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Skills Badges */}
          {parsedData.skills.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary">Extracted Technical Skills ({parsedData.skills.length})</span>
                <span className="text-[10px] font-mono text-primary-dim">Click to toggle</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {parsedData.skills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                        isSelected 
                          ? 'bg-white text-black border-white font-semibold' 
                          : 'bg-raised text-primary-dim border-border hover:border-zinc-500'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between bg-charcoal">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-xs text-primary transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleMerge}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all shadow-minimal"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirm & Merge into Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

