import { Router } from "express";
import { getCities, getCitySuggestions } from "../controllers/stateCityController.js";
const CityRouter = Router();

CityRouter.get('/', getCities)
CityRouter.get('/:id', getCitySuggestions)
export default CityRouter
