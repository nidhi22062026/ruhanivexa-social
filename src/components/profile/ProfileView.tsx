import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Edit3,
  Share2,
  CheckCircle,
  Gem,
  Award,
  Globe,
  Sliders,
  Layers,
  Bookmark,
  MoreVertical,
  ShieldAlert,
  UserX,
  BellOff,
  Briefcase,
  DollarSign,
  Wallet,
} from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { PostCard } from '../feed/PostCard';
import { EditProfileModal } from './EditProfileModal';
import { BrandPartnershipsHub } from '../creator/BrandPartnershipsHub';

export const ProfileView: React.FC = () => {
  const { currentUser, posts, blockUser, muteUser, setReportTarget } = useUniverse();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'transmissions' | 'colabs' | 'brand_hub'>('transmissions');
  const [copiedLink, setCopiedLink] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const userPosts = posts.filter((p) => p.authorId === currentUser.id);
  const userColabPosts = posts.filter(
    (p) => p.authorId === currentUser.id && p.coAuthors && p.coAuthors.length > 0
  );

  const handleShareWorld = () => {
    navigator.clipboard?.writeText(`https://ruhanivexa.social/world/${currentUser.handle.replace('@', '')}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getAuraColor = (aura: string) => {
    switch (aura) {
      case 'solargold':
        return 'from-[#E7C77A] to-[#FFF4D0] text-[#E7C77A]';
      case 'astralcyan':
        return 'from-[#4FD1C5] to-[#81E6D9] text-[#4FD1C5]';
      case 'voidvelvet':
        return 'from-[#7650C8] to-[#291536] text-[#9A72F6]';
      case 'nebulabloom':
        return 'from-[#F472B6] to-[#C084FC] text-[#F472B6]';
      default:
        return 'from-[#9A72F6] to-[#7650C8] text-[#E7C77A]';
    }
  };

  return (
    <div className="w-full pb-8 space-y-4">
      {/* Banner & Avatar section */}
      <div className="relative">
        <div className="h-36 sm:h-44 w-full overflow-hidden bg-[#291536]">
          <img
            src={currentUser.banner}
            alt="World Banner"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/40 to-transparent" />
        </div>

        {/* Profile Avatar & Actions */}
        <div className="px-5 flex items-end justify-between -mt-14 relative z-10">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#101014] ring-2 ring-[#E7C77A] shadow-[0_0_20px_rgba(231,199,122,0.4)]"
            />
            <span
              className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#E7C77A] text-[#101014] flex items-center justify-center font-bold text-xs shadow-md"
              title="Cosmic Sovereign Milestone"
            >
              ★
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWorld}
              className="p-2 rounded-full bg-[#15111d] border border-[#7650C8]/40 text-[#F7F4EF]/80 hover:text-[#E7C77A] cursor-pointer transition-colors"
              title="Share Constellation Coordinates"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#291536] hover:bg-[#7650C8]/30 border border-[#E7C77A]/50 text-xs font-semibold text-[#E7C77A] transition-all cursor-pointer shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Customize World</span>
            </button>

            <button
              onClick={() => setActiveProfileTab('brand_hub')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#291536] via-[#1a1226] to-[#15111d] hover:bg-[#7650C8]/40 border border-[#E7C77A]/60 text-xs font-bold text-[#E7C77A] transition-all cursor-pointer shadow-[0_0_12px_rgba(231,199,122,0.25)] hover:scale-105"
              title="Open Brand Partnerships Hub & Payout Wallet"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#E7C77A]" />
              <span>Brand Hub & Wallet</span>
            </button>

            {/* 3-Dot UGC Moderation Action Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="p-2 rounded-full bg-[#15111d] border border-[#7650C8]/40 text-[#F7F4EF]/80 hover:text-[#E7C77A] cursor-pointer transition-colors"
                title="Sovereign Realm Actions"
              >
                <MoreVertical className="w-4 h-4 text-[#E7C77A]" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-10 z-30 w-56 rounded-2xl bg-[#1a1226]/95 border border-[#7650C8]/50 shadow-2xl p-1.5 text-xs text-[#F7F4EF] backdrop-blur-xl animate-in fade-in">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setReportTarget({
                        id: currentUser.id,
                        type: 'user',
                        title: `Sovereign Realm: ${currentUser.name} (${currentUser.handle})`,
                      });
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-300 transition-colors text-left cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>Report Inappropriate Transmission</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      muteUser(currentUser.id);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#291536] text-[#F7F4EF]/90 transition-colors text-left cursor-pointer"
                  >
                    <BellOff className="w-3.5 h-3.5 text-[#9A72F6]" />
                    <span>Mute Realm</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      blockUser(currentUser.id);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-400 transition-colors text-left cursor-pointer"
                  >
                    <UserX className="w-3.5 h-3.5 text-red-400" />
                    <span>Block Sovereign Realm</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {copiedLink && (
        <div className="mx-5 p-2 rounded-xl bg-[#291536] border border-[#E7C77A]/50 text-center text-xs text-[#E7C77A] font-mono animate-in fade-in">
          ✨ Digital World Coordinates copied to clipboard!
        </div>
      )}

      {/* Profile Details & Bio */}
      <div className="px-5 space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-royal font-bold text-xl text-[#F7F4EF]">
              {currentUser.name}
            </h1>
            {currentUser.verified && (
              <CheckCircle className="w-4 h-4 text-[#E7C77A]" />
            )}
            <span className="px-2 py-0.5 rounded-full bg-[#291536] text-[10px] text-[#E7C77A] border border-[#E7C77A]/30 font-tech font-bold uppercase">
              {currentUser.orbitMilestone}
            </span>
          </div>
          <p className="text-xs text-[#9A72F6] font-mono">{currentUser.handle}</p>
        </div>

        <p className="text-xs sm:text-sm text-[#F7F4EF]/85 leading-relaxed font-sans">
          {currentUser.bio}
        </p>

        {/* Starlight Stats Bar */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#7650C8]/20 text-center font-mono">
          <div className="p-2 rounded-xl bg-[#15111d] border border-white/5">
            <p className="text-base font-bold text-[#F7F4EF]">
              {currentUser.followersCount.toLocaleString()}
            </p>
            <p className="text-[10px] text-[#9A72F6] font-sans">Stargazers</p>
          </div>

          <div className="p-2 rounded-xl bg-[#15111d] border border-white/5">
            <p className="text-base font-bold text-[#F7F4EF]">
              {currentUser.followingCount}
            </p>
            <p className="text-[10px] text-[#9A72F6] font-sans">In Orbit</p>
          </div>

          <div className="p-2 rounded-xl bg-[#15111d] border border-white/5">
            <p className="text-base font-bold text-[#E7C77A] flex items-center justify-center gap-1">
              <Gem className="w-3.5 h-3.5 text-[#E7C77A]" />
              {currentUser.starlightGems.toLocaleString()}
            </p>
            <p className="text-[10px] text-[#E7C77A] font-sans">Gems</p>
          </div>
        </div>

        {/* Interests Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {currentUser.interests.map((interest) => (
            <span
              key={interest}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#291536]/80 text-[#E7C77A] border border-[#7650C8]/30 font-tech"
            >
              #{interest}
            </span>
          ))}
        </div>
      </div>

      {/* Living Universe Card */}
      <div className="mx-5 p-4 rounded-3xl bg-gradient-to-br from-[#291536] via-[#1a1226] to-[#101014] border border-[#E7C77A]/40 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#E7C77A]" />
            <span className="font-tech text-xs uppercase tracking-widest text-[#E7C77A] font-bold">
              Living Digital World
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#101014] text-[#E7C77A] border border-[#E7C77A]/30">
            Aura: {currentUser.celestialAura.toUpperCase()}
          </span>
        </div>

        <div>
          <h3 className="font-royal font-bold text-base text-[#F7F4EF]">
            {currentUser.digitalWorld.title}
          </h3>
          <p className="text-xs text-[#F7F4EF]/75 mt-0.5 leading-relaxed">
            {currentUser.digitalWorld.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono border-t border-white/5">
          <div className="bg-[#101014]/60 p-2 rounded-xl">
            <span className="text-[#9A72F6]">Core Element:</span>
            <p className="text-[#E7C77A] font-semibold">{currentUser.digitalWorld.coreElement}</p>
          </div>
          <div className="bg-[#101014]/60 p-2 rounded-xl">
            <span className="text-[#9A72F6]">Nebula Density:</span>
            <p className="text-[#E7C77A] font-semibold">{currentUser.digitalWorld.nebulaDensity}%</p>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="px-5 flex items-center gap-2 border-b border-[#7650C8]/25 pt-2">
        <button
          onClick={() => setActiveProfileTab('transmissions')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer ${
            activeProfileTab === 'transmissions'
              ? 'border-[#E7C77A] text-[#E7C77A] font-bold'
              : 'border-transparent text-[#F7F4EF]/60 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transmissions ({userPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('colabs')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer ${
            activeProfileTab === 'colabs'
              ? 'border-[#E7C77A] text-[#E7C77A] font-bold'
              : 'border-transparent text-[#F7F4EF]/60 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Orbital Co-Labs ({userColabPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('brand_hub')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-all cursor-pointer ${
            activeProfileTab === 'brand_hub'
              ? 'border-[#E7C77A] text-[#E7C77A] font-bold'
              : 'border-transparent text-[#F7F4EF]/60 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Brand Hub & Wallet</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </button>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-3">
        {activeProfileTab === 'brand_hub' ? (
          <div className="px-5">
            <BrandPartnershipsHub />
          </div>
        ) : activeProfileTab === 'transmissions' ? (
          userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-10 text-xs text-[#F7F4EF]/50">
              No starlight transmissions yet. Broadcast your first!
            </div>
          )
        ) : userColabPosts.length > 0 ? (
          userColabPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-10 text-xs text-[#F7F4EF]/50">
            No co-labs authored yet. Initiate an Orbital Space!
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && <EditProfileModal onClose={() => setEditModalOpen(false)} />}
    </div>
  );
};
