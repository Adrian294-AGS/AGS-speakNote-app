import db from "../database/database.js";

export const createUser = async (table, input) => {
    const [results] = await db.query(`INSERT INTO \`${table}\` SET ?`, [input]);
    return results;
};

export async function selectUser (params) {
    const [results] = await db.query("SELECT * FROM tblusers WHERE displayName = ?", [params]);
    return results[0];
};

export const SelectUserGoogle = async (params) => {
    const [results] = await db.query("SELECT * FROM tblusers WHERE googleId = ?", [params]);
    return results[0];
};

export const selectAudio = async (params) => {
    const [result] = await db.query("SELECT * FROM tblaudio WHERE Id = ?", [params]);
    return result[0];
}

export const selectUserForAudio = async (params) => {
    const [results] = await db.query("SELECT * FROM tblusers WHERE Id = ?", [params]);
    return results[0];
}

export const fetchAllAudio = async (params) => {
    const [result] = await db.query("SELECT tblusers.Id, tblaudio.Id, wav_file, result_text, tblaudio.created_at from tblusers INNER JOIN tblaudio ON tblusers.Id = tblaudio.user_id WHERE tblusers.Id = ?", [params]);
    return result;
}

