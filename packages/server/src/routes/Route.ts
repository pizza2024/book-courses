import { NextFunction, Response, Router } from "express";
import { Request } from "express-jwt";
import AuthController from "../controllers/AuthController";
class Route {
    protected router;
    protected controller;
    protected path;
    constructor(path: string, controller: AuthController, middlewareList?: ((req: Request, res: Response, next: NextFunction) => void)[]) {
        const _middlewareList = middlewareList || [];
        this.path = path;
        this.controller = controller;
        this.router = Router();
        this.router.get(this.path, ..._middlewareList, this.controller.get)
        this.router.put(this.path, ..._middlewareList, this.controller.put)
        this.router.post(this.path, ..._middlewareList, this.controller.post)
        this.router.delete(this.path, ..._middlewareList, this.controller.delete)
    }
    getRoute() {
        return this.router
    }
}

export default Route