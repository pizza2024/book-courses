import UserRoute from "./UserRoute";
const userRouter = new UserRoute('/user')
userRouter.setPrefix('/api')
const routes = [
  userRouter
]

export default routes