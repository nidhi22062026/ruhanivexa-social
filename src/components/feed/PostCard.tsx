import React, { useState } from 'react';
import {
  Sparkles,
  Repeat2,
  MessageCircle,
  Bookmark,
  Share2,
  Clock,
  MoreVertical,
  MoreHorizontal,
  ShieldAlert,
  UserX,
  Users,
  CheckCircle,
  BellOff,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Post } from '../../types';
import { useUniverse } from '../../context/UniverseContext';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    toggleStarPost,
    toggleBoostPost,
    toggleSavePost,
    setSelectedPostDetails,
    setReportTarget,
    blockUser,
    muteUser,
    hidePost,
    currentUser,
  } = useUniverse();

  const [menuOpen, setMenuOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!post.hasStarred) {
      // Trigger golden stardust confetti
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y },
        colors: ['#E7C77A', '#FFF4D0', '#7650C8', '#9A72F6'],
        ticks: 80,
      });
    }
    toggleStarPost(post.id);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(`https://ruhanivexa.social/pulse/${post.id}`);
    setCopyFeedback(true);
    setTimeout(() => {
      setCopyFeedback(false);
      setMenuOpen(false);
    }, 1500);
  };

  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    setReportTarget({
      id: post.id,
      type: 'post',
      title: `Post by ${post.author.name}: "${post.content.slice(0, 40)}..."`,
    });
  };

  const handleBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    blockUser(post.author.id);
  };

  const getAuraRingColor = (aura: string) => {
    switch (aura) {
      case 'solargold':
        return 'ring-[#E7C77A] shadow-[0_0_10px_rgba(231,199,122,0.4)]';
      case 'astralcyan':
        return 'ring-[#4FD1C5] shadow-[0_0_10px_rgba(79,209,197,0.4)]';
      case 'voidvelvet':
        return 'ring-[#9A72F6] shadow-[0_0_10px_rgba(154,114,246,0.4)]';
      case 'nebulabloom':
        return 'ring-[#F472B6] shadow-[0_0_10px_rgba(244,114,182,0.4)]';
      default:
        return 'ring-[#7650C8] shadow-[0_0_10px_rgba(118,80,200,0.4)]';
    }
  };

  return (
    <article className="w-full bg-[#101014]/80 backdrop-blur-md border-b border-[#7650C8]/25 p-4 sm:p-5 hover:bg-[#16121d]/90 transition-colors relative">
      {/* Collaborative Header Pill if Multi-Author */}
      {post.coAuthors && post.coAuthors.length > 0 && (
        <div className="mb-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#291536] to-[#101014] border border-[#E7C77A]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#E7C77A]" />
            <span className="font-tech text-[#E7C77A] font-semibold tracking-wider">
              ORBITAL CO-LAB: {post.collaborationTitle || 'Shared Synthesis'}
            </span>
          </div>
          <div className="flex -space-x-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-5 h-5 rounded-full border border-[#101014]"
            />
            {post.coAuthors.map((ca) => (
              <img
                key={ca.id}
                src={ca.avatar}
                alt={ca.name}
                className="w-5 h-5 rounded-full border border-[#101014]"
              />
            ))}
          </div>
        </div>
      )}

      {/* Author and Metadata Bar */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar with Aura */}
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className={`w-11 h-11 rounded-full object-cover ring-2 ${getAuraRingColor(
                post.author.celestialAura
              )}`}
            />
            {post.author.orbitTier === 3 && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#E7C77A] text-[#101014] flex items-center justify-center text-[10px] font-bold shadow-sm" title="Cosmic Sovereign">
                ★
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-royal font-semibold text-sm text-[#F7F4EF]">
                {post.author.name}
              </span>
              {post.author.verified && (
                <CheckCircle className="w-3.5 h-3.5 text-[#E7C77A]" />
              )}
              <span className="text-xs text-[#9A72F6] font-mono">
                {post.author.handle}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#F7F4EF]/60">
              <span className="font-tech tracking-wide">{post.timestamp}</span>
              <span>•</span>
              <span className="text-[#E7C77A]/90 font-medium">
                {post.author.orbitMilestone}
              </span>

              {/* Disappearing indicator */}
              {post.disappearingInHours && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#E7C77A] bg-[#291536] px-2 py-0.5 rounded-full border border-[#E7C77A]/30">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Dissolves in {post.disappearingInHours}h</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3-Dot More Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-full text-[#F7F4EF]/70 hover:text-[#E7C77A] hover:bg-[#291536] transition-colors cursor-pointer"
            title="Transmission Options (Report & Block)"
          >
            <MoreVertical className="w-4 h-4 text-[#E7C77A]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-30 w-56 rounded-2xl bg-[#1a1226]/95 border border-[#7650C8]/50 shadow-2xl p-1.5 text-xs text-[#F7F4EF] backdrop-blur-xl animate-in fade-in">
              {/* Report Transmission */}
              <button
                onClick={handleReport}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-300 transition-colors text-left cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span className="font-semibold">Report Transmission</span>
              </button>

              {/* Block Sovereign Realm */}
              {post.author.id !== currentUser.id && (
                <>
                  <button
                    onClick={handleBlock}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-400 transition-colors text-left cursor-pointer"
                  >
                    <UserX className="w-3.5 h-3.5 text-red-400" />
                    <span className="font-semibold">Block Sovereign Realm</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      muteUser(post.author.id);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#291536] text-[#F7F4EF]/90 transition-colors text-left cursor-pointer"
                  >
                    <BellOff className="w-3.5 h-3.5 text-[#9A72F6]" />
                    <span>Mute Realm</span>
                  </button>
                </>
              )}

              {/* Copy Starlight URL */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#7650C8]/30 transition-colors text-left cursor-pointer border-t border-white/5 mt-1 pt-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span>{copyFeedback ? 'Copied Link!' : 'Copy Starlight URL'}</span>
              </button>

              {/* Hide Transmission */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  hidePost(post.id);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#291536] text-[#F7F4EF]/60 transition-colors text-left cursor-pointer"
              >
                <EyeOff className="w-3.5 h-3.5 text-[#F7F4EF]/50" />
                <span>Hide Transmission</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Text */}
      <div
        onClick={() => setSelectedPostDetails(post)}
        className="cursor-pointer"
      >
        <p className="text-sm text-[#F7F4EF]/90 leading-relaxed font-sans whitespace-pre-line mb-3">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#291536]/80 text-[#9A72F6] border border-[#7650C8]/25 hover:border-[#E7C77A]/40 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Media Preview if attached */}
        {post.mediaUrl && (
          <div className="relative rounded-2xl overflow-hidden border border-[#7650C8]/30 mb-3 group shadow-[0_4px_24px_rgba(41,21,54,0.5)]">
            <img
              src={post.mediaUrl}
              alt="Celestial observation"
              className="w-full max-h-[380px] object-cover transition-transform duration-500 group-hover:scale-102"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101014]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-xs text-[#E7C77A] font-tech tracking-wider">
                Click to inspect starlight telemetry
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Bar */}
      <div className="flex items-center justify-between text-xs text-[#F7F4EF]/70 pt-2 border-t border-white/5">
        {/* Star / Spark */}
        <button
          onClick={handleStarClick}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
            post.hasStarred
              ? 'bg-[#E7C77A]/20 text-[#E7C77A] font-semibold'
              : 'hover:text-[#E7C77A] hover:bg-[#291536]'
          }`}
          title="Star Transmission"
        >
          <Sparkles className={`w-4 h-4 ${post.hasStarred ? 'fill-current text-[#E7C77A]' : ''}`} />
          <span className="font-mono text-xs">{post.starsCount}</span>
        </button>

        {/* Orbit Boost */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBoostPost(post.id);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
            post.hasBoosted
              ? 'bg-[#7650C8]/30 text-[#9A72F6] font-semibold'
              : 'hover:text-[#9A72F6] hover:bg-[#291536]'
          }`}
          title="Orbit Boost"
        >
          <Repeat2 className="w-4 h-4" />
          <span className="font-mono text-xs">{post.orbitBoostsCount}</span>
        </button>

        {/* Comments */}
        <button
          onClick={() => setSelectedPostDetails(post)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:text-[#F7F4EF] hover:bg-[#291536] transition-all cursor-pointer"
          title="Open Discussion Thread"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-mono text-xs">{post.commentsCount}</span>
        </button>

        {/* Save / Vault */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSavePost(post.id);
          }}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            post.isSaved
              ? 'bg-[#E7C77A]/20 text-[#E7C77A]'
              : 'hover:text-[#E7C77A] hover:bg-[#291536]'
          }`}
          title="Save to Celestial Vault"
        >
          <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>
    </article>
  );
};
