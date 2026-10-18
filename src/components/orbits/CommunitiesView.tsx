import React, { useState } from 'react';
import {
  Globe,
  Users,
  Sparkles,
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  Compass,
  Palette,
  Layers,
} from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { OrbitCommunity, CollaborativeSpace } from '../../types';

export const CommunitiesView: React.FC = () => {
  const {
    communities,
    toggleJoinCommunity,
    collaborativeSpaces,
    setColabSpaceModal,
    currentUser,
    createCollaborativeSpace,
  } = useUniverse();

  const [activeTab, setActiveTab] = useState<'orbits' | 'colabs'>('orbits');
  const [newColabOpen, setNewColabOpen] = useState(false);
  const [colabTitle, setColabTitle] = useState('');
  const [colabDesc, setColabDesc] = useState('');

  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colabTitle.trim()) return;

    createCollaborativeSpace({
      title: colabTitle.trim(),
      description: colabDesc.trim() || 'A shared celestial canvas for stargazers.',
      collaborators: [currentUser],
      tags: ['StargazeColab', 'RoyalGalaxy'],
    });

    setColabTitle('');
    setColabDesc('');
    setNewColabOpen(false);
    setActiveTab('colabs');
  };

  return (
    <div className="w-full p-4 sm:p-5 space-y-5">
      {/* Top Banner Header */}
      <div className="rounded-3xl p-5 bg-gradient-to-r from-[#291536] via-[#1a1226] to-[#101014] border border-[#7650C8]/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-1.5">
            <Globe className="w-4 h-4 text-[#E7C77A]" />
            <span className="font-tech text-xs uppercase tracking-widest text-[#E7C77A] font-semibold">
              Cosmic Constellations & Orbits
            </span>
          </div>
          <h2 className="font-royal font-bold text-lg sm:text-xl text-[#F7F4EF]">
            Create Together Across The Universe
          </h2>
          <p className="text-xs text-[#F7F4EF]/75 mt-1 leading-relaxed">
            Join sovereign guilds, sync observational telemetry, and co-create living canvases in real-time.
          </p>
        </div>

        {/* Ambient Decorative Orbit Glow */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-gradient-to-tr from-[#7650C8]/40 to-[#E7C77A]/20 blur-2xl pointer-events-none" />
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-[#7650C8]/25 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orbits')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'orbits'
                ? 'bg-[#E7C77A] text-[#101014] font-bold shadow-[0_0_12px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Galactic Orbits ({communities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('colabs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'colabs'
                ? 'bg-[#E7C77A] text-[#101014] font-bold shadow-[0_0_12px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Orbital Co-Labs ({collaborativeSpaces.length})</span>
          </button>
        </div>

        {activeTab === 'colabs' && (
          <button
            onClick={() => setNewColabOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#7650C8] hover:bg-[#9A72F6] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Initiate Space</span>
          </button>
        )}
      </div>

      {/* New Co-lab Modal */}
      {newColabOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#15111d] border border-[#E7C77A]/40 p-5 shadow-2xl space-y-4">
            <h3 className="font-royal font-bold text-sm text-[#E7C77A] uppercase tracking-wider">
              Launch Collaborative Stargaze Space
            </h3>
            <form onSubmit={handleCreateSpace} className="space-y-3">
              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-semibold">Space Title</label>
                <input
                  type="text"
                  placeholder="e.g., Quantum Sound Synthesis Vol. 2"
                  value={colabTitle}
                  onChange={(e) => setColabTitle(e.target.value)}
                  className="w-full mt-1 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-semibold">Vision & Goal</label>
                <textarea
                  placeholder="Describe what stargazers will co-create in this space..."
                  value={colabDesc}
                  onChange={(e) => setColabDesc(e.target.value)}
                  rows={3}
                  className="w-full mt-1 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewColabOpen(false)}
                  className="px-3 py-1.5 rounded-full text-xs text-[#F7F4EF]/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[#E7C77A] text-[#101014] font-royal font-bold text-xs uppercase"
                >
                  Open Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orbits List */}
      {activeTab === 'orbits' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communities.map((orbit) => (
            <div
              key={orbit.id}
              className="rounded-3xl bg-[#15111d] border border-[#7650C8]/30 overflow-hidden shadow-lg hover:border-[#E7C77A]/40 transition-all flex flex-col justify-between"
            >
              {/* Banner */}
              <div className="relative h-24 sm:h-28 w-full overflow-hidden">
                <img
                  src={orbit.banner}
                  alt={orbit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15111d] via-[#15111d]/50 to-transparent" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#101014]/80 backdrop-blur-md border border-[#7650C8]/40 text-[10px] text-[#E7C77A] font-tech font-semibold">
                  {orbit.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 pt-1 space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <img
                    src={orbit.avatar}
                    alt={orbit.name}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#7650C8] -mt-6 bg-[#101014]"
                  />
                  <div>
                    <h3 className="font-royal font-bold text-sm text-[#F7F4EF]">
                      {orbit.name}
                    </h3>
                    <p className="text-[11px] text-[#9A72F6] font-mono">
                      {orbit.memberCount.toLocaleString()} Stargazers • {orbit.coLabsCount} Co-Labs
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#F7F4EF]/80 leading-relaxed line-clamp-2">
                  {orbit.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#E7C77A] font-mono">
                  Autonomous Sovereign Realm
                </span>

                <button
                  onClick={() => toggleJoinCommunity(orbit.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    orbit.isJoined
                      ? 'bg-[#291536] text-[#E7C77A] border border-[#E7C77A]/40'
                      : 'bg-[#E7C77A] text-[#101014] hover:bg-[#FFF4D0]'
                  }`}
                >
                  {orbit.isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>In Orbit</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Enter Orbit</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Collaborative Spaces List */}
      {activeTab === 'colabs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collaborativeSpaces.map((space) => (
            <div
              key={space.id}
              onClick={() => setColabSpaceModal(space)}
              className="rounded-3xl bg-[#15111d] border border-[#7650C8]/30 overflow-hidden shadow-lg hover:border-[#E7C77A]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Canvas Preview */}
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={space.canvasPreviewUrl}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15111d] via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#101014]/80 backdrop-blur-md border border-[#E7C77A]/40 text-[10px] text-[#E7C77A] font-tech font-bold">
                  {space.status}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#291536]/80 text-[10px] text-[#F7F4EF]/80 font-mono">
                  {space.nodesCount} celestial nodes
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2 flex-1">
                <h3 className="font-royal font-bold text-sm text-[#F7F4EF] group-hover:text-[#E7C77A] transition-colors">
                  {space.title}
                </h3>
                <p className="text-xs text-[#F7F4EF]/75 leading-relaxed line-clamp-2">
                  {space.description}
                </p>

                {/* Collaborators row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-2">
                      {space.collaborators.map((c) => (
                        <img
                          key={c.id}
                          src={c.avatar}
                          alt={c.name}
                          className="w-6 h-6 rounded-full border border-[#101014] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#F7F4EF]/60 font-tech">
                      {space.collaborators.length} Stargazers
                    </span>
                  </div>

                  <span className="text-[10px] text-[#9A72F6] font-mono">
                    {space.lastActivity}
                  </span>
                </div>
              </div>

              {/* Bottom Enter button */}
              <div className="p-3 border-t border-white/5 flex items-center justify-between bg-[#101014]/40">
                <span className="text-xs text-[#E7C77A] font-semibold flex items-center gap-1">
                  <span>Enter Collaborative Canvas</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
