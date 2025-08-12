import { Router } from "express";
import {createCompany, getCompanies, getCompany,updateCompany, deleteCompany} from "../controllers/companyController.js";

const CompanyRouter = Router()
CompanyRouter.get('/',getCompanies)
CompanyRouter.get('/:id', getCompany)
CompanyRouter.post('/create',createCompany)
CompanyRouter.patch('/:id',updateCompany)
CompanyRouter.delete('/:id',deleteCompany)
export default CompanyRouter;
 