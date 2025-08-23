const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Replace this with your new database connection string
const DATABASE_URL = process.env.DATABASE_URL || 'your-connection-string-here';

async function setupDatabase() {
    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Connecting to database...');
        
        // Read the SQL setup file
        const sqlFile = fs.readFileSync(path.join(__dirname, 'setup-database.sql'), 'utf8');
        
        // Remove the \dt command as it's not needed in script
        const sqlCommands = sqlFile.replace('\\dt', '');
        
        // Execute the SQL
        await pool.query(sqlCommands);
        
        console.log('✅ Database tables created successfully!');
        
        // Verify tables exist
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log('📋 Created tables:');
        result.rows.forEach(row => {
            console.log(`  - ${row.table_name}`);
        });
        
    } catch (error) {
        console.error('❌ Error setting up database:', error);
    } finally {
        await pool.end();
    }
}

setupDatabase();
