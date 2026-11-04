import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { Menu, X, ArrowRight, Command } from 'lucide-react';

interface PublicNavbarProps {
  onOpenCommandPalette?: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenCommandPalette }) => {
  const { setCurrentView, setAuthModal, isLoggedIn } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-md border-b border-border shadow-minimal py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-display font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
            P
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-primary">
            PROFILEOS
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-primary-muted">
          <button onClick={() => scrollTo('features')} className="hover:text-primary transition-colors">
            Features
          </button>
          <button onClick={() => scrollTo('how-it-works')} className="hover:text-primary transition-colors">
            How it works
          </button>
          <button onClick={() => scrollTo('templates')} className="hover:text-primary transition-colors">
            Templates
          </button>
          <button onClick={() => scrollTo('trust')} className="hover:text-primary transition-colors">
            About & Trust
          </button>
          <button onClick={() => scrollTo('faq')} className="hover:text-primary transition-colors">
            FAQ
          </button>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick command search pill */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary transition-colors"
              title="Search commands (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono">⌘K</span>
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => setCurrentView('workspace')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-raised hover:bg-surface-hover border border-border text-xs font-semibold text-primary transition-all duration-200"
            >
              <span>Workspace</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary-muted" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setAuthModal('signin')}
                className="text-xs font-semibold text-primary-muted hover:text-primary px-3 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthModal('signup')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all duration-200 active:scale-[0.98]"
              >
                <span>Create Identity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-primary-muted hover:text-primary hover:bg-raised transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-charcoal border-b border-border p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 shadow-modal">
          <button 
            onClick={() => scrollTo('features')}
            className="text-left py-2 text-sm font-medium text-primary hover:text-white transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')}
            className="text-left py-2 text-sm font-medium text-primary hover:text-white transition-colors"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollTo('templates')}
            className="text-left py-2 text-sm font-medium text-primary hover:text-white transition-colors"
          >
            Templates
          </button>
          <button 
            onClick={() => scrollTo('trust')}
            className="text-left py-2 text-sm font-medium text-primary hover:text-white transition-colors"
          >
            About & Trust
          </button>
          <button 
            onClick={() => scrollTo('faq')}
            className="text-left py-2 text-sm font-medium text-primary hover:text-white transition-colors"
          >
            FAQ
          </button>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => { setMobileMenuOpen(false); setCurrentView('workspace'); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black font-semibold text-xs"
              >
                Open Workspace
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); setAuthModal('signin'); }}
                  className="w-full py-2.5 rounded-xl text-center text-primary-muted font-medium hover:text-primary text-xs"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); setAuthModal('signup'); }}
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <span>Create Identity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
