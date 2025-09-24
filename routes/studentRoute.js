import {Router} from 'express';
import { createStudentProfile, deleteStudentProfile, getStudentProfile, updateStudentProfile } from '../controllers/studentController.js';

const StudentRouter = Router();

StudentRouter.get('/:id', getStudentProfile);
StudentRouter.post('/create', createStudentProfile);
StudentRouter.post('/update/:id', updateStudentProfile);
StudentRouter.delete('/delete/:id', deleteStudentProfile);

export default StudentRouter;
