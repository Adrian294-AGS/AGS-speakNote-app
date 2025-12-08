import db from "../database/database.js";

export const createUser = async (table, input) => {
    const [results] = await db.query(`INSERT INTO \`${table}\` SET ?`, [input]);
    return results;
};

export const verifyUser = async (params) => {
    const [results] = await db.query("SELECT display_name FROM tbl_users WHERE display_name = ?", [params]);
    return results[0];
};

export const SelectUserGoogle = async (params) => {
    const [results] = await db.query("SELECT B.display_name, B.photo, A.UID FROM tbl_user_account AS A RIGHT JOIN tbl_users AS B ON A.UID = B.UID WHERE A.providerr_id = ?", [params]);
    return results[0];
};

export const selectFacebookId = async (params) => {
    const [result] = await db.query("SELECT B.display_name, B.photo, A.UID FROM tbl_user_account AS A RIGHT JOIN tbl_users AS B ON A.UID = B.UID WHERE A.providerr_id = ?", [params]);
    return result[0];
};

export const loginUser = async (params) => {
    const [result] = await db.query("SELECT A.UID, A.display_name, A.password, B.provider FROM tbl_users AS A LEFT JOIN tbl_user_account As B ON A.UID = B.UID WHERE display_name = ?", [params]);
    return result[0];
};

export const selectResult = async (params) => {
    const [result] = await db.query("SELECT result_text FROM tbl_audio WHERE audio_id = ?", [params]);
    return result[0];
};

export const fetchAllAudio = async (params) => {
    const [result] = await db.query("SELECT audio_id, wav_file, result_text, txt_file_path, tbl_audio.created_at from tbl_users INNER JOIN tbl_audio ON tbl_users.UID = tbl_audio.UID WHERE tbl_users.UID = ? ORDER BY tbl_audio.created_at DESC", [params]);
    return result;
};

export const audioDelete = async (params) => {
    const [result] = await db.query("DELETE FROM tbl_audio WHERE audio_id = ?", [params]);
    return result;
};

export const fetchResultTxt = async (params) => {
    const [result] = await db.query("SELECT result_text FROM tbl_audio WHERE audio_id = ?", [params]);
    return result[0];
};

export const fetchUser = async (params) => {
    const [result] = await db.query("SELECT A.display_name, A.photo, A.email, B.userInfo FROM tbl_users AS A LEFT JOIN tbl_user_info AS B ON A.UID = B.UID WHERE A.UID = ?", [params]);
    return result[0];
};

////////////////////////////////////////////

export const updateUsers = async (set, tblId) => {
    const [result] = await db.query(`UPDATE tbl_users SET ? WHERE UID = ?`, [set, tblId]);
    return result;
};

export const updateUsersInfo = async (set, tblId) => {
    const [result] = await db.query(`UPDATE tbl_user_info SET ? WHERE info_id = ?`, [set, tblId]);
    return result;
};

export const selectUserInfo = async (params) => {
    const [result] = await db.query("SELECT B.info_id FROM tbl_users AS A JOIN tbl_user_info AS B ON A.UID = B.UID WHERE A.UID = ?",[params]);
    return result[0];
}