const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function connectToDb() {
    try {
        console.log('[DB] Connected to PostgreSQL');
        return pool;
    } catch (err) {
        console.error('[DB] Failed to connect to PostgreSQL:', err);
        throw err;
    }
}

module.exports = connectToDb;