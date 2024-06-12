import UserRoute from "./UserRoute";
const userRouter = new UserRoute('/user')
userRouter.setPrefix('/test')
const routes = [
  userRouter
]

export default routes