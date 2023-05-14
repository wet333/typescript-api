import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {

    const { username, password, email } = req.body;

    console.log(req.body);

    res.json({ ...req.body });
}