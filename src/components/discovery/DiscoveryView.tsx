import React, { useState } from 'react';
import { Search, Compass, List, Sparkles } from 'lucide-react';
import { ConstellationMap } from './ConstellationMap';
import { AccessibleDiscoveryList } from './AccessibleDiscoveryList';

export const DiscoveryView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'constellation' | 'list'>('constellation');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full p-4 sm:p-5 space-y-4">
      {/* Search and Discovery Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E7C77A]" />
          <input
            type="text"
            placeholder="Search celestial coordinates, creators, tags, orbits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#15111d] border border-[#7650C8]/30 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#F7F4EF] placeholder:text-[#F7F4EF]/40 focus:outline-none focus:border-[#E7C77A] shadow-[0_2px_12px_rgba(41,21,54,0.4)]"
          />
        </div>

        {/* View switcher */}
        <div className="flex items-center self-end sm:self-auto gap-1 bg-[#15111d] p-1 rounded-2xl border border-[#7650C8]/30">
          <button
            onClick={() => setViewMode('constellation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'constellation'
                ? 'bg-[#E7C77A] text-[#101014] font-bold shadow-[0_0_12px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
            title="Interactive Constellation Map"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Constellation</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#E7C77A] text-[#101014] font-bold shadow-[0_0_12px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
            title="Accessible List Mode"
          >
            <List className="w-3.5 h-3.5" />
            <span>Accessible List</span>
          </button>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'constellation' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#F7F4EF]/60">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C77A]" />
              Interactive Gravitational Constellation Grid
            </span>
            <span className="font-mono text-[11px] text-[#9A72F6]">Tap any node to expand world</span>
          </div>
          <ConstellationMap />
        </div>
      ) : (
        <AccessibleDiscoveryList searchQuery={searchQuery} />
      )}
    </div>
  );
};
