import React, { useState } from 'react';
import { ShieldCheck, Database, Check, Layers, Cpu, FileSpreadsheet, Lock } from 'lucide-react';

export const IdentityEngineSection: React.FC = () => {
  const [activeSchemaTab, setActiveSchemaTab] = useState<'experiences' | 'projects' | 'skills' | 'evidence'>('experiences');

  return (
    <section className="py-24 px-6 bg-charcoal/40 border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised border border-border text-[11px] font-mono text-primary-dim uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Architecture</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight leading-tight">
            The Professional Identity Engine.
          </h2>

          <p className="mt-3 text-sm text-primary-muted leading-relaxed">
            Most career tools treat resumes as separate, disconnected documents that fall out of sync. PROFILEOS establishes a single, verified graph of your career.
          </p>

          <div className="mt-6 space-y-3 w-full">
            <div className="p-4 rounded-xl bg-charcoal border border-border flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-raised text-primary shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-primary">Single Source of Truth</h4>
                <p className="text-[11px] text-primary-dim mt-0.5">
                  Update an accomplishment, date, or new skill once in My Profile, and it instantly syncs across your portfolio, CVs, and letters.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal border border-border flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-raised text-primary shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-primary">Zero AI Hallucinations</h4>
                <p className="text-[11px] text-primary-dim mt-0.5">
                  AI generates phrasing strictly bound to verified facts. No fabricated job titles, dates, or metrics.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-charcoal border border-border flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-raised text-primary shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-primary">Full Data Sovereignty</h4>
                <p className="text-[11px] text-primary-dim mt-0.5">
                  Your identity belongs to you. Export your complete data graph in open JSON format anytime, with zero lock-in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Schema Inspector */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-charcoal border border-border overflow-hidden shadow-minimal">
            {/* Header */}
            <div className="px-4 py-3 bg-raised/70 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                <span className="ml-2 font-mono text-[11px] text-primary-dim">verified_identity.json</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-surface text-emerald-400 border border-border font-semibold">
                VERIFIED GRAPH
              </span>
            </div>

            {/* Schema Category Tabs */}
            <div className="flex border-b border-border px-4 bg-charcoal text-xs overflow-x-auto">
              {(['experiences', 'projects', 'skills', 'evidence'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSchemaTab(tab)}
                  className={`py-2.5 px-3 font-mono text-[11px] uppercase tracking-wider transition-colors border-b-2 -mb-[1px] ${
                    activeSchemaTab === tab
                      ? 'border-white text-white font-semibold'
                      : 'border-transparent text-primary-dim hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Code / Schema View */}
            <div className="p-5 font-mono text-xs text-primary-muted bg-obsidian/70 overflow-x-auto">
              {activeSchemaTab === 'experiences' && (
                <pre className="text-primary leading-relaxed">
{`{
  "experience": [
    {
      "id": "exp_1",
      "title": "Lead Systems Architect",
      "company": "Aetherial Cloud Systems",
      "verified": true,
      "verification_method": "OAuth_Work_Email",
      "period": "2023-04 -> Present",
      "metrics": [
        "Reduced p99 latency from 140ms to 24ms",
        "Adopted by 40+ engineering squads"
      ]
    }
  ]
}`}
                </pre>
              )}

              {activeSchemaTab === 'projects' && (
                <pre className="text-primary leading-relaxed">
{`{
  "projects": [
    {
      "title": "HyperStream Agent Kernel",
      "repo": "alexchen-dev/hyperstream-kernel",
      "verified_stars": 1840,
      "verified_commit_hash": "c89f21b",
      "tags": ["TypeScript", "Rust", "LLM", "Wasm"],
      "live_url": "https://hyperstream.run"
    }
  ]
}`}
                </pre>
              )}

              {activeSchemaTab === 'skills' && (
                <pre className="text-primary leading-relaxed">
{`{
  "skills": [
    { "name": "TypeScript", "level": "Expert", "years": 7 },
    { "name": "Rust", "level": "Advanced", "years": 3 },
    { "name": "PostgreSQL & pgvector", "level": "Expert" },
    { "name": "Distributed Systems", "level": "Expert" }
  ]
}`}
                </pre>
              )}

              {activeSchemaTab === 'evidence' && (
                <pre className="text-primary leading-relaxed">
{`{
  "evidence_ledger": {
    "github_oauth": "AUTHENTICATED",
    "pdf_resume_source": "SHA256_HASH_VERIFIED",
    "credentials": [
      { "issuer": "AWS", "id": "AWS-PSA-982143", "status": "ACTIVE" },
      { "issuer": "Linux Foundation", "id": "CKA-884102", "status": "ACTIVE" }
    ]
  }
}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

