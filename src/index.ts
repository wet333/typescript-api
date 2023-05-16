import express from "express";
import bodyParser from "body-parser";
import session from "express-session"
import { router } from "./routes/routes";import { Database } from "./database/Database";
import { errorMiddleware } from "./middleware/errorHandling";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000,
    },
    rolling: true
}));
Database.getInstance().createMigrationsTable();

// Routes
app.use("/api", router);

// Error handling
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server listening at port: " + PORT);
})