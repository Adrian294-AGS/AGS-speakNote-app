import { selectChatUser } from "../models/sql.js";

export const fetchChatUser = async (req, res) => {
    try {
        const result = await selectChatUser();
        if(!result){
            return res.status(204).json({success: false, message: "No Chat User"});
        }
        return res.status(200).json({success: true, result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error});
    }
}