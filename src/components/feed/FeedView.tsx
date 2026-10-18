import React, { useState } from 'react';
import { Sparkles, Users, Globe, Layers, Filter } from 'lucide-react';
import { StoryCarousel } from './StoryCarousel';
import { PostCard } from './PostCard';
import { useUniverse } from '../../context/UniverseContext';

export const FeedView: React.FC = () => {
  const { posts, currentUser } = useUniverse();
  const [feedFilter, setFeedFilter] = useState<'starline' | 'following' | 'orbits' | 'colabs'>('starline');

  const filteredPosts = posts.filter((post) => {
    if (feedFilter === 'following') {
      return post.authorId !== currentUser.id;
    }
    if (feedFilter === 'colabs') {
      return Boolean(post.coAuthors && post.coAuthors.length > 0);
    }
    if (feedFilter === 'orbits') {
      return post.tags.some((t) => ['Astrophotography', 'RoyalGalaxy', 'QuantumArt'].includes(t));
    }
    return true; // Starline: all
  });

  return (
    <div className="w-full flex flex-col">
      {/* Ephemeral Starlight Stories Carousel */}
      <StoryCarousel />

      {/* Feed Filter Tabs */}
      <div className="px-4 py-2.5 border-b border-[#7650C8]/20 flex items-center justify-between bg-[#101014]/60 backdrop-blur-md sticky top-[53px] z-20">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFeedFilter('starline')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
              feedFilter === 'starline'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_10px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Starline
          </button>

          <button
            onClick={() => setFeedFilter('following')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
              feedFilter === 'following'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_10px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Following
          </button>

          <button
            onClick={() => setFeedFilter('colabs')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
              feedFilter === 'colabs'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_10px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Co-Labs
          </button>

          <button
            onClick={() => setFeedFilter('orbits')}
            className={`px-3 py-1 rounded-full text-xs font-tech font-semibold transition-all cursor-pointer ${
              feedFilter === 'orbits'
                ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_10px_rgba(231,199,122,0.3)]'
                : 'text-[#F7F4EF]/70 hover:text-white'
            }`}
          >
            Orbits
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#9A72F6] hidden xs:inline">
          {filteredPosts.length} Pulses
        </span>
      </div>

      {/* Posts List */}
      <div className="divide-y divide-[#7650C8]/15">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-10 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-[#E7C77A]/50 mx-auto" />
            <p className="font-royal text-sm text-[#F7F4EF]">
              No transmissions in this orbit category yet
            </p>
            <p className="text-xs text-[#F7F4EF]/60">
              Switch back to the Starline feed or broadcast a new observation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
