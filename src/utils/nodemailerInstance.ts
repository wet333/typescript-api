import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailer = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    }
});