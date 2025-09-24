import { Router } from "express";
import { createAdminProfile, deleteAdminProfile, getAdminProfile, getAdminProfileById, getAllAdminProfiles, updateAdminProfile } from "../controllers/adminController.js";

const AdminProfileRouter = Router()
AdminProfileRouter.get('/me',getAdminProfile)
AdminProfileRouter.get('/',getAllAdminProfiles)
AdminProfileRouter.get('/:id',getAdminProfileById)
AdminProfileRouter.post('/create',createAdminProfile)
AdminProfileRouter.post('/update',updateAdminProfile)
AdminProfileRouter.delete('/delete',deleteAdminProfile)
export default AdminProfileRouter;


