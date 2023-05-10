import express from "express";
import bodyParser from "body-parser";

import { router } from "./api";

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server listening at port: " + PORT);
})