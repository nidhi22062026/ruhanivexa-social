import React, { useState } from 'react';
import { X, Image, Users, Sparkles, Clock, Lock, Globe, ShieldCheck } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { PrivacyLevel } from '../../types';

const CELESTIAL_MEDIA_PRESETS = [
  {
    name: 'Cosmic Nebula',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Deep Optical Telescope',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Auroral Flare',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Stellar Wind Shaders',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PostComposerModal: React.FC = () => {
  const { composerOpen, setComposerOpen, createPost, currentUser, users } = useUniverse();

  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [collaborationTitle, setCollaborationTitle] = useState('');
  const [selectedCoAuthorIds, setSelectedCoAuthorIds] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<PrivacyLevel>('public');
  const [disappearingHours, setDisappearingHours] = useState<number | undefined>(undefined);

  if (!composerOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const coAuthors = users.filter((u) => selectedCoAuthorIds.includes(u.id));

    createPost({
      content,
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaUrl ? 'image' : undefined,
      privacy,
      disappearingInHours: disappearingHours,
      tags: parsedTags.length > 0 ? parsedTags : ['RoyalGalaxy', 'CelestialPulse'],
      collaborationTitle: collaborationTitle.trim() || undefined,
      coAuthors: coAuthors.length > 0 ? coAuthors : undefined,
    });

    // Reset and close
    setContent('');
    setMediaUrl('');
    setSelectedPreset(null);
    setTagsInput('');
    setCollaborationTitle('');
    setSelectedCoAuthorIds([]);
    setComposerOpen(false);
  };

  const toggleCoAuthor = (userId: string) => {
    setSelectedCoAuthorIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#15111d] border border-[#7650C8]/50 shadow-[0_0_60px_rgba(118,80,200,0.35)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#7650C8]/25 flex items-center justify-between bg-[#101014]/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E7C77A]" />
            <h2 className="font-royal font-bold text-sm text-[#F7F4EF] tracking-wider uppercase">
              Synthesize Starlight Transmission
            </h2>
          </div>
          <button
            onClick={() => setComposerOpen(false)}
            className="p-1.5 rounded-full text-[#F7F4EF]/60 hover:text-white hover:bg-[#291536] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublish} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Author snippet */}
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E7C77A]"
            />
            <div>
              <p className="text-xs font-royal font-semibold text-[#F7F4EF]">
                {currentUser.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as PrivacyLevel)}
                  className="bg-[#291536] text-[11px] text-[#E7C77A] rounded-full px-2 py-0.5 border border-[#7650C8]/40 focus:outline-none cursor-pointer"
                >
                  <option value="public">🪐 Public Universe</option>
                  <option value="orbits_only">🌌 Orbits Only</option>
                  <option value="private_vault">🔒 Private Vault</option>
                </select>

                <select
                  value={disappearingHours || ''}
                  onChange={(e) =>
                    setDisappearingHours(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="bg-[#291536] text-[11px] text-[#E7C77A] rounded-full px-2 py-0.5 border border-[#7650C8]/40 focus:outline-none cursor-pointer"
                >
                  <option value="">✨ Permanent</option>
                  <option value="24">⏳ Dissolves in 24h</option>
                  <option value="168">⏳ Dissolves in 7d</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Broadcast your starlight observations, poems, or cosmic discoveries..."
            rows={4}
            className="w-full bg-[#101014]/60 border border-[#7650C8]/30 rounded-2xl p-3.5 text-sm text-[#F7F4EF] placeholder:text-[#F7F4EF]/40 focus:outline-none focus:border-[#E7C77A] resize-none"
          />

          {/* Collaborative Space Option (Co-Authors) */}
          <div className="p-3.5 rounded-2xl bg-[#291536]/40 border border-[#7650C8]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-royal font-semibold text-[#E7C77A] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Orbital Co-Creation
              </span>
              <span className="text-[10px] text-[#F7F4EF]/60">Select co-authors</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {users
                .filter((u) => u.id !== currentUser.id)
                .map((user) => {
                  const isSelected = selectedCoAuthorIds.includes(user.id);
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => toggleCoAuthor(user.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#E7C77A] text-[#101014] font-semibold border-[#E7C77A]'
                          : 'bg-[#101014] text-[#F7F4EF]/70 border-[#7650C8]/40 hover:text-white'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{user.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
            </div>

            {selectedCoAuthorIds.length > 0 && (
              <input
                type="text"
                placeholder="Collaboration project title (e.g., Pillars of Creation)"
                value={collaborationTitle}
                onChange={(e) => setCollaborationTitle(e.target.value)}
                className="w-full mt-2 bg-[#101014]/80 border border-[#E7C77A]/40 rounded-xl px-3 py-1.5 text-xs text-[#F7F4EF] focus:outline-none"
              />
            )}
          </div>

          {/* Media Attachment & Celestial Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#F7F4EF]/80 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-[#E7C77A]" />
              Attach Celestial Media
            </label>

            <div className="grid grid-cols-2 gap-2">
              {CELESTIAL_MEDIA_PRESETS.map((preset) => (
                <div
                  key={preset.name}
                  onClick={() => {
                    setMediaUrl(preset.url);
                    setSelectedPreset(preset.name);
                  }}
                  className={`relative h-16 rounded-xl overflow-hidden cursor-pointer border transition-all ${
                    mediaUrl === preset.url
                      ? 'border-[#E7C77A] ring-2 ring-[#E7C77A]/50'
                      : 'border-[#7650C8]/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1 text-center">
                    <span className="text-[10px] font-tech text-white font-medium">
                      {preset.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <input
              type="url"
              placeholder="Or paste custom celestial image URL..."
              value={mediaUrl}
              onChange={(e) => {
                setMediaUrl(e.target.value);
                setSelectedPreset(null);
              }}
              className="w-full bg-[#101014]/60 border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold text-[#F7F4EF]/80">
              Cosmic Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="RoyalGalaxy, Astrophotography, DeepThoughts"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full mt-1 bg-[#101014]/60 border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
            />
          </div>

          {/* Publishing actions */}
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-[11px] text-[#E7C77A]/80 font-mono">
              Signed with Sovereign Key #RVX-2026
            </span>

            <button
              type="submit"
              disabled={!content.trim() && !mediaUrl}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B38938] via-[#E7C77A] to-[#FFF4D0] text-[#101014] font-royal font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(231,199,122,0.35)] hover:shadow-[0_0_25px_rgba(231,199,122,0.6)] disabled:opacity-50 transition-all cursor-pointer"
            >
              Broadcast Transmission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
