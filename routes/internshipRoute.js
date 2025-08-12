import { Router } from "express";
import {createInternship, getInternship, getOneInternship,updateInternship, deleteInternship} from "../controllers/internshipController.js";

const InternshipRouter = Router()
InternshipRouter.get('/',getInternship)
InternshipRouter.post('/id',getOneInternship)
InternshipRouter.post('/create',createInternship)
InternshipRouter.post('/update',updateInternship)
InternshipRouter.delete('/delete',deleteInternship)

export default InternshipRouter;
    