import { Router } from "express";
import {createInternship, getInternship, getOneInternship,updateInternship, deleteInternship} from "../controllers/internshipController.js";

const InternshipRouter = Router()
InternshipRouter.get('/',getInternship)
InternshipRouter.get('/:id', getOneInternship)
InternshipRouter.post('/create',createInternship)
InternshipRouter.patch('/:id',updateInternship)
InternshipRouter.delete('/:id',deleteInternship)

export default InternshipRouter;
    