import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';
import { ReportCategory } from '../../types';

export const ReportModal: React.FC = () => {
  const { reportTarget, setReportTarget, submitReport } = useUniverse();

  const [reason, setReason] = useState<ReportCategory>('harassment');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!reportTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitReport({
      reportedItemId: reportTarget.id,
      itemType: reportTarget.type,
      reason,
      notes: notes.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReportTarget(null);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#15111d] border border-red-500/40 shadow-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-red-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-royal font-bold text-sm uppercase tracking-wider text-white">
              Report Inappropriate Transmission
            </h3>
          </div>
          <button
            onClick={() => setReportTarget(null)}
            className="p-1 rounded-full text-[#F7F4EF]/60 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
            <p className="font-royal font-bold text-sm text-[#F7F4EF]">
              Transmission Hidden & Reported
            </p>
            <p className="text-xs text-[#F7F4EF]/75 max-w-xs leading-relaxed">
              Transmission reported and hidden pending human moderation review. Thank you for protecting the sovereign community.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <p className="text-xs text-[#F7F4EF]/80 font-mono">
              Target: <span className="text-[#E7C77A] font-semibold">{reportTarget.title}</span>
            </p>

            <div>
              <label className="text-xs text-[#F7F4EF]/85 font-semibold">
                Violation Category (Google Play UGC Standard)
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportCategory)}
                className="w-full mt-1.5 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] cursor-pointer"
              >
                <option value="harassment">Harassment or Bullying</option>
                <option value="spam">Spam or Deceptive Commercial Transmission</option>
                <option value="hate_speech">Hate Speech or Intolerance</option>
                <option value="copyright_violation">Copyright & IP Infringement</option>
                <option value="explicit_content">Explicit or Sexually Suggestive Content</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#F7F4EF]/85 font-semibold">
                Additional Telemetry & Context (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide any details to assist human safety moderators..."
                rows={3}
                className="w-full mt-1.5 bg-[#101014] border border-[#7650C8]/40 rounded-xl px-3 py-2 text-xs text-[#F7F4EF] focus:outline-none focus:border-[#E7C77A] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setReportTarget(null)}
                className="px-3.5 py-1.5 rounded-full text-xs text-[#F7F4EF]/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-royal font-bold text-xs uppercase shadow-md transition-all cursor-pointer"
              >
                Submit Report & Hide
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
