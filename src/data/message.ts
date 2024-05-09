export interface Message {
  messageId: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  timestamp: firebase.firestore.Timestamp;
}

export class MessageRepository {
  async sendMessage(message: Message): Promise<void> {
    const response = await firebase.firestore().collection('Messages').add(message);
    return response;
  }

  async getMessages(userId: string, receiverId: string): Promise<Message[]> {
    const messages = await firebase.firestore().collection('Messages').where('receiverId', '==', receiverId).where('senderId', '==', userId).get();
    return messages.docs.map(doc => doc.data() as Message);
  }
}
