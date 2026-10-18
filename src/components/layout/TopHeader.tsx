import React, { useState } from 'react';
import { Bell, Bookmark, Crown, Settings, ShieldCheck, Info } from 'lucide-react';
import { Wordmark } from '../brand/Wordmark';
import { useUniverse } from '../../context/UniverseContext';

export const TopHeader: React.FC = () => {
  const {
    notifications,
    setActiveTab,
    activeTab,
    setAuthModalOpen,
    isAuthenticated,
  } = useUniverse();

  const [showDemoInfo, setShowDemoInfo] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-[#101014]/90 backdrop-blur-xl border-b border-[#7650C8]/25 px-4 py-2.5 flex items-center justify-between">
        {/* Brand Lockup */}
        <button
          onClick={() => setActiveTab('feed')}
          className="cursor-pointer text-left focus:outline-none"
        >
          <Wordmark size="sm" showTagline={false} />
        </button>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Demo Data indicator */}
          <button
            onClick={() => setShowDemoInfo(!showDemoInfo)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#291536] border border-[#E7C77A]/30 text-[10px] text-[#E7C77A] font-medium hover:bg-[#7650C8]/20 transition-all cursor-pointer"
            title="Backend & Demo Data Disclosure"
          >
            <ShieldCheck className="w-3 h-3 text-[#E7C77A]" />
            <span className="hidden xs:inline">Sandbox</span>
          </button>

          {/* Creator Monetization / Royal Starlight Club */}
          <button
            onClick={() => setActiveTab('creator')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'creator'
                ? 'bg-[#E7C77A]/20 text-[#E7C77A] ring-1 ring-[#E7C77A]'
                : 'text-[#F7F4EF]/70 hover:text-[#E7C77A] hover:bg-[#291536]'
            }`}
            title="Royal Creator Dashboard & Monetization"
          >
            <Crown className="w-4 h-4 text-[#E7C77A]" />
          </button>

          {/* Saved Vault */}
          <button
            onClick={() => setActiveTab('saved')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#7650C8]/30 text-[#E7C77A] ring-1 ring-[#7650C8]'
                : 'text-[#F7F4EF]/70 hover:text-[#F7F4EF] hover:bg-[#291536]'
            }`}
            title="Saved Celestial Vault"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative p-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#7650C8]/30 text-[#E7C77A] ring-1 ring-[#7650C8]'
                : 'text-[#F7F4EF]/70 hover:text-[#F7F4EF] hover:bg-[#291536]'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#E7C77A] text-[#101014] text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#101014] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#7650C8]/30 text-[#E7C77A] ring-1 ring-[#7650C8]'
                : 'text-[#F7F4EF]/70 hover:text-[#F7F4EF] hover:bg-[#291536]'
            }`}
            title="Settings & Privacy"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Backend & Demo Data Disclosure Banner */}
      {showDemoInfo && (
        <div className="bg-[#291536]/95 border-b border-[#E7C77A]/40 p-3 text-xs text-[#F7F4EF] flex items-start justify-between gap-3 relative z-30 shadow-lg">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#E7C77A] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#E7C77A]">Backend & Sandbox Transparency Notice</p>
              <p className="text-[#F7F4EF]/80 text-[11px] mt-0.5 leading-relaxed">
                Ruhanivexa Social is running with high-fidelity local state persistence and encrypted client-side simulation. Real payments, live SMS/OAuth, and database sync remain isolated until your cloud backend credentials are configured.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDemoInfo(false)}
            className="text-[#E7C77A] hover:text-white text-xs font-mono font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
