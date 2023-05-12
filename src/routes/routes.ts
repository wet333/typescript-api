import { Router, Request, Response } from "express";
import { APIDocumentation } from "../core/APIDocumentation";
import { MainRouter, Method } from "./../core/MainRouter";

export const router = Router();

// Controllers
import * as statusControllers from './../controllers/api-info/status';

// Routes
MainRouter.getInstance().addRoute(Method.GET, "/api/status", statusControllers.apiStatus);
APIDocumentation.getInstance().addEndpointDocumentation({
    method: "GET",
    endpoint: "/api/status",
    description: "Get the API status",
});

MainRouter.getInstance().addRoute(Method.GET, "/api/database-status", statusControllers.dbStatus);
APIDocumentation.getInstance().addEndpointDocumentation({
    method: "GET",
    endpoint: "/api/database-status",
    description: "Get the Database connection status",
});

MainRouter.getInstance().addRoute(Method.GET, "/api/database-write-test", statusControllers.dbWriteTest);
APIDocumentation.getInstance().addEndpointDocumentation({
    method: "GET",
    endpoint: "/api/database-write-test",
    description: "Create a database item for testing",
});

MainRouter.getInstance().addRoute(Method.GET, "/api/database-read-test", statusControllers.dbReadTest);
APIDocumentation.getInstance().addEndpointDocumentation({
    method: "GET",
    endpoint: "/api/database-read-test",
    description: "Read a database item for testing",
});

MainRouter.getInstance().addRoute(Method.DELETE, "/api/database-delete-test", statusControllers.dbDeleteTest);
APIDocumentation.getInstance().addEndpointDocumentation({
    method: "DELETE",
    endpoint: "/api/database-delete-test",
    description: "Delete all table items - test",
});

MainRouter.getInstance().addRoute(Method.GET, "/api/docs", (req: Request, res: Response) => {
    res.json(APIDocumentation.getInstance().getAllEndpointDocumentations());
});
APIDocumentation.getInstance().addEndpointDocumentation({
    method: "GET",
    endpoint: "/api/docs",
    description: "Get the API documentation as JSON",
});