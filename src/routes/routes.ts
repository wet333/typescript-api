import { Router } from "express";

// Controllers
import * as statusControllers from './../controllers/api-info/status';
import * as authController from "../controllers/sessions/login";

export const router = Router();

// Routes
router.get("/status/api", statusControllers.apiStatus);
router.get("/status/database", statusControllers.dbStatus);

router.get("/test/database/write", statusControllers.dbWriteTest);
router.get("/test/database/read", statusControllers.dbReadTest);
router.delete("/test/database/delete", statusControllers.dbDeleteTest);

router.post("/auth/login", authController.login);