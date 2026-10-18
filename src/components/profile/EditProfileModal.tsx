import React, { useState } from 'react';
import { X, Sparkles, Globe, Palette } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

interface EditProfileModalProps {
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const { currentUser, updateCurrentUser } = useUniverse();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [banner, setBanner] = useState(currentUser.banner);
  const [celestialAura, setCelestialAura] = useState(currentUser.celestialAura);
  const [worldTitle, setWorldTitle] = useState(currentUser.digitalWorld.title);
  const [worldDesc, setWorldDesc] = useState(currentUser.digitalWorld.description);
  const [coreElement, setCoreElement] = useState(currentUser.digitalWorld.coreElement);
  const [nebulaDensity, setNebulaDensity] = useState(currentUser.digitalWorld.nebulaDensity);
  const [interestsStr, setInterestsStr] = useState(currentUser.interests.join(', '));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedInterests = interestsStr
      .split(',')
      .map((i) => i.trim().replace(/^#/, ''))
      .filter(Boolean);

    updateCurrentUser({
      name: name.trim() || currentUser.name,
      bio: bio.trim(),
      avatar: avatar.trim() || currentUser.avatar,
      banner: banner.trim() || currentUser.banner,
      celestialAura,
      interests: parsedInterests.length > 0 ? parsedInterests : currentUser.interests,
      digitalWorld: {
        ...currentUser.digitalWorld,
        title: worldTitle.trim() || currentUser.digitalWorld.title,
        description: worldDesc.trim() || currentUser.digitalWorld.description,
        coreElement: coreElement.trim() || currentUser.digitalWorld.coreElement,
        nebulaDensity,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#15111d] border border-[#E7C77A]/40 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#7650C8]/25 flex items-center justify-between bg-[#101014]/60">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#E7C77A]" />
            <h2 className="font-royal font-bold text-sm text-[#F7F4EF] tracking-wider uppercase">
              Configure Living Universe World
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#F7F4EF]/60 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Identity */}
          <div className="space-y-3">
            <h3 className="font-royal font-semibold text-xs text-[#E7C77A] uppercase tracking-wider">
              1. Sovereign Identity
            </h3>

            <div>
              <label className="text-xs text-[#F7F4EF]/80 font-medium">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 bg-[#101014] border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                required
              />
            </div>

            <div>
              <label className="text-xs text-[#F7F4EF]/80 font-medium">Cosmic Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="w-full mt-1 bg-[#101014] border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] resize-none"
              />
            </div>
          </div>

          {/* Celestial Aura Selection */}
          <div className="space-y-2">
            <label className="text-xs text-[#F7F4EF]/80 font-medium">
              Celestial Aura Spectrum
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'supernova', label: 'Supernova Violet', color: '#7650C8' },
                { id: 'solargold', label: 'Solar Gold', color: '#E7C77A' },
                { id: 'astralcyan', label: 'Astral Cyan', color: '#4FD1C5' },
                { id: 'voidvelvet', label: 'Void Velvet', color: '#9A72F6' },
                { id: 'nebulabloom', label: 'Nebula Bloom', color: '#F472B6' },
              ].map((aura) => (
                <button
                  key={aura.id}
                  type="button"
                  onClick={() => setCelestialAura(aura.id as any)}
                  className={`p-2 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    celestialAura === aura.id
                      ? 'border-[#E7C77A] bg-[#291536] text-[#E7C77A] ring-1 ring-[#E7C77A]'
                      : 'border-[#7650C8]/30 bg-[#101014] text-[#F7F4EF]/70 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: aura.color }}
                  />
                  <span className="truncate">{aura.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Digital World Customization */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <h3 className="font-royal font-semibold text-xs text-[#E7C77A] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              2. Digital World Realm
            </h3>

            <div>
              <label className="text-xs text-[#F7F4EF]/80 font-medium">World Title</label>
              <input
                type="text"
                value={worldTitle}
                onChange={(e) => setWorldTitle(e.target.value)}
                className="w-full mt-1 bg-[#101014] border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
              />
            </div>

            <div>
              <label className="text-xs text-[#F7F4EF]/80 font-medium">World Realm Description</label>
              <textarea
                value={worldDesc}
                onChange={(e) => setWorldDesc(e.target.value)}
                rows={2}
                className="w-full mt-1 bg-[#101014] border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">Core Element</label>
                <input
                  type="text"
                  value={coreElement}
                  onChange={(e) => setCoreElement(e.target.value)}
                  className="w-full mt-1 bg-[#101014] border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                />
              </div>

              <div>
                <label className="text-xs text-[#F7F4EF]/80 font-medium">
                  Nebula Density ({nebulaDensity}%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={nebulaDensity}
                  onChange={(e) => setNebulaDensity(Number(e.target.value))}
                  className="w-full mt-2 accent-[#E7C77A] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="pt-2 border-t border-white/5">
            <label className="text-xs text-[#F7F4EF]/80 font-medium">
              Interests & Tags (comma separated)
            </label>
            <input
              type="text"
              value={interestsStr}
              onChange={(e) => setInterestsStr(e.target.value)}
              className="w-full mt-1 bg-[#101014] border border-[#7650C8]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
            />
          </div>

          {/* Save button */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs text-[#F7F4EF]/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#E7C77A] text-[#101014] font-royal font-bold text-xs uppercase tracking-wider hover:bg-[#FFF4D0] transition-colors cursor-pointer"
            >
              Save Starlight World
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
