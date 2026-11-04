import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  const { setAuthModal, setCurrentView, isLoggedIn } = useProfile();

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto rounded-3xl bg-charcoal border border-border p-8 sm:p-14 text-center shadow-minimal">
        <p className="text-[11px] font-mono text-primary-dim uppercase tracking-wider mb-4">
          YOUR CAREER · YOUR IDENTITY · YOUR FUTURE
        </p>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary tracking-tight max-w-xl mx-auto">
          Ready to build your single verified identity?
        </h2>

        <p className="mt-3 text-sm text-primary-muted max-w-md mx-auto">
          Turn your work into authoritative, publishable career assets with zero hallucinations.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (isLoggedIn) {
                setCurrentView('workspace');
              } else {
                setAuthModal('signup');
              }
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all duration-150 active:scale-[0.98]"
          >
            <span>{isLoggedIn ? 'Enter Workspace' : 'Create Your Identity'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setCurrentView('onboarding')}
            className="px-5 py-3 rounded-xl bg-charcoal hover:bg-raised border border-border text-primary-muted hover:text-primary text-xs font-medium transition-colors"
          >
            Try Onboarding Flow
          </button>
        </div>
      </div>
    </section>
  );
};
