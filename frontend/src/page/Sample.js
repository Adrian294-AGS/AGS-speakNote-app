import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider.js";
import { useAuth } from "../context/authContext";

export default function Sample() {
  const socket = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const selectedUserId = 28;

  useEffect(() => {
    if (!socket) return;

    const handler = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler);
    };
  }, [socket]);

  const sendMessage = () => {
  if (!socket) {
    console.log("Socket not ready");
    return;
  }

  if (!text.trim()) return;

  socket.emit("private_message", {
    to: selectedUserId,
    message: text
  });

  setMessages((prev) => [
    ...prev,
    { from: user.id, message: text }
  ]);

  setText("");
};

  return (
    <div>
      <h2>Chat</h2>
        {messages}
      {messages.map((m, i) => (
        <p key={i}>
          <b>{m.from === user.id ? "Me" : "Them"}:</b> {m.message}
        </p>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
