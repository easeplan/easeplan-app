import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = `https://apiv3.easeplan.io`;

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(``);
  const [newmessage, setNewMessage] = useState(``);
  const [conversationId, setConversationId] = useState(
    `64c3b2ee15fa590aff35262b`,
  ); // You might want to set this based on user's current conversation
  const [from, setFrom] = useState(`64be37770991c96a1a941de6`); // This could be the current user's ID or name
  const [to, setTo] = useState(`64c3abec15fa590aff352536`); // This could be the recipient's ID or name

  useEffect(() => {
    const newSocket = socketIOClient(SOCKET_SERVER_URL, {
      auth: { userId: `64c3abec15fa590aff352536` },
    });

    setSocket(newSocket);

    newSocket.on(`conversation-${conversationId}`, (incomingMessage) => {
      setNewMessage(incomingMessage?.message);
      console.log(`New Message:`, incomingMessage);
    });
    return () => newSocket.close();
  }, [setSocket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit(`message`, {
        from,
        to,
        conversationId,
        message,
        image: ``, // Set this if you're planning to send images
      });
    }
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>

      <p>{newmessage}</p>
    </div>
  );
};

export default App;
