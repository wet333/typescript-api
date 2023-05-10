import { Request, Response } from "express"

export const apiStatus = async (req: Request, res: Response) => {
    try {
        const status = {
            status: "OK"
        }
        res.status(200).json(status);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}