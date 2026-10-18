import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  UserX,
  FileText,
  Trash2,
  Bell,
  Eye,
  Camera,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Info,
  LogOut,
  AlertCircle,
  Download,
  HardDrive,
  RotateCcw,
  Database,
  Shield,
} from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

export const SettingsModal: React.FC = () => {
  const {
    currentUser,
    blockedUserIds,
    unblockUser,
    users,
    setLegalModalTab,
    setDeleteAccountModalOpen,
    setActiveTab,
    logout,
    downloadUserData,
    clearLocalStorageAndCache,
    telemetryEnabled,
    setTelemetryEnabled,
  } = useUniverse();

  const [screenshotDetectionEnabled, setScreenshotDetectionEnabled] = useState(true);
  const [ghostMode, setGhostMode] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const blockedUsersList = users.filter((u) => blockedUserIds.includes(u.id));

  return (
    <div className="w-full p-4 sm:p-5 space-y-5 select-none">
      {/* Settings Header */}
      <div className="flex items-center justify-between border-b border-[#7650C8]/25 pb-3">
        <div>
          <h2 className="font-royal font-bold text-lg text-[#F7F4EF]">
            Settings & Sovereign Security
          </h2>
          <p className="text-xs text-[#9A72F6] font-mono">
            Ruhanivexa Social • Privacy-First Architecture
          </p>
        </div>
      </div>

      {/* Account & Profile Summary */}
      <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#E7C77A]"
          />
          <div>
            <h3 className="font-royal font-bold text-sm text-[#F7F4EF]">
              {currentUser.name}
            </h3>
            <p className="text-xs text-[#9A72F6] font-mono">{currentUser.handle}</p>
            <span className="text-[10px] text-[#E7C77A] font-tech font-semibold">
              {currentUser.orbitMilestone} (Tier {currentUser.orbitTier})
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('profile')}
          className="px-3 py-1.5 rounded-full bg-[#291536] text-[#E7C77A] text-xs font-semibold hover:bg-[#7650C8]/30 border border-[#E7C77A]/30 cursor-pointer"
        >
          View World
        </button>
      </div>

      {/* Privacy & Screenshot Transparency Controls */}
      <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 space-y-3">
        <h3 className="font-royal font-bold text-xs text-[#E7C77A] uppercase tracking-wider flex items-center gap-2">
          <Camera className="w-4 h-4" />
          Screenshot Transparency & Quantum Privacy
        </h3>

        <div className="space-y-3 divide-y divide-white/5">
          {/* Screenshot alert toggle */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF]">
                Screenshot Transparency Broadcasts
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60">
                Notify conversation participants when screen capture is detected on supported OS devices.
              </p>
            </div>
            <button
              onClick={() => setScreenshotDetectionEnabled(!screenshotDetectionEnabled)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                screenshotDetectionEnabled ? 'bg-[#E7C77A]' : 'bg-[#291536]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#101014] transition-transform ${
                  screenshotDetectionEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Ghost Mode */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF]">
                Constellation Ghost Mode
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60">
                Conceal real-time online starlight flare in the spatial discovery map.
              </p>
            </div>
            <button
              onClick={() => setGhostMode(!ghostMode)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                ghostMode ? 'bg-[#E7C77A]' : 'bg-[#291536]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#101014] transition-transform ${
                  ghostMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Read Receipts */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF]">
                Double Starlight Read Indicators
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60">
                Display double champagne-gold ticks upon transmission consumption.
              </p>
            </div>
            <button
              onClick={() => setReadReceipts(!readReceipts)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                readReceipts ? 'bg-[#E7C77A]' : 'bg-[#291536]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#101014] transition-transform ${
                  readReceipts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Blocked Users Section */}
      <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 space-y-3">
        <h3 className="font-royal font-bold text-xs text-[#E7C77A] uppercase tracking-wider flex items-center gap-2">
          <UserX className="w-4 h-4" />
          Blocked Sovereign Realms ({blockedUsersList.length})
        </h3>

        {blockedUsersList.length === 0 ? (
          <p className="text-xs text-[#F7F4EF]/50">
            No users blocked. You can block any creator directly from their post or profile menu.
          </p>
        ) : (
          <div className="space-y-2">
            {blockedUsersList.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#101014] border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#F7F4EF]">{user.name}</p>
                    <p className="text-[10px] text-[#9A72F6] font-mono">{user.handle}</p>
                  </div>
                </div>

                <button
                  onClick={() => unblockUser(user.id)}
                  className="px-2.5 py-1 rounded-full bg-[#291536] hover:bg-[#7650C8]/40 text-[#E7C77A] text-[11px] font-medium cursor-pointer"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GDPR & CCPA Compliance Card */}
      <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/40 space-y-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="font-royal font-bold text-xs text-[#E7C77A] uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#E7C77A]" />
            GDPR, CCPA & Data Rights Shield
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
            Article 20 Compliant
          </span>
        </div>

        <p className="text-[11px] text-[#F7F4EF]/70 leading-relaxed">
          Manage your personal starlight archives, external erasure endpoints, storage buffers, and privacy telemetry preferences.
        </p>

        <div className="space-y-2.5 pt-1 divide-y divide-white/5">
          {/* Download My Data */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF] flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Download My Data (Export Archive)</span>
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60">
                Exports all posts, private messages, profile telemetry, and vault items as a portable JSON payload.
              </p>
            </div>
            <button
              onClick={downloadUserData}
              className="px-3 py-1.5 rounded-full bg-[#291536] hover:bg-[#7650C8]/40 border border-[#E7C77A]/40 text-xs font-semibold text-[#E7C77A] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>

          {/* Web Deletion Endpoint */}
          <div className="flex items-center justify-between pt-2.5">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF] flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Web Deletion Endpoint (Play Store Mandate)</span>
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60 font-mono">
                https://ruhanivexa.social/delete-account
              </p>
            </div>
            <a
              href="https://ruhanivexa.social/delete-account"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-[#101014] hover:bg-[#291536] border border-[#7650C8]/40 text-xs font-semibold text-[#E7C77A] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer hover:underline"
            >
              <span>Visit Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Clear Cache & Local Storage */}
          <div className="flex items-center justify-between pt-2.5">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF] flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Clear Cache & Local Storage</span>
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60">
                Purges all browser state buffers, offline caches, and stored session tokens safely.
              </p>
            </div>
            <button
              onClick={clearLocalStorageAndCache}
              className="px-3 py-1.5 rounded-full bg-red-950/40 hover:bg-red-950/70 border border-red-500/40 text-xs font-semibold text-red-300 flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Clear Cache</span>
            </button>
          </div>

          {/* Telemetry Tracking Opt-Out Toggle */}
          <div className="flex items-center justify-between pt-2.5">
            <div>
              <p className="text-xs font-semibold text-[#F7F4EF] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>Telemetry Tracking: {telemetryEnabled ? 'Enabled' : 'Disabled'}</span>
              </p>
              <p className="text-[11px] text-[#F7F4EF]/60">
                Opt-out of anonymous app performance and interaction metrics under CCPA / GDPR regulations.
              </p>
            </div>
            <button
              onClick={() => setTelemetryEnabled(!telemetryEnabled)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 shrink-0 ${
                telemetryEnabled ? 'bg-[#E7C77A]' : 'bg-[#291536]'
              }`}
              title={telemetryEnabled ? 'Disable Telemetry' : 'Enable Telemetry'}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#101014] transition-transform ${
                  telemetryEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Store Governance Links */}
      <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 space-y-2">
        <h3 className="font-royal font-bold text-xs text-[#E7C77A] uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Legal & Store Disclosures
        </h3>

        <div className="divide-y divide-white/5">
          <button
            onClick={() => setLegalModalTab('terms')}
            className="w-full flex items-center justify-between py-2 text-xs text-[#F7F4EF]/80 hover:text-white cursor-pointer"
          >
            <span>Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-[#7650C8]" />
          </button>

          <button
            onClick={() => setLegalModalTab('privacy')}
            className="w-full flex items-center justify-between py-2 text-xs text-[#F7F4EF]/80 hover:text-white cursor-pointer"
          >
            <span>Privacy Policy & Data Safety</span>
            <ChevronRight className="w-4 h-4 text-[#7650C8]" />
          </button>

          <button
            onClick={() => setLegalModalTab('community')}
            className="w-full flex items-center justify-between py-2 text-xs text-[#F7F4EF]/80 hover:text-white cursor-pointer"
          >
            <span>Community Guidelines & Moderation</span>
            <ChevronRight className="w-4 h-4 text-[#7650C8]" />
          </button>

          <button
            onClick={() => setLegalModalTab('readiness')}
            className="w-full flex items-center justify-between py-2 text-xs text-[#E7C77A] font-semibold hover:underline cursor-pointer"
          >
            <span>Store Readiness & Policy Checklist</span>
            <ChevronRight className="w-4 h-4 text-[#E7C77A]" />
          </button>
        </div>
      </div>

      {/* Session & Logout Section */}
      <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#291536] border border-[#7650C8]/50 flex items-center justify-center text-[#E7C77A]">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-royal font-bold text-[#F7F4EF] uppercase tracking-wider">
              Exit Sovereign Session
            </h4>
            <p className="text-[11px] text-[#F7F4EF]/70">
              Disconnect active quantum encryption session and return to the Cosmic Login portal.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#291536] hover:bg-[#7650C8]/40 border border-[#E7C77A]/50 text-xs font-royal font-bold text-[#E7C77A] transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-royal font-bold text-red-400 uppercase">
              Permanent Account Deletion
            </h4>
            <p className="text-[11px] text-red-200/70">
              Irreversibly delete your sovereign realm, cryptographic keys, and transmissions.
            </p>
          </div>

          <button
            onClick={() => setDeleteAccountModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Erase Realm</span>
          </button>
        </div>

        {/* External Account Deletion Link */}
        <div className="pt-2.5 border-t border-red-500/20 flex items-center justify-between text-xs">
          <div>
            <p className="text-[11px] font-semibold text-[#E7C77A] flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-[#E7C77A]" />
              <span>External Account Deletion Portal:</span>
            </p>
            <a
              href="https://ruhanivexa.social/delete-account"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#F7F4EF]/75 font-mono hover:text-[#E7C77A] hover:underline"
            >
              https://ruhanivexa.social/delete-account
            </a>
          </div>

          <a
            href="https://ruhanivexa.social/delete-account"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 text-[11px] font-medium text-red-300 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>Open Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#15111d] border border-[#E7C77A]/50 p-5 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#291536] border border-[#E7C77A]/40 text-[#E7C77A] flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-royal font-bold text-base text-[#F7F4EF]">
                Exit the Cosmos?
              </h3>
              <p className="text-xs text-[#F7F4EF]/75 leading-relaxed">
                Are you sure you want to exit your sovereign session? Your digital world and telemetry are safely preserved.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 rounded-full bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF]/80 hover:text-white font-medium cursor-pointer"
              >
                Stay in Cosmos
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="py-2.5 rounded-full bg-gradient-to-r from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] font-royal font-bold text-xs uppercase cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
