// companyController.js
// logic for fetching and posting company data
import Company from '../models/Company.js'
import Industry from '../models/industry.js'
import Department from '../models/department.js';
import Position from '../models/Position.js'
import { catchAsync } from '../utils/commonFunctions.js'



export const createCompany = catchAsync(async (req, res, next) => {
  // check if company with same email already exists
  const exist = await Company.find({ email: req.body.email })
  const { state, city, zipcode, street, ...otherInfo } = req.body
  const location = [street, city, state, zipcode].filter(Boolean).join(", ")
  if (exist.length === 0) {
    const data = {
      name: req.body.name.toLowerCase(),
      location: location,
      ...otherInfo
    }
    console.log('compay', data)
    const company = await Company.create(data)
    res.status(200).json(company)
  } else {
    res.status(201).json({
      message: `Company already exists with email ${req.body.email}`,
      existingCompany: exist[0]
    })
  }
})
export const createManyCompanies = catchAsync(async (req, res, next) => {
  const industryMap = new Map();
  const positionMap = new Map();
  const departmentMap = new Map();
  const industries = await Industry.find()
  const positions = await Position.find()
  const departments = await Department.find()
  industries.forEach(ind => {
    industryMap.set(ind.name.toLowerCase(), ind._id)
  });
  positions.forEach(pos => {
    positionMap.set(pos.name.toLowerCase(), pos._id)
  }
  )
  departments.forEach(dep => {
    departmentMap.set(dep.name.toLowerCase(), dep._id)
  })
  const companies = req.body?.data
  for (let comp of companies) {
    const { industry, contactPosition, contactDepartment,location } = comp
    if (industry && industryMap.has(industry.toLowerCase())) {
      comp.industry = industryMap.get(industry.toLowerCase())
    }
    else {
      const tryAddingIndustry = await Industry.create({ name: industry.toLowerCase() })
      industryMap.set(industry.toLowerCase(), tryAddingIndustry._id)
      comp.industry = tryAddingIndustry._id
    }
    if (contactPosition && positionMap.has(contactPosition.toLowerCase())) {
      comp.contactPosition = positionMap.get(contactPosition.toLowerCase())
    }
    else {
      const tryAddingPosition = await Position.create({ name: contactPosition.toLowerCase() })
      positionMap.set(contactPosition.toLowerCase(), tryAddingPosition._id)
      comp.contactPosition = tryAddingPosition._id
    }

    if (contactDepartment && departmentMap.has(contactDepartment.toLowerCase())) {
      comp.contactDepartment = departmentMap.get(contactDepartment.toLowerCase())
    }
    else {
      const tryAddingDepartment = await Department.create({ name: contactDepartment.toLowerCase() })
      departmentMap.set(contactDepartment.toLowerCase(), tryAddingDepartment._id)
      comp.contactDepartment = tryAddingDepartment._id
    }
    
  }
  try {
    const result= await Company.insertMany(companies, { ordered: false })
    res.status(200).json(result)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error inserting companies', error } )
  }
}
)
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
  console.log('received', req.body)
  let data = req.body
  let { state, city, zipcode, street, ...otherInfo } = data
  const location = [street, city, state, zipcode].filter(Boolean).join(", ")
  data = {
    ...otherInfo,
    location
  }
  console.log('updating', data)
  const company = await Company.findByIdAndUpdate(
    data._id,
    data,
    {
      new: true,
      runValidators: true
    }
  );

  if (!company) {
    res.status(404).json({ message: "No company found with that ID" })
  }

  res.status(200).json(company);
});

export const deleteCompany = catchAsync(async (req, res, next) => {

  console.log('deleting', req.params.id)
  const company = await Company.findByIdAndDelete(req.params.id)
  if (!company) {
    res.status(404).json({ message: "No company found with that ID" })
  }

  res.status(200).json({ message: "deleted successfully" })
})
