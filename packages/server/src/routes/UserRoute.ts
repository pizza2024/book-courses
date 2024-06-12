import UserController from "../controllers/UserController";
import ApiRoute from "./ApiRoute";

class UserRoute extends ApiRoute {
  protected prefix: string;
  constructor(path: string, prefix?: string) {
    super(new UserController(), path)
    this.prefix = prefix || '';
  }
  public getRouter() {
    return this.router
  }
  public setPrefix(prefix: string) {
    this.prefix = prefix
  }
  public getPrefix() {
    return this.prefix
  }
}

export default UserRoute