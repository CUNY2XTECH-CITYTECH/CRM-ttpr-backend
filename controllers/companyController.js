// companyController.js
// logic for fetching and posting company data
import Company from '../models/Company.js'
import { catchAsync } from '../utils/commonFunctions.js'

export const createCompany = catchAsync(async(req, res, next) => {
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

export const getCompany = catchAsync(async (req, res, next) => {
  const companies = await Company.find()
  res.status(200).json({
    data: companies
  })
})

export const getOneCompany = catchAsync(async (req, res, next) => {

  const company = await Company.find(req.body)
  res.status(200).json({
    data: company
  })
})

export const updateCompany = catchAsync(async (req, res, next) => {
  const { _id, data } = req.body
  const company = await Company.updateOne({ _id: _id }, { $set: data })
  const check = await Company.find({ _id: _id })
  res.status(200).json({
    data: check
  })
})

export const deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.deleteOne(req.body)
  res.status(200).json({
    deleted: true
  })
})