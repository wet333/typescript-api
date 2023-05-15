import { Request, Response } from "express"
import { Database } from "../../database/Database";

export async function apiStatus (req: Request, res: Response) : Promise<void> {
    try {
        const status = {
            status: "OK"
        }
        res.status(200).json(status);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

export async function dbStatus (req: Request, res: Response) : Promise<void> {
    try {
        
        Database.getInstance().runQuery("SELECT 1")
            .then(() => {
                console.log("Connected to the database");
                res.status(200).json({
                    status: "OK"
                });
            })
            .catch(() => {
                console.log("Error connecting to the database");
                res.status(200).json({
                    status: "DOWN"
                });
            });
        
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

export async function dbWriteTest (req: Request, res: Response) : Promise<void> {
    try {
        
        const db = Database.getInstance();

        await db.runQuery("CREATE TABLE IF NOT EXISTS test_table ( id SERIAL PRIMARY KEY,name VARCHAR(255),age INT);");

        const addItemQuery: string = 'INSERT INTO test_table (name, age) VALUES ($1, $2)';

        await db.runQuery(addItemQuery, ["Jonh Doe", 25]);
        await db.runQuery(addItemQuery, ["Jane Doe", 23]);
        await db.runQuery(addItemQuery, ["Bobby Smith", 31]);
        await db.runQuery(addItemQuery, ["Anna Thomas", 40]);
        
        res.status(200).json({ message: "All queries executed" });

    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

export async function dbReadTest (req: Request, res: Response) : Promise<void> {
    try {
        
        const db = Database.getInstance();
        const result = await db.runQuery("SELECT * FROM test_table;");
        res.status(200).json({ results: result.rows });

    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

export async function dbDeleteTest (req: Request, res: Response) : Promise<void> {
    try {
        
        const db = Database.getInstance();
        await db.runQuery("DELETE FROM test_table;");
        res.status(200).json({ message: "Table cleaned" });

    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

export async function runMigrations(req: Request, res: Response): Promise<void> {
    try {
        Database.getInstance().runMigrations();
        res.json({
            message: "Migrations executed successfully",
        })
    } catch (err) {
        res.status(500).send('Error: while running migrations, ' + err );
    }
}

export async function version (req: Request, res: Response) : Promise<void> {
    try {
        res.status(200).json({
            version: "v1.0.0"
        });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}