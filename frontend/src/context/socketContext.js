import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { accessToken, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const userId = user.Id;

  useEffect(() => {
    if (!accessToken) return;

    const newSocket = io("http://192.168.100.90:5000", {
      autoConnect: false 
    });
    
    newSocket.connect();

    newSocket.emit("user:connect", {userId});

    setSocket(newSocket); // 🔥 triggers re-render
    
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);