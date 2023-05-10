import { Router } from "express";

// Routes imports
import { messagesRouter } from "./feature-messages/messages-router";
import { generalRouter } from "./general";

const router = Router();

// Routes
router.use("/", generalRouter);
router.use("/messages", messagesRouter);

export { router };