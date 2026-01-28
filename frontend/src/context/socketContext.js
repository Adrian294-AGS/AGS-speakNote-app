import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./authContext";

const SOCKETCONTEXT = createContext();

export const socketContext = ({Children}) => {
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
            socketRef.current.disconnect();
        }
    }, [user?.Id])


    return(
        <SOCKETCONTEXT.Provider value={socketRef.current}>
            {Children}
        </SOCKETCONTEXT.Provider>
    )
}

export const useSocket = () => useContext(SOCKETCONTEXT);