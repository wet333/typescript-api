import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { ValidationError } from "../../models/errors/errorTypes";
import { isStringLengthBetween, isValidEmail, isValidPassword } from "../../utils/validationUtils";
import { Database } from "../../database/Database";

export async function register (req: Request, res: Response, next: NextFunction) {

    try {
        
        const { username, password, email } = req.body;
        const validationErrors: Object[] = [];

        // User input validation
        if (!isStringLengthBetween(username, 8, 30)) {
            validationErrors.push({ field: "username", message: "invalid username, check length and type" });
        }
        if (!isValidPassword(password)) {
            validationErrors.push({ field: "password", message: "invalid password, check length and type" });
        }
        if (!isValidEmail(email)) {
            validationErrors.push({ field: "email", message: "invalid email" });
        }
        if (validationErrors.length > 0) {
            throw new ValidationError(req, "Invalid client data, failed to register user", validationErrors);
        }

        const db = Database.getInstance();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // User already registered?
        const result = await db.runQuery(
            "SELECT * FROM user_credentials WHERE username = $1 OR email = $2",
            [username, email]
        );
        const isNewUser = result.rows.length > 0 ? false : true;

        if (isNewUser) {
            // Register new user
            await db.runQuery(
                "INSERT INTO user_credentials (username, password, email) VALUES ($1, $2, $3);",
                [username, hashedPassword, email]    
            );
        } else {
            throw new ValidationError(req, "Username or email is already taken.", validationErrors);
        }        

        res.json({ 
            status: "Success",
            message: "User " + username + " registered.",
        });

    } catch (error) {
        next(error);
    }
}