import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!username);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (isLoggedIn && !socketRef.current) {
      socketRef.current = io('http://localhost:3001');

      socketRef.current.on('receive_message', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socketRef.current.on('chat_history', (history) => {
        setMessages(history);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [isLoggedIn]);

  const joinRoom = () => {
    if (room && socketRef.current) {
      socketRef.current.emit('join_room', { room, username });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      socketRef.current.emit('send_message', { room, username, message });
      setMessage('');
    }
  };

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setRoom('');
    setMessage('');
    setMessages([]);
    setJoined(false);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  if (!joined) {
    return (
      <div>
        <h2>Join a Room</h2>
        <input
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
        <p>
          Logged in as: <strong>{username}</strong>{' '}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>Room: {room}</h3>
      <button onClick={handleLogout}>Logout</button>
      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;