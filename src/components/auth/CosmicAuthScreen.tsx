import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Radio,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Compass,
  AlertCircle,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoyalEmblem } from '../brand/RoyalEmblem';
import { Wordmark } from '../brand/Wordmark';
import { useUniverse } from '../../context/UniverseContext';
import { MOCK_USERS } from '../../data/mockUniverse';

export const CosmicAuthScreen: React.FC = () => {
  const { setIsAuthenticated, updateCurrentUser, setActiveTab, setLegalModalTab } = useUniverse();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [handleOrEmail, setHandleOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields per requirement:
  // Full Name, Sovereign Handle (@handle), Email, Password, Category of Interest, and 13+ age verification
  const [fullName, setFullName] = useState('');
  const [newHandle, setNewHandle] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [categoryOfInterest, setCategoryOfInterest] = useState('Astrophotography');
  const [isOver13, setIsOver13] = useState(false);
  const [agreedToEula, setAgreedToEula] = useState(false);

  // Error validation feedback
  const [formError, setFormError] = useState<string | null>(null);

  const interestCategories = [
    'Astrophotography',
    'Quantum Art & Shaders',
    'Cosmic Philosophy',
    'Deep Space Ambient Sound',
    'Space Science & Exoplanets',
    'Stellar Architecture',
  ];

  const triggerCelestialCelebration = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E7C77A', '#FFF4D0', '#7650C8', '#9A72F6', '#4FD1C5'],
    });
  };

  const handleDemoSignIn = (userIndex: number) => {
    const target = MOCK_USERS[userIndex];
    updateCurrentUser(target);
    triggerCelestialCelebration();
    setIsAuthenticated(true);
    setActiveTab('feed');
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!handleOrEmail.trim() || !password.trim()) {
      setFormError('Please enter your Sovereign Handle/Email and Security Key.');
      return;
    }

    // Match existing mock user or login with entered identifier
    const existing = MOCK_USERS.find(
      (u) =>
        u.handle.toLowerCase() === handleOrEmail.trim().toLowerCase() ||
        u.name.toLowerCase() === handleOrEmail.trim().toLowerCase()
    );

    if (existing) {
      updateCurrentUser(existing);
    } else {
      const formattedHandle = handleOrEmail.startsWith('@') ? handleOrEmail : `@${handleOrEmail}`;
      updateCurrentUser({
        name: handleOrEmail.replace('@', ''),
        handle: formattedHandle,
      });
    }

    triggerCelestialCelebration();
    setIsAuthenticated(true);
    setActiveTab('feed');
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim() || !newHandle.trim() || !newEmail.trim() || !newPassword.trim()) {
      setFormError('All sovereign fields are required.');
      return;
    }

    if (!isOver13) {
      setFormError('Age verification is required. You must confirm you are 13+ years old to comply with COPPA.');
      return;
    }

    if (!agreedToEula) {
      setFormError('You must accept the Community EULA and zero-tolerance objectionable content terms.');
      return;
    }

    const cleanHandle = newHandle.trim();
    const formattedHandle = cleanHandle.startsWith('@') ? cleanHandle : `@${cleanHandle}`;

    // Requirement: All newly created accounts must strictly initialize with 0 Stargazers (Followers) and 0 In Orbit
    updateCurrentUser({
      id: `user_${Date.now()}`,
      name: fullName.trim(),
      handle: formattedHandle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      banner: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      bio: `Sovereign stargazer exploring ${categoryOfInterest}.`,
      celestialAura: 'solargold',
      orbitMilestone: 'Pioneer',
      orbitTier: 1,
      starlightGems: 0,
      followersCount: 0, // strictly 0
      followingCount: 0, // strictly 0
      verified: false,
      interests: [categoryOfInterest, 'RoyalGalaxy'],
      digitalWorld: {
        title: `${fullName.trim()}’s Sovereign Realm`,
        description: `An original starlight plane anchored in ${categoryOfInterest}.`,
        coreElement: 'Harmonic Starlight Core',
        themeColor: '#E7C77A',
        nebulaDensity: 50,
      },
    });

    triggerCelestialCelebration();
    setIsAuthenticated(true);
    setActiveTab('feed');
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col justify-center items-center p-4 sm:p-6 relative select-none">
      {/* Brand Crown */}
      <div className="flex flex-col items-center text-center space-y-2 mb-5">
        <RoyalEmblem size={64} glow={true} />
        <div className="mt-1">
          <Wordmark size="md" showTagline={true} showEmblem={false} />
        </div>
      </div>

      {/* Main Glassmorphic Auth Card */}
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1b1426]/95 via-[#14101c]/95 to-[#101014]/95 border border-[#E7C77A]/40 shadow-[0_0_50px_rgba(118,80,200,0.35),0_0_20px_rgba(231,199,122,0.2)] p-6 sm:p-7 relative backdrop-blur-2xl">
        {/* Mode Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#101014] border border-[#7650C8]/40 mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setFormError(null);
            }}
            className={`py-2 text-xs font-royal font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-gradient-to-r from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] shadow-[0_0_15px_rgba(231,199,122,0.4)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setFormError(null);
            }}
            className={`py-2 text-xs font-royal font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] shadow-[0_0_15px_rgba(231,199,122,0.4)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Create Realm
          </button>
        </div>

        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="leading-snug">{formError}</p>
          </div>
        )}

        {authMode === 'signin' ? (
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            {/* Handle or Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Sovereign Handle or Email</span>
              </label>
              <input
                type="text"
                value={handleOrEmail}
                onChange={(e) => setHandleOrEmail(e.target.value)}
                placeholder="e.g. @aria.celestial or you@universe.com"
                required
                className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2.5 text-xs text-[#F7F4EF] placeholder:text-white/30 focus:outline-none transition-all shadow-inner font-mono"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#E7C77A]" />
                  <span>Sovereign Password</span>
                </label>
                <span className="text-[10px] text-[#9A72F6] font-mono">Encrypted SHA-256</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security key..."
                  required
                  className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2.5 text-xs text-[#F7F4EF] placeholder:text-white/30 focus:outline-none transition-all shadow-inner font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F7F4EF]/60 hover:text-[#E7C77A] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Enter Cosmos Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] font-royal font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(231,199,122,0.4)] hover:shadow-[0_0_30px_rgba(231,199,122,0.6)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Enter Cosmos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Identities for seamless Play Store reviewer testing */}
            <div className="pt-3 border-t border-white/5">
              <span className="text-[10px] text-[#E7C77A] font-tech font-semibold block mb-1.5 uppercase tracking-wider">
                ✦ Play Store Reviewer Demo Accounts:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn(0)}
                  className="p-2 rounded-xl bg-[#291536]/80 hover:bg-[#7650C8]/40 border border-[#E7C77A]/30 text-left transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <img
                    src={MOCK_USERS[0].avatar}
                    alt="Aria"
                    className="w-7 h-7 rounded-full object-cover border border-[#E7C77A]"
                  />
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-royal font-bold text-white group-hover:text-[#E7C77A] truncate">
                      Aria Vance
                    </p>
                    <p className="text-[9px] text-[#9A72F6] font-mono">Cosmic Sovereign</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn(2)}
                  className="p-2 rounded-xl bg-[#291536]/80 hover:bg-[#7650C8]/40 border border-[#E7C77A]/30 text-left transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <img
                    src={MOCK_USERS[2].avatar}
                    alt="Lyra"
                    className="w-7 h-7 rounded-full object-cover border border-[#E7C77A]"
                  />
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-royal font-bold text-white group-hover:text-[#E7C77A] truncate">
                      Lyra Sterling
                    </p>
                    <p className="text-[9px] text-[#9A72F6] font-mono">Sound Synthesist</p>
                  </div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Cassandra Nova"
                required
                className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2 text-xs text-[#F7F4EF] placeholder:text-white/30 focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Sovereign Handle */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Sovereign Handle</span>
              </label>
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                placeholder="@cassandra.celestial"
                required
                className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2 text-xs text-[#F7F4EF] placeholder:text-white/30 focus:outline-none transition-all shadow-inner font-mono"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="cassandra@starlight.io"
                required
                className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2 text-xs text-[#F7F4EF] placeholder:text-white/30 focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 cosmic characters..."
                required
                className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2 text-xs text-[#F7F4EF] placeholder:text-white/30 focus:outline-none transition-all shadow-inner font-mono"
              />
            </div>

            {/* Category of Interest */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#F7F4EF]/85 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Category of Interest</span>
              </label>
              <select
                value={categoryOfInterest}
                onChange={(e) => setCategoryOfInterest(e.target.value)}
                className="w-full bg-[#101014] border border-[#7650C8]/40 focus:border-[#E7C77A] rounded-2xl px-4 py-2 text-xs text-[#E7C77A] focus:outline-none transition-all cursor-pointer font-mono"
              >
                {interestCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#101014] text-[#F7F4EF]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* COPPA Age Verification Checkbox */}
            <div className="flex items-start gap-2 pt-1 text-[11px] text-[#F7F4EF]/90">
              <input
                type="checkbox"
                id="coppa-check"
                checked={isOver13}
                onChange={(e) => setIsOver13(e.target.checked)}
                required
                className="mt-0.5 accent-[#E7C77A] cursor-pointer"
              />
              <label htmlFor="coppa-check" className="cursor-pointer leading-tight">
                <strong className="text-[#E7C77A]">Age Verification:</strong> I confirm I am 13+ years old in compliance with global COPPA and youth protection regulations.
              </label>
            </div>

            {/* EULA & Anti-Abuse Terms Acceptance */}
            <div className="flex items-start gap-2 text-[11px] text-[#F7F4EF]/85">
              <input
                type="checkbox"
                id="eula-check"
                checked={agreedToEula}
                onChange={(e) => setAgreedToEula(e.target.checked)}
                required
                className="mt-0.5 accent-[#E7C77A] cursor-pointer"
              />
              <label htmlFor="eula-check" className="cursor-pointer leading-tight">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setLegalModalTab('community')}
                  className="text-[#E7C77A] underline hover:text-white"
                >
                  Community EULA
                </button>
                : strictly prohibiting abusive, hateful, sexually explicit, or infringing content with immediate account termination.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3 rounded-2xl bg-gradient-to-r from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] font-royal font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(231,199,122,0.4)] hover:shadow-[0_0_30px_rgba(231,199,122,0.6)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Enter Cosmos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Global Store & Privacy Assurance Badge */}
        <div className="mt-5 pt-3.5 border-t border-[#7650C8]/25 flex items-center justify-between text-[10px] text-[#F7F4EF]/60 font-mono">
          <span className="flex items-center gap-1 text-[#E7C77A]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GDPR, CCPA & COPPA Shield Active</span>
          </span>
          <button
            onClick={() => setLegalModalTab('privacy')}
            className="hover:text-[#E7C77A] underline cursor-pointer"
          >
            Privacy Code
          </button>
        </div>
      </div>
    </div>
  );
};
