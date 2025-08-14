import { Router } from "express";
import { getIndustries, createIndustry } from "../controllers/industryController.js";
import { getIndustryById, updateIndustry, deleteIndustry } from "../controllers/industryController.js"; 

const IndustryRouter = Router();
IndustryRouter.post('/create', createIndustry);
IndustryRouter.get('/:id', getIndustryById);
IndustryRouter.get('/', getIndustries);
IndustryRouter.post('/update', updateIndustry);
IndustryRouter.delete('/delete', deleteIndustry);
export default IndustryRouter;

