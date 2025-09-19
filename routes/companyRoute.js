import { Router } from "express";
import {createCompany, getCompanies, getCompany,updateCompany, deleteCompany, createManyCompanies} from "../controllers/companyController.js";

const CompanyRouter = Router()
CompanyRouter.get('/',getCompanies)
CompanyRouter.get('/:id', getCompany)
CompanyRouter.post('/create',createCompany)
CompanyRouter.post('/createMany',createManyCompanies)
CompanyRouter.patch('/update',updateCompany)
CompanyRouter.delete('/delete/:id',deleteCompany)
export default CompanyRouter;
 
