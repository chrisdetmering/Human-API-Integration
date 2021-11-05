const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'human_api',
    password: 'ChrisSQL',
})

module.exports = {
    getPool: () => pool
}