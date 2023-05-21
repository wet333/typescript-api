import { NextFunction, Request, Response } from "express";
import { ControllerError } from "../../models/errors/errorTypes";

export const logout = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        req.session.destroy((error) => {
            if (error) {
                throw new ControllerError(req, "Error while deleting session, plase try again.");
            }
        });

        res.json({
            message: "Logged out"
        });
        
    } catch (error) {
        next(error);
    }

}