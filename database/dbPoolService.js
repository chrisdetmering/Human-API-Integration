const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: '5432',
    database: 'human_api',
    password: 'ChrisSQL',
})

module.exports = {
    getPool: () => pool
}