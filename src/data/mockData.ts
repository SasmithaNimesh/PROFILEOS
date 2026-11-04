import { UserProfile, DocumentAsset } from '../types/profile';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_01hqz89',
  fullName: 'Alex Chen',
  category: 'Developer',
  headline: 'Senior Full-Stack Engineer & AI Systems Architect',
  email: 'alex.chen@example.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  website: 'https://alexchen.dev',
  bio: 'Specializing in reactive web architectures, LLM orchestration engines, and high-throughput distributed systems. Obsessed with clean UX and deterministic software design.',
  completionScore: 85,
  nextStepPrompt: 'Add your latest certification or publication',
  connectedAccounts: [
    {
      id: 'conn_gh',
      platform: 'github',
      username: 'alexchen-dev',
      url: 'https://github.com/alexchen-dev',
      connectedAt: '2026-10-15',
      verified: true,
      status: 'connected',
    },
    {
      id: 'conn_li',
      platform: 'linkedin',
      username: 'alex-chen-tech',
      url: 'https://linkedin.com/in/alex-chen-tech',
      connectedAt: '2026-10-15',
      verified: true,
      status: 'connected',
    },
    {
      id: 'conn_per',
      platform: 'personal',
      username: 'alexchen.dev',
      url: 'https://alexchen.dev',
      connectedAt: '2026-10-20',
      verified: true,
      status: 'connected',
    }
  ],
  experiences: [
    {
      id: 'exp_1',
      title: 'Lead Systems Architect',
      company: 'Aetherial Cloud Systems',
      location: 'San Francisco, CA',
      startDate: '2023-04',
      endDate: 'Present',
      isCurrent: true,
      description: 'Directed the architectural evolution of the core real-time streaming data platform serving 12M+ concurrent connections.',
      bulletPoints: [
        'Designed and implemented low-latency streaming pipeline reducing p99 latency from 140ms to 24ms across 8 edge regions.',
        'Engineered an internal autonomous agent orchestration runtime using TypeScript and Rust, adopted by 40+ engineering squads.',
        'Mentored 14 senior and staff engineers in distributed systems design, fault tolerance patterns, and automated contract testing.'
      ],
      skills: ['TypeScript', 'Rust', 'Kafka', 'Kubernetes', 'Distributed Systems'],
      verified: true
    },
    {
      id: 'exp_2',
      title: 'Senior Full-Stack Engineer',
      company: 'Synthetix AI',
      location: 'Palo Alto, CA',
      startDate: '2021-01',
      endDate: '2023-03',
      isCurrent: false,
      description: 'Built customer-facing generative workflows and collaborative canvas tooling.',
      bulletPoints: [
        'Spearheaded the development of a real-time multiplayer infinite canvas utilizing CRDTs and WebSockets for 100k+ active users.',
        'Integrated Claude and OpenAI LLM streaming pipelines with speculative decoding, boosting perceived responsiveness by 65%.',
        'Decreased frontend bundle size by 42% through AST tree-shaking and dynamic module virtualization.'
      ],
      skills: ['React', 'Next.js', 'WebSockets', 'Python', 'Tailwind CSS'],
      verified: true
    },
    {
      id: 'exp_3',
      title: 'Software Engineer',
      company: 'Nexus Data Labs',
      location: 'New York, NY',
      startDate: '2019-06',
      endDate: '2020-12',
      isCurrent: false,
      description: 'Full stack development of automated data pipelines and analytical dashboards.',
      bulletPoints: [
        'Refactored legacy REST microservices to GraphQL federated graph with Apollo Gateway, cutting client request round-trips by 70%.',
        'Implemented end-to-end automated testing suite with Cypress and Jest achieving 94% branch coverage.'
      ],
      skills: ['TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
      verified: true
    }
  ],
  educations: [
    {
      id: 'edu_1',
      institution: 'Stanford University',
      degree: 'B.S. in Computer Science',
      fieldOfStudy: 'Artificial Intelligence & Systems',
      startDate: '2015-09',
      endDate: '2019-06',
      grade: '3.92 GPA (Department Honors)',
      description: 'Coursework in Advanced Operating Systems, Distributed Consensus, Machine Learning, and Computer Vision. President of Stanford Hackers Club.',
      verified: true
    }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'HyperStream Agent Kernel',
      subtitle: 'Deterministic, low-latency execution environment for autonomous LLM agents',
      description: 'An open-source runtime engine designed for sandboxed multi-agent collaboration with cryptographic verification of tool executions.',
      tags: ['TypeScript', 'Rust', 'LLM', 'Wasm', 'Docker'],
      repoUrl: 'https://github.com/alexchen-dev/hyperstream-kernel',
      liveUrl: 'https://hyperstream.run',
      stars: 1840,
      highlights: [
        'Featured on Hacker News front page (#1 for 14 hours)',
        'Benchmarked at 4.2x faster tool dispatch than standard Python LangChain runtimes',
        'Zero external runtime dependencies with embedded SQLite state store'
      ],
      isFeatured: true,
      verified: true
    },
    {
      id: 'proj_2',
      title: 'PulseCanvas UI Studio',
      subtitle: 'GPU-accelerated collaborative design canvas built on WebGL & WebGPU',
      description: 'Browser-based design environment supporting 100,000+ vector paths at smooth 120 FPS rendering on modern displays.',
      tags: ['React', 'WebGPU', 'TypeScript', 'GLSL', 'Vite'],
      repoUrl: 'https://github.com/alexchen-dev/pulsecanvas',
      liveUrl: 'https://pulsecanvas.studio',
      stars: 960,
      highlights: [
        'Novel tessellation algorithm written in WGSL for realtime Bezier curves',
        'Sub-5ms multi-user collaborative sync using state-based CRDTs'
      ],
      isFeatured: true,
      verified: true
    },
    {
      id: 'proj_3',
      title: 'OmniTrace APM',
      subtitle: 'Distributed tracing & anomaly detection with zero runtime overhead',
      description: 'eBPF-powered network and kernel level observability agent for Kubernetes clusters.',
      tags: ['Go', 'eBPF', 'Prometheus', 'Grafana', 'Linux'],
      repoUrl: 'https://github.com/alexchen-dev/omnitrace',
      stars: 520,
      highlights: [
        'Monitors syscall latencies without modifying user-space application binaries',
        'Reduces diagnostic triage time for P1 outages by an average of 45 minutes'
      ],
      isFeatured: false,
      verified: true
    }
  ],
  skills: [
    { id: 'sk_1', name: 'TypeScript / JavaScript', category: 'Frontend', level: 'Expert', yearsExperience: 7 },
    { id: 'sk_2', name: 'React & Next.js', category: 'Frontend', level: 'Expert', yearsExperience: 6 },
    { id: 'sk_3', name: 'Tailwind CSS', category: 'Frontend', level: 'Expert', yearsExperience: 5 },
    { id: 'sk_4', name: 'Node.js & Express', category: 'Backend', level: 'Expert', yearsExperience: 7 },
    { id: 'sk_5', name: 'Rust', category: 'Backend', level: 'Advanced', yearsExperience: 3 },
    { id: 'sk_6', name: 'Python', category: 'Backend', level: 'Advanced', yearsExperience: 5 },
    { id: 'sk_7', name: 'PostgreSQL & pgvector', category: 'Backend', level: 'Expert', yearsExperience: 6 },
    { id: 'sk_8', name: 'Docker & Kubernetes', category: 'DevOps & Cloud', level: 'Advanced', yearsExperience: 5 },
    { id: 'sk_9', name: 'AWS & Cloudflare', category: 'DevOps & Cloud', level: 'Advanced', yearsExperience: 6 },
    { id: 'sk_10', name: 'LLM Orchestration & RAG', category: 'AI & ML', level: 'Expert', yearsExperience: 3 },
    { id: 'sk_11', name: 'Distributed Systems', category: 'Core & Tools', level: 'Expert', yearsExperience: 6 },
    { id: 'sk_12', name: 'System Architecture', category: 'Core & Tools', level: 'Expert', yearsExperience: 6 }
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2024-03',
      expiryDate: '2027-03',
      credentialId: 'AWS-PSA-982143',
      credentialUrl: 'https://aws.amazon.com/verification',
      verified: true
    },
    {
      id: 'cert_2',
      name: 'Kubernetes Certified Administrator (CKA)',
      issuer: 'Linux Foundation / CNCF',
      issueDate: '2023-11',
      expiryDate: '2026-11',
      credentialId: 'CKA-884102',
      credentialUrl: 'https://cncf.io/verification',
      verified: true
    }
  ],
  awards: [
    {
      id: 'aw_1',
      title: '1st Place – Global Open Source AI Hackathon',
      issuer: 'TechCrunch Disrupt',
      date: '2025-09',
      description: 'Awarded first place among 600+ international teams for developing an automated zero-trust agent verification pipeline.'
    }
  ],
  publications: [
    {
      id: 'pub_1',
      title: 'Scalable CRDT Synchronization Over Heterogeneous Edge Nodes',
      publisher: 'IEEE Distributed Systems Symposium',
      date: '2024-05',
      url: 'https://doi.org/10.1109/DSS.2024.19',
      authors: 'A. Chen, E. Vance, M. Sterling',
      description: 'A study on minimizing tombstone overhead and vector clock bloat in multi-region collaborative editing applications.'
    }
  ],
  languages: [
    { id: 'lang_1', name: 'English', proficiency: 'Native' },
    { id: 'lang_2', name: 'Mandarin Chinese', proficiency: 'Professional Working' },
    { id: 'lang_3', name: 'Spanish', proficiency: 'Intermediate' }
  ],
  interests: ['Open Source Tooling', 'Mechanical Keyboards', 'Mountaineering', 'Synthesizer Sound Design'],
  importedQueue: [
    {
      id: 'imp_1',
      category: 'Project',
      title: 'neural-diff-engine',
      subtitle: 'Imported from GitHub repo (142 stars)',
      source: 'GitHub API',
      status: 'pending',
      data: {
        title: 'Neural Diff Engine',
        subtitle: 'Semantic code change summarizer powered by local SLMs',
        description: 'Command line tool that produces concise, intent-driven commit and PR summaries by comparing AST deltas.',
        tags: ['Rust', 'Tree-sitter', 'AI'],
        repoUrl: 'https://github.com/alexchen-dev/neural-diff-engine',
        stars: 142
      }
    },
    {
      id: 'imp_2',
      category: 'Certification',
      title: 'HashiCorp Certified: Terraform Associate',
      subtitle: 'Imported from uploaded resume PDF',
      source: 'Document Parser',
      status: 'pending',
      data: {
        name: 'HashiCorp Certified: Terraform Associate (003)',
        issuer: 'HashiCorp',
        issueDate: '2024-08',
        credentialId: 'HC-TA-51920'
      }
    }
  ],
  cvs: [
    {
      id: 'cv_01',
      title: 'Senior Systems Architect - Core CV',
      targetRole: 'Staff / Principal Infrastructure Engineer',
      summary: 'Distinguished Systems Architect with 7+ years architecting fault-tolerant streaming pipelines, distributed agent kernels, and high-performance Web platforms. Deep specialization in low-latency reactive backends, CRDTs, and modern TypeScript/Rust ecosystems.',
      template: 'modern',
      formatting: {
        fontFamily: 'Inter',
        fontSize: '10pt',
        margins: 'standard',
        accentColor: '#3B82F6'
      },
      sections: {
        summary: true,
        experience: true,
        education: true,
        projects: true,
        skills: true,
        certifications: true
      },
      updatedAt: '2026-11-03',
      version: 3
    },
    {
      id: 'cv_02',
      title: 'Full-Stack Technical Lead - ATS Optimized',
      targetRole: 'Lead Full-Stack Engineer',
      summary: 'Accomplished engineering lead with extensive track record shipping zero-downtime distributed systems and customer-delighting interfaces. Proven leader of cross-functional engineering teams delivering enterprise-grade web applications.',
      template: 'ats',
      formatting: {
        fontFamily: 'Inter',
        fontSize: '10pt',
        margins: 'spacious',
        accentColor: '#11131A'
      },
      sections: {
        summary: true,
        experience: true,
        education: true,
        projects: true,
        skills: true,
        certifications: false
      },
      updatedAt: '2026-10-28',
      version: 1
    }
  ],
  coverLetters: [
    {
      id: 'cl_01',
      title: 'Lead Architect Application — Stripe',
      company: 'Stripe',
      jobTitle: 'Staff Distributed Systems Engineer',
      jobDescription: 'Seeking an exceptional engineer to design and scale next-generation financial settlement engines handling hundreds of billions in global commerce volume.',
      tone: 'Confident & Impactful',
      content: `Dear Stripe Engineering Leadership,

I am writing to express my earnest enthusiasm for the Staff Distributed Systems Engineer position on Stripe’s Global Infrastructure team. Having spent over seven years scaling mission-critical platforms—most recently architecting a distributed streaming pipeline at Aetherial Cloud Systems that reduced p99 latency by over 80% across eight global edge regions—I have long admired Stripe's relentless commitment to infrastructure elegance and developer precision.

At Aetherial, I spearheaded our autonomous agent runtime and high-throughput transaction ledger, ensuring deterministic state verification under peak load of 12 million concurrent connections. Prior to this, at Synthetix AI, I architected our distributed real-time sync systems using CRDTs, pairing high developer velocity with rigorous fault tolerance.

Stripe’s mission of growing the GDP of the internet demands an uncompromising standard for correctness, observability, and latency. My extensive background in Rust, TypeScript, and distributed consensus directly aligns with the technical challenges your team navigates every day.

I would welcome the opportunity to discuss how my systems engineering rigor and technical leadership can help expand Stripe’s global platform.

Sincerely,
Alex Chen`,
      updatedAt: '2026-11-02',
      version: 2
    }
  ],
  portfolio: {
    template: 'modern',
    published: true,
    slug: 'alexchen',
    headline: 'Alex Chen',
    subheadline: 'Senior Full-Stack Engineer & AI Systems Architect',
    accentColor: '#3B82F6',
    font: 'Space Grotesk',
    visibleSections: {
      hero: true,
      about: true,
      experience: true,
      projects: true,
      skills: true,
      certifications: true,
      contact: true
    },
    customBio: 'Crafting robust distributed systems, low-latency agent engines, and delightful developer tools with an obsessive focus on craft.',
    privacy: 'public',
    accessPin: ''
  },
  themePreference: 'obsidian'
};

