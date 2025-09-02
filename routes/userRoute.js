import { Router } from "express";
import { createUsers, getUsers, getOneUser,updateUser, deleteUser } from "../controllers/userController.js";
import { checkToken } from "../middlewares/middleware.js";

const UserRouter = Router()
UserRouter.get('/',checkToken,getUsers)
UserRouter.get('/me',checkToken,getOneUser)
UserRouter.post('/create',createUsers)
UserRouter.post('/update',checkToken,updateUser)
UserRouter.delete('/delete',checkToken,deleteUser)
export default UserRouter;

