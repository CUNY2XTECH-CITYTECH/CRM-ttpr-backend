import { Router } from "express";
import { getDepartmentById, updateDepartment, deleteDepartment, createDepartment, getDepartment} from "../controllers/departmentController.js"; 

const DepartmentRouter = Router();
DepartmentRouter.post('/create', createDepartment);
DepartmentRouter.get('/:id', getDepartmentById);
DepartmentRouter.get('/', getDepartment);
DepartmentRouter.post('/update', updateDepartment);
DepartmentRouter.delete('/delete', deleteDepartment);
export default DepartmentRouter;
