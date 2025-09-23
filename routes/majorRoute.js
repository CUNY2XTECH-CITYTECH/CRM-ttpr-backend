import Router from "express";
import { createMajor, deleteMajor, getMajor, getMajorById } from "../controllers/majorController.js";
import { checkToken } from "../middlewares/middleware.js";

const MajorRouter = Router();

MajorRouter.get("/",checkToken,getMajor); 
MajorRouter.post("/",checkToken,createMajor);
MajorRouter.get("/:id",checkToken,getMajorById);
MajorRouter.post("/:id",checkToken,deleteMajor);
MajorRouter.delete("/:id",checkToken,deleteMajor);

export default MajorRouter;
