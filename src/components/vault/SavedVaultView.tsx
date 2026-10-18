import React from 'react';
import { Bookmark, Sparkles, FolderArchive, ArrowRight } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { PostCard } from '../feed/PostCard';

export const SavedVaultView: React.FC = () => {
  const { posts, setActiveTab } = useUniverse();

  const savedPosts = posts.filter((p) => p.isSaved);

  return (
    <div className="w-full p-4 sm:p-5 space-y-4">
      {/* Vault Header */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-[#291536] to-[#15111d] border border-[#7650C8]/40 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E7C77A]/20 border border-[#E7C77A]/50 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-[#E7C77A]" />
          </div>
          <div>
            <h2 className="font-royal font-bold text-sm text-[#F7F4EF]">
              Celestial Saved Vault
            </h2>
            <p className="text-xs text-[#9A72F6] font-mono">
              {savedPosts.length} Bookmarked Transmissions
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('feed')}
          className="text-xs text-[#E7C77A] font-tech hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Explore More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Saved Posts List */}
      <div className="space-y-3">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-12 text-center space-y-3 rounded-2xl bg-[#15111d] border border-white/5">
            <FolderArchive className="w-10 h-10 text-[#7650C8]/50 mx-auto" />
            <h3 className="font-royal font-semibold text-sm text-[#F7F4EF]">
              Your Vault is Empty
            </h3>
            <p className="text-xs text-[#F7F4EF]/60 max-w-xs mx-auto">
              Save captivating astrophotography, collaborative spaces, and cosmic discussions to access them anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
