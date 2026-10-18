import React, { useState } from 'react';
import { X, Sparkles, Plus, Users, Send, Palette, Layers, RefreshCw, Pin } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

interface CanvasPin {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

export const CollaborativeSpaceModal: React.FC = () => {
  const { colabSpaceModal, setColabSpaceModal, currentUser } = useUniverse();

  const [pins, setPins] = useState<CanvasPin[]>([
    {
      id: 'pin_1',
      authorName: 'Lyra Sterling',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      text: 'Resonance harmonic at 432Hz locked to core nebula layer.',
      x: 35,
      y: 30,
      color: '#E7C77A',
    },
    {
      id: 'pin_2',
      authorName: 'Mira Solaria',
      authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      text: 'Adding ultraviolet gradient filter for dynamic coronal emission.',
      x: 65,
      y: 55,
      color: '#9A72F6',
    },
  ]);

  const [newPinText, setNewPinText] = useState('');

  if (!colabSpaceModal) return null;

  const handleAddPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinText.trim()) return;

    const newPin: CanvasPin = {
      id: `pin_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      text: newPinText.trim(),
      x: Math.floor(Math.random() * 60 + 20),
      y: Math.floor(Math.random() * 50 + 25),
      color: '#E7C77A',
    };

    setPins([...pins, newPin]);
    setNewPinText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#15111d] border border-[#E7C77A]/40 shadow-[0_0_60px_rgba(231,199,122,0.25)] flex flex-col h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-[#7650C8]/25 flex items-center justify-between bg-[#101014]/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E7C77A] text-[#101014] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-royal font-bold text-sm text-[#F7F4EF]">
                {colabSpaceModal.title}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-[#E7C77A] font-tech">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Stargaze Sync Active</span>
                <span>•</span>
                <span>{pins.length} active ideas</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active stargazers */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#291536] px-3 py-1 rounded-full border border-[#7650C8]/40">
              <Users className="w-3.5 h-3.5 text-[#E7C77A]" />
              <div className="flex -space-x-1.5">
                {colabSpaceModal.collaborators.map((c) => (
                  <img
                    key={c.id}
                    src={c.avatar}
                    alt={c.name}
                    className="w-5 h-5 rounded-full object-cover border border-[#101014]"
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setColabSpaceModal(null)}
              className="p-1.5 rounded-full text-[#F7F4EF]/60 hover:text-white hover:bg-[#291536] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Stargaze Visual Canvas Area */}
        <div className="relative flex-1 bg-[#101014] overflow-hidden select-none border-b border-[#7650C8]/30">
          {/* Background Canvas Base Image */}
          <img
            src={colabSpaceModal.canvasPreviewUrl}
            alt="Colab Canvas"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #E7C77A 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Interactive Stargaze Pins */}
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {/* Pulsing Pin Marker */}
              <div
                className="w-8 h-8 rounded-full border-2 border-[#101014] flex items-center justify-center shadow-lg transition-transform group-hover:scale-125"
                style={{ backgroundColor: pin.color }}
              >
                <Pin className="w-4 h-4 text-[#101014] -rotate-45" />
              </div>

              {/* Pin tooltip text */}
              <div className="absolute left-10 -top-3 w-52 p-2.5 rounded-xl bg-[#15111d]/95 border border-[#E7C77A]/40 text-xs text-[#F7F4EF] shadow-2xl backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity z-20">
                <div className="flex items-center gap-1.5 mb-1">
                  <img
                    src={pin.authorAvatar}
                    alt={pin.authorName}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className="font-royal font-semibold text-[11px] text-[#E7C77A]">
                    {pin.authorName}
                  </span>
                </div>
                <p className="leading-snug text-[11px] text-[#F7F4EF]/90">
                  {pin.text}
                </p>
              </div>
            </div>
          ))}

          {/* Canvas Helper Pill */}
          <div className="absolute bottom-3 left-3 bg-[#101014]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-[#F7F4EF]/70 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E7C77A]" />
            <span>Click to interact with shared constellation nodes</span>
          </div>
        </div>

        {/* Bottom Contribution Input */}
        <form onSubmit={handleAddPin} className="p-3.5 bg-[#15111d] flex items-center gap-3">
          <input
            type="text"
            value={newPinText}
            onChange={(e) => setNewPinText(e.target.value)}
            placeholder="Add an observation, prompt seed, or starlight note to this canvas..."
            className="flex-1 bg-[#101014] border border-[#7650C8]/40 rounded-full px-4 py-2.5 text-xs text-[#F7F4EF] placeholder:text-[#F7F4EF]/40 focus:outline-none focus:border-[#E7C77A]"
          />
          <button
            type="submit"
            disabled={!newPinText.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#E7C77A] text-[#101014] text-xs font-royal font-bold uppercase disabled:opacity-40 hover:bg-[#FFF4D0] transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Attach Node</span>
          </button>
        </form>
      </div>
    </div>
  );
};
