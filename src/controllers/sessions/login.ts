import { UserSessionData } from './../../models/session/sessionTypes';
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { ValidationError, ValidationErrorItem } from "../../models/errors/errorTypes";
import { isEmpty } from "../../utils/validationUtils";
import { Database } from "../../database/Database";

export const login = async (req: Request & { session: UserSessionData }, res: Response, next: NextFunction) => {

    try {
        const { username, password, email } = req.body;
        const validationErrors: ValidationErrorItem[] = [];

        // User input validation
        if (isEmpty(password)) {
            validationErrors.push({ field: "password", message: "please enter a password" });
        }
        if (isEmpty(email) && isEmpty(username)) {
            validationErrors.push({ field: "username | email", message: "please enter a username or an email"});
        }
        if (validationErrors.length > 0) {
            throw new ValidationError(req, "Invalid client data, failed to login", validationErrors);
        }

        const db = Database.getInstance();

        let findUser;
        if (!isEmpty(username)) {
            findUser = await db.runQuery("SELECT * FROM user_credentials WHERE username = $1;", [username]);
        } else {
            findUser = await db.runQuery("SELECT * FROM user_credentials WHERE email = $1;", [email]);
        }

        if (findUser.rowCount == 1) {
            const userData: { id: number, username: string, password: string, email: string } = findUser.rows[0];

            const isCorrectPassword = await bcrypt.compare(password, userData.password);

            if (isCorrectPassword) {
                req.session.username = username;
                req.session.email = email;
            } else {
                throw new ValidationError(req, "Invalid credentials, failed to login");
            }

        } else {
            throw new ValidationError(req, "Invalid credentials, failed to login");
        }

        res.json({ message: "user logged in" });
        
    } catch (error) {
        next(error);
    }

}