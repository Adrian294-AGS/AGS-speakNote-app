import { useSocket } from "../context/socketContext";
import { useAuth } from "../context/authContext";
import React, {useEffect, useState} from 'react'

export default function useChat() {
    const socket = useSocket();
    const {accesstoken} = useAuth();
    const [message, setMessage] = useState(null);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        socket.on("conversation:new", ({conversationId}) => {
            setConversationId(conversationId);
            socket.emit("conversation:join", {conversationId});
        });

        socket.on("message:new", ({message}) => {
            setMessage(prev => [...prev, message]);
        });

        socket.on("error", (err) => {
            console.error(err.message);
        })
    }, [socket]);

    const startConversation = async (userBID) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/conversation/${userBID}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accesstoken}`
                },
                credentials: "include"
            });

            const 
        } catch (err) {
            console.error("Start Conversation Error: ", err);
        }
    }
}
