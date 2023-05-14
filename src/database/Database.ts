import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
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
                CREATE TABLE IF NOT EXISTS migrations (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    executed_at TIMESTAMPTZ DEFAULT NOW()
                );
            `).then(() => { console.log("Migration table created") });
            
        } catch (error) {
            throw new Error(`Error initializing migrations tables: ${error}`);
        }
    }

}