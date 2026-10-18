import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Music,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Repeat2,
  MoreVertical,
  ShieldAlert,
  UserX,
  BellOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUniverse } from '../../context/UniverseContext';

interface ReelItem {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  title: string;
  description: string;
  soundtrack: string;
  videoPoster: string;
  starsCount: number;
  commentsCount: number;
  hasStarred: boolean;
  tags: string[];
}

const MOCK_REELS: ReelItem[] = [
  {
    id: 'reel_1',
    creatorName: 'Mira Solaria',
    creatorHandle: '@mira.solaria',
    creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    title: 'Rendering 16K Solar Eruptions in Real-time WebGL',
    description: 'Notice how the corona filaments swirl according to magnetic flux equations. Pure cosmic geometry.',
    soundtrack: 'Lyra Sterling — Solar Wind Harmonics (Remix)',
    videoPoster: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    starsCount: 3420,
    commentsCount: 142,
    hasStarred: false,
    tags: ['WebGL', 'SolarPhysics', 'DigitalUniverse'],
  },
  {
    id: 'reel_2',
    creatorName: 'Kaelen Voss',
    creatorHandle: '@kaelen.astral',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    title: 'Telescope Timelapse: The Milky Way Core Rising Over Atacama',
    description: '360 consecutive 30-second exposures stacked to reveal the deep sulfur and hydrogen nebulae.',
    soundtrack: 'Deep Space Audio Lab — Atacama Night Airglow',
    videoPoster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    starsCount: 5120,
    commentsCount: 289,
    hasStarred: true,
    tags: ['Astrophotography', 'Timelapse', 'Atacama'],
  },
  {
    id: 'reel_3',
    creatorName: 'Lyra Sterling',
    creatorHandle: '@lyra.sovereign',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    title: 'Playing the Cosmic Harp via Modular Oscillators',
    description: 'Mapping the orbital periods of Jupiter’s Galilean moons to polyrhythmic synth arpeggios.',
    soundtrack: 'Lyra Sterling — Celestial Resonance in B Minor',
    videoPoster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    starsCount: 6890,
    commentsCount: 310,
    hasStarred: false,
    tags: ['ModularSynth', 'CosmicMusic', 'GalileanOrbits'],
  },
];

