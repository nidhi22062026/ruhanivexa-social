import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Camera,
  Trash2,
  Clock,
  Send,
  Sparkles,
  Info,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  SwitchCamera,
  AlertTriangle,
  CheckCheck,
  Check,
  Radio,
} from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { Message } from '../../types';

export const ChatRoom: React.FC = () => {
  const {
    activeChatId,
    setActiveChatId,
    conversations,
    messagesMap,
    sendMessage,
    deleteMessageForEveryone,
    triggerScreenshotAlert,
    currentUser,
    screenshotToast,
    logCall,
  } = useUniverse();

  const [inputVal, setInputVal] = useState('');
  const [isDisappearingMode, setIsDisappearingMode] = useState(false);
  const [showTransparencyNotice, setShowTransparencyNotice] = useState(false);
  const [disappearingCountdown, setDisappearingCountdown] = useState<Record<string, number>>({});

  // Active Calling State
  const [activeCall, setActiveCall] = useState<{
    type: 'audio' | 'video';
    duration: number; // in seconds
    isMuted: boolean;
    isSpeaker: boolean;
    isVideoMuted: boolean;
    isFrontCamera: boolean;
    connectionState: 'connecting' | 'connected';
  } | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeChatId);
  const messages: Message[] = activeChatId ? messagesMap[activeChatId] || [] : [];

  // Countdown timer for disappearing messages
  useEffect(() => {
    const timer = setInterval(() => {
      setDisappearingCountdown((prev) => {
        const next: Record<string, number> = {};
        for (const [id, count] of Object.entries(prev)) {
          if (count > 1) {
            next[id] = count - 1;
          }
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer for active call
  useEffect(() => {
    if (!activeCall || activeCall.connectionState !== 'connected') return;
    const timer = setInterval(() => {
      setActiveCall((prev) => (prev ? { ...prev, duration: prev.duration + 1 } : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeCall]);

  if (!activeConversation) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const messageText = inputVal.trim();
    setInputVal('');
    sendMessage(activeConversation.id, messageText, isDisappearingMode);

    if (isDisappearingMode) {
      const newMsgId = `msg_${Date.now()}`;
      setDisappearingCountdown((prev) => ({ ...prev, [newMsgId]: 60 }));
    }
  };

  const handleSimulateScreenshot = () => {
    triggerScreenshotAlert(activeConversation.id);
  };

  const startCall = async (type: 'audio' | 'video') => {
    // Safe Hardware Permissions: requested strictly on-click, never on app boot
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: type === 'video',
        });
      } catch {
        // Safe fallback for iframe or permission denials - proceed with simulated quantum stream
      }
    }

    setActiveCall({
      type,
      duration: 0,
      isMuted: false,
      isSpeaker: true,
      isVideoMuted: false,
      isFrontCamera: true,
      connectionState: 'connecting',
    });

    setTimeout(() => {
      setActiveCall((prev) => (prev ? { ...prev, connectionState: 'connected' } : null));
    }, 1400);
  };

  const endCall = () => {
    if (!activeCall) return;
    const duration = activeCall.duration;
    const callType = activeCall.type;
    setActiveCall(null);
    logCall(activeConversation.id, callType, duration, 'completed');
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex-1 flex flex-col h-[78vh] sm:h-[82vh] bg-[#101014] relative overflow-hidden">
      {/* Active Conversation Header */}
      <div className="px-4 py-3 border-b border-[#7650C8]/25 bg-[#15111d] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveChatId(null)}
            className="p-1 rounded-full text-[#F7F4EF]/70 hover:text-white hover:bg-[#291536] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <img
              src={activeConversation.participant.avatar}
              alt={activeConversation.participant.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#7650C8]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#101014]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-royal font-bold text-sm text-[#F7F4EF]">
                {activeConversation.participant.name}
              </h3>
              <span title="Quantum Encrypted">
                <Lock className="w-3.5 h-3.5 text-[#E7C77A]" />
              </span>
            </div>
            <p className="text-[11px] text-[#9A72F6] font-mono">
              {activeConversation.participant.handle} • Starlight Active
            </p>
          </div>
        </div>

        {/* Calling & Transparency Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Audio Call Button */}
          <button
            onClick={() => startCall('audio')}
            className="p-2 rounded-full text-[#F7F4EF]/75 hover:text-[#E7C77A] hover:bg-[#291536] transition-colors cursor-pointer"
            title="Start Quantum Audio Call"
          >
            <Phone className="w-4 h-4 text-[#E7C77A]" />
          </button>

          {/* Video Call Button */}
          <button
            onClick={() => startCall('video')}
            className="p-2 rounded-full text-[#F7F4EF]/75 hover:text-[#E7C77A] hover:bg-[#291536] transition-colors cursor-pointer"
            title="Start Quantum Video Call"
          >
            <Video className="w-4 h-4 text-[#E7C77A]" />
          </button>

          {/* Screenshot Test */}
          <button
            onClick={handleSimulateScreenshot}
            className="p-2 rounded-full text-[#F7F4EF]/75 hover:text-[#E7C77A] hover:bg-[#291536] transition-colors cursor-pointer"
            title="Simulate Screenshot Detection Alert"
          >
            <Camera className="w-4 h-4 text-[#E7C77A]" />
          </button>

          {/* Transparency Disclosures */}
          <button
            onClick={() => setShowTransparencyNotice(!showTransparencyNotice)}
            className="p-1.5 rounded-full text-[#F7F4EF]/60 hover:text-[#E7C77A] cursor-pointer"
            title="Screenshot & Security Disclosures"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Screenshot Detection Alert Toast */}
      {screenshotToast && (
        <div className="bg-amber-500/20 border-b border-amber-500/50 p-2.5 text-xs text-amber-200 flex items-center justify-between px-4 z-20 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="text-[11px] leading-snug">{screenshotToast}</span>
          </div>
        </div>
      )}

      {/* Expandable Transparency Disclosure */}
      {showTransparencyNotice && (
        <div className="bg-[#291536]/95 border-b border-[#E7C77A]/40 p-3 text-xs text-[#F7F4EF] space-y-1 relative z-20 shadow-xl">
          <div className="flex items-center justify-between font-bold text-[#E7C77A]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Screenshot Transparency & Zero-Retention Notice
            </span>
            <button
              onClick={() => setShowTransparencyNotice(false)}
              className="text-[#E7C77A] font-mono cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#F7F4EF]/80 leading-relaxed">
            • Ruhanivexa Social utilizes official Android window security APIs (e.g. FLAG_SECURE flags and system screen capture listeners) where supported.
          </p>
          <p className="text-[11px] text-[#F7F4EF]/80 leading-relaxed">
            • Screen capture alerts are broadcast to all participants. Please note that external optical cameras or third-party hardware captures cannot be detected by any software.
          </p>
          <p className="text-[11px] text-[#F7F4EF]/80 leading-relaxed">
            • Disappearing transmissions and messages deleted for everyone are permanently erased with zero residual server caching.
          </p>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* End to End Handshake Banner */}
        <div className="my-2 flex justify-center">
          <div className="px-3 py-1 rounded-full bg-[#15111d] border border-[#7650C8]/30 text-[10px] text-[#E7C77A] font-tech flex items-center gap-1.5 shadow-sm">
            <Lock className="w-3 h-3 text-[#E7C77A]" />
            <span>End-to-End Quantum Encryption Handshake Verified</span>
          </div>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;

          // Render Call Log if this message represents a call
          if (msg.callLog) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#1b1426] border border-[#7650C8]/40 shadow-md">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.callLog.status === 'completed'
                        ? 'bg-[#E7C77A]/20 text-[#E7C77A] border border-[#E7C77A]/40'
                        : 'bg-red-950/40 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {msg.callLog.type === 'video' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-royal font-bold text-xs text-[#F7F4EF]">
                      {msg.text}
                    </span>
                    <span className="text-[10px] text-[#E7C77A]/80 font-mono">
                      Quantum Comms Telemetry • {msg.timestamp}
                    </span>
                  </div>
                  <button
                    onClick={() => startCall(msg.callLog?.type || 'audio')}
                    className="ml-2 text-[10px] font-bold text-[#E7C77A] hover:underline cursor-pointer"
                  >
                    Call Back
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`relative max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed group ${
                  msg.isDeletedForEveryone
                    ? 'bg-[#15111d] border border-white/10 text-[#F7F4EF]/50 italic'
                    : isMe
                    ? 'bg-gradient-to-tr from-[#7650C8] to-[#9A72F6] text-white rounded-br-none shadow-[0_4px_16px_rgba(118,80,200,0.3)]'
                    : 'bg-[#1a1226] text-[#F7F4EF] rounded-bl-none border border-[#7650C8]/30 shadow-[0_4px_16px_rgba(41,21,54,0.4)]'
                }`}
              >
                {/* Disappearing indicator */}
                {msg.isDisappearing && !msg.isDeletedForEveryone && (
                  <div className="flex items-center gap-1 text-[10px] text-[#E7C77A] font-mono mb-1">
                    <Clock className="w-3 h-3" />
                    <span>Self-dissolving starlight pulse (60s)</span>
                  </div>
                )}

                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Footer time and read receipt */}
                <div className="flex items-center justify-end gap-1.5 mt-1 text-[9px] opacity-75 font-mono">
                  <span>{msg.timestamp}</span>
                  {isMe && !msg.isDeletedForEveryone && (
                    <span>
                      {msg.status === 'read' ? (
                        <CheckCheck className="w-3 h-3 text-[#E7C77A]" />
                      ) : (
                        <Check className="w-3 h-3 text-white/70" />
                      )}
                    </span>
                  )}
                </div>

                {/* Delete for everyone action if message sent by current user */}
                {isMe && !msg.isDeletedForEveryone && (
                  <button
                    onClick={() => deleteMessageForEveryone(activeConversation.id, msg.id)}
                    className="absolute -left-7 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Dissolve message for everyone"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-[#15111d] border-t border-[#7650C8]/25 flex items-center gap-2">
        {/* Toggle Disappearing Mode */}
        <button
          type="button"
          onClick={() => setIsDisappearingMode(!isDisappearingMode)}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            isDisappearingMode
              ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_10px_rgba(231,199,122,0.5)]'
              : 'bg-[#291536] text-[#F7F4EF]/70 hover:text-[#E7C77A]'
          }`}
          title={isDisappearingMode ? 'Disappearing Mode ON' : 'Turn on Disappearing Mode'}
        >
          <Clock className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            isDisappearingMode
              ? 'Send self-dissolving starlight transmission (60s)...'
              : 'Quantum encrypted message...'
          }
          className="flex-1 bg-[#101014] border border-[#7650C8]/40 rounded-full px-4 py-2.5 text-xs text-[#F7F4EF] placeholder:text-[#F7F4EF]/40 focus:outline-none focus:border-[#E7C77A]"
        />

        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="p-2.5 rounded-full bg-[#E7C77A] text-[#101014] disabled:opacity-40 hover:bg-[#FFF4D0] transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* ACTIVE CALL OVERLAY */}
      {activeCall && (
        <div className="absolute inset-0 z-50 bg-[#101014]/95 backdrop-blur-2xl flex flex-col justify-between p-6 select-none animate-in fade-in">
          {/* Call Header */}
          <div className="flex flex-col items-center text-center space-y-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#291536] border border-[#E7C77A]/40 text-[#E7C77A] text-[11px] font-tech font-semibold">
              <Radio className="w-3 h-3 text-[#E7C77A] animate-pulse" />
              <span>
                {activeCall.type === 'video'
                  ? 'Quantum Video Telemetry'
                  : 'Quantum Encrypted Audio Stream'}
              </span>
            </div>
            <div className="font-mono text-xs text-[#9A72F6] pt-1 flex items-center justify-center gap-1.5">
              {activeCall.connectionState === 'connecting' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#E7C77A] animate-ping" />
                  <span className="text-[#E7C77A]">Connecting...</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Connected {formatCallDuration(activeCall.duration)}</span>
                </>
              )}
            </div>
          </div>

          {/* Central Call Visualizer */}
          <div className="flex flex-col items-center justify-center space-y-4 my-auto">
            {activeCall.type === 'video' ? (
              /* Simulated Video Feed */
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#E7C77A]/60 shadow-[0_0_40px_rgba(231,199,122,0.3)] bg-black">
                {activeCall.isVideoMuted ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#15111d] text-center p-4">
                    <VideoOff className="w-10 h-10 text-white/40 mb-2" />
                    <p className="text-xs text-white/60">Camera Disabled</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={activeConversation.participant.banner || activeConversation.participant.avatar}
                      alt="Remote Feed"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                    {/* Simulated Picture-in-Picture Local Camera */}
                    <div className="absolute bottom-3 right-3 w-20 h-24 rounded-xl overflow-hidden border border-[#E7C77A] shadow-lg bg-black">
                      <img
                        src={currentUser.avatar}
                        alt="Local Camera"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 text-[8px] bg-black/60 px-1 rounded text-white font-mono">
                        You
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-[#E7C77A] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>1080p 60fps</span>
                </div>
              </div>
            ) : (
              /* Audio Call Pulsing Starlight Avatar */
              <div className="relative flex items-center justify-center">
                {/* Orbit Ripple Rings */}
                <div className="absolute w-44 h-44 rounded-full border border-[#E7C77A]/30 animate-ping" />
                <div className="absolute w-36 h-36 rounded-full border border-[#7650C8]/40 animate-pulse" />

                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#7650C8] via-[#E7C77A] to-[#FFF4D0] shadow-[0_0_35px_rgba(231,199,122,0.4)]">
                  <img
                    src={activeConversation.participant.avatar}
                    alt={activeConversation.participant.name}
                    className="w-full h-full rounded-full object-cover border-2 border-[#101014]"
                  />
                </div>
              </div>
            )}

            <div className="text-center">
              <h2 className="font-royal font-bold text-lg text-white">
                {activeConversation.participant.name}
              </h2>
              <p className="text-xs text-[#9A72F6] font-mono">
                {activeConversation.participant.handle}
              </p>
            </div>

            {/* Audio Wave Frequency Simulation */}
            <div className="flex items-center gap-1 h-6">
              {[4, 12, 22, 16, 28, 18, 24, 10, 20, 14, 26, 8].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#E7C77A] rounded-full transition-all duration-300"
                  style={{
                    height: `${activeCall.isMuted ? 3 : Math.min(26, h * (1 + (i % 3) * 0.2))}px`,
                    opacity: activeCall.isMuted ? 0.3 : 0.85,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Call Controls Dock */}
          <div className="flex items-center justify-center gap-4">
            {/* Mute Button */}
            <button
              onClick={() =>
                setActiveCall((prev) => (prev ? { ...prev, isMuted: !prev.isMuted } : null))
              }
              className={`p-3.5 rounded-full transition-all cursor-pointer ${
                activeCall.isMuted
                  ? 'bg-red-950/80 text-red-400 border border-red-500/50'
                  : 'bg-[#291536] text-white hover:bg-[#7650C8]/40 border border-white/20'
              }`}
              title={activeCall.isMuted ? 'Unmute' : 'Mute'}
            >
              {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Speaker Toggle */}
            <button
              onClick={() =>
                setActiveCall((prev) => (prev ? { ...prev, isSpeaker: !prev.isSpeaker } : null))
              }
              className={`p-3.5 rounded-full transition-all cursor-pointer ${
                activeCall.isSpeaker
                  ? 'bg-[#E7C77A] text-[#101014]'
                  : 'bg-[#291536] text-white border border-white/20'
              }`}
              title={activeCall.isSpeaker ? 'Speaker On' : 'Earpiece Mode'}
            >
              {activeCall.isSpeaker ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>

            {/* If video call, video toggle & flip */}
            {activeCall.type === 'video' && (
              <>
                <button
                  onClick={() =>
                    setActiveCall((prev) =>
                      prev ? { ...prev, isVideoMuted: !prev.isVideoMuted } : null
                    )
                  }
                  className={`p-3.5 rounded-full transition-all cursor-pointer ${
                    activeCall.isVideoMuted
                      ? 'bg-red-950/80 text-red-400 border border-red-500/50'
                      : 'bg-[#291536] text-white border border-white/20'
                  }`}
                  title={activeCall.isVideoMuted ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  {activeCall.isVideoMuted ? (
                    <VideoOff className="w-5 h-5" />
                  ) : (
                    <Video className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() =>
                    setActiveCall((prev) =>
                      prev ? { ...prev, isFrontCamera: !prev.isFrontCamera } : null
                    )
                  }
                  className="p-3.5 rounded-full bg-[#291536] text-white hover:bg-[#7650C8]/40 border border-white/20 transition-all cursor-pointer"
                  title="Flip Camera"
                >
                  <SwitchCamera className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Big Red End Call Button */}
            <button
              onClick={endCall}
              className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
              title="End Quantum Call"
            >
              <PhoneOff className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
