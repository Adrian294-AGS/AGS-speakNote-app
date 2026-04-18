import express from "express";
import { jwt_authenticate } from "../Middlewares/jsonwebAuthenticate.js";
import { Conversation } from "../models/conversation.js";

const router = express.Router();

export const socketRoutes = (io) => {
    router.post("/conversation/:id", jwt_authenticate, async (req, res) => {
        const userAID = req.user;
        const userBID = req.params;

        try {
            const [result] = await Conversation.findOne({
                participants: {$all: [userAID, userBID]}
            });

            if(!result){
                const [convoId] = await Conversation.create({
                    participants: [userAID, userBID]
                });

                io.to(`user:${userBID}`).emit("conversation:new", {
                    conversationId: convoId.participants
                });
            }

            return res.status(201).json({success: true, conversationId: result.participants});
     
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: `Error: ${error}`});
        }

    })
}