import React, { useState, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProfessionalCategory } from '../../types/profile';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  Link2, 
  CheckCircle2, 
  Code2,
  Briefcase,
  GraduationCap,
  Palette,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { extractTextFromFile, parseResumeText } from '../../utils/resumeParser';

export const OnboardingWizard: React.FC = () => {
  const { 
    profile, 
    updateBasicInfo, 
    connectAccount, 
    simulateImportFromUrl, 
    simulateDocumentUpload, 
    acceptImportedItem, 
    discardImportedItem, 
    setCurrentView,
    setCurrentWorkspaceTab,
    showToast 
  } = useProfile();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 7;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // Step 2 state
  const [selectedCategory, setSelectedCategory] = useState<ProfessionalCategory>(profile.category);

  // Step 3 state
  const [githubUrl, setGithubUrl] = useState('https://github.com/alexchen-dev');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alex-chen-tech');
  const [websiteUrl, setWebsiteUrl] = useState('https://alexchen.dev');

  // Step 4 state
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsing(true);
      showToast('Parsing document client-side...', 'info');
      const text = await extractTextFromFile(file);
      const parsed = parseResumeText(text, file.name);
      setUploadedFile(file.name);

      if (parsed.experiences.length > 0) {
        const leadExp = parsed.experiences[0];
        profile.importedQueue.push({
          id: `imp_exp_${Date.now()}`,
          category: 'Experience',
          title: `${leadExp.title} at ${leadExp.company}`,
          subtitle: `Extracted from ${file.name}`,
          source: 'Document Parser',
          status: 'pending',
          data: leadExp
        });
      }

      showToast('Document parsed successfully', 'success', `Found ${parsed.skills.length} skills & experience entries`);
    } catch (err) {
      console.error(err);
      simulateDocumentUpload(file.name);
    } finally {
      setIsParsing(false);
    }
  };

  const categoriesList: { id: ProfessionalCategory; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'Developer', label: 'Developer / Engineer', desc: 'Codebases, GitHub repositories, and system architecture', icon: <Code2 className="w-4 h-4 text-primary" /> },
    { id: 'Designer', label: 'Designer / Creative', desc: 'Visual presence, portfolio showcases, design case studies', icon: <Palette className="w-4 h-4 text-primary" /> },
    { id: 'Student / Graduate', label: 'Student / Graduate', desc: 'Education, coursework, internships & early projects', icon: <GraduationCap className="w-4 h-4 text-primary" /> },
    { id: 'Business Professional', label: 'Business Professional', desc: 'ATS-tailored CVs, leadership metrics & executive presence', icon: <Briefcase className="w-4 h-4 text-primary" /> },
    { id: 'Researcher / Academic', label: 'Researcher / Academic', desc: 'Peer-reviewed publications, DOI citations & scholarly CVs', icon: <BookOpen className="w-4 h-4 text-primary" /> },
    { id: 'Freelancer', label: 'Freelancer / Consultant', desc: 'Client case studies, rate offerings & public brand identity', icon: <Lightbulb className="w-4 h-4 text-primary" /> },
  ];

  const handleNext = () => {
    if (step === 2) {
      updateBasicInfo({ category: selectedCategory });
    } else if (step === 3) {
      if (githubUrl) {
        connectAccount({
          platform: 'github',
          username: githubUrl.split('/').pop() || 'developer',
          url: githubUrl,
          verified: true,
          status: 'connected'
        });
        simulateImportFromUrl(githubUrl, 'GitHub');
      }
    }
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setCurrentView('workspace');
      setCurrentWorkspaceTab('overview');
    }
  };

  const handleSkip = () => {
    setCurrentView('workspace');
    setCurrentWorkspaceTab('overview');
  };

  const pendingImports = profile.importedQueue;

  return (
    <div className="min-h-screen bg-obsidian text-primary flex flex-col justify-between py-6 px-6">
      {/* Top Bar */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white text-black font-display font-bold text-xs flex items-center justify-center">
            P
          </div>
          <span className="font-display font-bold text-xs text-primary tracking-tight">PROFILEOS ONBOARDING</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-primary-dim">
            Step {step} of {totalSteps}
          </span>
          <button
            onClick={handleSkip}
            className="text-xs text-primary-dim hover:text-primary transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>

      {/* Main Step Body */}
      <div className="max-w-xl mx-auto w-full my-6 py-2">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center animate-in fade-in duration-200">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight">
              Welcome to PROFILEOS
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-primary-muted max-w-md mx-auto leading-relaxed">
              Create your single verified professional identity. Connect your work, verify your records, and prepare your workspace.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-charcoal border border-border text-left space-y-2.5 max-w-sm mx-auto">
              <div className="flex items-center gap-2 text-xs text-primary-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>One source of truth for portfolio, CVs, and letters</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Sanctioned APIs only — zero scraping</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Show, then confirm — you approve every detail</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Category */}
        {step === 2 && (
          <div className="animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary">
                Choose Your Discipline
              </h2>
              <p className="mt-1 text-xs text-primary-dim">
                Configures default profile sections and CV templates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categoriesList.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-raised border-white/40 shadow-minimal'
                      : 'bg-charcoal border-border hover:bg-raised/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-surface shrink-0">
                      {cat.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-primary">{cat.label}</h4>
                      <p className="text-[10px] text-primary-dim mt-0.5 leading-snug">{cat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Connect Accounts */}
        {step === 3 && (
          <div className="animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary">
                Connect Verified Accounts
              </h2>
              <p className="mt-1 text-xs text-primary-dim">
                Paste URLs or usernames. We use official developer endpoints.
              </p>
            </div>

            <div className="space-y-3 bg-charcoal p-5 rounded-xl border border-border text-xs">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">LinkedIn Profile Link</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Personal Website</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourname.com"
                  className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Upload */}
        {step === 4 && (
          <div className="animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary">
                Upload Existing Career Document
              </h2>
              <p className="mt-1 text-xs text-primary-dim">
                We parse the text and prepare entries for your review.
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.txt,.md,.docx"
              className="hidden"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-border hover:border-zinc-400 rounded-2xl p-8 bg-charcoal text-center cursor-pointer transition-colors"
            >
              <Upload className="w-6 h-6 text-primary-dim mx-auto mb-2" />
              <h4 className="text-xs font-semibold text-primary">
                {isParsing ? 'Extracting client-side text...' : uploadedFile ? uploadedFile : 'Click to select resume PDF / TXT'}
              </h4>
              <p className="text-[10px] text-primary-dim mt-1">
                {uploadedFile ? 'Parsed! Review entries in the next step.' : 'Supports PDF, Word (.docx), TXT · Processed locally'}
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary">
                Review Imported Items
              </h2>
              <p className="mt-1 text-xs text-primary-dim">
                Show, then confirm: verify items before saving.
              </p>
            </div>

            <div className="space-y-2">
              {pendingImports.length === 0 ? (
                <div className="p-6 text-center rounded-xl bg-charcoal border border-border text-xs text-primary-dim">
                  All extracted items approved.
                </div>
              ) : (
                pendingImports.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-charcoal border border-border flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-primary-dim uppercase">{item.category}</span>
                      <h4 className="font-semibold text-primary">{item.title}</h4>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => acceptImportedItem(item.id)}
                        className="px-2.5 py-1 rounded bg-white text-black font-semibold text-xs hover:bg-zinc-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => discardImportedItem(item.id)}
                        className="px-2.5 py-1 rounded bg-raised text-primary-dim hover:text-primary text-xs"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Step 6: Complete */}
        {step === 6 && (
          <div className="animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-primary">
                Your Professional Graph
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-charcoal border border-border space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <img src={profile.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-border" />
                <div>
                  <h3 className="font-semibold text-sm text-primary">{profile.fullName}</h3>
                  <p className="text-[11px] text-primary-dim">{profile.headline}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-raised">
                  <span className="font-bold text-primary">{profile.experiences.length}</span>
                  <p className="text-[10px] text-primary-dim">Roles</p>
                </div>
                <div className="p-2 rounded-lg bg-raised">
                  <span className="font-bold text-primary">{profile.projects.length}</span>
                  <p className="text-[10px] text-primary-dim">Projects</p>
                </div>
                <div className="p-2 rounded-lg bg-raised">
                  <span className="font-bold text-primary">{profile.skills.length}</span>
                  <p className="text-[10px] text-primary-dim">Skills</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Ready */}
        {step === 7 && (
          <div className="text-center animate-in fade-in duration-200">
            <h2 className="font-display font-bold text-2xl text-primary">
              Identity Ready
            </h2>
            <p className="mt-2 text-xs text-primary-dim max-w-sm mx-auto">
              Your verified profile is established. You can now build your portfolio, generate ATS-ready CVs, or write cover letters.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pt-4 border-t border-border">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-charcoal hover:bg-raised border border-border text-xs text-primary-muted transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all"
        >
          <span>{step === totalSteps ? 'Enter Workspace' : 'Continue'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
