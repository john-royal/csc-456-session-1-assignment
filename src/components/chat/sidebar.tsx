import React, { useEffect, useState } from 'react';
import { db } from "~/lib/firebase";
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Conversation } from '../../data/conversation'; // Adjust the path as necessary

const Sidebar: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'conversations'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedConversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as Conversation); // Ensure type safety
      setConversations(loadedConversations);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ width: '300px', overflowY: 'auto' }}>
      {conversations.map(convo => (
        <div key={convo.id}>
          {convo.participantIds.join(', ')}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
