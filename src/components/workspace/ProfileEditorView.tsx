import React, { useState, useRef } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  User, 
  Link2, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Award, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  X,
  Globe,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Upload,
  FileText
} from 'lucide-react';
import { Skill } from '../../types/profile';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { extractTextFromFile, parseResumeText, ParsedResumeResult } from '../../utils/resumeParser';
import { ResumeImportModal } from '../common/ResumeImportModal';

type ProfileSectionTab = 
  | 'basic'
  | 'connections'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'publications';

export const ProfileEditorView: React.FC = () => {
  const { 
    profile, 
    updateBasicInfo, 
    addExperience, 
    deleteExperience,
    addEducation,
    deleteEducation,
    addProject,
    deleteProject,
    addSkill,
    deleteSkill,
    addCertification,
    deleteCertification,
    connectAccount,
    disconnectAccount,
    simulateImportFromUrl,
    acceptImportedItem,
    reorderExperiences,
    reorderEducations,
    reorderProjects,
    showToast
  } = useProfile();

  const [activeTab, setActiveTab] = useState<ProfileSectionTab>('basic');
  const [showAddModal, setShowAddModal] = useState<string | null>(null);

  // Resume file parser states
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [parsedResume, setParsedResume] = useState<ParsedResumeResult | null>(null);
  const [parsedFilename, setParsedFilename] = useState('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isParsingResume, setIsParsingResume] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsingResume(true);
      showToast('Extracting resume content...', 'info');
      const text = await extractTextFromFile(file);
      const parsed = parseResumeText(text, file.name);
      setParsedResume(parsed);
      setParsedFilename(file.name);
      setIsResumeModalOpen(true);
      showToast('Resume parsed successfully', 'success', `Found ${parsed.skills.length} skills & ${parsed.experiences.length} roles`);
    } catch (err) {
      console.error(err);
      showToast('Failed to parse document', 'error');
    } finally {
      setIsParsingResume(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Form states for basic info
  const [basicForm, setBasicForm] = useState({
    fullName: profile.fullName,
    headline: profile.headline,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    website: profile.website,
    bio: profile.bio
  });

  // State for new URL connection
  const [newUrl, setNewUrl] = useState('');
  const [urlPlatform, setUrlPlatform] = useState<'github' | 'linkedin' | 'personal'>('github');

  // New experience form
  const [newExp, setNewExp] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  // New skill form
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCat, setNewSkillCat] = useState<Skill['category']>('Frontend');

  const navItems: { id: ProfileSectionTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'basic', label: 'Basic Information', icon: <User className="w-4 h-4" /> },
    { id: 'connections', label: 'Connected Accounts', icon: <Link2 className="w-4 h-4" />, count: profile.connectedAccounts.length },
    { id: 'experience', label: 'Work Experience', icon: <Briefcase className="w-4 h-4" />, count: profile.experiences.length },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: profile.educations.length },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" />, count: profile.projects.length },
    { id: 'skills', label: 'Skills & Competencies', icon: <Sparkles className="w-4 h-4" />, count: profile.skills.length },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" />, count: profile.certifications.length },
    { id: 'publications', label: 'Publications & Research', icon: <BookOpen className="w-4 h-4" />, count: profile.publications.length },
  ];

  const handleSaveBasic = (e: React.FormEvent) => {
    e.preventDefault();
    updateBasicInfo(basicForm);
  };

  const handleAddConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    connectAccount({
      platform: urlPlatform,
      username: newUrl.split('/').filter(Boolean).pop() || 'profile',
      url: newUrl,
      verified: true,
      status: 'connected'
    });
    if (urlPlatform === 'github') {
      simulateImportFromUrl(newUrl, 'GitHub');
    }
    setNewUrl('');
  };

  const pendingImports = profile.importedQueue;

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
        <div>
          <h2 className="font-display font-bold text-2xl text-primary tracking-tight">
            My Profile
          </h2>
          <p className="text-xs text-primary-dim mt-0.5">
            The single verified source of truth for all generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Real PDF / Resume File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.txt,.md,.docx"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isParsingResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-primary text-xs font-semibold transition-all disabled:opacity-50"
            title="Parse real PDF resume client-side"
          >
            <Upload className="w-3.5 h-3.5 text-primary-muted" />
            <span>{isParsingResume ? 'Parsing...' : 'Import Resume (PDF/TXT)'}</span>
          </button>

          <button
            onClick={() => setShowAddModal('menu')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Information</span>
          </button>
        </div>
      </div>

      {/* Review Queue Alert if pending items */}
      {pendingImports.length > 0 && (
        <div className="p-3.5 rounded-xl bg-raised border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-primary-dim shrink-0" />
            <div>
              <span className="font-semibold text-primary">{pendingImports.length} imported item waiting for review</span>
              <p className="text-[11px] text-primary-dim">Show, then confirm: verify items before merging into your identity.</p>
            </div>
          </div>
          <button
            onClick={() => acceptImportedItem(pendingImports[0].id)}
            className="px-3 py-1 rounded-md bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
          >
            Accept ({pendingImports[0].title})
          </button>
        </div>
      )}

      {/* Split Pattern: Left Sub-navigation + Right Editor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Sub-navigation */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 md:shrink ${
                  isActive
                    ? 'bg-raised text-primary font-semibold border border-border shadow-minimal'
                    : 'text-primary-dim hover:text-primary hover:bg-raised/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={isActive ? 'text-white' : 'text-primary-dim'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-charcoal border border-border text-primary-dim">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Editor Area */}
        <div className="md:col-span-8 lg:col-span-9 rounded-2xl bg-charcoal border border-border p-5 text-xs">
          {/* TAB 1: Basic Information */}
          {activeTab === 'basic' && (
            <form onSubmit={handleSaveBasic} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Basic Information</h3>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Full Name</label>
                  <input
                    type="text"
                    value={basicForm.fullName}
                    onChange={(e) => setBasicForm({ ...basicForm, fullName: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Headline / Target Role</label>
                  <input
                    type="text"
                    value={basicForm.headline}
                    onChange={(e) => setBasicForm({ ...basicForm, headline: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Email</label>
                  <input
                    type="email"
                    value={basicForm.email}
                    onChange={(e) => setBasicForm({ ...basicForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Phone</label>
                  <input
                    type="text"
                    value={basicForm.phone}
                    onChange={(e) => setBasicForm({ ...basicForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Location</label>
                  <input
                    type="text"
                    value={basicForm.location}
                    onChange={(e) => setBasicForm({ ...basicForm, location: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Website</label>
                  <input
                    type="url"
                    value={basicForm.website}
                    onChange={(e) => setBasicForm({ ...basicForm, website: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Professional Bio</label>
                <textarea
                  rows={4}
                  value={basicForm.bio}
                  onChange={(e) => setBasicForm({ ...basicForm, bio: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />
              </div>
            </form>
          )}

          {/* TAB 2: Connected Accounts */}
          {activeTab === 'connections' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Connected Accounts</h3>
                <p className="text-xs text-primary-dim mt-0.5">
                  Verified connections pull repository commits and public credentials.
                </p>
              </div>

              <form onSubmit={handleAddConnection} className="flex flex-col sm:flex-row gap-2">
                <select
                  value={urlPlatform}
                  onChange={(e) => setUrlPlatform(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                >
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="personal">Personal Site</option>
                </select>

                <input
                  type="url"
                  placeholder="Paste URL (e.g. https://github.com/username)"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />

                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Connect
                </button>
              </form>

              <div className="space-y-2 pt-2">
                {profile.connectedAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3 rounded-xl bg-raised border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-surface">
                        {acc.platform === 'github' ? <GithubIcon className="w-3.5 h-3.5 text-white" /> :
                         acc.platform === 'linkedin' ? <LinkedinIcon className="w-3.5 h-3.5 text-zinc-300" /> :
                         <Globe className="w-3.5 h-3.5 text-zinc-300" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-semibold text-primary">{acc.username}</h4>
                          {acc.verified && (
                            <span className="text-[10px] font-mono text-emerald-400">✓ Verified</span>
                          )}
                        </div>
                        <a
                          href={acc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-primary-dim hover:text-primary flex items-center gap-1"
                        >
                          <span>{acc.url}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => disconnectAccount(acc.id)}
                      className="p-1 text-primary-dim hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Work Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Work Experience</h3>
                <button
                  onClick={() => setShowAddModal('experience')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-black text-xs font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-3">
                {profile.experiences.map((exp, expIdx) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-raised border border-border space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-primary">{exp.title}</h4>
                        <p className="text-[11px] text-primary-muted">{exp.company} · {exp.location}</p>
                        <p className="text-[10px] font-mono text-primary-dim">{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => reorderExperiences(expIdx, expIdx - 1)}
                          disabled={expIdx === 0}
                          className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                          title="Move up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => reorderExperiences(expIdx, expIdx + 1)}
                          disabled={expIdx === profile.experiences.length - 1}
                          className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                          title="Move down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteExperience(exp.id)}
                          className="text-primary-dim hover:text-red-400 p-1 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-xs text-primary-dim leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Education</h3>
                <button
                  onClick={() => setShowAddModal('education')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-black text-xs font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {profile.educations.map((edu, eduIdx) => (
                  <div key={edu.id} className="p-3.5 rounded-xl bg-raised border border-border flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-primary">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <p className="text-[11px] text-primary-muted">{edu.institution} ({edu.startDate} – {edu.endDate})</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => reorderEducations(eduIdx, eduIdx - 1)}
                        disabled={eduIdx === 0}
                        className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                        title="Move up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => reorderEducations(eduIdx, eduIdx + 1)}
                        disabled={eduIdx === profile.educations.length - 1}
                        className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                        title="Move down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button onClick={() => deleteEducation(edu.id)} className="text-primary-dim hover:text-red-400 p-1 ml-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Projects</h3>
                <button
                  onClick={() => setShowAddModal('project')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-black text-xs font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {profile.projects.map((proj, projIdx) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-raised border border-border space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-semibold text-primary">{proj.title}</h4>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => reorderProjects(projIdx, projIdx - 1)}
                          disabled={projIdx === 0}
                          className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                          title="Move up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => reorderProjects(projIdx, projIdx + 1)}
                          disabled={projIdx === profile.projects.length - 1}
                          className="p-1 rounded bg-surface border border-border text-primary-dim hover:text-primary disabled:opacity-30 transition-colors"
                          title="Move down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button onClick={() => deleteProject(proj.id)} className="text-primary-dim hover:text-red-400 p-1 ml-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-primary-dim leading-snug">{proj.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Skills Matrix</h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Skill name (e.g. TypeScript, Rust)"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                />

                <select
                  value={newSkillCat}
                  onChange={(e) => setNewSkillCat(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="Core & Tools">Core & Tools</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    if (newSkillName.trim()) {
                      addSkill({ name: newSkillName.trim(), category: newSkillCat, level: 'Advanced' });
                      setNewSkillName('');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {profile.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-raised border border-border text-xs text-primary"
                  >
                    <span>{skill.name}</span>
                    <button onClick={() => deleteSkill(skill.id)} className="text-primary-dim hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Certifications */}
          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Certifications</h3>
              </div>
              <div className="space-y-2">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-xl bg-raised border border-border flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-primary">{cert.name}</h4>
                      <p className="text-[10px] font-mono text-primary-dim">{cert.issuer} · {cert.issueDate}</p>
                    </div>
                    <button onClick={() => deleteCertification(cert.id)} className="text-primary-dim hover:text-red-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Publications */}
          {activeTab === 'publications' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-border">
                <h3 className="font-display font-semibold text-sm text-primary">Publications</h3>
              </div>
              <div className="space-y-2">
                {profile.publications.map((pub) => (
                  <div key={pub.id} className="p-3.5 rounded-xl bg-raised border border-border space-y-1">
                    <h4 className="text-xs font-semibold text-primary">{pub.title}</h4>
                    <p className="text-[11px] text-primary-dim">{pub.publisher} ({pub.date})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Guided Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowAddModal(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-2xl bg-charcoal border border-border p-5 shadow-modal z-10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-display font-semibold text-sm text-primary">Add Information</h3>
              <button onClick={() => setShowAddModal(null)} className="text-primary-dim hover:text-primary">
                <X className="w-4 h-4" />
              </button>
            </div>

            {showAddModal === 'menu' ? (
              <div className="grid grid-cols-2 gap-2 py-1">
                <button
                  onClick={() => setShowAddModal('experience')}
                  className="p-3 rounded-lg bg-raised border border-border hover:border-white/20 text-left transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-primary mb-1" />
                  <span className="text-xs font-semibold text-primary block">Experience</span>
                  <span className="text-[10px] text-primary-dim">Add employment</span>
                </button>

                <button
                  onClick={() => setShowAddModal('education')}
                  className="p-3 rounded-lg bg-raised border border-border hover:border-white/20 text-left transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-primary mb-1" />
                  <span className="text-xs font-semibold text-primary block">Education</span>
                  <span className="text-[10px] text-primary-dim">Add degree</span>
                </button>
              </div>
            ) : showAddModal === 'experience' ? (
              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={newExp.title}
                  onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newExp.company}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-raised border border-border text-xs text-primary"
                />
                <button
                  onClick={() => {
                    if (newExp.title && newExp.company) {
                      addExperience({
                        title: newExp.title,
                        company: newExp.company,
                        location: 'Remote',
                        startDate: '2023-01',
                        endDate: 'Present',
                        isCurrent: true,
                        description: newExp.description || 'Core engineering and architectural ownership',
                        bulletPoints: ['Delivered systems with uncompromising reliability'],
                        skills: ['TypeScript'],
                        verified: true
                      });
                      setShowAddModal(null);
                    }
                  }}
                  className="w-full py-2 rounded-lg bg-white text-black text-xs font-semibold"
                >
                  Save Experience
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Resume Import "Show, Then Confirm" Modal */}
      <ResumeImportModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        parsedData={parsedResume}
        filename={parsedFilename}
      />
    </div>
  );
};
