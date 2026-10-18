import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  Repeat2,
  MessageCircle,
  ShieldCheck,
  Users,
  CheckCheck,
} from 'lucide-react';
import { useUniverse } from '../../context/UniverseContext';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActiveTab } = useUniverse();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter((n) => (filter === 'unread' ? !n.read : true));

  const getIcon = (type: string) => {
    switch (type) {
      case 'star':
        return <Sparkles className="w-4 h-4 text-[#E7C77A]" />;
      case 'boost':
        return <Repeat2 className="w-4 h-4 text-[#9A72F6]" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#4FD1C5]" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'colab':
        return <Users className="w-4 h-4 text-[#F472B6]" />;
      default:
        return <Bell className="w-4 h-4 text-[#E7C77A]" />;
    }
  };

  return (
    <div className="w-full p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#7650C8]/25 pb-3">
        <div>
          <h2 className="font-royal font-bold text-lg text-[#F7F4EF]">
            Starlight Activity & Alerts
          </h2>
          <p className="text-xs text-[#9A72F6] font-mono">
            {notifications.filter((n) => !n.read).length} Unread Pulses
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#291536] hover:bg-[#7650C8]/30 border border-[#7650C8]/40 text-xs text-[#E7C77A] font-semibold transition-colors cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
            filter === 'all'
              ? 'bg-[#E7C77A] text-[#101014] font-bold'
              : 'bg-[#15111d] text-[#F7F4EF]/70 hover:text-white'
          }`}
        >
          All Activity ({notifications.length})
        </button>

        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
            filter === 'unread'
              ? 'bg-[#E7C77A] text-[#101014] font-bold'
              : 'bg-[#15111d] text-[#F7F4EF]/70 hover:text-white'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                item.read
                  ? 'bg-[#15111d]/70 border-white/5 opacity-80'
                  : 'bg-[#1e1529] border-[#E7C77A]/40 shadow-[0_2px_12px_rgba(231,199,122,0.1)]'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-[#101014] border border-[#7650C8]/40 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-royal font-bold text-xs text-[#F7F4EF]">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#E7C77A] font-mono">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[#F7F4EF]/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-[#E7C77A] shrink-0 mt-2 shadow-[0_0_6px_#E7C77A]" />
              )}
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-xs text-[#F7F4EF]/50">
            No activity in this view.
          </div>
        )}
      </div>
    </div>
  );
};
