# PROFILEOS — Web Project

> **Your career. Your identity. Your future.**  
> An AI-powered professional identity platform built directly from the specification in `PROFILEOS — UI UX Design Document.pdf` and the visual system in `PROFILEOS — UI Designs.pdf`.

---

## 🚀 Key Features Built

### 1. Public Marketing Website
- **Hero Presentation**: Direct implementation of Page 1 of the UI Designs with the layered product cards (`Portfolio · One-Page`, tilted ATS paper sheet, and verified identity badge).
- **Supported Integrations**: Official API endpoints for GitHub, LinkedIn OAuth, multi-page PDF/DOCX resume parsers, custom edge domain hosting, and Dribbble/Google Scholar.
- **How PROFILEOS Works**: 4-stage pipeline matching Page 4 of the UI Designs (`01 CONNECT` → `02 BUILD IDENTITY` → `03 CREATE` → `04 PUBLISH`).
- **Identity Engine**: Schema visualization highlighting the Single Source of Truth architecture and strict zero-hallucination guardrail.
- **Studios Showcase**: Interactive tabs demonstrating Portfolio Studio, CV & Resume Studio, and Cover Letter Studio.
- **Curated Template Gallery**: Filterable templates across Developers, Designers, Corporate, and Academia.
- **Trust & FAQ**: Transparent details on data sovereignty, privacy, and zero unauthorized web scraping.

### 2. Authentication & Onboarding
- **Auth Modals**: Sign In, Create Account, Forgot Password, and 6-digit Email OTP Verification with responsive dark obsidian modals.
- **7-Step Onboarding Wizard**:
  1. Welcome to PROFILEOS
  2. Choose Professional Category (Student, Developer, Designer, Business, Academic, Freelancer, etc.)
  3. Connect Accounts (GitHub, LinkedIn, Personal URLs with live validation)
  4. Upload Documents (PDF/DOCX resume parser)
  5. Review Imported Information (**Show, then confirm** principle — accept, edit, or discard)
  6. Review Complete Identity
  7. Enter Workspace

### 3. Authenticated Workspace Shell
- **Slim Collapsible Sidebar**: Exactly 7 destinations matching Section 10 of the design document:
  1. **Overview**: Direct implementation of Page 2 of the UI Designs with the 4 primary action cards (`Create Portfolio`, `Create CV`, `Create Cover Letter`, `Manage Profile`), dynamic profile completion bar, and recent documents.
  2. **My Profile**: The Single Source of Truth with 16 sections (Basic Info, Social Profiles, Work Experience, Education, Projects, Skills, Certifications, Publications, Languages), URL connection drawer, and review queue.
  3. **Portfolio Studio**: Real-time rendering across 3 distinct archetypes (`01 Minimal`, `02 Modern Obsidian`, `03 Creative`), desktop/tablet/mobile viewport switchers, section toggles, and live publishing to `profileos.me/p/{username}`.
  4. **CV Studio**: Split-screen live editor matching Page 3 of the UI Designs. Left pane controls (Summary, Experience, Education, Projects, Skills, ATS keyword tailoring engine, templates, typography); Right pane live A4 paper preview with real-time editing.
  5. **Cover Letter Studio**: Role & company targeting, 4 voice tones (*Formal & Direct*, *Warm & Engaging*, *Confident & Impactful*, *Concise & Technical*), truth-bound AI generation, and word count.
  6. **My Documents**: Central asset manager with search, filter by type (CV, Letter, Portfolio, Import), grid and list views, rename, and delete modal.
  7. **Settings & Sovereignty**: JSON profile data export, privacy policies, demo reset, and danger zone account deletion.

### 4. Real Asset Export
- **PDF Export**: Instant vector-rendered A4 PDF downloads using `html2canvas` and `jsPDF`.
- **DOCX Export**: Real Microsoft Word (.docx) generation using the `docx` specification for ATS parsers and recruiters.
- **Standalone Live Portfolio**: Dedicated view rendering the published website with live contact links, social integrations, and responsive styling.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom design tokens (`--bg-obsidian`, `--bg-charcoal`, `--accent-blue`, `--accent-violet`, Space Grotesk, Inter)
- **Icons**: Lucide Icons + Custom SVG Brand Icons (GitHub, LinkedIn, Twitter/X)
- **Exports**: `docx` (Word Documents) + `jspdf` & `html2canvas` (PDF Documents)
- **Bundler**: Vite 6

---

## 🏃‍♂️ How to Run

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

