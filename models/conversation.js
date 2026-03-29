import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: "user"}],
    createdAt: {type: Date, default: Date.now()}
});

export default mongoose.model("Conversation", conversationSchema);