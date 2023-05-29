import { getMP3fromYoutube } from './../controllers/yt-downloader/getMP3';
import { Router } from "express";

// Controllers
import * as statusControllers from './../controllers/api-info/status';
import * as authController from "../controllers/sessions/_controller";

export const router = Router();

// Routes ----------------------------------------------------------------------------------------------

// Status
router.get("/status/api", statusControllers.apiStatus);

// Database management
router.get("/status/database", statusControllers.dbStatus);
router.get("/run-migrations", statusControllers.runMigrations);

// Database tests
router.get("/test/database/write", statusControllers.dbWriteTest);
router.get("/test/database/read", statusControllers.dbReadTest);
router.delete("/test/database/delete", statusControllers.dbDeleteTest);

// Sessions
router.post("/auth/login", authController.login);
router.get("/auth/logout", authController.logout);
router.post("/auth/register", authController.register);

// Youtube Audio
router.post("/yt", getMP3fromYoutube);