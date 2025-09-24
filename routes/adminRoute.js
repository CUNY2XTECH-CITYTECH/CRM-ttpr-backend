import { Router } from "express";
import { createAdminProfile, deleteAdminProfile, getAdminProfile, getAllAdminProfiles, updateAdminProfile } from "../controllers/adminController.js";

const AdminProfileRouter = Router()
AdminProfileRouter.get('/me',getAdminProfile)
AdminProfileRouter.get('/',getAllAdminProfiles)
AdminProfileRouter.post('/create',createAdminProfile)
AdminProfileRouter.post('/update',updateAdminProfile)
AdminProfileRouter.delete('/delete',deleteAdminProfile)
export default AdminProfileRouter;


