import React, { useState } from 'react';
import { X, Lock, Sparkles, ShieldCheck, Mail, Key, User, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { Wordmark } from '../brand/Wordmark';
import { useUniverse } from '../../context/UniverseContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, setIsAuthenticated, updateCurrentUser, currentUser } = useUniverse();

  const [mode, setMode] = useState<'onboarding' | 'login' | 'register' | 'recovery'>('onboarding');
  const [handleInput, setHandleInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!authModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !handleInput.trim()) return;

    const formattedHandle = handleInput.startsWith('@') ? handleInput : `@${handleInput}`;
    updateCurrentUser({
      name: nameInput.trim(),
      handle: formattedHandle,
    });

    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySent(true);
    setTimeout(() => {
      setRecoverySent(false);
      setMode('login');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#15111d] border border-[#E7C77A]/40 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-[#7650C8]/25 flex items-center justify-between bg-[#101014]/80">
          <Wordmark size="sm" showTagline={false} />
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-full text-[#F7F4EF]/60 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Backend Transparency Banner */}
        <div className="bg-[#291536] px-4 py-2 border-b border-[#E7C77A]/30 text-[11px] text-[#E7C77A] flex items-center gap-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Sandbox Mode: Demonstrating production-grade UX. Real cloud database connects via secure backend config.</span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {mode === 'onboarding' && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#291536] via-[#7650C8] to-[#E7C77A] p-0.5 shadow-[0_0_30px_rgba(231,199,122,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#101014] flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#E7C77A]" />
                  </div>
                </div>
              </div>

              <h2 className="font-royal font-bold text-xl text-[#F7F4EF]">
                Welcome to the Social Universe
              </h2>
              <p className="text-xs text-[#F7F4EF]/80 max-w-sm mx-auto leading-relaxed">
                Step into a sovereign cosmos where every creator commands a living digital world, discovers communities through dynamic constellations, and connects via privacy-first encrypted comms.
              </p>

              <div className="grid grid-cols-2 gap-2 text-left pt-2">
                <div className="p-3 rounded-xl bg-[#101014] border border-[#7650C8]/30">
                  <span className="text-xs font-royal font-bold text-[#E7C77A]">Living Universe</span>
                  <p className="text-[10px] text-[#F7F4EF]/70 mt-0.5">Customize your celestial realm, aura, and milestones.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#101014] border border-[#7650C8]/30">
                  <span className="text-xs font-royal font-bold text-[#E7C77A]">Quantum Comms</span>
                  <p className="text-[10px] text-[#F7F4EF]/70 mt-0.5">Screenshot transparency alerts & self-dissolving media.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => setMode('register')}
                  className="w-full py-3 rounded-full bg-[#E7C77A] hover:bg-[#FFF4D0] text-[#101014] font-royal font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                >
                  Create Sovereign Account
                </button>
                <button
                  onClick={() => setMode('login')}
                  className="w-full py-2.5 rounded-full bg-[#291536] hover:bg-[#7650C8]/30 border border-[#7650C8]/40 text-xs text-[#F7F4EF] transition-colors cursor-pointer"
                >
                  Sign In with Existing Key
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <h3 className="font-royal font-bold text-base text-[#F7F4EF]">
                Sign In to Sovereign Realm
              </h3>
              <p className="text-xs text-[#F7F4EF]/70">
                Enter your celestial handle or email to synchronize your digital world.
              </p>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">Starlight Handle / Email</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7650C8]" />
                  <input
                    type="text"
                    defaultValue={currentUser.handle}
                    className="w-full bg-[#101014] border border-[#7650C8]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">Sovereign Password</label>
                <div className="relative mt-1">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7650C8]" />
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full bg-[#101014] border border-[#7650C8]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-1.5 text-[#F7F4EF]/70 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#E7C77A]" />
                  <span>Remember Session</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('recovery')}
                  className="text-[#E7C77A] hover:underline cursor-pointer"
                >
                  Lost Starlight Key?
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-full bg-[#E7C77A] text-[#101014] font-royal font-bold text-xs uppercase tracking-wider hover:bg-[#FFF4D0] transition-colors cursor-pointer"
              >
                Authenticate & Enter Universe
              </button>

              <div className="text-center pt-2 text-xs text-[#F7F4EF]/60">
                New to the galaxy?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#E7C77A] font-semibold hover:underline cursor-pointer"
                >
                  Create Realm
                </button>
              </div>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <h3 className="font-royal font-bold text-base text-[#F7F4EF]">
                Register New Sovereign Realm
              </h3>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">Display Name</label>
                <input
                  type="text"
                  placeholder="e.g. Cassandra Nova"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full mt-1 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">Desired Handle</label>
                <input
                  type="text"
                  placeholder="@cassandra.celestial"
                  value={handleInput}
                  onChange={(e) => setHandleInput(e.target.value)}
                  className="w-full mt-1 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">Create Secure Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="At least 8 characters..."
                  className="w-full mt-1 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                  required
                />
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#F7F4EF]/80">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#E7C77A]"
                  required
                />
                <span>
                  I accept the Terms of Service, Community Standards, and Zero-Retention Privacy Policy.
                </span>
              </div>

              <button
                type="submit"
                disabled={!termsAccepted}
                className="w-full py-2.5 rounded-full bg-[#E7C77A] text-[#101014] font-royal font-bold text-xs uppercase tracking-wider hover:bg-[#FFF4D0] transition-colors cursor-pointer disabled:opacity-50"
              >
                Launch Sovereign World
              </button>

              <div className="text-center pt-2 text-xs text-[#F7F4EF]/60">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#E7C77A] font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {mode === 'recovery' && (
            <form onSubmit={handleRecovery} className="space-y-3">
              <h3 className="font-royal font-bold text-base text-[#F7F4EF]">
                Restore Sovereign Credentials
              </h3>
              <p className="text-xs text-[#F7F4EF]/70">
                Enter your handle or recovery email to generate a cryptographic quantum reset token.
              </p>

              {recoverySent ? (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-semibold text-emerald-300">
                    Recovery Token Broadcasted
                  </p>
                  <p className="text-[11px] text-[#F7F4EF]/70">
                    Check your secure inbox or quantum comms channel to reset your key.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs text-[#F7F4EF]/80 font-medium">Handle or Email</label>
                    <input
                      type="text"
                      placeholder="@aria.celestial"
                      className="w-full mt-1 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#E7C77A] text-[#101014] font-royal font-bold text-xs uppercase cursor-pointer"
                  >
                    Send Recovery Token
                  </button>
                </>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-[#9A72F6] hover:underline cursor-pointer"
                >
                  ← Return to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
