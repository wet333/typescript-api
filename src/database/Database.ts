import { Pool, QueryResult } from "pg";
import * as path from "path";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;
const database = process.env.DB_DATABASE as string;
const host = process.env.DB_HOST as string;
const port = parseInt(process.env.DB_PORT || "5432", 10);

export class Database {

    private static instance: Database;

    private connectionPool: Pool;

    private constructor(){
        this.connectionPool = new Pool({
            user: user,
            password: password,
            database: database,
            host: host,
            port: port,
            max: 20
        });
    };

    public static getInstance() : Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async runQuery(query: string, params: any[] = []): Promise<QueryResult> {
        try {
            return await this.connectionPool.query(query, params);
        } catch (error) {
            throw new Error(`Error executing query: ${error}`);
        }
    }

    public createMigrationsTable(): void {
        try {
            
            this.connectionPool.query(`
                CREATE TABLE IF NOT EXISTS migrations_registry (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    executed_at TIMESTAMPTZ DEFAULT NOW()
                );
            `).then(() => { console.log("Migration table created") });
            // TODO: Only show this is the migration table is created, if not show nothing
            
        } catch (error) {
            throw new Error(`Error initializing migrations tables: ${error}`);
        }
    }

    public async runMigrations() {

        const db = Database.getInstance();
        const migrationFiles: string[] = fs.readdirSync(path.join(__dirname, "migrations"));

        const runnedMigrations = await db.runQuery("SELECT * FROM migrations_registry;");
        const migrationsToExclude = runnedMigrations.rows.map(migration => migration.name);

        // TODO: improve the filter to only accept valid migration names, the actual version will take any file in the folder as migration, and throw an error
        const pendingMigrations = migrationFiles.filter((file) => file === "migrations_cli.js" || !migrationsToExclude.includes(file.replace(".js", "")) );

        for ( const migrationFile of pendingMigrations ) {
            const migration: { up: () => Promise<void> } = await import(path.join(__dirname, "migrations", migrationFile));
            
            await migration.up();

            db.runQuery("INSERT INTO migrations_registry (name) VALUES ($1)", [migrationFile.replace(".js", "")]);  // .js porque se compila

            console.log("Executed: " + migrationFile);
        }
    }

}