export const INITIAL_DOCUMENTS: DocumentAsset[] = [
  {
    id: 'doc_1',
    title: 'Senior Systems Architect - Core CV.pdf',
    type: 'cv',
    format: 'PDF',
    updatedAt: '2026-11-03',
    size: '142 KB',
    meta: 'Modern Template · 2 pages'
  },
  {
    id: 'doc_2',
    title: 'Full-Stack Technical Lead - ATS.docx',
    type: 'cv',
    format: 'DOCX',
    updatedAt: '2026-10-28',
    size: '89 KB',
    meta: 'ATS-Friendly · Standard Margins'
  },
  {
    id: 'doc_3',
    title: 'Lead Architect Application — Stripe.pdf',
    type: 'cover_letter',
    format: 'PDF',
    updatedAt: '2026-11-02',
    size: '64 KB',
    meta: 'Confident & Impactful tone'
  },
  {
    id: 'doc_4',
    title: 'Alex Chen Published Portfolio (v2.4)',
    type: 'portfolio',
    format: 'Web',
    updatedAt: '2026-11-01',
    size: 'Live URL',
    meta: 'profileos.me/p/alexchen'
  },
  {
    id: 'doc_5',
    title: 'Resume_Archive_2024.pdf',
    type: 'imported',
    format: 'PDF',
    updatedAt: '2026-10-15',
    size: '210 KB',
    meta: 'Source import document'
  }
];

