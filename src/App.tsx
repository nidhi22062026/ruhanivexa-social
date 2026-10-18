import React from 'react';
import { UniverseProvider, useUniverse } from './context/UniverseContext';
import { CosmicBackground } from './components/brand/CosmicBackground';
import { AndroidFrame } from './components/layout/AndroidFrame';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNav } from './components/layout/BottomNav';

// Screen Views
import { FeedView } from './components/feed/FeedView';
import { DiscoveryView } from './components/discovery/DiscoveryView';
import { StarlightReelsViewer } from './components/reels/StarlightReelsViewer';
import { CommunitiesView } from './components/orbits/CommunitiesView';
import { InboxList } from './components/chat/InboxList';
import { ChatRoom } from './components/chat/ChatRoom';
import { ProfileView } from './components/profile/ProfileView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { SavedVaultView } from './components/vault/SavedVaultView';
import { SettingsModal } from './components/safety/SettingsModal';
import { CreatorDashboardModal } from './components/creator/CreatorDashboardModal';

// Modals
import { PostComposerModal } from './components/feed/PostComposerModal';
import { PostDetailsModal } from './components/feed/PostDetailsModal';
import { CollaborativeSpaceModal } from './components/orbits/CollaborativeSpaceModal';
import { ReportModal } from './components/safety/ReportModal';
import { AccountDeletionModal } from './components/safety/AccountDeletionModal';
import { LegalModal } from './components/safety/LegalModal';
import { AuthModal } from './components/auth/AuthModal';
import { CosmicAuthScreen } from './components/auth/CosmicAuthScreen';

const MainScreenRouter: React.FC = () => {
  const { activeTab, activeChatId } = useUniverse();

  // If in messages and a chat room is active, display the chat room
  if (activeTab === 'messages' && activeChatId) {
    return <ChatRoom />;
  }

  switch (activeTab) {
    case 'feed':
      return <FeedView />;
    case 'discovery':
      return <DiscoveryView />;
    case 'reels':
      return <StarlightReelsViewer />;
    case 'orbits':
      return <CommunitiesView />;
    case 'messages':
      return <InboxList />;
    case 'profile':
      return <ProfileView />;
    case 'notifications':
      return <NotificationsView />;
    case 'saved':
      return <SavedVaultView />;
    case 'settings':
      return <SettingsModal />;
    case 'creator':
      return <CreatorDashboardModal />;
    default:
      return <FeedView />;
  }
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useUniverse();

  return (
    <>
      {/* Dynamic Cosmic Background */}
      <CosmicBackground />

      {/* Frame wrapper (Android mobile mockup or expansive layout) */}
      <AndroidFrame>
        {isAuthenticated ? (
          <>
            {/* Top Header */}
            <TopHeader />

            {/* Dynamic Screen View */}
            <div className="flex-1 w-full overflow-x-hidden">
              <MainScreenRouter />
            </div>

            {/* Bottom Dock Navigation */}
            <BottomNav />
          </>
        ) : (
          <div className="flex-1 w-full overflow-y-auto">
            <CosmicAuthScreen />
          </div>
        )}
      </AndroidFrame>

      {/* Global Modals & Flows */}
      <PostComposerModal />
      <PostDetailsModal />
      <CollaborativeSpaceModal />
      <ReportModal />
      <AccountDeletionModal />
      <LegalModal />
      <AuthModal />
    </>
  );
};

export default function App() {
  return (
    <UniverseProvider>
      <AppContent />
    </UniverseProvider>
  );
}
