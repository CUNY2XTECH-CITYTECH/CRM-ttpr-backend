import { Router } from "express";
import { sendEmail } from "../controllers/emailController.js";
import { checkToken } from "../middlewares/middleware.js";

export const emailRoute = Router();
emailRoute.post('/send', checkToken, sendEmail);