export const TEMPLATE_GALLERY = [
  {
    id: 'tpl_modern',
    name: 'Modern Obsidian',
    category: 'Developer & Tech',
    type: 'Portfolio & CV',
    description: 'Dark obsidian background, vibrant cobalt & violet accents, high-contrast monospace highlights.',
    recommendedFor: 'Developers, Systems Architects, Technical Leads',
    previewBadge: 'Most Popular',
    theme: 'Dark'
  },
  {
    id: 'tpl_minimal',
    name: 'Atelier Minimal',
    category: 'Design & Creative',
    type: 'Portfolio & CV',
    description: 'Clean whitespace, refined typographic hierarchy with subtle border dividers and gallery layouts.',
    recommendedFor: 'Product Designers, Creative Directors, Architects',
    previewBadge: 'Editorial',
    theme: 'Light & Crisp'
  },
  {
    id: 'tpl_ats',
    name: 'ATS Clean Vanguard',
    category: 'Corporate & Finance',
    type: 'CV Only',
    description: 'Engineered specifically for machine readability, zero complex columns, 100% parse rate.',
    recommendedFor: 'Business Professionals, Consultants, Corporate Execs',
    previewBadge: '99.8% ATS Pass',
    theme: 'Standard Document'
  },
  {
    id: 'tpl_creative',
    name: 'Kinetic Horizon',
    category: 'Creative & Agency',
    type: 'Portfolio',
    description: 'Dynamic grid layouts, bold display headings, interactive project modals, and rich visual cards.',
    recommendedFor: 'Freelancers, Brand Designers, Creative Technologists',
    previewBadge: 'Featured',
    theme: 'Expressive'
  },
  {
    id: 'tpl_academic',
    name: 'Scholar Horizon',
    category: 'Research & Academia',
    type: 'CV & Portfolio',
    description: 'Structured for exhaustive bibliographies, peer-reviewed citations, grants, and teaching portfolios.',
    recommendedFor: 'Researchers, PhD Candidates, Professors',
    previewBadge: 'Academic Standard',
    theme: 'Scholarly'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How does PROFILEOS keep my data verified and prevent AI hallucinations?',
    answer: 'Unlike generic AI resume tools that generate fictional bullet points and exaggerated numbers, PROFILEOS enforces a strict Single Source of Truth architecture. The AI only draws from your verified profile entries, connected GitHub repositories, verified credentials, and approved documents. If a metric or date is missing, PROFILEOS asks you directly rather than inventing it.'
  },
  {
    question: 'Do you scrape platforms without permission?',
    answer: 'Absolutely not. PROFILEOS adheres strictly to official developer APIs (such as GitHub OAuth and authorized integration points) and user-provided inputs. We never scrape LinkedIn or unauthorized third-party sites. Your privacy, compliance, and data sovereignty are guaranteed.'
  },
  {
    question: 'Can I export to both PDF and editable DOCX formats?',
    answer: 'Yes! PROFILEOS CV Studio provides full live split-screen editing with instant 1-click export to pixel-perfect vector PDFs as well as clean, natively formatted Microsoft Word (.docx) files ready for ATS parsers and corporate recruiters.'
  },
  {
    question: 'Is my published portfolio really a live standalone website?',
    answer: 'Yes. When you click "Publish" in Portfolio Studio, your portfolio is rendered as a lightning-fast, mobile-responsive standalone web asset accessible at profileos.me/p/yourname or via your own custom domain. You can unpublish or update it in real-time with zero deploy friction.'
  },
  {
    question: 'What is the 7-step Onboarding flow?',
    answer: 'Our onboarding wizard guides you through selecting your profession, pasting your links, parsing any existing resume documents, reviewing imported data item-by-item (Accept, Edit, Discard), and establishing your initial verified profile. It is completely skippable if you want to jump straight into the studios.'
  }
];

