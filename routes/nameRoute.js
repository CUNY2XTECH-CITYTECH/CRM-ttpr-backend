import { Router } from "express";
import {updateName, deleteName, createName, getName} from "../controllers/nameController.js";

const NameRouter = Router();
NameRouter.post('/create', createName);
NameRouter.get('/', getName);
NameRouter.post('/update', updateName);
NameRouter.delete('/delete', deleteName);
export default NameRouter;