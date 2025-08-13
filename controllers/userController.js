// logic for fetching and posting
import User from '../models/User.js'
import { catchAsync } from '../utils/commonFunctions.js'
import * as argon2 from 'argon2'
export const createUsers = catchAsync(async (req, res, next) => {
  // check if user with same email already exists
  const exist = await User.find({ email: req.body.email })
  if (exist.length == 0) {
    const pwd = await argon2.hash(req.body.password)
    const data = { ...req.body, ...{ password: pwd } }
    const user = await User.create(data)
    res.status(200).json(user)
  }
  else {
    const { verified, role, locked } = exist[0]
    res.status(201).json({ message: `user already exists with email ${req.body.email}`, role: role, verified: verified, locked: locked })
  }
}
)

export const getUsers = catchAsync(async (req, res, next) => {
  console.log('user', req.UserData)
  const user = await User.find()
  console.log(req.headers.authorization, 'lol')
  res.status(200).json(user)
}
)
export const getOneUser = catchAsync(async (req, res, next) => {
  // req.body should come as {id:'...'}
  const { userId } = req.UserData
  const user = await User.find({ _id: userId })
  res.status(200).json(user)
})
export const updateUser = catchAsync(async (req, res, next) => {
  const { _id, data } = req.body
  const user = await User.updateOne({ _id: _id }, { $set: data })
  const check = await User.find({ _id: _id })
  res.status(200).json(
    check
  )
}
)
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.deleteOne(req.body)
  res.status(200).json({
    deleted: true
  })

})

