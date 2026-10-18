import React, { useState } from 'react';
import { Plus, X, Sparkles, Heart } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { Story } from '../../types';

export const StoryCarousel: React.FC = () => {
  const { stories, currentUser, setComposerOpen } = useUniverse();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyLiked, setStoryLiked] = useState(false);

  return (
    <>
      <div className="w-full py-3 px-4 border-b border-[#7650C8]/20 overflow-x-auto no-scrollbar flex items-center gap-3">
        {/* Create Story / Pulse Ring */}
        <div
          onClick={() => setComposerOpen(true)}
          className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
        >
          <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#291536] via-[#7650C8] to-[#E7C77A] group-hover:scale-105 transition-all">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover border-2 border-[#101014]"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#E7C77A] text-[#101014] flex items-center justify-center text-[11px] font-bold shadow-md">
              <Plus className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
          <span className="text-[10px] text-[#F7F4EF]/70 group-hover:text-[#E7C77A] font-medium tracking-wide">
            Your Pulse
          </span>
        </div>

        {/* Stories list */}
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => {
              setSelectedStory(story);
              setStoryLiked(false);
            }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >
            <div
              className={`relative w-14 h-14 rounded-full p-0.5 transition-all group-hover:scale-105 ${
                story.viewed
                  ? 'bg-[#7650C8]/40'
                  : 'bg-gradient-to-tr from-[#7650C8] via-[#E7C77A] to-[#F7F4EF] shadow-[0_0_12px_rgba(231,199,122,0.3)] animate-pulse'
              }`}
            >
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className="w-full h-full rounded-full object-cover border-2 border-[#101014]"
              />
            </div>
            <span className="text-[10px] text-[#F7F4EF]/80 font-medium tracking-wide max-w-[64px] truncate">
              {story.author.name.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm h-[85vh] rounded-3xl overflow-hidden bg-[#101014] border border-[#7650C8]/50 flex flex-col justify-between shadow-[0_0_50px_rgba(118,80,200,0.4)]">
            {/* Background Story Media */}
            <img
              src={selectedStory.mediaUrl}
              alt="Story"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-[#101014]/80 pointer-events-none" />

            {/* Story Header Progress & Author */}
            <div className="relative z-10 p-4">
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-[#E7C77A] to-[#FFF4D0] w-full animate-[progress_5s_linear]" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedStory.author.avatar}
                    alt={selectedStory.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#E7C77A]"
                  />
                  <div>
                    <p className="text-xs font-royal font-semibold text-[#F7F4EF] flex items-center gap-1">
                      {selectedStory.author.name}
                      <Sparkles className="w-3 h-3 text-[#E7C77A]" />
                    </p>
                    <p className="text-[10px] text-[#E7C77A]/80 font-mono">
                      {selectedStory.timestamp} • {selectedStory.expiresInHours}h left
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-1 rounded-full bg-[#101014]/60 text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Story Bottom Caption & Reactions */}
            <div className="relative z-10 p-4">
              <div className="p-3 rounded-2xl bg-[#291536]/80 backdrop-blur-md border border-[#7650C8]/30 mb-3 text-xs text-[#F7F4EF] leading-relaxed">
                {selectedStory.caption}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Send celestial reaction..."
                  className="flex-1 bg-[#101014]/70 border border-[#7650C8]/40 rounded-full px-4 py-2 text-xs text-[#F7F4EF] placeholder:text-[#F7F4EF]/40 focus:outline-none focus:border-[#E7C77A]"
                />
                <button
                  onClick={() => setStoryLiked(!storyLiked)}
                  className={`p-2.5 rounded-full transition-all cursor-pointer ${
                    storyLiked
                      ? 'bg-[#E7C77A] text-[#101014]'
                      : 'bg-[#291536] text-[#E7C77A] hover:bg-[#7650C8]/40'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${storyLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
