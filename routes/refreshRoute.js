
import { Router } from "express";
import { refreshAccessToken } from "../controllers/loginController.js";

const RefreshRouter = Router()
RefreshRouter.post('/',refreshAccessToken)

export default RefreshRouter;
