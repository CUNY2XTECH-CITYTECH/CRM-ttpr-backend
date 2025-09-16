import { Router} from "express";
import { createTechStacks, deleteTechStacks, getTechStacksById, updateTechStacks} from "../controllers/techstacksController.js";

const TechStacksRouter = Router();
TechStacksRouter.post('/create', createTechStacks);
TechStacksRouter.get('/:id', getTechStacksById);
TechStacksRouter.post('/update', updateTechStacks);
TechStacksRouter.delete('/delete', deleteTechStacks);
export default TechStacksRouter;