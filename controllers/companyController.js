// companyController.js
// logic for fetching and posting company data
import Company from '../models/Company.js'
import { catchAsync } from '../utils/commonFunctions.js'

export const createCompany = catchAsync(async(req, res, next) => {
  console.log(req.UserData,req.body,'to create compny')
  // check if company with same email already exists
  const exist = await Company.find({email: req.body.email})
  const {state,city,zipcode,street,...otherInfo} = req.body
  const location = [street,city,state,zipcode].filter(Boolean).join(", ")
  if(exist.length === 0) {
    const data = { 
      location:location,
      ...otherInfo
    }
    console.log('compay',data)
    const company = await Company.create(data)
    res.status(200).json(company)
  } else {
    res.status(201).json({
      message: `Company already exists with email ${req.body.email}`,
      existingCompany: exist[0]
    })
  }
})

export const getCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.find()
  res.status(200).json(companies);
});

export const getCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id)
  
  if (!company) {
    return next(new AppError('No company found with that ID', 404))
  }
  
  res.status(200).json(company);
});

export const updateCompany = catchAsync(async (req, res, next) => {
  console.log('received',req.body)
  const company = await Company.findByIdAndUpdate(
    req.body._id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!company) {
    return next(new AppError('No company found with that ID', 404))
  }

  res.status(200).json(company);
});

export const deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id)

  if (!company) {
    return next(new AppError('No company found with that ID', 404))
  }

  res.status(204).json({message:"deleted successfully"})
})
