const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' }); // Try .env.local first
require('dotenv').config(); // Fallback to .env

async function migrate() {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not defined');
        process.exit(1);
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });

    try {
        console.log('Connecting to database...');
        const client = await pool.connect();
        console.log('Connected successfully.');

        console.log('Adding source column to enquiries table if not exists...');
        await client.query(`
            ALTER TABLE enquiries 
            ADD COLUMN IF NOT EXISTS source VARCHAR(255) DEFAULT 'direct';
        `);

        console.log('Migration completed successfully.');
        client.release();
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await pool.end();
    }
}

migrate();
