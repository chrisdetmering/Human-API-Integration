const pool = require('../database/dbPoolService').getPool()

const isExistingUser = async client_user_id => {
    const dbResponse = await pool.query(
        `SELECT * FROM users WHERE client_user_id = $1`,
        [client_user_id]);
    return dbResponse.rows.length > 0;
}

const addUser = async (client_user_id, client_user_email) => {
    const dbResponse = await pool.query(
        `INSERT INTO users(client_user_id, client_user_email) VALUES($1, $2) RETURNING *`,
        [client_user_id, client_user_email]
    );
    return dbResponse.rows[0];
}

module.exports = {
    isExistingUser,
    addUser
}