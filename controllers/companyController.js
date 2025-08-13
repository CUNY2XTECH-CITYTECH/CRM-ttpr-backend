// companyController.js
// logic for fetching and posting company data
import Company from '../models/Company.js'
import { catchAsync } from '../utils/commonFunctions.js'

export const createCompany = catchAsync(async(req, res, next) => {
  console.log(req.UserData,'to create compny')
  // check if company with same email already exists
  const exist = await Company.find({email: req.body.email})
  if(exist.length === 0) {
    const data = { 
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      industry: req.body.industry,
      mission: req.body.mission,
      contract: req.body.contract,
      location: req.body.location,
      website: req.body.website
    }
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
  res.status(200).json({
    status: 'success',
    results: companies.length,
    data: companies
  });
});

export const getCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findById(req.params.id)
  
  if (!company) {
    return next(new AppError('No company found with that ID', 404))
  }
  
  res.status(200).json({
    status: 'success',
    data: company
  });
});

export const updateCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!company) {
    return next(new AppError('No company found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: company
  });
});

export const deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id)

  if (!company) {
    return next(new AppError('No company found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})
