import express from "express";
import bodyParser from "body-parser";
import session from "express-session"
import { router } from "./routes/routes";
import { Database } from "./database/Database";
import { errorMiddleware } from "./middleware/errorHandling";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET as string || "as8dsa09d8fysd098sy09fsad09f8syad0f98syad0f98syadf098saydf09s8adyf09s8adyf908asdyf",
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