import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// const socket = io('http://localhost:3000', {
//   withCredentials: true,
//   transports: ['websocket'],
// });

const socket = io('https://chat-express-production.up.railway.app', {
  withCredentials: true,
  transports: ['websocket'],
});

export default function ChatApp() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  const user = Cookies.get('username') || 'Anonymous';

  useEffect(() => {
    socket.on('chat history', (msgs) => {
      setChat(msgs);
    });

    socket.on('chat message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    socket.on('clear chat', () => {
      setChat([]);
    });

    return () => {
      socket.off('chat history');
      socket.off('chat message');
      socket.off('clear chat');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (message.trim()) {
      socket.emit('chat message', {
        username: user,
        message: message.trim(),
      });
      setMessage('');
    }
  };

  const clearChat = () => {
    socket.emit('clear chat');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Group Chat</h2>
      <button onClick={clearChat} style={{ marginBottom: '10px' }}>
        Clear Chat
      </button>

      <div
        id="chat-box"
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'auto',
          padding: '10px',
        }}
      >
        {chat.map((msg, i) => (
          <div key={i}>
            <strong>{msg.username ?? 'Anonymous'}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{ width: '80%' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
