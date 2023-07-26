import { DefaultEventsMap } from '@socket.io/component-emitter';
import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type Message = {
  message: string;
  username: string;
};

const Home = () => {
  const [message, setMessage] = useState(``);
  const [username, setUsername] = useState(``);
  const [allMessages, setAllMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      // socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/socket`);

    socket = io();

    socket.on(`receive-message`, (data) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    socket.emit(`send-message`, {
      username,
      message,
    });
    setMessage(``);
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={`off`}
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
