import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6crWqjz86emfpyNEhg5fMHHdt_Kvr8Tw",
  authDomain: "csc-456-paw.firebaseapp.com",
  projectId: "csc-456-paw",
  storageBucket: "csc-456-paw.appspot.com",
  messagingSenderId: "1090834397966",
  appId: "1:1090834397966:web:c491a4134d49bcb074f55f",
  measurementId: "G-SVLTJC19SY",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Message interface to define the structure of a message object
export interface Message {
  messageId: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  timestamp: Timestamp; // Firestore Timestamp for handling date/time
}

// Repository class to handle Firebase Firestore operations
export class MessageRepository {
  // Function to send a message
  async sendMessage(message: Message): Promise<void> {
    await addDoc(collection(db, 'Messages'), message);
  }

  // Function to retrieve messages between two users
  async getMessages(userId: string, receiverId: string): Promise<Message[]> {
    const messagesQuery = query(
      collection(db, 'Messages'),
      where('receiverId', '==', receiverId),
      where('senderId', '==', userId)
    );
    const querySnapshot = await getDocs(messagesQuery);
    return querySnapshot.docs.map(doc => doc.data() as Message);
  }
}