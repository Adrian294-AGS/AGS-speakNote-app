import { selectResult, fetchAllAudio, audioDelete } from "../models/sql.js";
import clipboard from "clipboardy";

export const fetchAudio = async (req, res) => {
    const { Id } = req.params;

    try {
        const selectResult = await selectResult(Id);
        if(!selectResult){
            return res.status(404).json({success: false, message: "This Audio does not sent properly"});
        }
        return res.status(200).json({success: true, preview: selectResult});
        
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

export const deleteAudio = async (req, res) => {
    const { Id } = req.params;
    try {
        const deleteResult = await audioDelete(Id);
        if(deleteResult.affectedRows){
            return res.status(200).json({success: true});
        }
        return res.status(404).json({success: false, message: `Id not Found`});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ERROR: `Error: ${error}`});
    }
};

export const copyText = async (req, res) => {
    const { Id } = req.params;
    try {
        const selectResult = await selectAudio(Id);
        if(!selectResult){
            return res.status(404).json({success: false, message: `Id not found`});
        }
        clipboard.writeSync(selectResult.result_text);
        return res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ERROR: `Error: ${error}`});
    }
};