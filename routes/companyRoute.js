import { Router } from "express";
import {createCompany, getCompany, getOneCompany,updateCompany, deleteCompany} from "../controllers/companyController.js";

const CompanyRouter = Router()
CompanyRouter.get('/',getCompany)
CompanyRouter.post('/id',getOneCompany)
CompanyRouter.post('/create',createCompany)
CompanyRouter.post('/update',updateCompany)
CompanyRouter.delete('/delete',deleteCompany)
export default CompanyRouter;
 