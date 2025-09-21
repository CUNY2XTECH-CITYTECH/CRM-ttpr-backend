import { Router } from "express";
import { getStates } from "../controllers/stateCityController.js";
const StateRouter = Router();

StateRouter.get('/',getStates)
export default StateRouter
