import express from "express";
import bodyParser from "body-parser";
import session from "express-session"
import { router } from "./routes/routes";;

const PORT = 3000;

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(session({
    secret: "adjs8shyf98s7adtf9gas87dft9as8d7f9as8d7f6as98df7t6sda98f7s6da9f87satyd9s87adfas9d87ftsa9d87ts9d87tasd8f7t",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000,
    },
    rolling: true
}))

// Routes
app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server listening at port: " + PORT);
})