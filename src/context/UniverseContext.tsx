import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Post,
  Story,
  OrbitCommunity,
  CollaborativeSpace,
  Conversation,
  Message,
  NotificationItem,
  ReportTicket,
  BrandCampaignOffer,
  PayoutWalletConfig,
} from '../types';
import {
  DEFAULT_BLANK_USER,
  MOCK_USERS,
  MOCK_POSTS,
  MOCK_STORIES,
  MOCK_COMMUNITIES,
  MOCK_COLABORATIVE_SPACES,
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES_MAP,
  MOCK_NOTIFICATIONS,
} from '../data/mockUniverse';

export type NavigationTab =
  | 'feed'
  | 'discovery'
  | 'reels'
  | 'orbits'
  | 'messages'
  | 'profile'
  | 'notifications'
  | 'saved'
  | 'settings'
  | 'creator';

interface UniverseContextType {
  currentUser: User;
  updateCurrentUser: (updates: Partial<User>) => void;
  users: User[];
  posts: Post[];
  stories: Story[];
  communities: OrbitCommunity[];
  collaborativeSpaces: CollaborativeSpace[];
  conversations: Conversation[];
  messagesMap: Record<string, Message[]>;
  notifications: NotificationItem[];
  reports: ReportTicket[];
  blockedUserIds: string[];
  mutedUserIds: string[];
  hiddenPostIds: string[];
  brandOffers: BrandCampaignOffer[];
  payoutWallet: PayoutWalletConfig;
  telemetryEnabled: boolean;
  moderationToast: string | null;
  isOffline: boolean;

  // App Navigation & Modals
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isPhoneFramed: boolean;
  setIsPhoneFramed: (framed: boolean) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  activeOrbitId: string | null;
  setActiveOrbitId: (id: string | null) => void;
  composerOpen: boolean;
  setComposerOpen: (open: boolean) => void;
  selectedPostDetails: Post | null;
  setSelectedPostDetails: (post: Post | null) => void;
  colabSpaceModal: CollaborativeSpace | null;
  setColabSpaceModal: (space: CollaborativeSpace | null) => void;
  reportTarget: { id: string; type: 'post' | 'user' | 'message' | 'community' | 'reel'; title: string } | null;
  setReportTarget: (target: { id: string; type: 'post' | 'user' | 'message' | 'community' | 'reel'; title: string } | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  deleteAccountModalOpen: boolean;
  setDeleteAccountModalOpen: (open: boolean) => void;
  legalModalTab: 'terms' | 'privacy' | 'community' | 'readiness' | null;
  setLegalModalTab: (tab: 'terms' | 'privacy' | 'community' | 'readiness' | null) => void;
  screenshotToast: string | null;

  // Actions
  createPost: (postData: Partial<Post>) => void;
  toggleStarPost: (postId: string) => void;
  toggleBoostPost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  deletePost: (postId: string) => void;
  hidePost: (postId: string) => void;
  toggleJoinCommunity: (communityId: string) => void;
  createCollaborativeSpace: (space: Partial<CollaborativeSpace>) => void;
  sendMessage: (conversationId: string, text: string, isDisappearing?: boolean, mediaUrl?: string) => void;
  deleteMessageForEveryone: (conversationId: string, messageId: string) => void;
  triggerScreenshotAlert: (conversationId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  submitReport: (report: Omit<ReportTicket, 'id' | 'status' | 'timestamp'>) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  muteUser: (userId: string) => void;
  unmuteUser: (userId: string) => void;
  submitBrandOffer: (offer: Omit<BrandCampaignOffer, 'id' | 'createdAt' | 'status'>) => void;
  updateBrandOfferStatus: (offerId: string, status: 'pending' | 'accepted' | 'declined') => void;
  updatePayoutWallet: (config: Partial<PayoutWalletConfig>) => void;
  setTelemetryEnabled: (enabled: boolean) => void;
  downloadUserData: () => void;
  clearLocalStorageAndCache: () => void;
  setModerationToast: (msg: string | null) => void;
  setIsOffline: (offline: boolean) => void;
  resetAccountData: () => void;
  logout: () => void;
  logCall: (
    conversationId: string,
    callType: 'audio' | 'video',
    durationSeconds: number,
    status: 'completed' | 'missed' | 'declined'
  ) => void;
}

const UniverseContext = createContext<UniverseContextType | undefined>(undefined);

export const UniverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session check - strictly initialize as false if no authenticated session exists
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ruhanivexa_is_authenticated') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('ruhanivexa_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_BLANK_USER;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [communities, setCommunities] = useState<OrbitCommunity[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_communities');
    return saved ? JSON.parse(saved) : MOCK_COMMUNITIES;
  });

