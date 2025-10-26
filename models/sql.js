import db from "../database/database.js";

export const createUser = async (table, input) => {
    const [results] = await db.query(`INSERT INTO \`${table}\` SET ?`, [input]);
    return results;
};

export async function verifyUser (params) {
    const [results] = await db.query("SELECT display_name FROM tbl_users WHERE display_name = ?", [params]);
    return results[0];
};

export const SelectUserGoogle = async (params) => {
    const [results] = await db.query("SELECT UID, display_name FROM tbl_user_account WHERE providerr_id = ?", [params]);
    return results[0];
};

export const selectAudio = async (params) => {
    const [result] = await db.query("SELECT * FROM tblaudio WHERE AID = ?", [params]);
    return result[0];
};

export const fetchAllAudio = async (params) => {
    const [result] = await db.query("SELECT tblusers.UID, tblaudio.AID, wav_file, result_text, txt_file_path, tblaudio.created_at from tblusers INNER JOIN tblaudio ON tblusers.UID = tblaudio.user_id WHERE tblusers.UID = ?", [params]);
    return result;
};

export const audioDelete = async (params) => {
    const [result] = await db.query("DELETE FROM tblaudio WHERE AID = ?", [params]);
    return result;
};

export const fetchUser = async (params) => {
    const [result] = await db.query("SELECT * FROM tblusers WHERE UID = ?", [params]);
    return result[0];
};

export const selectFacebookId = async (params) => {
    const [result] = await db.query("SELECT UID, display_name FROM tbl_user_account WHERE providerr_id = ?", [params]);
    return result[0];
};

export const update = async (tblName, set, tblId) => {
    const [result] = await db.query(`UPDATE ${tblName} SET ? WHERE UID = ?`, [set, tblId]);
    return result;
};
