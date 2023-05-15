import { Database } from "./../Database";
    
export async function up() {

    const db = Database.getInstance();

    try {
        await db.runQuery('BEGIN');
        // Migrations code start:

        await db.runQuery("CREATE TABLE IF NOT EXISTS test_table ( id SERIAL PRIMARY KEY,name VARCHAR(255),age INT);");
        const addItemQuery: string = 'INSERT INTO test_table (name, age) VALUES ($1, $2)';

        const name = "asdasdasda";
        const age = Math.floor(Math.random() * 100);
        await db.runQuery(addItemQuery, [name + "0002", age]);

        // Migration code end.
        await db.runQuery('COMMIT');

    } catch (error) {
        await db.runQuery('ROLLBACK');
        throw error;
    }
}