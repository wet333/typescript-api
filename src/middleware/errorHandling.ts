import { NextFunction, Request, Response } from "express";
import { GeneralError } from "../models/errors/errorTypes";

export async function errorMiddleware (err: GeneralError, req: Request, res: Response, next: NextFunction) {

    console.log(err);

    res.status(err.getStatusCode() || 500);
    res.json(err.getError());
}