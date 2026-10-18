import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  ArrowRight,
  CreditCard,
  QrCode,
  FileText,
  AlertCircle,
  Copy,
  ChevronRight,
  TrendingUp,
  Receipt,
  X,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUniverse } from '../../context/UniverseContext';
import { BrandCampaignOffer } from '../../types';

export const BrandPartnershipsHub: React.FC = () => {
  const {
    currentUser,
    brandOffers,
    submitBrandOffer,
    updateBrandOfferStatus,
    payoutWallet,
    updatePayoutWallet,
    setModerationToast,
  } = useUniverse();

  const [activeTab, setActiveTab] = useState<'offers' | 'wallet' | 'new_proposal'>('offers');

  // Wallet form state
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'bank_transfer'>(
    payoutWallet.payoutMethod === 'bank_transfer' ? 'bank_transfer' : 'upi'
  );
  const [upiId, setUpiId] = useState(payoutWallet.upiId || 'creator@oksbi');
  const [accountHolderName, setAccountHolderName] = useState(
    payoutWallet.accountHolderName || currentUser.name || 'Aria Vance'
  );
  const [bankAccountNumber, setBankAccountNumber] = useState(
    payoutWallet.bankAccountNumber || '•••• •••• 4829'
  );
  const [bankName, setBankName] = useState('State Bank of India / HDFC');
  const [ifscCode, setIfscCode] = useState(
    payoutWallet.ifscOrRoutingNumber || 'SBIN0001842'
  );
  const [walletSavedToast, setWalletSavedToast] = useState<string | null>(null);

  // New campaign proposal form state
  const [proposalBrandName, setProposalBrandName] = useState('');
  const [proposalBrandEmail, setProposalBrandEmail] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalBrief, setProposalBrief] = useState('');
  const [proposalDeliverables, setProposalDeliverables] = useState(
    '1 Starlight Reel + 1 Co-Lab Transmission'
  );
  const [proposalCurrency, setProposalCurrency] = useState<'INR' | 'USD'>('INR');
  const [proposalBudget, setProposalBudget] = useState('50000');
  const [proposalTimeline, setProposalTimeline] = useState('14');
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Payout disbursement state
  const [clearedBalance, setClearedBalance] = useState<number>(129500); // in INR
  const [disbursementModal, setDisbursementModal] = useState<{
    txnId: string;
    amount: number;
    destination: string;
  } | null>(null);

  // Handle saving wallet details
  const handleSaveWallet = (e: React.FormEvent) => {
    e.preventDefault();
    updatePayoutWallet({
      payoutMethod,
      upiId,
      accountHolderName,
      bankAccountNumber,
      ifscOrRoutingNumber: ifscCode,
      isVerified: true,
    });
    setWalletSavedToast('Payout credentials secured & verified via Sovereign Payout Gateway.');
    setTimeout(() => setWalletSavedToast(null), 3500);
  };

  // Handle requesting a disbursement
  const handleRequestDisbursement = () => {
    if (clearedBalance <= 0) return;

    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#E7C77A', '#FFF4D0', '#7650C8', '#4FD1C5'],
    });

    const destination =
      payoutMethod === 'upi' ? `UPI VPA: ${upiId}` : `Bank Acc: ${bankAccountNumber} (${ifscCode})`;

    const txnId = `TXN_RUHANI_${Math.floor(100000 + Math.random() * 900000)}`;

    setDisbursementModal({
      txnId,
      amount: clearedBalance,
      destination,
    });

    setClearedBalance(0);
  };

  // Handle submitting new campaign proposal
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalBrandName || !proposalTitle || !proposalBrief) return;

    submitBrandOffer({
      brandName: proposalBrandName,
      brandEmail: proposalBrandEmail || `${proposalBrandName.toLowerCase().replace(/\s+/g, '')}@partnerships.cosmos`,
      creatorId: currentUser.id,
      campaignTitle: proposalTitle,
      brief: proposalBrief,
      deliverables: proposalDeliverables,
      budgetCurrency: proposalCurrency,
      budgetAmount: parseFloat(proposalBudget) || 25000,
      timelineDays: parseInt(proposalTimeline, 10) || 14,
    });

    setProposalSubmitted(true);
    confetti({
      particleCount: 30,
      spread: 50,
      colors: ['#E7C77A', '#4FD1C5'],
    });

    setTimeout(() => {
      setProposalSubmitted(false);
      setActiveTab('offers');
      setProposalBrandName('');
      setProposalTitle('');
      setProposalBrief('');
    }, 1800);
  };

  // Calculate stats
  const activeOffersCount = brandOffers.filter((o) => o.status !== 'declined').length;
  const lockedEscrowINR = brandOffers
    .filter((o) => o.status === 'accepted')
    .reduce((acc, o) => acc + (o.budgetCurrency === 'INR' ? o.budgetAmount : o.budgetAmount * 83), 0);

  return (
    <div className="w-full space-y-4 text-[#F7F4EF] animate-in fade-in">
      {/* Store Compliance & Exemption Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#291536] via-[#1b1426] to-[#15111d] border border-[#E7C77A]/40 shadow-xl space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E7C77A]/20 border border-[#E7C77A]/50 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[#E7C77A]" />
            </div>
            <div>
              <h2 className="font-royal font-bold text-sm text-[#E7C77A] uppercase tracking-wide">
                Brand Partnerships & Collabs Hub
              </h2>
              <p className="text-[11px] text-[#9A72F6] font-mono">
                Direct Brand Endorsements & Creator Payout Infrastructure
              </p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-[#101014] text-[10px] text-[#E7C77A] border border-[#E7C77A]/30 font-tech font-bold uppercase">
            Play Billing Exempt • Physical Services
          </span>
        </div>

        <p className="text-xs text-[#F7F4EF]/80 leading-relaxed font-sans">
          Under Google Play Store and Apple App Store developer policies, direct brand marketing contracts, sponsored integrations, and physical promotional services are categorized as physical/marketing deliverables and are 100% exempt from digital in-app purchase commissions.
        </p>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-3 gap-2.5 font-mono text-center">
        <div className="p-3 rounded-2xl bg-[#15111d] border border-[#7650C8]/30">
          <span className="text-[10px] text-[#9A72F6] block font-sans">Campaign Offers</span>
          <span className="text-lg font-bold text-[#F7F4EF]">{activeOffersCount}</span>
          <span className="text-[9px] text-[#E7C77A] block">100% Direct</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#15111d] border border-[#7650C8]/30">
          <span className="text-[10px] text-[#9A72F6] block font-sans">In Escrow Lock</span>
          <span className="text-lg font-bold text-[#E7C77A]">
            ₹{lockedEscrowINR.toLocaleString()}
          </span>
          <span className="text-[9px] text-emerald-400 block">Milestone Protected</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#15111d] border border-[#7650C8]/30">
          <span className="text-[10px] text-[#9A72F6] block font-sans">Cleared Wallet</span>
          <span className="text-lg font-bold text-emerald-400">
            ₹{clearedBalance.toLocaleString()}
          </span>
          <span className="text-[9px] text-white/50 block">Ready for Payout</span>
        </div>
      </div>

      {/* Hub Tabs Header */}
      <div className="flex items-center gap-2 border-b border-[#7650C8]/25 pb-1">
        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'offers'
              ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_15px_rgba(231,199,122,0.3)]'
              : 'bg-[#15111d] text-[#F7F4EF]/70 hover:text-white border border-white/5'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Active Campaigns ({brandOffers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'wallet'
              ? 'bg-[#E7C77A] text-[#101014] shadow-[0_0_15px_rgba(231,199,122,0.3)]'
              : 'bg-[#15111d] text-[#F7F4EF]/70 hover:text-white border border-white/5'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Creator Payout Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('new_proposal')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ml-auto ${
            activeTab === 'new_proposal'
              ? 'bg-[#9A72F6] text-white shadow-[0_0_15px_rgba(154,114,246,0.3)]'
              : 'bg-[#291536] text-[#E7C77A] hover:bg-[#7650C8]/40 border border-[#E7C77A]/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>+ New Brand Offer</span>
        </button>
      </div>

      {/* Tab 1: Active Sponsorship Offers */}
      {activeTab === 'offers' && (
        <div className="space-y-3">
          {brandOffers.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#15111d] border border-[#7650C8]/20 space-y-2">
              <Briefcase className="w-8 h-8 text-[#9A72F6] mx-auto opacity-60" />
              <p className="text-sm font-semibold">No active brand offers at this moment.</p>
              <p className="text-xs text-[#F7F4EF]/60">
                Brands can submit campaign proposals directly to your Sovereign handle.
              </p>
              <button
                onClick={() => setActiveTab('new_proposal')}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#E7C77A] text-[#101014] text-xs font-bold hover:scale-105 transition-transform"
              >
                Simulate Brand Offer
              </button>
            </div>
          ) : (
            brandOffers.map((offer) => {
              const isAccepted = offer.status === 'accepted';
              const isDeclined = offer.status === 'declined';
              const isPending = offer.status === 'pending';

              return (
                <div
                  key={offer.id}
                  className="p-4 rounded-2xl bg-[#15111d] border border-[#7650C8]/30 hover:border-[#E7C77A]/40 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-royal font-bold text-sm text-[#F7F4EF]">
                          {offer.brandName}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C77A]" />
                        <span className="text-[10px] text-[#9A72F6] font-mono">
                          • {offer.createdAt}
                        </span>
                      </div>
                      <h3 className="font-royal font-semibold text-xs text-[#E7C77A] mt-0.5">
                        {offer.campaignTitle}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-base text-emerald-400">
                        {offer.budgetCurrency === 'INR' ? '₹' : '$'}
                        {offer.budgetAmount.toLocaleString()} {offer.budgetCurrency}
                      </span>
                      <span
                        className={`block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border text-center mt-1 ${
                          isAccepted
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : isDeclined
                            ? 'bg-red-950/60 text-red-300 border-red-500/40'
                            : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {isAccepted
                          ? 'Accepted • In Production'
                          : isDeclined
                          ? 'Declined'
                          : 'Pending Decision'}
                      </span>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <p className="text-xs text-[#F7F4EF]/80 leading-relaxed bg-[#101014] p-3 rounded-xl border border-white/5">
                    {offer.brief}
                  </p>

                  {/* Deliverables and Timeline */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#F7F4EF]/75">
                    <div className="p-2 rounded-xl bg-[#291536]/40 border border-white/5 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#E7C77A] shrink-0" />
                      <span className="truncate">{offer.deliverables}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#291536]/40 border border-white/5 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#9A72F6] shrink-0" />
                      <span>{offer.timelineDays} Days Delivery Window</span>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[10px] text-[#F7F4EF]/50 font-mono">
                      Contact: {offer.brandEmail}
                    </span>

                    <div className="flex items-center gap-2">
                      {isPending && (
                        <>
                          <button
                            onClick={() => updateBrandOfferStatus(offer.id, 'declined')}
                            className="px-3 py-1 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-500/30 transition-colors cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => updateBrandOfferStatus(offer.id, 'accepted')}
                            className="px-3.5 py-1 rounded-xl bg-[#E7C77A] hover:bg-[#FFF4D0] text-[#101014] text-xs font-bold shadow-[0_0_12px_rgba(231,199,122,0.4)] transition-all cursor-pointer"
                          >
                            Accept & Lock Budget
                          </button>
                        </>
                      )}

                      {isAccepted && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              confetti({ particleCount: 30, spread: 60 });
                              setModerationToast(
                                'Deliverables uploaded for brand review. Escrow disbursement will trigger upon brand confirmation.'
                              );
                              setTimeout(() => setModerationToast(null), 4000);
                            }}
                            className="px-3 py-1 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                          >
                            Submit Deliverables
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Creator Payout Wallet */}
      {activeTab === 'wallet' && (
        <div className="space-y-4">
          {/* Balance & Instant Transfer Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1b1426] via-[#15111d] to-[#101014] border border-[#E7C77A]/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#9A72F6] font-mono">Available Payout Balance</span>
                <h3 className="font-royal font-bold text-2xl text-[#E7C77A] mt-0.5">
                  ₹{clearedBalance.toLocaleString()}{' '}
                  <span className="text-xs font-sans text-[#F7F4EF]/60">
                    (~${(clearedBalance / 83).toFixed(2)} USD)
                  </span>
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-[#E7C77A]/20 border border-[#E7C77A]/40 text-[#E7C77A]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <p className="text-[11px] text-[#F7F4EF]/70 leading-relaxed font-sans">
              Direct earnings accrued from accepted brand sponsorships and verified marketing deliverables. Funds disburse instantly to your configured UPI ID or Bank Account without intermediary processing fees.
            </p>

            <button
              onClick={handleRequestDisbursement}
              disabled={clearedBalance <= 0}
              className={`w-full py-2.5 rounded-2xl font-royal font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                clearedBalance > 0
                  ? 'bg-gradient-to-r from-[#E7C77A] via-[#FFF4D0] to-[#E7C77A] text-[#101014] shadow-[0_0_20px_rgba(231,199,122,0.4)] hover:scale-[1.01] cursor-pointer'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>
                {clearedBalance > 0
                  ? `Disburse ₹${clearedBalance.toLocaleString()} to ${
                      payoutMethod === 'upi' ? 'UPI' : 'Bank Account'
                    }`
                  : 'All Funds Disbursed'}
              </span>
            </button>
          </div>

          {/* Wallet Configuration Form */}
          <form
            onSubmit={handleSaveWallet}
            className="p-4 rounded-3xl bg-[#15111d] border border-[#7650C8]/30 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-royal font-bold text-sm text-[#F7F4EF]">
                Configure Payout Destination
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Gateway
              </span>
            </div>

            {/* Payout Method Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#101014] border border-white/5">
              <button
                type="button"
                onClick={() => setPayoutMethod('upi')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  payoutMethod === 'upi'
                    ? 'bg-[#291536] text-[#E7C77A] border border-[#E7C77A]/40 shadow-sm'
                    : 'text-[#F7F4EF]/60 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI ID (India Instant)</span>
              </button>

              <button
                type="button"
                onClick={() => setPayoutMethod('bank_transfer')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  payoutMethod === 'bank_transfer'
                    ? 'bg-[#291536] text-[#E7C77A] border border-[#E7C77A]/40 shadow-sm'
                    : 'text-[#F7F4EF]/60 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Bank Account (NEFT/IMPS)</span>
              </button>
            </div>

            {/* UPI Fields */}
            {payoutMethod === 'upi' ? (
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-[#9A72F6] block">
                  Virtual Payment Address (UPI VPA)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. creator@oksbi or handle@upi"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-emerald-400 font-mono">
                    ● VPA Active
                  </span>
                </div>
                <p className="text-[10px] text-[#F7F4EF]/50">
                  Instant settlement via UPI Auto-Route (Google Pay, PhonePe, Paytm, BHIM, Bank UPI).
                </p>
              </div>
            ) : (
              /* Bank Account Fields */
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                    Beneficiary Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                      IFSC / SWIFT / Routing Code
                    </label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                    Bank Name & Branch
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
                  />
                </div>
              </div>
            )}

            {walletSavedToast && (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-mono text-center">
                ✨ {walletSavedToast}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#291536] hover:bg-[#7650C8]/40 border border-[#E7C77A]/50 text-xs font-royal font-bold text-[#E7C77A] transition-colors cursor-pointer"
            >
              Save Payout Details
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Submit New Direct Campaign Proposal */}
      {activeTab === 'new_proposal' && (
        <form
          onSubmit={handleSubmitProposal}
          className="p-4 rounded-3xl bg-[#15111d] border border-[#7650C8]/30 space-y-3.5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-royal font-bold text-sm text-[#F7F4EF]">
                Dispatch Direct Campaign Proposal
              </h3>
              <p className="text-[11px] text-[#9A72F6] font-mono">
                Submit sponsorship offer to {currentUser.name} ({currentUser.handle})
              </p>
            </div>
            <span className="p-2 rounded-full bg-[#E7C77A]/20 text-[#E7C77A]">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                Brand / Organization Name
              </label>
              <input
                type="text"
                value={proposalBrandName}
                onChange={(e) => setProposalBrandName(e.target.value)}
                placeholder="e.g. Celestron Optics"
                required
                className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                Official Brand Contact Email
              </label>
              <input
                type="email"
                value={proposalBrandEmail}
                onChange={(e) => setProposalBrandEmail(e.target.value)}
                placeholder="collabs@brand.cosmos"
                className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
              Campaign Title & Angle
            </label>
            <input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              placeholder="e.g. Astro-Tracker Smart Mount Integration"
              required
              className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
              Campaign Brief & Creative Guidelines
            </label>
            <textarea
              rows={3}
              value={proposalBrief}
              onChange={(e) => setProposalBrief(e.target.value)}
              placeholder="Describe the product, required message, visual style, and any specific starlight hashtags or cosmic talking points..."
              required
              className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="col-span-2">
              <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                Deliverables Scope
              </label>
              <input
                type="text"
                value={proposalDeliverables}
                onChange={(e) => setProposalDeliverables(e.target.value)}
                placeholder="1 Reel + 1 Feed Post"
                required
                className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                Timeline (Days)
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={proposalTimeline}
                onChange={(e) => setProposalTimeline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                Budget Currency
              </label>
              <select
                value={proposalCurrency}
                onChange={(e) => setProposalCurrency(e.target.value as 'INR' | 'USD')}
                className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A]"
              >
                <option value="INR">INR (₹ Indian Rupee)</option>
                <option value="USD">USD ($ US Dollar)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#9A72F6] block mb-1">
                Fixed Sponsorship Budget
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                value={proposalBudget}
                onChange={(e) => setProposalBudget(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#101014] border border-[#7650C8]/40 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] font-mono"
              />
            </div>
          </div>

          {proposalSubmitted ? (
            <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-mono text-center animate-in fade-in">
              ✨ Sponsorship Proposal Dispatched to Creator Wallet!
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7650C8] via-[#9A72F6] to-[#E7C77A] text-white font-royal font-bold text-xs uppercase tracking-wider transition-all hover:opacity-95 shadow-[0_0_20px_rgba(118,80,200,0.4)] cursor-pointer"
            >
              Dispatch Direct Campaign Offer
            </button>
          )}
        </form>
      )}

      {/* Disbursement Success Modal */}
      {disbursementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#1a1226] border border-[#E7C77A]/60 shadow-[0_0_50px_rgba(231,199,122,0.4)] p-5 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] text-[#E7C77A] uppercase font-mono tracking-widest font-bold">
                Disbursement Authorized
              </span>
              <h3 className="font-royal font-bold text-xl text-white mt-1">
                ₹{disbursementModal.amount.toLocaleString()} Transferred
              </h3>
              <p className="text-xs text-[#F7F4EF]/75 mt-1 font-mono">
                {disbursementModal.destination}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#101014] border border-white/10 text-left space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#9A72F6]">Transaction ID:</span>
                <span className="text-[#E7C77A] font-bold">{disbursementModal.txnId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A72F6]">Clearing Network:</span>
                <span className="text-white">NPCI IMPS / Fast-Track</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A72F6]">Platform Commission:</span>
                <span className="text-emerald-400 font-bold">₹0.00 (0% Exempt)</span>
              </div>
            </div>

            <button
              onClick={() => setDisbursementModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#E7C77A] text-[#101014] font-royal font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#FFF4D0]"
            >
              Close & Return to Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
