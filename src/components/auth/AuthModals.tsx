import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { X, Eye, EyeOff, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { ProfessionalCategory } from '../../types/profile';

export const AuthModals: React.FC = () => {
  const { authModal, setAuthModal, login, setCurrentView } = useProfile();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState<ProfessionalCategory>('Developer');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [showOtpView, setShowOtpView] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModal) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    login(email);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    setErrorMsg('');
    setShowOtpView(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpView(false);
    login(email, fullName);
    setCurrentView('onboarding');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => { setAuthModal(null); setShowOtpView(false); }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm rounded-2xl bg-charcoal border border-border shadow-modal p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => { setAuthModal(null); setShowOtpView(false); }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-primary-dim hover:text-primary hover:bg-raised transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand mark */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-display font-bold text-xs">
            P
          </div>
          <span className="font-display font-bold text-sm text-primary">PROFILEOS</span>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-950/20 border border-red-800/40 text-xs text-red-400">
            {errorMsg}
          </div>
        )}

        {/* OTP Verification Flow */}
        {showOtpView ? (
          <div>
            <h3 className="font-display font-bold text-lg text-primary">Verify Your Email</h3>
            <p className="mt-1 text-xs text-primary-dim leading-relaxed">
              We sent a 6-digit code to <span className="text-primary font-mono">{email}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="mt-5 space-y-5">
              <div className="flex justify-between gap-1.5">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 h-11 rounded-lg bg-raised border border-border text-center text-base font-mono font-bold text-primary focus:border-white focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Verify & Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : authModal === 'signin' ? (
          /* Sign In */
          <div>
            <h3 className="font-display font-bold text-lg text-primary">Welcome Back</h3>
            <p className="mt-1 text-xs text-primary-dim">
              Access your verified professional identity.
            </p>

            <form onSubmit={handleSignIn} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary placeholder:text-primary-dim focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-primary">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthModal('forgot')}
                    className="text-[11px] text-primary-dim hover:text-primary"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 pr-9 rounded-lg bg-raised border border-border text-xs text-primary placeholder:text-primary-dim focus:border-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-dim hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Quick Demo Login Option */}
              <button
                type="button"
                onClick={() => login('alex.chen@example.com', 'Alex Chen')}
                className="w-full py-1.5 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary-muted hover:text-primary font-mono transition-colors"
              >
                ⚡ Fast Demo Sign In (Alex Chen)
              </button>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-primary-dim">
              New here?{' '}
              <button
                type="button"
                onClick={() => setAuthModal('signup')}
                className="text-primary hover:underline font-medium"
              >
                Create Account
              </button>
            </p>
          </div>
        ) : (
          /* Create Account */
          <div>
            <h3 className="font-display font-bold text-lg text-primary">Create Your Identity</h3>
            <p className="mt-1 text-xs text-primary-dim">
              One source of truth for portfolio and career documents.
            </p>

            <form onSubmit={handleSignUp} className="mt-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary placeholder:text-primary-dim focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary placeholder:text-primary-dim focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProfessionalCategory)}
                  className="w-full px-2.5 py-2 rounded-lg bg-raised border border-border text-xs text-primary focus:border-white focus:outline-none"
                >
                  <option value="Developer">Developer / Engineer</option>
                  <option value="Designer">Designer / Creative</option>
                  <option value="Student / Graduate">Student / Graduate</option>
                  <option value="Business Professional">Business Professional</option>
                  <option value="Researcher / Academic">Researcher / Academic</option>
                  <option value="Freelancer">Freelancer / Consultant</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Create Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2 rounded-lg bg-raised border border-border text-xs text-primary placeholder:text-primary-dim focus:border-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Continue to Verification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-primary-dim">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModal('signin')}
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
