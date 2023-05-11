import { Request, Response, Router } from "express";
import { MiddlewareFunction } from "../middleware/middleware-type";

export enum Method {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
    HEAD = 'head',
    OPTIONS = 'options',
    CONNECT = 'connect',
    TRACE = 'trace',
}

export class MainRouter {

    private static instance: MainRouter;

    private router: Router;

    private constructor(){
        this.router = Router();
    }

    public static getInstance () : MainRouter {
        if (!MainRouter.instance) {
            MainRouter.instance = new MainRouter();
        }
        return MainRouter.instance;
    }

    public getRouter () : Router {
        return this.router;
    }

    public addRoute ( method: Method, endpoint: string, controller: (req: Request, res: Response) => void, middlewares: Array<MiddlewareFunction> = [] ) : void {
        this.router[method](endpoint, ...middlewares, controller);
    }
}