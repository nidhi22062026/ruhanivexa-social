import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

export const AccountDeletionModal: React.FC = () => {
  const { deleteAccountModalOpen, setDeleteAccountModalOpen, resetAccountData } = useUniverse();

  const [confirmText, setConfirmText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  if (!deleteAccountModalOpen) return null;

  const handleDelete = () => {
    if (confirmText !== 'DELETE SOVEREIGN REALM') return;

    setIsDeleted(true);
    setTimeout(() => {
      resetAccountData();
      setIsDeleted(false);
      setDeleteAccountModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#15111d] border border-red-500/50 shadow-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-red-400">
            <Trash2 className="w-5 h-5" />
            <h3 className="font-royal font-bold text-sm uppercase tracking-wider text-white">
              Permanent Account & Data Erasure
            </h3>
          </div>
          <button
            onClick={() => setDeleteAccountModalOpen(false)}
            className="p-1 rounded-full text-[#F7F4EF]/60 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDeleted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-400 animate-spin" />
            <h4 className="font-royal font-bold text-base text-white">
              Sovereign Keys Revoked & Data Erased
            </h4>
            <p className="text-xs text-[#F7F4EF]/70 max-w-sm">
              Your digital world, starlight transmissions, encrypted comms, and identity records have been permanently cleared with zero residual retention.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-red-200 leading-relaxed space-y-1">
                <p className="font-bold">Irreversible Sovereign Deletion</p>
                <p>
                  In compliance with Google Play Store data safety and GDPR / CCPA right-to-be-forgotten policies, deleting your account will permanently destroy:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-red-200/90">
                  <li>Your custom Living Universe digital world and celestial aura</li>
                  <li>All published starlight transmissions and collaborative contributions</li>
                  <li>Private Quantum Comms encryption keys and chat histories</li>
                  <li>Starlight gems balance and milestone credentials</li>
                </ul>
              </div>
            </div>

            {/* External Deletion Request Page link */}
            <div className="p-3 rounded-xl bg-[#101014] border border-[#7650C8]/30 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-[#E7C77A]">External Web Deletion URL (Play Store Mandate)</p>
                <p className="text-[11px] text-[#F7F4EF]/60 font-mono">
                  https://ruhanivexa.social/delete-account
                </p>
              </div>
              <a
                href="https://ruhanivexa.social/delete-account"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#291536] hover:bg-[#7650C8]/40 border border-[#E7C77A]/30 text-[11px] text-[#E7C77A] hover:underline cursor-pointer transition-all"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Confirmation input */}
            <div>
              <label className="text-xs text-[#F7F4EF]/80 font-medium">
                To confirm, type <span className="font-mono text-red-400 font-bold">DELETE SOVEREIGN REALM</span> below:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type confirmation here..."
                className="w-full mt-1.5 bg-[#101014] border border-red-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-400 font-mono"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setDeleteAccountModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs text-[#F7F4EF]/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText !== 'DELETE SOVEREIGN REALM'}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 disabled:opacity-30 text-white font-royal font-bold text-xs uppercase cursor-pointer transition-all"
              >
                Permanently Erase Everything
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
