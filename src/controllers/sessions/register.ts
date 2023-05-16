import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { ControllerError, ValidationError } from "../../models/errors/errorTypes";
import { isStringLengthBetween, isValidEmail, isValidPassword } from "../../utils/validationUtils";

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

        console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // TODO: user registration in DB

        res.json({ ...req.body, password: hashedPassword });

    } catch (error) {
        next(error);
    }
}