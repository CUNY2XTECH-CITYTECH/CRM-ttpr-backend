import { Router } from "express";
import { loginAttempt } from "../controllers/loginController.js";

const LoginRouter = Router()
LoginRouter.post('/',loginAttempt)
export default LoginRouter

