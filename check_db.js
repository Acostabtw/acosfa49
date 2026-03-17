const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null
});

console.log('Attempting to connect with:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: !!process.env.DB_SSL
});

db.connect((err) => {
    if (err) {
        console.error('!!! Connection Error:', err);
        process.exit(1);
    }
    console.log('✅ Connected to database.');

    db.query('DESCRIBE registro', (err, results) => {
        if (err) {
            console.error('Error describing table:', err);
        } else {
            console.log('Table Structure (DESCRIBE registro):');
            console.table(results);
        }

        db.query('SHOW CREATE TABLE registro', (err, results) => {
            if (err) {
                console.error('Error showing create table:', err);
            } else {
                console.log('\nSHOW CREATE TABLE registro:');
                console.log(results[0]['Create Table']);
            }
            db.end();
        });
    });
});
