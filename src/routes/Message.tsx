import React, { useState } from 'react';

const Message = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]); // To hold the messages

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // This would interact with Firebase or any other backend service
    setMessages(prev => [...prev, message]);  // Simulate sending a message
    setMessage('');  // Clear input after sending
  };

  return (
    <div className="chat-container">
      <div className="messages-display">
        {/* Dynamically display messages */}
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> // Each message displayed as a paragraph
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Message;
