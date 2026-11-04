export type ProfessionalCategory = 
  | 'Student / Graduate'
  | 'Developer'
  | 'Designer'
  | 'Business Professional'
  | 'Freelancer'
  | 'Entrepreneur'
  | 'Researcher / Academic'
  | 'Other';

export interface ConnectedAccount {
  id: string;
  platform: 'github' | 'linkedin' | 'dribbble' | 'behance' | 'medium' | 'twitter' | 'personal' | 'custom';
  username: string;
  url: string;
  connectedAt: string;
  verified: boolean;
  status: 'connected' | 'imported' | 'failed' | 'manual';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  bulletPoints: string[];
  skills: string[];
  verified: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
  verified: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  stars?: number;
  highlights: string[];
  isFeatured: boolean;
  verified: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Design & UX' | 'AI & ML' | 'Core & Tools' | 'Soft Skills';
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar';
  yearsExperience?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  verified: boolean;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  authors: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional Working' | 'Intermediate' | 'Basic';
}

export interface ImportedReviewItem {
  id: string;
  category: 'Experience' | 'Education' | 'Project' | 'Skill' | 'Certification';
  title: string;
  subtitle: string;
  source: string;
  status: 'pending' | 'accepted' | 'discarded';
  data: any;
}

export type CVTemplateId = 'modern' | 'ats' | 'academic' | 'executive' | 'minimal';

export interface CVFormatting {
  fontFamily: 'Inter' | 'Space Grotesk' | 'Merriweather' | 'JetBrains Mono';
  fontSize: '9pt' | '10pt' | '11pt' | '12pt';
  margins: 'compact' | 'standard' | 'spacious';
  accentColor: string;
}

export interface CVDocument {
  id: string;
  title: string;
  targetRole: string;
  summary: string;
  template: CVTemplateId;
  formatting: CVFormatting;
  sections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    certifications: boolean;
  };
  jobDescriptionTailor?: string;
  updatedAt: string;
  version: number;
}

export type CoverLetterTone = 'Formal & Direct' | 'Warm & Engaging' | 'Confident & Impactful' | 'Concise & Technical';

export interface CoverLetterDocument {
  id: string;
  title: string;
  company: string;
  jobTitle: string;
  jobDescription: string;
  tone: CoverLetterTone;
  content: string;
  updatedAt: string;
  version: number;
}

export type PortfolioTemplateId = 'minimal' | 'modern' | 'creative';

export interface PortfolioConfig {
  template: PortfolioTemplateId;
  published: boolean;
  slug: string;
  headline: string;
  subheadline: string;
  accentColor: string;
  font: string;
  visibleSections: {
    hero: boolean;
    about: boolean;
    experience: boolean;
    projects: boolean;
    skills: boolean;
    certifications: boolean;
    contact: boolean;
  };
  customBio?: string;
  privacy: 'public' | 'password' | 'unlisted';
  accessPin?: string;
}

export interface UserProfile {
  id: string;
  themePreference?: 'obsidian' | 'oled';
  fullName: string;
  category: ProfessionalCategory;
  headline: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  website: string;
  bio: string;
  completionScore: number;
  nextStepPrompt: string;
  connectedAccounts: ConnectedAccount[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  languages: Language[];
  interests: string[];
  importedQueue: ImportedReviewItem[];
  cvs: CVDocument[];
  coverLetters: CoverLetterDocument[];
  portfolio: PortfolioConfig;
}

export interface DocumentAsset {
  id: string;
  title: string;
  type: 'cv' | 'cover_letter' | 'portfolio' | 'imported';
  format: 'PDF' | 'DOCX' | 'Web' | 'JSON';
  updatedAt: string;
  size: string;
  meta: string;
  downloadPayload?: any;
}

