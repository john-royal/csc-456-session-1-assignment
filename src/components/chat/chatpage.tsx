import React from 'react';
import Sidebar from './sidebar';
import MessageArea from './messagearea';

export default function ChatPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <MessageArea />
    </div>
  );
}