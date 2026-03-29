import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationID: {type: Schema.Types.ObjectId, ref: "Conversation", required: true},
    senderId: {type: Schema.Types.ObjectId, ref: "User", required: true },
    text: {type: String, required: true},
    sendAt: {type: Date, default: Date.now()}
});

export default mongoose.model("message", messageSchema);