import db from "../database/database.js";

export const createUser = async (table, input) => {
    const [results] = await db.query(`INSERT INTO \`${table}\` SET ?`, [input]);
    return results;
};

export async function selectUser (params) {
    const [results] = await db.query("SELECT * FROM tbluser WHERE googleId = ?", [params]);
    return results[0];
};

export const SelectUserNoGoogle = async (params) => {
    const [results] = await db.query("SELECT * FROM tblNoGoogleUser WHERE email = ?", [params]);
    return results[0];
};