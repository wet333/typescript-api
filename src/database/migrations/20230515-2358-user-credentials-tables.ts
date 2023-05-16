
import { Database } from "./../Database";

export async function up() {

    const db = Database.getInstance();

    try {
        
        await db.runQuery('BEGIN');
        // Migrations code start:

        await db.runQuery(`
            CREATE TABLE user_credentials (
                id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                last_edit TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Migration code end.
        await db.runQuery('COMMIT');

    } catch (error) {
        await db.runQuery('ROLLBACK');
        throw error;
    }
};
    