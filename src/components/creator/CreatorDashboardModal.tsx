import React, { useState } from 'react';
import {
  Crown,
  Gem,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  Gift,
  CheckCircle,
  X,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUniverse } from '../../context/UniverseContext';

export const CreatorDashboardModal: React.FC = () => {
  const { currentUser, setActiveTab, setModerationToast } = useUniverse();
  const [selectedTier, setSelectedTier] = useState<string>('tier_sovereign');
  const [paymentNoticeOpen, setPaymentNoticeOpen] = useState(false);

  const tiers = [
    {
      id: 'tier_astral',
      name: 'Astral Observer',
      price: '$4.99 / mo',
      gemsPerMonth: 500,
      perks: [
        'Exclusive Astral badge on public profile',
        'Access to member-only orbit threads',
        'Early access to weekly celestial pulses',
      ],
      color: '#4FD1C5',
    },
    {
      id: 'tier_supernova',
      name: 'Supernova Luminary',
      price: '$14.99 / mo',
      gemsPerMonth: 2000,
      perks: [
        'All Astral perks included',
        'Co-author rights in Sovereign Orbital Spaces',
        'Custom nebula shader aura unlocked',
        '10 monthly high-res telemetry downloads',
      ],
      color: '#9A72F6',
    },
    {
      id: 'tier_sovereign',
      name: 'Royal Sovereign Member',
      price: '$39.99 / mo',
      gemsPerMonth: 6000,
      perks: [
        'All Supernova perks included',
        'Champagne Gold Sovereign orbital crown badge',
        'Direct encrypted transmission channel priority',
        'Host independent autonomous Orbits & Guilds',
        'Royal Galaxy revenue share participation (once enabled)',
      ],
      color: '#E7C77A',
    },
  ];

  const handleSimulateGift = (giftName: string) => {
    confetti({
      particleCount: 25,
      spread: 50,
      colors: ['#E7C77A', '#FFF4D0', '#7650C8'],
    });
    setModerationToast(
      `Sandbox Gift Triggered: Sent "${giftName}". Real billing is disabled until official store merchant credentials are configured.`
    );
    setTimeout(() => setModerationToast(null), 4000);
  };

  return (
    <div className="w-full p-4 sm:p-5 space-y-5">
      {/* Monetization Transparency Disclaimer */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-[#291536] to-[#15111d] border border-[#E7C77A]/40 shadow-xl flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E7C77A]/20 border border-[#E7C77A]/50 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-[#E7C77A]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-royal font-bold text-sm text-[#E7C77A] uppercase tracking-wider">
              Royal Starlight Club & Creator Architecture
            </h2>
            <span className="text-[10px] bg-[#E7C77A]/20 text-[#E7C77A] border border-[#E7C77A]/40 px-2 py-0.5 rounded-full font-mono font-semibold">
              Sandbox Architecture
            </span>
          </div>
          <p className="text-xs text-[#F7F4EF]/80 mt-1 leading-relaxed">
            In compliance with Google Play Store & Apple App Store developer policies, live payment collection is disabled in this prototype. Below is the production-ready membership and virtual gifting architecture.
          </p>
        </div>
      </div>

      {/* Creator Earnings & Gems Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 space-y-1">
          <span className="text-xs text-[#9A72F6] font-mono">Available Starlight Gems</span>
          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-[#E7C77A]" />
            <span className="font-royal font-bold text-2xl text-[#F7F4EF]">
              {currentUser.starlightGems.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-[#F7F4EF]/50">Est. value ~ ${(currentUser.starlightGems * 0.01).toFixed(2)} USD</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 space-y-1">
          <span className="text-xs text-[#9A72F6] font-mono">Active Supporters</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4FD1C5]" />
            <span className="font-royal font-bold text-2xl text-[#F7F4EF]">148</span>
          </div>
          <p className="text-[10px] text-[#F7F4EF]/50">Across 3 membership tiers</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 space-y-1">
          <span className="text-xs text-[#9A72F6] font-mono">Billing Verification</span>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#E7C77A]" />
            <span className="font-royal font-bold text-base text-[#E7C77A]">Ready to Link</span>
          </div>
          <p className="text-[10px] text-[#F7F4EF]/50">Google Play Billing 6.0 schema wired</p>
        </div>
      </div>

      {/* Membership Tiers Showcase */}
      <div className="space-y-3">
        <h3 className="font-royal font-bold text-sm text-[#F7F4EF] uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E7C77A]" />
          Creator Membership Tiers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`p-4 rounded-2xl bg-[#15111d] border transition-all cursor-pointer flex flex-col justify-between ${
                selectedTier === tier.id
                  ? 'border-[#E7C77A] ring-1 ring-[#E7C77A] bg-[#291536]/50 shadow-[0_0_20px_rgba(231,199,122,0.2)]'
                  : 'border-[#7650C8]/30 hover:border-[#E7C77A]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span className="text-[11px] font-mono text-[#E7C77A]">
                    +{tier.gemsPerMonth} Gems
                  </span>
                </div>

                <h4 className="font-royal font-bold text-base text-[#F7F4EF]">
                  {tier.name}
                </h4>
                <p className="text-sm font-tech font-bold text-[#E7C77A] mt-0.5">
                  {tier.price}
                </p>

                <ul className="mt-3 space-y-1.5 text-xs text-[#F7F4EF]/80">
                  {tier.perks.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <CheckCircle className="w-3 h-3 text-[#E7C77A] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setPaymentNoticeOpen(true)}
                className="mt-4 w-full py-2 rounded-xl bg-[#291536] hover:bg-[#7650C8]/40 border border-[#E7C77A]/40 text-xs text-[#E7C77A] font-semibold transition-colors cursor-pointer"
              >
                Inspect Tier Architecture
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Celestial Gifting Sandbox */}
      <div className="p-4 rounded-3xl bg-[#15111d] border border-[#7650C8]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#E7C77A]" />
            <h3 className="font-royal font-bold text-sm text-[#F7F4EF] uppercase tracking-wider">
              Virtual Celestial Gifts
            </h3>
          </div>
          <span className="text-[10px] text-[#9A72F6] font-mono">Demo interactive gifting</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Starlight Spark', cost: '50 Gems', icon: '✨' },
            { name: 'Supernova Flare', cost: '250 Gems', icon: '🌌' },
            { name: 'Sovereign Crown', cost: '1,000 Gems', icon: '👑' },
          ].map((gift) => (
            <button
              key={gift.name}
              onClick={() => handleSimulateGift(gift.name)}
              className="p-3 rounded-2xl bg-[#101014] border border-[#7650C8]/30 hover:border-[#E7C77A] transition-all flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">{gift.icon}</span>
              <span className="font-royal text-xs font-semibold text-[#F7F4EF]">{gift.name}</span>
              <span className="text-[10px] font-mono text-[#E7C77A]">{gift.cost}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Security Disclosure Modal */}
      {paymentNoticeOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#15111d] border border-[#E7C77A]/50 p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-royal font-bold text-sm text-[#E7C77A] uppercase">
                Billing & Policy Safeguards
              </h4>
              <button
                onClick={() => setPaymentNoticeOpen(false)}
                className="text-[#F7F4EF]/70 hover:text-white cursor-pointer font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#F7F4EF]/85 leading-relaxed">
              Real transactions require binding Google Play Developer Console / App Store Connect credentials, setting up merchant tax configurations, and integrating backend webhook signature validation.
            </p>
            <p className="text-xs text-[#E7C77A] font-semibold">
              No real card will be charged in this prototype session.
            </p>
            <button
              onClick={() => setPaymentNoticeOpen(false)}
              className="w-full py-2 rounded-xl bg-[#E7C77A] text-[#101014] text-xs font-royal font-bold uppercase cursor-pointer"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
