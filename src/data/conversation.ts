import { Timestamp } from 'firebase/firestore';

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: string;
  lastMessageTimestamp?: Timestamp;
}
