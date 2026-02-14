import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const newSocket = io("http://192.168.100.90:5000", {
      auth: { token: accessToken }
    });

    setSocket(newSocket); // 🔥 triggers re-render

  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);