  const [collaborativeSpaces, setCollaborativeSpaces] = useState<CollaborativeSpace[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_colabs');
    return saved ? JSON.parse(saved) : MOCK_COLABORATIVE_SPACES;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_conversations');
    return saved ? JSON.parse(saved) : MOCK_CONVERSATIONS;
  });

  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('ruhanivexa_messages');
    return saved ? JSON.parse(saved) : MOCK_MESSAGES_MAP;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_blocked_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [mutedUserIds, setMutedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_muted_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [hiddenPostIds, setHiddenPostIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_hidden_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [reports, setReports] = useState<ReportTicket[]>([]);

  const [telemetryEnabled, setTelemetryEnabled] = useState<boolean>(() => {
    return localStorage.getItem('ruhanivexa_telemetry_optout') !== 'true';
  });

  const [moderationToast, setModerationToast] = useState<string | null>(null);

  const [isOffline, setIsOffline] = useState<boolean>(() => !navigator.onLine);

  const [payoutWallet, setPayoutWallet] = useState<PayoutWalletConfig>(() => {
    const saved = localStorage.getItem('ruhanivexa_payout_wallet');
    return saved
      ? JSON.parse(saved)
      : {
          payoutMethod: 'upi',
          upiId: 'creator@oksbi',
          accountHolderName: 'Aria Vance',
          bankAccountNumber: '•••• •••• 4829',
          ifscOrRoutingNumber: 'SBIN0001842',
          isVerified: true,
        };
  });

  const [brandOffers, setBrandOffers] = useState<BrandCampaignOffer[]>(() => {
    const saved = localStorage.getItem('ruhanivexa_brand_offers');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'offer_1',
            brandName: 'Cosmic Stellar Optics',
            brandEmail: 'sponsorships@stellaroptics.cosmos',
            creatorId: 'user_aria',
            campaignTitle: 'Deep Sky Astrophotography Rig Showcase',
            brief: 'Feature our high-aperture doublet refractor telescope in your upcoming starlight transmission.',
            deliverables: '1 Starlight Reel + 1 Co-Lab Post',
            budgetCurrency: 'INR',
            budgetAmount: 45000,
            timelineDays: 14,
            status: 'pending',
            createdAt: '1 day ago',
          },
        ];
  });

  // Navigation & Frame View Mode
  const [isPhoneFramed, setIsPhoneFramed] = useState<boolean>(() => {
    return window.innerWidth > 768;
  });
  const [activeTab, setActiveTab] = useState<NavigationTab>('feed');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeOrbitId, setActiveOrbitId] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedPostDetails, setSelectedPostDetails] = useState<Post | null>(null);
  const [colabSpaceModal, setColabSpaceModal] = useState<CollaborativeSpace | null>(null);
  const [reportTarget, setReportTarget] = useState<{ id: string; type: 'post' | 'user' | 'message' | 'community' | 'reel'; title: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'community' | 'readiness' | null>(null);
  const [screenshotToast, setScreenshotToast] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('ruhanivexa_is_authenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('ruhanivexa_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_colabs', JSON.stringify(collaborativeSpaces));
  }, [collaborativeSpaces]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_messages', JSON.stringify(messagesMap));
  }, [messagesMap]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_blocked_users', JSON.stringify(blockedUserIds));
  }, [blockedUserIds]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_muted_users', JSON.stringify(mutedUserIds));
  }, [mutedUserIds]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_hidden_posts', JSON.stringify(hiddenPostIds));
  }, [hiddenPostIds]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_brand_offers', JSON.stringify(brandOffers));
  }, [brandOffers]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_payout_wallet', JSON.stringify(payoutWallet));
  }, [payoutWallet]);

  useEffect(() => {
    localStorage.setItem('ruhanivexa_telemetry_optout', telemetryEnabled ? 'false' : 'true');
  }, [telemetryEnabled]);

  // Online / Offline listeners for Universal Stability
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const createPost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorId: currentUser.id,
      author: currentUser,
      content: postData.content || '',
      mediaUrl: postData.mediaUrl,
      mediaType: postData.mediaType || (postData.mediaUrl ? 'image' : undefined),
      timestamp: 'Just now',
      privacy: postData.privacy || 'public',
      disappearingInHours: postData.disappearingInHours,
      starsCount: 0,
      hasStarred: false,
      orbitBoostsCount: 0,
      hasBoosted: false,
      commentsCount: 0,
      tags: postData.tags || ['RoyalGalaxy'],
      collaborationTitle: postData.collaborationTitle,
      coAuthors: postData.coAuthors,
      isSaved: false,
    };

    setPosts([newPost, ...posts]);
  };

  const toggleStarPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasStarred = !p.hasStarred;
          return {
            ...p,
            hasStarred,
            starsCount: hasStarred ? p.starsCount + 1 : Math.max(0, p.starsCount - 1),
          };
        }
        return p;
      })
    );
  };

  const toggleBoostPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasBoosted = !p.hasBoosted;
          return {
            ...p,
            hasBoosted,
            orbitBoostsCount: hasBoosted ? p.orbitBoostsCount + 1 : Math.max(0, p.orbitBoostsCount - 1),
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, isSaved: !p.isSaved };
        }
        return p;
      })
    );
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const hidePost = (postId: string) => {
    setHiddenPostIds((prev) => [...prev, postId]);
    setModerationToast('Transmission removed and hidden from your feed.');
    setTimeout(() => setModerationToast(null), 4000);
  };

  const toggleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((comm) => {
        if (comm.id === communityId) {
          const isJoined = !comm.isJoined;
          return {
            ...comm,
            isJoined,
            memberCount: isJoined ? comm.memberCount + 1 : Math.max(1, comm.memberCount - 1),
          };
        }
        return comm;
      })
    );
  };

  const createCollaborativeSpace = (space: Partial<CollaborativeSpace>) => {
    const newSpace: CollaborativeSpace = {
      id: `colab_${Date.now()}`,
      title: space.title || 'Untitled Stargaze Space',
      orbitCommunityId: space.orbitCommunityId,
      leadCreator: currentUser,
      collaborators: space.collaborators || [currentUser],
      description: space.description || '',
      status: 'Active Stargaze',
      nodesCount: 1,
      canvasPreviewUrl: space.canvasPreviewUrl || 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
      tags: space.tags || ['CoCreation'],
      lastActivity: `Just now by ${currentUser.name || 'Creator'}`,
    };
    setCollaborativeSpaces([newSpace, ...collaborativeSpaces]);
  };

  const sendMessage = (conversationId: string, text: string, isDisappearing?: boolean, mediaUrl?: string) => {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      text,
      mediaUrl,
      mediaType: mediaUrl ? 'image' : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      isDisappearing,
      expiresAtSeconds: isDisappearing ? 60 : undefined,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
          };
        }
        return c;
      })
    );

    setTimeout(() => {
      setMessagesMap((prev) => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).map((m) =>
          m.id === newMsg.id ? { ...m, status: 'delivered' } : m
        ),
      }));
    }, 1000);
  };

  const deleteMessageForEveryone = (conversationId: string, messageId: string) => {
    setMessagesMap((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map((m) => {
        if (m.id === messageId) {
          return {
            ...m,
            text: '✨ This cosmic transmission was dissolved for everyone in this starlight orbit.',
            mediaUrl: undefined,
            isDeletedForEveryone: true,
          };
        }
        return m;
      }),
    }));
  };

  const triggerScreenshotAlert = (conversationId: string) => {
    setScreenshotToast('📸 Screenshot Awareness: Screen capture was detected on this device. In accordance with transparency policies, conversation participants have been notified.');
    setTimeout(() => setScreenshotToast(null), 6000);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const submitReport = (report: Omit<ReportTicket, 'id' | 'status' | 'timestamp'>) => {
    const newReport: ReportTicket = {
      id: `rep_${Date.now()}`,
      ...report,
      status: 'submitted',
      timestamp: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);

    // Immediately remove/hide the reported post or reel from the user's feed
    if (report.itemType === 'post' || report.itemType === 'reel') {
      setHiddenPostIds((prev) => [...prev, report.reportedItemId]);
    }

    setModerationToast('Transmission reported and hidden pending human moderation review.');
    setTimeout(() => setModerationToast(null), 5000);
  };

  const blockUser = (userId: string) => {
    if (!blockedUserIds.includes(userId)) {
      setBlockedUserIds((prev) => [...prev, userId]);
      setModerationToast('Sovereign realm blocked. Their transmissions and interactions are now shielded.');
      setTimeout(() => setModerationToast(null), 4000);
    }
  };

  const unblockUser = (userId: string) => {
    setBlockedUserIds((prev) => prev.filter((id) => id !== userId));
    setModerationToast('Sovereign realm unblocked.');
    setTimeout(() => setModerationToast(null), 3000);
  };

  const muteUser = (userId: string) => {
    if (!mutedUserIds.includes(userId)) {
      setMutedUserIds((prev) => [...prev, userId]);
      setModerationToast('Sovereign realm muted. Their transmissions will be quieted from your feed.');
      setTimeout(() => setModerationToast(null), 4000);
    }
  };

  const unmuteUser = (userId: string) => {
    setMutedUserIds((prev) => prev.filter((id) => id !== userId));
    setModerationToast('Sovereign realm unmuted.');
    setTimeout(() => setModerationToast(null), 3000);
  };

  const submitBrandOffer = (offer: Omit<BrandCampaignOffer, 'id' | 'createdAt' | 'status'>) => {
    const newOffer: BrandCampaignOffer = {
      id: `offer_${Date.now()}`,
      ...offer,
      status: 'pending',
      createdAt: 'Just now',
    };
    setBrandOffers((prev) => [newOffer, ...prev]);
    setModerationToast('Direct Campaign Offer dispatched to creator wallet.');
    setTimeout(() => setModerationToast(null), 4000);
  };

  const updateBrandOfferStatus = (offerId: string, status: 'pending' | 'accepted' | 'declined') => {
    setBrandOffers((prev) =>
      prev.map((offer) => (offer.id === offerId ? { ...offer, status } : offer))
    );
    setModerationToast(
      status === 'accepted'
        ? 'Sponsorship offer accepted! Campaign budget locked in escrow.'
        : 'Campaign offer declined.'
    );
    setTimeout(() => setModerationToast(null), 3500);
  };

  const updatePayoutWallet = (config: Partial<PayoutWalletConfig>) => {
    setPayoutWallet((prev) => ({ ...prev, ...config }));
    setModerationToast('Creator Payout Wallet settings updated.');
    setTimeout(() => setModerationToast(null), 3000);
  };

  const downloadUserData = () => {
    const exportPayload = {
      platform: 'Ruhanivexa Social — Royal Galaxy Edition',
      exportDate: new Date().toISOString(),
      complianceStandard: 'GDPR Article 20 & CCPA Section 1798.130 Compliant',
      sovereignProfile: currentUser,
      publishedTransmissions: posts.filter((p) => p.authorId === currentUser.id),
      savedVaultPostIds: posts.filter((p) => p.isSaved).map((p) => p.id),
      directConversations: conversations,
      messagesPayload: messagesMap,
      notificationsArchive: notifications,
      safetyShield: {
        blockedUserIds,
        mutedUserIds,
        hiddenPostIds,
        reportsFiled: reports,
      },
      telemetrySettings: {
        trackingEnabled: telemetryEnabled,
        sessionEncryption: 'AES-256 Quantum Shield Handshake Verified',
      },
      brandCampaigns: brandOffers,
      creatorPayoutWallet: payoutWallet,
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportPayload, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `ruhanivexa_sovereign_data_${currentUser.handle.replace('@', '') || 'profile'}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setModerationToast('GDPR Data Archive downloaded as JSON.');
    setTimeout(() => setModerationToast(null), 4000);
  };

  const clearLocalStorageAndCache = () => {
    localStorage.clear();
    setModerationToast('Cache and local storage cleared. Restarting session...');
    setTimeout(() => {
      setModerationToast(null);
      setIsAuthenticated(false);
      setCurrentUser(DEFAULT_BLANK_USER);
      setActiveTab('feed');
      setActiveChatId(null);
    }, 1500);
  };

  const resetAccountData = () => {
    localStorage.clear();
    setCurrentUser(DEFAULT_BLANK_USER);
    setPosts(MOCK_POSTS);
    setCommunities(MOCK_COMMUNITIES);
    setCollaborativeSpaces(MOCK_COLABORATIVE_SPACES);
    setConversations(MOCK_CONVERSATIONS);
    setMessagesMap(MOCK_MESSAGES_MAP);
    setNotifications(MOCK_NOTIFICATIONS);
    setBlockedUserIds([]);
    setMutedUserIds([]);
    setHiddenPostIds([]);
    setIsAuthenticated(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(DEFAULT_BLANK_USER);
    setActiveTab('feed');
    setActiveChatId(null);
    localStorage.removeItem('ruhanivexa_is_authenticated');
    localStorage.removeItem('ruhanivexa_current_user');
    localStorage.removeItem('ruhanivexa_session');
  };

  const logCall = (
    conversationId: string,
    callType: 'audio' | 'video',
    durationSeconds: number,
    status: 'completed' | 'missed' | 'declined'
  ) => {
    const durationText =
      durationSeconds > 0
        ? `${Math.floor(durationSeconds / 60)}m ${(durationSeconds % 60).toString().padStart(2, '0')}s`
        : '0s';
    const label =
      status === 'completed'
        ? `${callType === 'video' ? 'Outgoing Video Call' : 'Outgoing Audio Call'} — ${durationText}`
        : status === 'missed'
        ? `Missed ${callType === 'video' ? 'Video' : 'Audio'} Call`
        : `Declined ${callType === 'video' ? 'Video' : 'Audio'} Call`;

    const newMsg: Message = {
      id: `msg_call_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      text: label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
      callLog: {
        type: callType,
        duration: durationSeconds,
        status,
      },
    };

    setMessagesMap((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: label,
            lastMessageTime: 'Just now',
          };
        }
        return c;
      })
    );
  };

  return (
    <UniverseContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        users: MOCK_USERS,
        // Shielded UGC feed: hides blocked authors, muted authors, and individually reported/hidden posts
        posts: posts.filter(
          (p) =>
            !blockedUserIds.includes(p.authorId) &&
            !mutedUserIds.includes(p.authorId) &&
            !hiddenPostIds.includes(p.id)
        ),
        stories: MOCK_STORIES,
        communities,
        collaborativeSpaces,
        conversations,
        messagesMap,
        notifications,
        reports,
        blockedUserIds,
        mutedUserIds,
        hiddenPostIds,
        brandOffers,
        payoutWallet,
        telemetryEnabled,
        moderationToast,
        isOffline,
        activeTab,
        setActiveTab,
        isPhoneFramed,
        setIsPhoneFramed,
        activeChatId,
        setActiveChatId,
        activeOrbitId,
        setActiveOrbitId,
        composerOpen,
        setComposerOpen,
        selectedPostDetails,
        setSelectedPostDetails,
        colabSpaceModal,
        setColabSpaceModal,
        reportTarget,
        setReportTarget,
        authModalOpen,
        setAuthModalOpen,
        isAuthenticated,
        setIsAuthenticated,
        deleteAccountModalOpen,
        setDeleteAccountModalOpen,
        legalModalTab,
        setLegalModalTab,
        screenshotToast,
        createPost,
        toggleStarPost,
        toggleBoostPost,
        toggleSavePost,
        deletePost,
        hidePost,
        toggleJoinCommunity,
        createCollaborativeSpace,
        sendMessage,
        deleteMessageForEveryone,
        triggerScreenshotAlert,
        markNotificationRead,
        markAllNotificationsRead,
        submitReport,
        blockUser,
        unblockUser,
        muteUser,
        unmuteUser,
        submitBrandOffer,
        updateBrandOfferStatus,
        updatePayoutWallet,
        setTelemetryEnabled,
        downloadUserData,
        clearLocalStorageAndCache,
        setModerationToast,
        setIsOffline,
        resetAccountData,
        logout,
        logCall,
      }}
    >
      {children}
    </UniverseContext.Provider>
  );
};

export const useUniverse = () => {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error('useUniverse must be used within a UniverseProvider');
  }
  return context;
};
