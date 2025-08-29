import { selectUserForAudio } from "../models/sql.js";

export const fetchUser = async (req, res) => {
    const {Id} = req.params; 

    try {
        const userData = await selectUserForAudio(Id)
        if(!userData.Id){
            return res.status(404).json({success: false, message: "User Not Found"});
        }
        return res.status(200).json({success: true, Id: userData.Id, username: userData.displayName, email: userData.email, photo: userData.photo});
    } catch (error) {
        return res.status(500).json({success: false, message: `ERROR: ${error}`});
        console.log(error);
    }
} 