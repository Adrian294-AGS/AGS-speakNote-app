import { selectAudio, fetchAllAudio } from "../models/sql.js";

export const fetchAudio = async (req, res) => {
    const { Id } = req.params;

    try {
        const selectResult = await selectAudio(Id);
        if(!selectResult){
            return res.status(404).json({success: false, message: "This Audio does not sent properly"});
        }
        return res.status(200).json({success: true, transcription: selectResult});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error: `Error: ${error}`});
    }
};

export const fetchTranscription = async (req, res) => {
    const {Id} = req.params;

    try {
        const fetchResult = await fetchAllAudio(Id);
        if(!fetchResult){
            return res.status(404).json({success: false, message: "No item Found"});
        }
        res.status(200).json({success: true, data: fetchResult});
    } catch (error) {
        console.log(error);
        return res.status(500).json({Error: `Error: ${error}`});
    }
};