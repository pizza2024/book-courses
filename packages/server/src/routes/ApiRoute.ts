import express from 'express';
import AuthController from '../controllers/AuthController';
abstract class ApiRoute {
  protected router;
  protected prefix;
  protected controller;
  constructor(controller: AuthController, prefix?: string) {
    this.router = express.Router()
    this.controller = controller
    this.prefix = prefix || '/';
    this.setRouter();
  }
  protected setRouter(): void {
    this.router.get(this.prefix, this.controller.get)
    this.router.post(this.prefix, this.controller.post)
    this.router.put(this.prefix, this.controller.put)
    this.router.delete(this.prefix, this.controller.delete)
  }
  protected getRouter() {
    return this.router
  }
}
export default ApiRoute