import React from 'react';
import { Smartphone, Maximize2, Wifi, Battery, Sparkles } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const { isPhoneFramed, setIsPhoneFramed } = useUniverse();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative z-10 selection:bg-[#7650C8]/40 selection:text-[#E7C77A]">
      {/* Top Universal Control Bar (Visible especially on desktop to switch frame mode) */}
      <header className="w-full bg-[#101014]/90 backdrop-blur-md border-b border-[#7650C8]/25 py-2 px-4 flex items-center justify-between text-xs text-[#F7F4EF]/70 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E7C77A] animate-ping" />
          <span className="font-tech tracking-wider text-[#E7C77A] font-semibold">RUHANIVEXA SOCIAL</span>
          <span className="hidden sm:inline text-xs text-[#9A72F6] font-mono">v1.0 • ROYAL GALAXY EDITION</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#291536]/80 border border-[#7650C8]/30 text-[11px] text-[#E7C77A]">
            <Sparkles className="w-3 h-3 text-[#E7C77A]" />
            <span>Encrypted Quantum Sandbox Active</span>
          </div>

          <button
            onClick={() => setIsPhoneFramed(!isPhoneFramed)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#291536] hover:bg-[#7650C8]/30 border border-[#E7C77A]/40 text-[#F7F4EF] transition-all cursor-pointer font-medium text-[11px] shadow-[0_0_12px_rgba(231,199,122,0.15)]"
            title="Toggle between Mobile Android Phone View and Expansive Screen Layout"
          >
            {isPhoneFramed ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span className="hidden sm:inline">Expansive Layout</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#E7C77A]" />
                <span className="hidden sm:inline">Android Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex justify-center items-start p-0 sm:p-4 md:p-6">
        {isPhoneFramed ? (
          /* Android Phone Mockup Frame */
          <div className="relative w-full max-w-[420px] h-[92vh] max-h-[890px] rounded-[44px] bg-[#101014] border-[3px] border-[#E7C77A]/40 shadow-[0_0_50px_rgba(118,80,200,0.25),0_0_20px_rgba(231,199,122,0.2)] flex flex-col overflow-hidden ring-1 ring-[#7650C8]/50">
            {/* Android Status Bar */}
            <div className="h-7 w-full bg-[#101014] flex items-center justify-between px-6 text-[11px] font-mono text-[#F7F4EF]/80 select-none z-40 border-b border-white/5">
              <span>10:18</span>
              {/* Punch hole camera */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-[#7650C8]/40 shadow-inner" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#E7C77A]">5G</span>
                <Wifi className="w-3 h-3 text-[#F7F4EF]/80" />
                <Battery className="w-3.5 h-3.5 text-[#E7C77A]" />
              </div>
            </div>

            {/* Viewport Screen Content */}
            <div className="flex-1 flex flex-col overflow-y-auto relative bg-[#101014] pb-14">
              {children}
            </div>

            {/* Android Gesture Navigation Bar */}
            <div className="h-4 w-full bg-[#101014] flex items-center justify-center pointer-events-none absolute bottom-0 z-40">
              <div className="w-32 h-1 rounded-full bg-[#E7C77A]/40" />
            </div>
          </div>
        ) : (
          /* Expansive Viewport */
          <div className="w-full max-w-5xl rounded-2xl bg-[#101014]/90 border border-[#7650C8]/30 shadow-[0_0_40px_rgba(118,80,200,0.15)] flex flex-col overflow-hidden min-h-[85vh] relative pb-16">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
