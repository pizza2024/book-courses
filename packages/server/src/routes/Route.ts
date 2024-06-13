import { Router } from "express";
import AuthController from "../controllers/AuthController";
class Route {
    protected router;
    protected controller;
    protected path;
    constructor(path: string, controller: AuthController) {
        this.path = path;
        this.controller = controller;
        this.router = Router();
        this.router.get(this.path, this.controller.get)
        this.router.put(this.path, this.controller.put)
        this.router.post(this.path, this.controller.post)
        this.router.delete(this.path, this.controller.delete)
    }
    getRoute() {
        return this.router
    }
}

export default Route