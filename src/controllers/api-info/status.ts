import { Request, Response } from "express"
import { db } from "../../config/db-connection";

export const apiStatus = async (req: Request, res: Response) => {
    try {
        const status = {
            status: "OK"
        }
        res.status(200).json(status);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

export const dbStatus = async (req: Request, res: Response) => {
    try {
        
        db.query("SELECT 1")
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

export function version (req: Request, res: Response) : void {
    try {
        res.status(200).json({
            version: "v1.0.0"
        });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}