import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./authContext";
import { io } from "socket.io-client";

const socketContext = createContext();

export const SocketProvider = ({children}) => {
    const { user, accessToken } = useAuth();
    const socketRef = useRef(null);

    useEffect(() => {
        if(!user?.Id)return;
        socketRef.current = io("http://localhost:3000", {
            auth: {
                token: accessToken
            }
        });

        socketRef.current.emit("join", user.Id);

        return () => {
            socketRef.current?.disconnect();
        }
    }, [user?.Id])


    return(
        <socketContext.Provider value={socketRef.current}>
            {children}
        </socketContext.Provider>
    )
}

export const useSocket = () => useContext(socketContext);