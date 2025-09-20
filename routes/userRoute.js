import { Router } from "express";
import { createUsers, getUsers, getOneUser,updateUser, deleteUser, getRegisteredStaffs,getVerifiedStaffs,getStudents,getPendingStaffs, matrix, actionPendingStaff } from "../controllers/userController.js";

const UserRouter = Router()
UserRouter.get('/',getUsers)
UserRouter.get('/me',getOneUser)
UserRouter.post('/create',createUsers)
UserRouter.post('/update',updateUser)
UserRouter.delete('/delete',deleteUser)
UserRouter.get('/getRegisteredStaffs',getRegisteredStaffs)
UserRouter.get('/getVerifiedStaffs',getVerifiedStaffs)
UserRouter.get('/getStudents',getStudents)
UserRouter.get('/getPendingStaffs',getPendingStaffs)
UserRouter.get('/getMatrix',matrix)
UserRouter.patch('/actionPendingStaff/:id',actionPendingStaff)
export default UserRouter;

