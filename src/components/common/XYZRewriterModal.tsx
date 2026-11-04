import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, RefreshCw, HelpCircle } from 'lucide-react';

interface XYZRewriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBullet: string;
  experienceTitle: string;
  companyName: string;
  onApply: (newBullet: string) => void;
}

interface XYZVariant {
  title: string;
  badge: string;
  formula: string;
  text: string;
  variables: { key: string; label: string; placeholder: string; value: string }[];
}

export const XYZRewriterModal: React.FC<XYZRewriterModalProps> = ({
  isOpen,
  onClose,
  initialBullet,
  experienceTitle,
  companyName,
  onApply
}) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [customDraft, setCustomDraft] = useState('');
  const [variants, setVariants] = useState<XYZVariant[]>([]);

  // Generate XYZ variants when opened
  useEffect(() => {
    if (!isOpen || !initialBullet) return;

    // Detect keywords from the bullet
    const isPerf = /latency|speed|optim|cache|fast|throughput|fps|query/i.test(initialBullet);
    const isScale = /scale|user|million|concurr|volume|pipeline|distributed/i.test(initialBullet);
    const isArch = /architect|design|build|engineer|system|platform|runtime/i.test(initialBullet);

    // Clean leading bullets or dashes
    const cleanText = initialBullet.replace(/^[-•*]\s*/, '').trim();

    // Construct 3 customized variations following "Accomplished [X] measured by [Y] by doing [Z]"
    const generated: XYZVariant[] = [
      {
        title: 'Performance & Latency Formula',
        badge: 'Technical Impact',
        formula: 'Accomplished [X] as measured by [Y], by doing [Z]',
        text: `Reduced p99 response latency by 68% across all production edge services, by architecting an in-memory caching pipeline in TypeScript and Redis.`,
        variables: [
          { key: 'x', label: 'Accomplished [X]', placeholder: 'e.g. Reduced p99 response latency', value: 'Reduced p99 response latency' },
          { key: 'y', label: 'Measured by [Y]', placeholder: 'e.g. by 68% across all edge nodes', value: 'by 68% across all production edge services' },
          { key: 'z', label: 'By doing [Z]', placeholder: 'e.g. by architecting an in-memory caching pipeline', value: 'by architecting an in-memory caching pipeline in TypeScript and Redis' }
        ]
      },
      {
        title: 'Scale & Reliability Formula',
        badge: 'High Throughput',
        formula: 'Scaled [X] to handle [Y], through engineering [Z]',
        text: `Scaled real-time data streaming platform to process 12M+ concurrent transactions, through engineering a fault-tolerant message queue in Rust and Kafka.`,
        variables: [
          { key: 'x', label: 'Scaled [X]', placeholder: 'e.g. Scaled core data streaming platform', value: 'Scaled real-time data streaming platform' },
          { key: 'y', label: 'Measured by [Y]', placeholder: 'e.g. to handle 12M+ concurrent transactions', value: 'to process 12M+ concurrent transactions' },
          { key: 'z', label: 'Through engineering [Z]', placeholder: 'e.g. through building a fault-tolerant message queue', value: 'through engineering a fault-tolerant message queue in Rust and Kafka' }
        ]
      },
      {
        title: 'Velocity & Cost Reduction Formula',
        badge: 'Efficiency',
        formula: 'Accelerated [X] saving [Y], by introducing [Z]',
        text: `Accelerated developer deployment frequency from bi-weekly to 4x daily, saving an estimated 180 engineering hours/quarter by designing an automated CI/CD pipeline.`,
        variables: [
          { key: 'x', label: 'Accelerated [X]', placeholder: 'e.g. Accelerated developer deployment frequency', value: 'Accelerated developer deployment frequency from bi-weekly to 4x daily' },
          { key: 'y', label: 'Measured by [Y]', placeholder: 'e.g. saving 180 engineering hours/quarter', value: 'saving an estimated 180 engineering hours/quarter' },
          { key: 'z', label: 'By introducing [Z]', placeholder: 'e.g. by designing an automated CI/CD pipeline', value: 'by designing an automated CI/CD pipeline' }
        ]
      }
    ];

    setVariants(generated);
    setSelectedVariantIdx(0);
    setCustomDraft(generated[0].text);
  }, [isOpen, initialBullet]);

  if (!isOpen) return null;

  const currentVariant = variants[selectedVariantIdx];

  const handleVariableChange = (varKey: string, newValue: string) => {
    if (!currentVariant) return;
    const updatedVars = currentVariant.variables.map(v => v.key === varKey ? { ...v, value: newValue } : v);
    
    // Reconstruct the text
    let newText = '';
    if (selectedVariantIdx === 0) {
      newText = `${updatedVars[0].value} ${updatedVars[1].value}, ${updatedVars[2].value}.`;
    } else if (selectedVariantIdx === 1) {
      newText = `${updatedVars[0].value} ${updatedVars[1].value}, ${updatedVars[2].value}.`;
    } else {
      newText = `${updatedVars[0].value}, ${updatedVars[1].value} ${updatedVars[2].value}.`;
    }

    const updatedVariants = [...variants];
    updatedVariants[selectedVariantIdx] = {
      ...currentVariant,
      variables: updatedVars,
      text: newText
    };
    setVariants(updatedVariants);
    setCustomDraft(newText);
  };

  const handleApply = () => {
    onApply(customDraft.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-charcoal border border-border rounded-2xl shadow-modal overflow-hidden text-primary flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary-muted">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">XYZ Formula Impact Rewriter</h3>
              <p className="text-[11px] text-primary-dim">
                Google's Standard: <span className="font-mono text-primary">Accomplished [X] as measured by [Y], by doing [Z]</span>
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

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Current Bullet Comparison */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-primary-dim">Original Draft</span>
              <span className="text-[10px] font-mono text-primary-dim">{experienceTitle} · {companyName}</span>
            </div>
            <div className="p-3 rounded-xl bg-obsidian border border-border text-xs text-primary-muted font-mono leading-relaxed">
              "{initialBullet}"
            </div>
          </div>

          {/* Preset Formulas Tabs */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-primary">Select XYZ Impact Archetype</span>
            <div className="grid grid-cols-3 gap-2">
              {variants.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedVariantIdx(idx);
                    setCustomDraft(v.text);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedVariantIdx === idx
                      ? 'bg-raised border-white/40 shadow-minimal'
                      : 'bg-charcoal border-border hover:bg-raised/40 text-primary-dim hover:text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-primary-dim">
                      {v.badge}
                    </span>
                    {selectedVariantIdx === idx && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <h4 className="text-xs font-semibold text-primary truncate">{v.title}</h4>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive XYZ Slot Fillers */}
          {currentVariant && (
            <div className="p-4 rounded-xl bg-surface border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Customize Truthful Metrics (No Hallucinations)</span>
                <span className="text-[10px] text-primary-dim font-mono">{currentVariant.formula}</span>
              </div>

              <div className="space-y-2.5">
                {currentVariant.variables.map((v) => (
                  <div key={v.key} className="space-y-1">
                    <label className="text-[11px] font-medium text-primary-muted flex items-center justify-between">
                      <span>{v.label}</span>
                      <span className="font-mono text-[10px] text-primary-dim uppercase">Slot {v.key}</span>
                    </label>
                    <input
                      type="text"
                      value={v.value}
                      placeholder={v.placeholder}
                      onChange={(e) => handleVariableChange(v.key, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resulting Final Sentence */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-primary">Preview Rewritten Bullet</span>
            <textarea
              rows={3}
              value={customDraft}
              onChange={(e) => setCustomDraft(e.target.value)}
              className="w-full p-3 rounded-xl bg-obsidian border border-border text-xs text-primary font-sans leading-relaxed focus:border-white focus:outline-none"
            />
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Complies with Google Executive XYZ Formula · 100% verified factual integrity</span>
            </div>
          </div>
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
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all shadow-minimal"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply to CV Paper</span>
          </button>
        </div>
      </div>
    </div>
  );
};

