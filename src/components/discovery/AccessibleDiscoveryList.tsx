import React, { useState } from 'react';
import { Sparkles, Users, Globe, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { User, OrbitCommunity } from '../../types';

interface AccessibleDiscoveryListProps {
  searchQuery: string;
}

export const AccessibleDiscoveryList: React.FC<AccessibleDiscoveryListProps> = ({ searchQuery }) => {
  const { users, communities, setActiveTab, currentUser } = useUniverse();
  const [filterType, setFilterType] = useState<'all' | 'creators' | 'orbits'>('all');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 select-text" role="region" aria-label="Accessible Discovery Directory">
      {/* Category selector */}
      <div className="flex items-center gap-2 border-b border-[#7650C8]/20 pb-3">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            filterType === 'all'
              ? 'bg-[#E7C77A] text-[#101014] font-bold'
              : 'bg-[#291536] text-[#F7F4EF]/80 hover:text-white'
          }`}
          aria-pressed={filterType === 'all'}
        >
          All Coordinates ({filteredUsers.length + filteredCommunities.length})
        </button>

        <button
          onClick={() => setFilterType('creators')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            filterType === 'creators'
              ? 'bg-[#E7C77A] text-[#101014] font-bold'
              : 'bg-[#291536] text-[#F7F4EF]/80 hover:text-white'
          }`}
          aria-pressed={filterType === 'creators'}
        >
          Creators ({filteredUsers.length})
        </button>

        <button
          onClick={() => setFilterType('orbits')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            filterType === 'orbits'
              ? 'bg-[#E7C77A] text-[#101014] font-bold'
              : 'bg-[#291536] text-[#F7F4EF]/80 hover:text-white'
          }`}
          aria-pressed={filterType === 'orbits'}
        >
          Orbits & Guilds ({filteredCommunities.length})
        </button>
      </div>

      {/* Creators Section */}
      {(filterType === 'all' || filterType === 'creators') && (
        <section aria-labelledby="creators-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 id="creators-heading" className="font-royal text-sm font-bold text-[#E7C77A] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Sovereign Creators & Observers
            </h3>
            <span className="text-xs text-[#9A72F6] font-mono">{filteredUsers.length} found</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 hover:border-[#E7C77A]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#E7C77A]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-royal font-bold text-sm text-[#F7F4EF]">
                          {user.name}
                        </span>
                        {user.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#E7C77A]" />
                        )}
                      </div>
                      <span className="text-xs text-[#9A72F6] font-mono">{user.handle}</span>
                      <p className="text-[11px] text-[#E7C77A] font-tech font-medium">
                        {user.orbitMilestone} • {user.followersCount.toLocaleString()} Stargazers
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#F7F4EF]/80 line-clamp-2 mb-3">
                    {user.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.interests.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#291536] text-[#E7C77A] border border-[#7650C8]/25"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-[#F7F4EF]/50 font-mono">
                    World: {user.digitalWorld.title}
                  </span>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#291536] hover:bg-[#7650C8]/40 text-xs text-[#E7C77A] transition-colors cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Orbits & Communities Section */}
      {(filterType === 'all' || filterType === 'orbits') && (
        <section aria-labelledby="orbits-heading" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 id="orbits-heading" className="font-royal text-sm font-bold text-[#E7C77A] uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Active Orbits & Communities
            </h3>
            <span className="text-xs text-[#9A72F6] font-mono">{filteredCommunities.length} found</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCommunities.map((comm) => (
              <div
                key={comm.id}
                className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 hover:border-[#E7C77A]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={comm.avatar}
                      alt={`${comm.name} emblem`}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#7650C8]"
                    />
                    <div>
                      <p className="font-royal font-bold text-sm text-[#F7F4EF]">
                        {comm.name}
                      </p>
                      <span className="text-xs text-[#9A72F6] font-tech font-medium">
                        {comm.category} • {comm.memberCount.toLocaleString()} members
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#F7F4EF]/80 line-clamp-2 mb-3">
                    {comm.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-[#E7C77A] font-mono">
                    {comm.coLabsCount} active co-labs
                  </span>
                  <button
                    onClick={() => setActiveTab('orbits')}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#E7C77A] text-[#101014] text-xs font-bold hover:bg-[#FFF4D0] transition-colors cursor-pointer"
                  >
                    <span>Enter Orbit</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
