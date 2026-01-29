import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { useSocket } from '../context/SocketProvider.js';

function ChatBox() {
  const { userId } = useParams();
  const { accessToken, user } = useAuth();
  const socket = useSocket();
  
  
  return (
    <div>
      hello world
    </div>
  )
}

export default ChatBox;