import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client";
import { useAuth } from '../context/authContext';



function ChatBox() {
  const { userId } = useParams();
  const [ message, setMessage ] = useState("");
  const [ recieveMess, setRecieveMess ] = useState("");
  const { accessToken } = useAuth();

  const socket = io.connect(`http://192.168.100.90:5000`,{
    auth: {
      token: accessToken
    }
  } 
  );

  const sendMessage = () => {
    socket.emit("private_message", {to: 29, message: message });
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