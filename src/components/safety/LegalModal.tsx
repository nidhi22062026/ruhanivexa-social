import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle, AlertCircle, BookOpen, Smartphone } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

export const LegalModal: React.FC = () => {
  const { legalModalTab, setLegalModalTab } = useUniverse();
  const [tab, setTab] = useState<'terms' | 'privacy' | 'community' | 'readiness'>(
    legalModalTab || 'terms'
  );

  if (!legalModalTab) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#15111d] border border-[#7650C8]/50 shadow-2xl flex flex-col h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#7650C8]/25 flex items-center justify-between bg-[#101014]/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#E7C77A]" />
            <h2 className="font-royal font-bold text-sm text-[#F7F4EF] tracking-wider uppercase">
              Legal, Privacy & Store Governance
            </h2>
          </div>
          <button
            onClick={() => setLegalModalTab(null)}
            className="p-1 rounded-full text-[#F7F4EF]/60 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#101014]/60 border-b border-[#7650C8]/20 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setTab('terms')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'terms'
                ? 'bg-[#E7C77A] text-[#101014] font-bold'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setTab('privacy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'privacy'
                ? 'bg-[#E7C77A] text-[#101014] font-bold'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('community')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'community'
                ? 'bg-[#E7C77A] text-[#101014] font-bold'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Community Guidelines
          </button>
          <button
            onClick={() => setTab('readiness')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              tab === 'readiness'
                ? 'bg-[#E7C77A] text-[#101014] font-bold'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Store Readiness Checklist
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-[#F7F4EF]/85 space-y-4 leading-relaxed font-sans select-text">
          {tab === 'terms' && (
            <div className="space-y-3">
              <h3 className="font-royal font-bold text-sm text-[#E7C77A] uppercase">
                Terms of Service — Ruhanivexa Social: Royal Galaxy Edition
              </h3>
              <p className="text-[11px] text-[#9A72F6] font-mono">
                Effective Date: October 18, 2026 • Version 1.0
              </p>
              <p>
                Welcome to Ruhanivexa Social. By accessing this platform or creating a Living Universe digital world, you agree to abide by these Terms of Service.
              </p>
              <h4 className="font-semibold text-[#F7F4EF] pt-1">1. User Content & Intellectual Property</h4>
              <p>
                You retain complete ownership of all celestial artworks, astrophotography, writings, and musical soundscapes published in your world or shared within Orbital Co-labs. You grant Ruhanivexa Social a limited license solely to transmit and render your content to your intended privacy audience.
              </p>
              <h4 className="font-semibold text-[#F7F4EF] pt-1">2. Age Requirements & Safe Space</h4>
              <p>
                Ruhanivexa Social is designed for users aged 13 and older (or the applicable legal age in your jurisdiction). Harmful, sexually exploitative, or abusive material is strictly forbidden.
              </p>
              <h4 className="font-semibold text-[#F7F4EF] pt-1">3. Monetization & Virtual Gifting</h4>
              <p>
                Any virtual starlight gems, creator subscriptions, or memberships are subject to standard digital merchandise rules and platform billing regulations. Real monetization remains in sandbox mode until verified cloud credentials are bound.
              </p>
            </div>
          )}

          {tab === 'privacy' && (
            <div className="space-y-3">
              <h3 className="font-royal font-bold text-sm text-[#E7C77A] uppercase">
                Privacy Policy & Zero-Retention Security
              </h3>
              <p className="text-[11px] text-[#9A72F6] font-mono">
                Last Updated: October 2026 • GDPR, CCPA & Google Play Compliant
              </p>
              <h4 className="font-semibold text-[#F7F4EF] pt-1">1. Minimum Data Collection</h4>
              <p>
                We do not sell personal information to third parties or data brokers. We collect only what is strictly required to render your social universe: handle, encrypted login token, and custom digital world parameters.
              </p>
              <h4 className="font-semibold text-[#F7F4EF] pt-1">2. Screenshot Transparency & Ephemeral Content</h4>
              <p>
                Where supported by official Android window security APIs (such as FLAG_SECURE and screenshot event listeners), participant screen captures trigger broadcast notifications. Media marked as disappearing or deleted for everyone is purged with zero residual server caching.
              </p>
              <h4 className="font-semibold text-[#F7F4EF] pt-1">3. Right to Complete Deletion (Web & In-App)</h4>
              <p>
                You may trigger permanent account erasure directly within the application settings or via our dedicated web deletion endpoint portal (
                <a
                  href="https://ruhanivexa.social/delete-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E7C77A] underline hover:text-white"
                >
                  https://ruhanivexa.social/delete-account
                </a>
                ) at any time.
              </p>
            </div>
          )}

          {tab === 'community' && (
            <div className="space-y-3">
              <h3 className="font-royal font-bold text-sm text-[#E7C77A] uppercase">
                Celestial Community Guidelines & Zero-Tolerance Policy
              </h3>
              <p className="text-[11px] text-[#9A72F6] font-mono">
                The Sovereign Standard for Collaborative Space • Google Play UGC Shield
              </p>

              {/* Zero-Tolerance Banner */}
              <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 space-y-1.5">
                <p className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Strict Zero-Tolerance Policy (Google Play Policy Mandate)</span>
                </p>
                <p className="text-[11px] text-red-200/90 leading-relaxed">
                  Ruhanivexa Social maintains an absolute zero-tolerance policy against objectionable content and abusive users. The transmission of harassment, hate speech, explicit/sexual media, copyright infringement, or spam will result in immediate and permanent account termination, transmission purging, and sovereign network banning.
                </p>
              </div>

              <ul className="list-disc pl-4 space-y-2 pt-1 text-xs">
                <li><strong className="text-[#E7C77A]">Civil Discourse & Anti-Bullying:</strong> Disagreements on cosmology, art, or science must remain respectful. Harassment or hate speech results in immediate orbit suspension.</li>
                <li><strong className="text-[#E7C77A]">Authentic Attribution:</strong> Always credit collaborators in Orbital Co-labs and acknowledge original astrophotography telemetry sources.</li>
                <li><strong className="text-[#E7C77A]">No Spam or Deceptive Schemes:</strong> Automated bots, financial scams, and fraudulent engagement farming are strictly prohibited.</li>
                <li><strong className="text-[#E7C77A]">Interactive Moderation Shield:</strong> Every transmission, reel, and creator profile includes an interactive 3-dot action menu allowing instant reporting, blocking, and muting. All reports are acted upon promptly.</li>
              </ul>
            </div>
          )}

          {tab === 'readiness' && (
            <div className="space-y-3">
              <h3 className="font-royal font-bold text-sm text-[#E7C77A] uppercase">
                Google Play & App Store Readiness Audit
              </h3>
              <p className="text-[11px] text-[#9A72F6] font-mono">
                Pre-Release Policy Checklist
              </p>

              <div className="space-y-2">
                {[
                  { item: 'Zero Trademark Conflict', desc: 'Completely unique brand identity, original R constellation emblem, no collision with prior projects.', status: 'Verified Original' },
                  { item: 'Screenshot Transparency', desc: 'Supported OS APIs, participant notifications, disclaimer for physical external cameras.', status: 'Implemented' },
                  { item: 'Account Deletion & External URL', desc: 'In-app deletion flow + dedicated web deletion request endpoint URL.', status: 'Compliant' },
                  { item: 'Content Moderation & Reporting', desc: 'Comprehensive report modal with reason classification & blocked user management.', status: 'Compliant' },
                  { item: 'Billing & Monetization Sandbox', desc: 'Real payments kept isolated until official merchant credentials and server signature checks are live.', status: 'Safeguarded' },
                  { item: 'WCAG Accessibility Alternative', desc: 'Accessible high-contrast directory alternative for spatial constellation chart.', status: 'Verified' },
                ].map((audit) => (
                  <div key={audit.item} className="p-2.5 rounded-xl bg-[#101014] border border-[#7650C8]/30 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{audit.item}</p>
                      <p className="text-[11px] text-[#F7F4EF]/70">{audit.desc}</p>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[10px]">
                      {audit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#7650C8]/25 bg-[#101014]/60 flex items-center justify-between text-[11px] text-[#F7F4EF]/60 font-mono">
          <span>Ruhanivexa Social • Legal Architecture</span>
          <button
            onClick={() => setLegalModalTab(null)}
            className="px-4 py-1.5 rounded-full bg-[#E7C77A] text-[#101014] font-bold uppercase text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
