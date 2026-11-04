import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Experience, 
  Education, 
  Project, 
  Skill, 
  Certification, 
  Award, 
  Publication, 
  Language, 
  ConnectedAccount, 
  ImportedReviewItem, 
  CVDocument, 
  CoverLetterDocument, 
  PortfolioConfig,
  DocumentAsset 
} from '../types/profile';
import { INITIAL_USER_PROFILE, INITIAL_DOCUMENTS } from '../data/mockData';

export type WorkspaceTab = 
  | 'overview' 
  | 'profile' 
  | 'portfolio-studio' 
  | 'cv-studio' 
  | 'cover-letter-studio' 
  | 'documents' 
  | 'settings';

export type AppView = 'landing' | 'onboarding' | 'workspace' | 'published-portfolio';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface ProfileContextType {
  profile: UserProfile;
  documents: DocumentAsset[];
  currentView: AppView;
  currentWorkspaceTab: WorkspaceTab;
  isLoggedIn: boolean;
  toasts: ToastMessage[];
  // Modals
  authModal: 'signin' | 'signup' | 'forgot' | null;
  setAuthModal: (modal: 'signin' | 'signup' | 'forgot' | null) => void;
  // Navigation
  setCurrentView: (view: AppView) => void;
  setCurrentWorkspaceTab: (tab: WorkspaceTab) => void;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  showToast: (title: string, type?: 'success' | 'info' | 'warning' | 'error', message?: string) => void;
  dismissToast: (id: string) => void;
  
  // Profile mutations
  updateBasicInfo: (info: Partial<UserProfile>) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;

  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addSkill: (skill: Omit<Skill, 'id'>) => void;
  deleteSkill: (id: string) => void;

  addCertification: (cert: Omit<Certification, 'id'>) => void;
  deleteCertification: (id: string) => void;

  connectAccount: (account: Omit<ConnectedAccount, 'id' | 'connectedAt'>) => void;
  disconnectAccount: (id: string) => void;

  // Import Queue
  acceptImportedItem: (id: string) => void;
  discardImportedItem: (id: string) => void;
  simulateImportFromUrl: (url: string, platform: string) => void;
  simulateDocumentUpload: (filename: string) => void;

  // CV Studio
  activeCV: CVDocument;
  setActiveCV: (cv: CVDocument) => void;
  updateActiveCV: (updates: Partial<CVDocument>) => void;
  saveNewCV: (title: string) => void;
  createCVVariant: (title: string, targetRole: string) => void;
  deleteCVVariant: (id: string) => void;

  // Reordering
  reorderExperiences: (fromIndex: number, toIndex: number) => void;
  reorderEducations: (fromIndex: number, toIndex: number) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;

  // OLED Theme
  themePreference: 'obsidian' | 'oled';
  setThemePreference: (theme: 'obsidian' | 'oled') => void;

  // Cover Letter Studio
  activeCoverLetter: CoverLetterDocument;
  setActiveCoverLetter: (letter: CoverLetterDocument) => void;
  updateActiveCoverLetter: (updates: Partial<CoverLetterDocument>) => void;
  generateAICoverLetter: (company: string, jobTitle: string, jobDesc: string, tone: CoverLetterDocument['tone']) => Promise<void>;
  createCoverLetter: (company: string, jobTitle: string) => void;
  deleteCoverLetter: (id: string) => void;

  // Identity JSON Import/Restore
  importIdentityJson: (jsonData: any) => boolean;

  // Portfolio Studio
  updatePortfolioConfig: (updates: Partial<PortfolioConfig>) => void;
  togglePublishPortfolio: () => void;

  // Document Library
  deleteDocument: (id: string) => void;
  renameDocument: (id: string, newTitle: string) => void;
  addDocumentAsset: (doc: DocumentAsset) => void;

  // Reset
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'profileos_user_profile_v1';
const DOCS_STORAGE_KEY = 'profileos_user_docs_v1';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [documents, setDocuments] = useState<DocumentAsset[]>(() => {
    try {
      const saved = localStorage.getItem(DOCS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentWorkspaceTab, setCurrentWorkspaceTab] = useState<WorkspaceTab>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | 'forgot' | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [activeCV, setActiveCV] = useState<CVDocument>(() => profile.cvs[0]);
  const [activeCoverLetter, setActiveCoverLetter] = useState<CoverLetterDocument>(() => profile.coverLetters[0]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(documents));
    } catch (e) {
      console.error('Failed to save documents to localStorage', e);
    }
  }, [documents]);

  const showToast = (title: string, type: ToastMessage['type'] = 'info', message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const login = (email?: string, name?: string) => {
    setIsLoggedIn(true);
    if (name) {
      setProfile(p => ({ ...p, fullName: name, email: email || p.email }));
    }
    setAuthModal(null);
    setCurrentView('workspace');
    showToast('Signed in successfully', 'success', `Welcome back, ${name || profile.fullName}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
    showToast('Signed out', 'info', 'You have been signed out of your workspace');
  };

  // Recalculate profile completion
  const updateCompletion = (updated: UserProfile): UserProfile => {
    let score = 20; // base info
    if (updated.experiences.length > 0) score += 20;
    if (updated.educations.length > 0) score += 15;
    if (updated.projects.length > 0) score += 20;
    if (updated.skills.length >= 5) score += 15;
    if (updated.certifications.length > 0) score += 10;
    
    let nextPrompt = 'Profile is in great shape!';
    if (updated.educations.length === 0) nextPrompt = 'Next: add your education';
    else if (updated.projects.length === 0) nextPrompt = 'Next: showcase a key project';
    else if (updated.certifications.length === 0) nextPrompt = 'Next: add a certification or award';
    else if (updated.skills.length < 5) nextPrompt = 'Next: add more specialized skills';

    return { ...updated, completionScore: Math.min(score, 100), nextStepPrompt: nextPrompt };
  };

  const updateBasicInfo = (info: Partial<UserProfile>) => {
    setProfile(prev => updateCompletion({ ...prev, ...info }));
    showToast('Profile updated', 'success');
  };

  const addExperience = (exp: Omit<Experience, 'id'>) => {
    const newExp: Experience = { ...exp, id: `exp_${Date.now()}` };
    setProfile(prev => updateCompletion({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
    showToast('Experience added', 'success', `${exp.title} at ${exp.company}`);
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setProfile(prev => updateCompletion({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, ...exp } : e)
    }));
    showToast('Experience updated', 'success');
  };

  const deleteExperience = (id: string) => {
    setProfile(prev => updateCompletion({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
    showToast('Experience deleted', 'info');
  };

  const addEducation = (edu: Omit<Education, 'id'>) => {
    const newEdu: Education = { ...edu, id: `edu_${Date.now()}` };
    setProfile(prev => updateCompletion({
      ...prev,
      educations: [newEdu, ...prev.educations]
    }));
    showToast('Education added', 'success', `${edu.degree} - ${edu.institution}`);
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setProfile(prev => updateCompletion({
      ...prev,
      educations: prev.educations.map(e => e.id === id ? { ...e, ...edu } : e)
    }));
    showToast('Education updated', 'success');
  };

  const deleteEducation = (id: string) => {
    setProfile(prev => updateCompletion({
      ...prev,
      educations: prev.educations.filter(e => e.id !== id)
    }));
    showToast('Education deleted', 'info');
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj: Project = { ...proj, id: `proj_${Date.now()}` };
    setProfile(prev => updateCompletion({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    showToast('Project added', 'success', proj.title);
  };

  const updateProject = (id: string, proj: Partial<Project>) => {
    setProfile(prev => updateCompletion({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...proj } : p)
    }));
    showToast('Project updated', 'success');
  };

  const deleteProject = (id: string) => {
    setProfile(prev => updateCompletion({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    showToast('Project removed', 'info');
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: `sk_${Date.now()}` };
    setProfile(prev => updateCompletion({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    showToast('Skill added', 'success', skill.name);
  };

  const deleteSkill = (id: string) => {
    setProfile(prev => updateCompletion({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
    showToast('Skill removed', 'info');
  };

  const addCertification = (cert: Omit<Certification, 'id'>) => {
    const newCert: Certification = { ...cert, id: `cert_${Date.now()}` };
    setProfile(prev => updateCompletion({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
    showToast('Certification added', 'success', cert.name);
  };

  const deleteCertification = (id: string) => {
    setProfile(prev => updateCompletion({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
    showToast('Certification removed', 'info');
  };

  const connectAccount = (account: Omit<ConnectedAccount, 'id' | 'connectedAt'>) => {
    const newAcc: ConnectedAccount = {
      ...account,
      id: `conn_${Date.now()}`,
      connectedAt: new Date().toISOString().split('T')[0]
    };
    setProfile(prev => ({
      ...prev,
      connectedAccounts: [...prev.connectedAccounts, newAcc]
    }));
    showToast('Account connected', 'success', `Connected ${account.platform}`);
  };

  const disconnectAccount = (id: string) => {
    setProfile(prev => ({
      ...prev,
      connectedAccounts: prev.connectedAccounts.filter(a => a.id !== id)
    }));
    showToast('Account disconnected', 'info');
  };

  // Review Queue
  const acceptImportedItem = (id: string) => {
    const item = profile.importedQueue.find(i => i.id === id);
    if (!item) return;

    if (item.category === 'Project') {
      addProject({
        title: item.data.title || item.title,
        subtitle: item.data.subtitle || '',
        description: item.data.description || '',
        tags: item.data.tags || ['Open Source'],
        repoUrl: item.data.repoUrl,
        liveUrl: item.data.liveUrl,
        stars: item.data.stars || 0,
        highlights: item.data.highlights || ['Verified through GitHub official API integration'],
        isFeatured: false,
        verified: true
      });
    } else if (item.category === 'Certification') {
      addCertification({
        name: item.data.name || item.title,
        issuer: item.data.issuer || 'Accredited Issuer',
        issueDate: item.data.issueDate || '2024-01',
        credentialId: item.data.credentialId,
        verified: true
      });
    }

    setProfile(prev => ({
      ...prev,
      importedQueue: prev.importedQueue.filter(i => i.id !== id)
    }));
    showToast('Item verified & accepted', 'success', item.title);
  };

  const discardImportedItem = (id: string) => {
    setProfile(prev => ({
      ...prev,
      importedQueue: prev.importedQueue.filter(i => i.id !== id)
    }));
    showToast('Imported item discarded', 'info');
  };

  const simulateImportFromUrl = (url: string, platform: string) => {
    // Generate realistic review items
    const username = url.split('/').filter(Boolean).pop() || 'developer';
    const newItem: ImportedReviewItem = {
      id: `imp_${Date.now()}`,
      category: 'Project',
      title: `${username}/distributed-runtime`,
      subtitle: `Verified repository extracted via ${platform} API`,
      source: `${platform} API`,
      status: 'pending',
      data: {
        title: `Distributed Runtime (${username})`,
        subtitle: 'High performance event-driven service orchestrator',
        description: 'Auto-extracted repository structure and readme documentation with verified commit history.',
        tags: ['TypeScript', 'Cloud', 'Distributed'],
        repoUrl: url,
        stars: 284,
        highlights: ['Verified repository commits by author']
      }
    };

    setProfile(prev => ({
      ...prev,
      importedQueue: [newItem, ...prev.importedQueue]
    }));
    showToast('Import candidate detected', 'info', `Review extracted project: ${newItem.title}`);
  };

  const simulateDocumentUpload = (filename: string) => {
    const newItem: ImportedReviewItem = {
      id: `imp_${Date.now()}`,
      category: 'Certification',
      title: `Credential parsed from ${filename}`,
      subtitle: 'Google Professional Cloud Architect',
      source: 'Document Parser',
      status: 'pending',
      data: {
        name: 'Google Professional Cloud Architect',
        issuer: 'Google Cloud',
        issueDate: '2024-05',
        credentialId: 'GCP-PCA-77402'
      }
    };

    setProfile(prev => ({
      ...prev,
      importedQueue: [newItem, ...prev.importedQueue]
    }));

    // Also add to My Documents
    const newDoc: DocumentAsset = {
      id: `doc_${Date.now()}`,
      title: filename,
      type: 'imported',
      format: filename.endsWith('.docx') ? 'DOCX' : 'PDF',
      updatedAt: new Date().toISOString().split('T')[0],
      size: '284 KB',
      meta: 'User document import'
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast('Document parsed', 'success', `Extracted credential ready for review`);
  };

  // CV Studio
  const updateActiveCV = (updates: Partial<CVDocument>) => {
    setActiveCV(prev => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
      // Sync to profile.cvs
      setProfile(p => ({
        ...p,
        cvs: p.cvs.map(c => c.id === updated.id ? updated : c)
      }));
      return updated;
    });
  };

  const saveNewCV = (title: string) => {
    const newCV: CVDocument = {
      ...activeCV,
      id: `cv_${Date.now()}`,
      title,
      version: 1,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProfile(prev => ({
      ...prev,
      cvs: [newCV, ...prev.cvs]
    }));
    setActiveCV(newCV);
    
    // Add to documents
    const docAsset: DocumentAsset = {
      id: `doc_cv_${Date.now()}`,
      title: `${title}.pdf`,
      type: 'cv',
      format: 'PDF',
      updatedAt: new Date().toISOString().split('T')[0],
      size: '124 KB',
      meta: `${newCV.template.toUpperCase()} template`
    };
    setDocuments(prev => [docAsset, ...prev]);
    showToast('New CV saved', 'success', title);
  };

  const createCVVariant = (title: string, targetRole: string) => {
    const newCV: CVDocument = {
      ...activeCV,
      id: `cv_${Date.now()}`,
      title,
      targetRole,
      summary: `Tailored resume variant focused on ${targetRole}. Extracted from verified experience.`,
      version: 1,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProfile(prev => ({
      ...prev,
      cvs: [newCV, ...prev.cvs]
    }));
    setActiveCV(newCV);
    showToast('CV Variant Created', 'success', title);
  };

  const deleteCVVariant = (id: string) => {
    if (profile.cvs.length <= 1) {
      showToast('Cannot delete primary CV', 'warning');
      return;
    }
    const filtered = profile.cvs.filter(c => c.id !== id);
    setProfile(prev => ({ ...prev, cvs: filtered }));
    if (activeCV.id === id) {
      setActiveCV(filtered[0]);
    }
    showToast('CV Variant Removed', 'info');
  };

  const reorderExperiences = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= profile.experiences.length || toIndex < 0 || toIndex >= profile.experiences.length) return;
    const items = [...profile.experiences];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    setProfile(prev => ({ ...prev, experiences: items }));
    showToast('Experience order updated', 'success');
  };

  const reorderEducations = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= profile.educations.length || toIndex < 0 || toIndex >= profile.educations.length) return;
    const items = [...profile.educations];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    setProfile(prev => ({ ...prev, educations: items }));
    showToast('Education order updated', 'success');
  };

  const reorderProjects = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= profile.projects.length || toIndex < 0 || toIndex >= profile.projects.length) return;
    const items = [...profile.projects];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    setProfile(prev => ({ ...prev, projects: items }));
    showToast('Projects order updated', 'success');
  };

  const [themePreference, setThemePreferenceState] = useState<'obsidian' | 'oled'>(() => {
    return profile.themePreference || 'obsidian';
  });

  const setThemePreference = (theme: 'obsidian' | 'oled') => {
    setThemePreferenceState(theme);
    setProfile(prev => ({ ...prev, themePreference: theme }));
    showToast(`Switched to ${theme === 'oled' ? 'Pitch-Black (OLED)' : 'Minimalist Obsidian'} mode`, 'info');
  };

  // Cover Letter Studio
  const updateActiveCoverLetter = (updates: Partial<CoverLetterDocument>) => {
    setActiveCoverLetter(prev => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
      setProfile(p => ({
        ...p,
        coverLetters: p.coverLetters.map(c => c.id === updated.id ? updated : c)
      }));
      return updated;
    });
  };

  const generateAICoverLetter = async (
    company: string, 
    jobTitle: string, 
    jobDesc: string, 
    tone: CoverLetterDocument['tone']
  ) => {
    // Simulated deterministic AI task following design principle: Truth over polish!
    // Uses real experiences and projects from profile, no hallucinations.
    const leadExp = profile.experiences[0];
    const topProject = profile.projects[0];
    const skillsMention = profile.skills.slice(0, 4).map(s => s.name).join(', ');

    let toneGreeting = `Dear ${company} Hiring Team,`;
    let toneOpening = `I am writing to express my strong enthusiasm for the ${jobTitle} role at ${company}.`;

    if (tone === 'Warm & Engaging') {
      toneGreeting = `Hello ${company} Team,`;
      toneOpening = `I was thrilled to come across the ${jobTitle} opening at ${company}. Having followed your product journey, your dedication to engineering excellence resonates deeply with my own philosophy.`;
    } else if (tone === 'Concise & Technical') {
      toneGreeting = `To the ${company} Technical Team:`;
      toneOpening = `Re: Application for ${jobTitle}. With ${leadExp ? 'proven experience as ' + leadExp.title : 'a deep background in modern systems engineering'}, I am eager to contribute immediately to ${company}'s technical roadmap.`;
    }

    const generatedBody = `${toneGreeting}

${toneOpening}

Over the past several years, I have focused on building high-performance, deterministic architectures. Most recently as ${leadExp ? `${leadExp.title} at ${leadExp.company}` : 'Senior Engineer'}, I ${leadExp ? leadExp.description.toLowerCase() : 'led core development of distributed systems'}. Specifically, I:
${leadExp && leadExp.bulletPoints.length > 0 ? `• ${leadExp.bulletPoints[0]}` : `• Delivered mission-critical systems with uncompromising reliability`}
${topProject ? `• Created ${topProject.title} (${topProject.subtitle}), architected with ${topProject.tags.join(', ')}` : ''}

My core toolkit spans ${skillsMention}, paired with a steadfast commitment to clean abstraction boundaries and verifiable code quality. When reviewing your requirement for ${jobTitle}, my hands-on background with scale directly aligns with the problems your team solves every day.

${company}'s reputation for quality makes this an ideal next step for my career. I welcome the opportunity to discuss how my verified background and technical leadership can deliver measurable impact to your team.

Warm regards,
${profile.fullName}
${profile.email} | ${profile.phone}`;

    updateActiveCoverLetter({
      company,
      jobTitle,
      jobDescription: jobDesc,
      tone,
      content: generatedBody,
      updatedAt: new Date().toISOString().split('T')[0]
    });

    showToast('Cover letter generated', 'success', `Tailored for ${company} with verified facts`);
  };

  const createCoverLetter = (company: string, jobTitle: string) => {
    const newLetter: CoverLetterDocument = {
      id: `cl_${Date.now()}`,
      title: `${company} Application`,
      company,
      jobTitle,
      jobDescription: '',
      tone: 'Confident & Impactful',
      content: `Dear ${company} Hiring Team,\n\nI am writing to express my enthusiasm for the ${jobTitle} role at ${company}.\n\nSincerely,\n${profile.fullName}`,
      updatedAt: new Date().toISOString().split('T')[0],
      version: 1
    };
    setProfile(prev => ({
      ...prev,
      coverLetters: [newLetter, ...prev.coverLetters]
    }));
    setActiveCoverLetter(newLetter);
    showToast('New Cover Letter created', 'success', `${company} - ${jobTitle}`);
  };

  const deleteCoverLetter = (id: string) => {
    if (profile.coverLetters.length <= 1) {
      showToast('Cannot delete primary cover letter', 'warning');
      return;
    }
    const filtered = profile.coverLetters.filter(c => c.id !== id);
    setProfile(prev => ({ ...prev, coverLetters: filtered }));
    if (activeCoverLetter.id === id) {
      setActiveCoverLetter(filtered[0]);
    }
    showToast('Cover letter removed', 'info');
  };

  const importIdentityJson = (jsonData: any): boolean => {
    try {
      if (!jsonData || typeof jsonData !== 'object') {
        showToast('Invalid JSON file format', 'error');
        return false;
      }
      if (!jsonData.fullName && !jsonData.email) {
        showToast('Invalid ProfileOS schema: missing identity fields', 'error');
        return false;
      }
      const restored: UserProfile = {
        ...INITIAL_USER_PROFILE,
        ...jsonData,
        id: jsonData.id || `usr_${Date.now()}`
      };
      setProfile(restored);
      if (restored.cvs && restored.cvs.length > 0) {
        setActiveCV(restored.cvs[0]);
      }
      if (restored.coverLetters && restored.coverLetters.length > 0) {
        setActiveCoverLetter(restored.coverLetters[0]);
      }
      showToast('Identity successfully restored!', 'success', `Loaded profile for ${restored.fullName}`);
      return true;
    } catch (e) {
      console.error(e);
      showToast('Failed to import JSON data', 'error');
      return false;
    }
  };

  // Portfolio Studio
  const updatePortfolioConfig = (updates: Partial<PortfolioConfig>) => {
    setProfile(prev => ({
      ...prev,
      portfolio: { ...prev.portfolio, ...updates }
    }));
    showToast('Portfolio configuration updated', 'success');
  };

  const togglePublishPortfolio = () => {
    const willPublish = !profile.portfolio.published;
    setProfile(prev => ({
      ...prev,
      portfolio: { ...prev.portfolio, published: willPublish }
    }));
    if (willPublish) {
      showToast('Portfolio Published!', 'success', `Live at profileos.me/p/${profile.portfolio.slug}`);
    } else {
      showToast('Portfolio Unpublished', 'info', 'Your portfolio is now in private draft mode');
    }
  };

  // Document Library
  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Document deleted', 'info');
  };

  const renameDocument = (id: string, newTitle: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, title: newTitle } : d));
    showToast('Document renamed', 'success');
  };

  const addDocumentAsset = (doc: DocumentAsset) => {
    setDocuments(prev => [doc, ...prev]);
  };

  const resetToDefaults = () => {
    setProfile(INITIAL_USER_PROFILE);
    setDocuments(INITIAL_DOCUMENTS);
    setActiveCV(INITIAL_USER_PROFILE.cvs[0]);
    setActiveCoverLetter(INITIAL_USER_PROFILE.coverLetters[0]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DOCS_STORAGE_KEY);
    showToast('Profile reset to initial verified state', 'info');
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      documents,
      currentView,
      currentWorkspaceTab,
      isLoggedIn,
      toasts,
      authModal,
      setAuthModal,
      setCurrentView,
      setCurrentWorkspaceTab,
      login,
      logout,
      showToast,
      dismissToast,
      updateBasicInfo,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      deleteSkill,
      addCertification,
      deleteCertification,
      connectAccount,
      disconnectAccount,
      acceptImportedItem,
      discardImportedItem,
      simulateImportFromUrl,
      simulateDocumentUpload,
      activeCV,
      setActiveCV,
      updateActiveCV,
      saveNewCV,
      createCVVariant,
      deleteCVVariant,
      reorderExperiences,
      reorderEducations,
      reorderProjects,
      themePreference,
      setThemePreference,
      activeCoverLetter,
      setActiveCoverLetter,
      updateActiveCoverLetter,
      generateAICoverLetter,
      createCoverLetter,
      deleteCoverLetter,
      importIdentityJson,
      updatePortfolioConfig,
      togglePublishPortfolio,
      deleteDocument,
      renameDocument,
      addDocumentAsset,
      resetToDefaults
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

