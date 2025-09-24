import { Router } from "express";
import { createUsers, getUsers, getOneUser,updateUser, deleteUser, getRegisteredStaffs,getVerifiedStaffs,getStudents,getPendingStaffs, matrix, actionPendingStaff, getCurrentUser } from "../controllers/userController.js";
import { checkToken } from "../middlewares/middleware.js";

const UserRouter = Router()
UserRouter.get('/',checkToken,getUsers)
UserRouter.get('/me',checkToken,getCurrentUser)
UserRouter.get('/:id',checkToken,getOneUser)
UserRouter.post('/create',createUsers)
UserRouter.post('/update',checkToken,updateUser)
UserRouter.delete('/delete',checkToken,deleteUser)
UserRouter.get('/getRegisteredStaffs',checkToken,getRegisteredStaffs)
UserRouter.get('/getVerifiedStaffs',checkToken,getVerifiedStaffs)
UserRouter.get('/getStudents',checkToken,getStudents)
UserRouter.get('/getPendingStaffs',checkToken,getPendingStaffs)
UserRouter.get('/getPendingStaffs',getPendingStaffs)
UserRouter.get('/getMatrix',checkToken,matrix)
UserRouter.patch('/actionPendingStaff/:id',checkToken,actionPendingStaff)
export default UserRouter;

