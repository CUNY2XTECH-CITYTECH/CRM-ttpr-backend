// logic for fetching and posting
import AdminProfile from '../models/Admin.js'
import { catchAsync } from '../utils/commonFunctions.js'
export const createAdminProfile= catchAsync(async (req, res, next) => {
  // check if user with same email already exists
  const exist = await AdminProfile.find({ user_id: req.body.user_id})
  console.log('added data',req.body)
  if (exist.length == 0) {
    const data =  req.body 
    const user = await AdminProfile.create(data)
    res.status(200).json(user)
  }
  else {
    console.log(exist,'exits')
    const { user_id } = exist[0]
    res.status(201).json({ message: `userprofile already exists with id${req.body.user_id}`, role: role, verified: verified, locked: locked })
  }
}
)
export const getAllAdminProfiles= catchAsync(async (req, res, next) => {
  const user = await AdminProfile.find()
  res.status(200).json(user)
}
)
export const getAdminProfile= catchAsync(async (req, res, next) => {
  // req.body should come as {id:'...'}
  const { userId } = req.UserData
  const user = await AdminProfile.find({ user_id: userId })
  res.status(200).json(user)
})
export const updateAdminProfile = catchAsync(async (req, res, next) => {
  const { _id, data } = req.body
  const user = await AdminProfile.updateOne({ _id: _id }, { $set: data })
  const check = await AdminProfile.find({ _id: _id })
  res.status(200).json(
    check
  )
}
)
export const deleteAdminProfile = catchAsync(async (req, res, next) => {
  const user = await AdminProfile.findByIdAndDelete(req.body.id)
  res.status(200).json(user)
})

