import { Router } from 'express';
import { getStaff,createStaff } from '../controllers/staffController.js';
const StaffRouter= Router();

StaffRouter.get('/', getStaff);
StaffRouter.post('/', createStaff);

export default StaffRouter;


