import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/socketContext";

function ChatBox() {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [recieveMess, setRecieveMess] = useState("");
  const socket = useSocket();

  const sendMessage = () => {
    alert(message);
    socket.emit("private_message", { to: userId, message: message });
  };

  useEffect(() => {
    if (!socket) return; // socket not ready yet

    const handler = (data) => {
      setRecieveMess(data.message);
    };

    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [socket]);
  return (
    <div>
      <input
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>

      <h1>Message</h1>
      {recieveMess}
    </div>
  );
}

export default ChatBox;
