import React from 'react';
import { Sparkles, Globe, MessageSquare, Plus, Compass, Film } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

export const BottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setComposerOpen,
    conversations,
    currentUser,
  } = useUniverse();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 bg-[#101014]/95 backdrop-blur-2xl border-t border-[#7650C8]/30 px-2 py-1.5 flex items-center justify-around shadow-[0_-5px_20px_rgba(41,21,54,0.6)]">
      {/* 1. Feed (Starline) */}
      <button
        onClick={() => setActiveTab('feed')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
          activeTab === 'feed'
            ? 'text-[#E7C77A] scale-105'
            : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
        }`}
        title="Starline Feed"
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wider">Feed</span>
      </button>

      {/* 2. Infinite Discovery (Constellation Map) */}
      <button
        onClick={() => setActiveTab('discovery')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
          activeTab === 'discovery'
            ? 'text-[#E7C77A] scale-105'
            : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
        }`}
        title="Constellation Discovery"
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wider">Explore</span>
      </button>

      {/* 3. Starlight Reels */}
      <button
        onClick={() => setActiveTab('reels')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
          activeTab === 'reels'
            ? 'text-[#E7C77A] scale-105'
            : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
        }`}
        title="Starlight Reels"
      >
        <Film className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wider">Reels</span>
      </button>

      {/* 4. Center Gold Composer Button */}
      <button
        onClick={() => setComposerOpen(true)}
        className="relative -top-2 flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] shadow-[0_0_20px_rgba(231,199,122,0.4)] hover:shadow-[0_0_28px_rgba(231,199,122,0.7)] hover:scale-110 active:scale-95 transition-all cursor-pointer ring-2 ring-[#7650C8]/40"
        title="Create Celestial Post or Collaborative Space"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* 5. Orbits & Collaborative Spaces */}
      <button
        onClick={() => setActiveTab('orbits')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
          activeTab === 'orbits'
            ? 'text-[#E7C77A] scale-105'
            : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
        }`}
        title="Orbits & Co-Labs"
      >
        <Globe className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wider">Orbits</span>
      </button>

      {/* 6. Messages (Quantum Comms) */}
      <button
        onClick={() => setActiveTab('messages')}
        className={`relative flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
          activeTab === 'messages'
            ? 'text-[#E7C77A] scale-105'
            : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
        }`}
        title="Quantum Comms"
      >
        <MessageSquare className="w-5 h-5" />
        {totalUnreadMessages > 0 && (
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#E7C77A] ring-2 ring-[#101014] animate-ping" />
        )}
        <span className="text-[10px] font-medium tracking-wider">Comms</span>
      </button>

      {/* 7. Expressive Profile */}
      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
          activeTab === 'profile'
            ? 'text-[#E7C77A] scale-105'
            : 'text-[#F7F4EF]/60 hover:text-[#F7F4EF]'
        }`}
        title="Living Universe Profile"
      >
        <div className="relative">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={`w-5 h-5 rounded-full object-cover ring-1.5 ${
              activeTab === 'profile' ? 'ring-[#E7C77A]' : 'ring-[#7650C8]/60'
            }`}
          />
        </div>
        <span className="text-[10px] font-medium tracking-wider">World</span>
      </button>
    </nav>
  );
};
