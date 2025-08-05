import { Router } from "express";
import { createUsers, getUsers, getOneUser,updateUser, deleteUser } from "../controllers/userController.js";

const UserRouter = Router()
UserRouter.get('/',getUsers)
UserRouter.post('/id',getOneUser)
UserRouter.post('/create',createUsers)
UserRouter.post('/update',updateUser)
UserRouter.delete('/delete',deleteUser)
export default UserRouter;

