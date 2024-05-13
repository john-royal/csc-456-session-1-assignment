import React from 'react';
import Sidebar from 'src/components/chat/sidebar';
import ChatPage from 'src/components/chat/chatpage';

const MessagesPage: React.FC = () => {
    return (
        <div className="messages-container" style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <ChatPage />
        </div>
    );
}

export default MessagesPage;