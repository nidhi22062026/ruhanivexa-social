export type PrivacyLevel = 'public' | 'orbits_only' | 'private_vault';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  celestialAura: 'supernova' | 'solargold' | 'astralcyan' | 'voidvelvet' | 'nebulabloom';
  orbitMilestone: 'Pioneer' | 'Luminary' | 'Cosmic Sovereign';
  orbitTier: 1 | 2 | 3;
  starlightGems: number;
  followersCount: number;
  followingCount: number;
  verified: boolean;
  interests: string[];
  digitalWorld: {
    title: string;
    description: string;
    coreElement: string;
    themeColor: string;
    nebulaDensity: number;
  };
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  coAuthors?: User[];
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'canvas';
  timestamp: string;
  privacy: PrivacyLevel;
  disappearingInHours?: number; // e.g. 24, 168 (7 days), or undefined
  starsCount: number;
  hasStarred?: boolean;
  orbitBoostsCount: number;
  hasBoosted?: boolean;
  commentsCount: number;
  tags: string[];
  collaborationTitle?: string;
  isSaved?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  timestamp: string;
  likesCount: number;
  hasLiked?: boolean;
}

export interface Story {
  id: string;
  author: User;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  expiresInHours: number;
  viewed: boolean;
}

export interface OrbitCommunity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  banner: string;
  avatar: string;
  category: 'Astrophotography' | 'Quantum Art' | 'Cosmic Literature' | 'Ambient Sound' | 'Deep Philosophy' | 'Space Exploration';
  memberCount: number;
  isJoined?: boolean;
  isVerified: boolean;
  coLabsCount: number;
  rules: string[];
}

export interface CollaborativeSpace {
  id: string;
  title: string;
  orbitCommunityId?: string;
  leadCreator: User;
  collaborators: User[];
  description: string;
  status: 'Active Stargaze' | 'Synthesizing' | 'Archived Constellation';
  nodesCount: number;
  canvasPreviewUrl: string;
  tags: string[];
  lastActivity: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isDisappearing?: boolean;
  expiresAtSeconds?: number;
  isDeletedForEveryone?: boolean;
  callLog?: {
    type: 'audio' | 'video';
    duration?: number; // duration in seconds
    status: 'completed' | 'missed' | 'declined';
  };
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isEncrypted: boolean;
  screenshotTransparencyActive: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'star' | 'boost' | 'comment' | 'orbit_invite' | 'security' | 'colab';
  actor?: User;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  targetId?: string;
}

export type ReportCategory =
  | 'harassment'
  | 'spam'
  | 'hate_speech'
  | 'copyright_violation'
  | 'explicit_content';

export interface ReportTicket {
  id: string;
  reportedItemId: string;
  itemType: 'post' | 'user' | 'message' | 'community' | 'reel';
  reason: ReportCategory;
  notes: string;
  status: 'submitted' | 'under_review' | 'resolved';
  timestamp: string;
}

export interface BrandCampaignOffer {
  id: string;
  brandName: string;
  brandEmail: string;
  creatorId: string;
  campaignTitle: string;
  brief: string;
  deliverables: string;
  budgetCurrency: 'INR' | 'USD';
  budgetAmount: number;
  timelineDays: number;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface PayoutWalletConfig {
  payoutMethod: 'upi' | 'bank_transfer' | 'stripe_connect';
  upiId?: string;
  accountHolderName?: string;
  bankAccountNumber?: string;
  ifscOrRoutingNumber?: string;
  isVerified: boolean;
}

