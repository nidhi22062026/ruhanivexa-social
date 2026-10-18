import React from 'react';
import { ShieldCheck, MessageSquare, Lock, Sparkles, CheckCheck } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

export const InboxList: React.FC = () => {
  const { conversations, setActiveChatId } = useUniverse();

  return (
    <div className="w-full p-4 sm:p-5 space-y-4">
      {/* Privacy & Encryption Assurance Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-[#291536] to-[#15111d] border border-[#7650C8]/40 shadow-lg flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#E7C77A]/20 border border-[#E7C77A]/50 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#E7C77A]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-royal font-bold text-xs text-[#E7C77A] uppercase tracking-wider">
              Quantum Comms & Screenshot Transparency
            </h3>
            <span className="text-[10px] bg-[#7650C8]/40 text-[#F7F4EF] px-2 py-0.5 rounded-full font-mono">
              E2EE Active
            </span>
          </div>
          <p className="text-xs text-[#F7F4EF]/75 mt-0.5 leading-relaxed">
            All private transmissions are locally encrypted. Participant screenshot alerts are broadcasted on supported devices. Disappearing media dissolves with zero residual storage.
          </p>
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        <h4 className="font-royal text-xs text-[#F7F4EF]/60 uppercase tracking-widest px-1">
          Active Transmissions ({conversations.length})
        </h4>

        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setActiveChatId(conv.id)}
            className="p-3.5 rounded-2xl bg-[#15111d] border border-[#7650C8]/25 hover:border-[#E7C77A]/50 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={conv.participant.avatar}
                  alt={conv.participant.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#7650C8] group-hover:ring-[#E7C77A] transition-all"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#101014]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-royal font-bold text-sm text-[#F7F4EF]">
                    {conv.participant.name}
                  </h4>
                  {conv.isEncrypted && (
                    <span title="Quantum Encrypted">
                      <Lock className="w-3 h-3 text-[#E7C77A]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#F7F4EF]/70 line-clamp-1 max-w-[200px] sm:max-w-xs mt-0.5 font-sans">
                  {conv.lastMessage}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-[10px] text-[#E7C77A] font-mono">
                {conv.lastMessageTime}
              </span>
              {conv.unreadCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#E7C77A] text-[#101014] text-[10px] font-bold flex items-center justify-center shadow-md">
                  {conv.unreadCount}
                </span>
              ) : (
                <CheckCheck className="w-4 h-4 text-[#7650C8]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
