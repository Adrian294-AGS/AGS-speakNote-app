import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client";

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

function ChatBox() {
  const { userId } = useParams();
  
  const [ message, setMessage ] = useState("");
  const [ recieveMess, setRecieveMess ] = useState("");
  socket.emit("join", userId);

  const sendMessage = () => {
    socket.emit("private_message", {to: 22, message: message });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setRecieveMess(data.message)
    })
  }, [socket]);

  return (
    <div>
      <input placeholder='message' onChange={(e) => {setMessage(e.target.value)}}/>
      <button onClick={sendMessage}>Send</button>

      <h1>Message</h1>
      {recieveMess}
    </div>
  )
}

export default ChatBox;