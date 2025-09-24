// internshipController.js
// logic for fetching and posting internship data
import Internship from '../models/Internship.js'
import { catchAsync } from '../utils/commonFunctions.js'

export const createInternship = catchAsync(async(req, res, next) => {
  console.log(req.body)
  // check if internship with same position at same company already exists
  const exist = await Internship.find({
    company: req.body.company,
    position: req.body.position
  })
  
  if(exist.length === 0) {
    const data = { 
      company: req.body.company,
      position: req.body.position,
      salary: req.body.salary,
      requirements: req.body.requirements,
      responsibility: req.body.responsibility,
      details: req.body.details,
      applicationDeadline: req.body.applicationDeadline,
      tags: req.body.tags
    }
    const internship = await Internship.create(data)
    res.status(200).json(internship)
  } else {
    res.status(201).json({
      message: `Internship already exists for position ${req.body.position} at this company`,
      existingInternship: exist[0]
    })
  }
})

export const getInternship = catchAsync(async (req, res, next) => {
  const internships = await Internship.find()
  res.status(200).json({
    data: internships
  })
})

export const getOneInternship = catchAsync(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id)
  if (!internship) {
    return next(new AppError('No internship found with that ID', 404))
  }
  res.status(200).json({
    data: internship
  })
})

export const updateInternship = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const internship = await Internship.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  
  if (!internship) {
    return next(new AppError('No internship found with that ID', 404))
  }
  
  res.status(200).json({
    data: internship
  })
})

export const deleteInternship = catchAsync(async (req, res, next) => {
  console.log('I am here')
  const internship = await Internship.findByIdAndDelete(req.params.id)
  
  if (!internship) {
    return next(new AppError('No internship found with that ID', 404))
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  })
})