export const StarlightReelsViewer: React.FC = () => {
  const { setActiveTab, setReportTarget, blockUser, muteUser, blockedUserIds } = useUniverse();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reels, setReels] = useState<ReelItem[]>(MOCK_REELS);
  const [isMuted, setIsMuted] = useState(false);
  const [reelMenuOpen, setReelMenuOpen] = useState(false);

  const visibleReels = reels.filter((r) => !blockedUserIds.includes(r.creatorHandle));
  const activeIndex = Math.min(currentIndex, Math.max(0, visibleReels.length - 1));
  const currentReel = visibleReels[activeIndex] || MOCK_REELS[0];

  const handleNext = () => {
    if (visibleReels.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % visibleReels.length);
  };

  const handlePrev = () => {
    if (visibleReels.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + visibleReels.length) % visibleReels.length);
  };

  const handleToggleStar = () => {
    if (!currentReel.hasStarred) {
      confetti({
        particleCount: 20,
        spread: 40,
        colors: ['#E7C77A', '#FFF4D0', '#7650C8'],
      });
    }

    setReels((prev) =>
      prev.map((r, idx) =>
        idx === currentIndex
          ? {
              ...r,
              hasStarred: !r.hasStarred,
              starsCount: r.hasStarred ? r.starsCount - 1 : r.starsCount + 1,
            }
          : r
      )
    );
  };

  return (
    <div className="relative w-full h-[78vh] sm:h-[82vh] bg-black rounded-2xl overflow-hidden flex flex-col justify-between select-none">
      {/* Background Visual (Simulated Cinematic Reel) */}
      <img
        src={currentReel.videoPoster}
        alt={currentReel.title}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Cosmic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

      {/* Top Bar info */}
      <div className="relative z-10 p-4 flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#E7C77A]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#E7C77A]" />
          <span className="font-royal font-bold text-[#E7C77A] tracking-wider uppercase text-[11px]">
            Starlight Reels
          </span>
        </div>

        <div className="flex items-center gap-1.5 relative">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-black/70"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* 3-Dot Action Menu for Reels */}
          <button
            onClick={() => setReelMenuOpen(!reelMenuOpen)}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-black/70"
            title="Reel Options"
          >
            <MoreVertical className="w-4 h-4 text-[#E7C77A]" />
          </button>

          {reelMenuOpen && (
            <div className="absolute right-0 top-11 z-40 w-52 rounded-2xl bg-[#1a1226]/95 border border-[#7650C8]/50 shadow-2xl p-1.5 text-xs text-[#F7F4EF] backdrop-blur-xl animate-in fade-in">
              <button
                onClick={() => {
                  setReelMenuOpen(false);
                  setReportTarget({
                    id: currentReel.id,
                    type: 'reel',
                    title: `Starlight Reel: "${currentReel.title}" by ${currentReel.creatorName}`,
                  });
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-300 transition-colors text-left cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span className="font-semibold">Report Transmission</span>
              </button>

              <button
                onClick={() => {
                  setReelMenuOpen(false);
                  blockUser(currentReel.creatorHandle);
                  handleNext();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-400 transition-colors text-left cursor-pointer"
              >
                <UserX className="w-3.5 h-3.5 text-red-400" />
                <span className="font-semibold">Block Sovereign Realm</span>
              </button>

              <button
                onClick={() => {
                  setReelMenuOpen(false);
                  muteUser(currentReel.creatorHandle);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#291536] text-[#F7F4EF]/90 transition-colors text-left cursor-pointer"
              >
                <BellOff className="w-3.5 h-3.5 text-[#9A72F6]" />
                <span>Mute Realm</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Action Floating Bar */}
      <div className="absolute right-3.5 bottom-20 z-20 flex flex-col items-center gap-4">
        {/* Star Button */}
        <button
          onClick={handleToggleStar}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              currentReel.hasStarred
                ? 'bg-[#E7C77A] text-[#101014] border-[#E7C77A] shadow-[0_0_15px_rgba(231,199,122,0.6)]'
                : 'bg-black/40 text-white border-white/20 group-hover:bg-[#291536]'
            }`}
          >
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[11px] font-mono text-white font-semibold">
            {currentReel.starsCount}
          </span>
        </button>

        {/* Comments Button */}
        <button className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#291536] transition-colors">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-white font-semibold">
            {currentReel.commentsCount}
          </span>
        </button>

        {/* Orbit Boost / Share */}
        <button className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#291536] transition-colors">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-white font-semibold">Share</span>
        </button>

        {/* Vertical Up / Down controls */}
        <div className="flex flex-col gap-1.5 pt-2">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white cursor-pointer"
            title="Previous Reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white cursor-pointer"
            title="Next Reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Content Metadata */}
      <div className="relative z-10 p-4 max-w-[80%] space-y-2">
        {/* Creator Info */}
        <div
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <img
            src={currentReel.creatorAvatar}
            alt={currentReel.creatorName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E7C77A]"
          />
          <div>
            <p className="font-royal font-bold text-sm text-[#F7F4EF]">
              {currentReel.creatorName}
            </p>
            <p className="text-xs text-[#9A72F6] font-mono">
              {currentReel.creatorHandle}
            </p>
          </div>
        </div>

        {/* Reel Title & Description */}
        <p className="text-sm font-semibold text-white drop-shadow-md">
          {currentReel.title}
        </p>
        <p className="text-xs text-[#F7F4EF]/85 line-clamp-2 leading-relaxed">
          {currentReel.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {currentReel.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-[#E7C77A] bg-black/40 px-2 py-0.5 rounded-full border border-[#E7C77A]/25"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Audio Track Info */}
        <div className="flex items-center gap-2 pt-1 text-xs text-[#F7F4EF]/75 font-mono">
          <Music className="w-3.5 h-3.5 text-[#E7C77A] animate-spin" />
          <span className="truncate">{currentReel.soundtrack}</span>
        </div>
      </div>
    </div>
  );
};
