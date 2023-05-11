import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const port = parseInt(process.env.DB_PORT || "5432", 10);

export const db = new Pool({
    user: user,
    password: password,
    database: database,
    host: host,
    port: port,
    max: 20
});