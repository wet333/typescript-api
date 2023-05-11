import { NextFunction, Request, Response } from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // If the user have a session with an user its allow to continue
    if (!(req.session as any).user) {
        return res.redirect("/api/login");
    }
    next();
}