// logic for fetching and posting
import User from '../models/User.js'
import { catchAsync } from '../utils/commonFunctions.js'

export const createUsers = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(200).json({
    data: user
  })
}
)
export const getUsers = catchAsync(async (req, res, next) => {
  const user = await User.find()
  res.status(200).json({
    data: user
  })
}
)
export const getOneUser = catchAsync(async (req, res, next) => {
  // req.body should come as {id:'...'}
  const user = await User.find(req.body)
  res.status(200).json({
    data: user
  })
})
export const updateUser = catchAsync(async (req, res, next) => {
  const { _id, data } = req.body
  const user = await User.updateOne({ _id: _id }, { $set: data })
  const check = await User.find({ _id: _id })
  res.status(200).json({
    data: check
  })
}
)
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.deleteOne(req.body)
  res.status(200).json({
    deleted:true 
  })

})

