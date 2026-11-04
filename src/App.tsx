import React, { useState, useEffect } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { ToastContainer } from './components/common/Toast';
import { CommandPalette } from './components/common/CommandPalette';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { HeroSection } from './components/landing/HeroSection';
import { IntegrationsSection } from './components/landing/IntegrationsSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { IdentityEngineSection } from './components/landing/IdentityEngineSection';
import { StudiosSection } from './components/landing/StudiosSection';
import { TemplatesSection } from './components/landing/TemplatesSection';
import { TrustSection } from './components/landing/TrustSection';
import { FAQSection } from './components/landing/FAQSection';
import { CTASection } from './components/landing/CTASection';
import { AuthModals } from './components/auth/AuthModals';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { WorkspaceShell } from './components/layout/WorkspaceShell';
import { OverviewView } from './components/workspace/OverviewView';
import { ProfileEditorView } from './components/workspace/ProfileEditorView';
import { PortfolioStudioView } from './components/workspace/PortfolioStudioView';
import { CVStudioView } from './components/workspace/CVStudioView';
import { CoverLetterStudioView } from './components/workspace/CoverLetterStudioView';
import { DocumentsView } from './components/workspace/DocumentsView';
import { SettingsView } from './components/workspace/SettingsView';
import { PublishedPortfolioView } from './components/portfolio/PublishedPortfolioView';
import { ShortcutsModal } from './components/common/ShortcutsModal';

const AppContent: React.FC = () => {
  const { currentView, currentWorkspaceTab, setCurrentWorkspaceTab, themePreference } = useProfile();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K, ?, 1-7 numbers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger letter/number shortcuts if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      // Cmd+K / Ctrl+K Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
        return;
      }

      // '?' Keyboard Shortcuts Cheatsheet
      if (!isInput && e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
        return;
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsShortcutsOpen(false);
        return;
      }

      // '1' to '7' for Workspace Quick Navigation
      if (!isInput && !e.metaKey && !e.ctrlKey && currentView === 'workspace') {
        const tabMap: Record<string, any> = {
          '1': 'profile',
          '2': 'cv-studio',
          '3': 'cover-letter-studio',
          '4': 'portfolio-studio',
          '5': 'overview',
          '6': 'documents',
          '7': 'settings'
        };
        if (tabMap[e.key]) {
          e.preventDefault();
          setCurrentWorkspaceTab(tabMap[e.key]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, setCurrentWorkspaceTab]);

  const oledClass = themePreference === 'oled' ? 'theme-oled' : '';

  // Route 1: Standalone Published Portfolio
  if (currentView === 'published-portfolio') {
    return (
      <div className={oledClass}>
        <ToastContainer />
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
        />
        <ShortcutsModal 
          isOpen={isShortcutsOpen} 
          onClose={() => setIsShortcutsOpen(false)} 
        />
        <PublishedPortfolioView />
      </div>
    );
  }

  // Route 2: 7-Step Onboarding Flow
  if (currentView === 'onboarding') {
    return (
      <div className={oledClass}>
        <ToastContainer />
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
        />
        <ShortcutsModal 
          isOpen={isShortcutsOpen} 
          onClose={() => setIsShortcutsOpen(false)} 
        />
        <OnboardingWizard />
      </div>
    );
  }

  // Route 3: Authenticated Workspace
  if (currentView === 'workspace') {
    return (
      <div className={`h-screen w-screen overflow-hidden ${oledClass}`}>
        <ToastContainer />
        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setIsCommandPaletteOpen(false)} 
        />
        <ShortcutsModal 
          isOpen={isShortcutsOpen} 
          onClose={() => setIsShortcutsOpen(false)} 
        />
        <WorkspaceShell onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}>
          {currentWorkspaceTab === 'overview' && <OverviewView />}
          {currentWorkspaceTab === 'profile' && <ProfileEditorView />}
          {currentWorkspaceTab === 'portfolio-studio' && <PortfolioStudioView />}
          {currentWorkspaceTab === 'cv-studio' && <CVStudioView />}
          {currentWorkspaceTab === 'cover-letter-studio' && <CoverLetterStudioView />}
          {currentWorkspaceTab === 'documents' && <DocumentsView />}
          {currentWorkspaceTab === 'settings' && <SettingsView />}
        </WorkspaceShell>
      </div>
    );
  }

  // Route 4: Public Marketing Homepage
  return (
    <div className={`min-h-screen bg-obsidian text-primary selection:bg-zinc-700 selection:text-white ${oledClass}`}>
      <ToastContainer />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      <ShortcutsModal 
        isOpen={isShortcutsOpen} 
        onClose={() => setIsShortcutsOpen(false)} 
      />
      <AuthModals />
      <PublicNavbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <main>
        <HeroSection />
        <IntegrationsSection />
        <HowItWorksSection />
        <IdentityEngineSection />
        <StudiosSection />
        <TemplatesSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <PublicFooter />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
};

export default App;
