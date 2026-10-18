import React, { useState } from 'react';
import { X, Sparkles, Send, Heart, CornerDownRight } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { Comment } from '../../types';

export const PostDetailsModal: React.FC = () => {
  const { selectedPostDetails, setSelectedPostDetails, currentUser, toggleStarPost } = useUniverse();

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      postId: selectedPostDetails?.id || '',
      author: {
        id: 'user_lyra',
        name: 'Lyra Sterling',
        handle: '@lyra.sovereign',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        banner: '',
        bio: '',
        celestialAura: 'solargold',
        orbitMilestone: 'Cosmic Sovereign',
        orbitTier: 3,
        starlightGems: 7150,
        followersCount: 28400,
        followingCount: 412,
        verified: true,
        interests: [],
        digitalWorld: { title: '', description: '', coreElement: '', themeColor: '', nebulaDensity: 90 },
      },
      content: 'The starlight resonance in this capture is truly sublime. The ionized gold filaments are exceptional.',
      timestamp: '25m ago',
      likesCount: 14,
      hasLiked: false,
    },
    {
      id: 'c2',
      postId: selectedPostDetails?.id || '',
      author: {
        id: 'user_kaelen',
        name: 'Kaelen Voss',
        handle: '@kaelen.astral',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        banner: '',
        bio: '',
        celestialAura: 'astralcyan',
        orbitMilestone: 'Luminary',
        orbitTier: 2,
        starlightGems: 2940,
        followersCount: 9800,
        followingCount: 245,
        verified: true,
        interests: [],
        digitalWorld: { title: '', description: '', coreElement: '', themeColor: '', nebulaDensity: 65 },
      },
      content: 'What focal length did you use for the second layer? The resolution on the stardust fringe is crisp.',
      timestamp: '10m ago',
      likesCount: 6,
      hasLiked: true,
    },
  ]);

  if (!selectedPostDetails) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      postId: selectedPostDetails.id,
      author: currentUser,
      content: commentText.trim(),
      timestamp: 'Just now',
      likesCount: 0,
      hasLiked: false,
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const toggleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const hasLiked = !c.hasLiked;
          return {
            ...c,
            hasLiked,
            likesCount: hasLiked ? c.likesCount + 1 : Math.max(0, c.likesCount - 1),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#15111d] border border-[#7650C8]/50 shadow-[0_0_60px_rgba(118,80,200,0.35)] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#7650C8]/25 flex items-center justify-between bg-[#101014]/70">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E7C77A]" />
            <h2 className="font-royal font-bold text-sm text-[#F7F4EF] tracking-wider uppercase">
              Starlight Thread & Telemetry
            </h2>
          </div>
          <button
            onClick={() => setSelectedPostDetails(null)}
            className="p-1.5 rounded-full text-[#F7F4EF]/60 hover:text-white hover:bg-[#291536] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Post details */}
          <div className="border-b border-[#7650C8]/20 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={selectedPostDetails.author.avatar}
                alt={selectedPostDetails.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E7C77A]"
              />
              <div>
                <p className="font-royal font-semibold text-sm text-[#F7F4EF]">
                  {selectedPostDetails.author.name}
                </p>
                <p className="text-xs text-[#9A72F6] font-mono">
                  {selectedPostDetails.author.handle} • {selectedPostDetails.timestamp}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F7F4EF]/90 whitespace-pre-line mb-3 font-sans leading-relaxed">
              {selectedPostDetails.content}
            </p>

            {selectedPostDetails.mediaUrl && (
              <img
                src={selectedPostDetails.mediaUrl}
                alt="Post Media"
                className="w-full max-h-[350px] object-cover rounded-2xl border border-[#7650C8]/30 mb-3"
              />
            )}

            <div className="flex items-center gap-4 text-xs text-[#F7F4EF]/70 pt-2 font-mono">
              <span className="text-[#E7C77A] font-semibold">{selectedPostDetails.starsCount} Stars</span>
              <span>{selectedPostDetails.orbitBoostsCount} Orbit Boosts</span>
              <span>{comments.length} Starlight Comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-3">
            <h3 className="font-royal font-semibold text-xs text-[#E7C77A] uppercase tracking-wider">
              Celestial Responses ({comments.length})
            </h3>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3.5 rounded-2xl bg-[#291536]/30 border border-[#7650C8]/25 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-[#7650C8]"
                    />
                    <span className="text-xs font-royal font-medium text-[#F7F4EF]">
                      {comment.author.name}
                    </span>
                    <span className="text-[10px] text-[#9A72F6] font-mono">
                      {comment.author.handle}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#F7F4EF]/50 font-tech">
                    {comment.timestamp}
                  </span>
                </div>

                <p className="text-xs text-[#F7F4EF]/85 pl-8 leading-relaxed">
                  {comment.content}
                </p>

                <div className="pl-8 pt-1 flex items-center justify-between">
                  <button
                    onClick={() => toggleLikeComment(comment.id)}
                    className={`flex items-center gap-1 text-[11px] cursor-pointer transition-colors ${
                      comment.hasLiked ? 'text-[#E7C77A]' : 'text-[#F7F4EF]/50 hover:text-[#E7C77A]'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${comment.hasLiked ? 'fill-current' : ''}`} />
                    <span>{comment.likesCount}</span>
                  </button>

                  <button className="flex items-center gap-1 text-[10px] text-[#F7F4EF]/40 hover:text-white cursor-pointer">
                    <CornerDownRight className="w-3 h-3" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment input footer */}
        <form onSubmit={handleSendComment} className="p-3 border-t border-[#7650C8]/25 bg-[#101014]/80 flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add to the celestial conversation..."
            className="flex-1 bg-[#291536]/50 border border-[#7650C8]/40 rounded-full px-4 py-2 text-xs text-[#F7F4EF] placeholder:text-[#F7F4EF]/40 focus:outline-none focus:border-[#E7C77A]"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2.5 rounded-full bg-[#E7C77A] text-[#101014] disabled:opacity-40 hover:bg-[#FFF4D0] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
