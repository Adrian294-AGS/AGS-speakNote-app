import { selectUserForAudio } from "../models/sql";

export const fetchUser = async (req, res) => {
    const {Id} = req.params; 

    try {
        const userData = await selectUserForAudio(Id)
    } catch (error) {
        return res.status(500).json({success: false, message: `ERROR: ${error}`});
        console.log(error);
    }
} 