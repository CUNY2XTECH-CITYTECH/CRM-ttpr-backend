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
export const matrix = catchAsync(async (req, res, next) => {
  const studentCount = await User.countDocuments({ role: 'student', locked: false });
  const staffCount = await User.countDocuments({ role: { $in: ['admin', 'staff'] }, locked: false, verified: true });
  const pendingStaffCount = await User.countDocuments({ role: { $in: ['admin', 'staff'] }, verified: false, locked: false });
  res.status(200).json({ studentCount, staffCount, pendingStaffCount })
})
export const actionPendingStaff = catchAsync(async (req, res, next) => {
  const { id } = req.params
  console.log(id,'id')
  const { action } = req.body // action should be either 'approve' or 'reject'
  const check = await User.find({ _id: id })
  console.log(check,'check')
  if(check.length!==0){
  if (action === 'approve') {
    const user = await User.updateOne({ _id: id }, { $set: { verified: true } })
   console.log(user,'user')
      res.status(200).json({message:"Staff approved successfully"})
  }
    else if (action === 'reject') {
      const user = await User.deleteOne({ _id: id })
      res.status(200).json({message:"Staff rejected and deleted successfully"})
    }
  }
  else{
    res.status(404).json({message:"No user found with the given id"})
  }
})
export const getRegisteredStaffs = catchAsync(async (req, res, next) => {
  const user = await User.find({ role: { $in: ['admin', 'staff'] }, locked: false })
  // Remove password field from each user object
  if(user.length===0){
    return res.status(200).json([])
  }
  const filteredUserData = user.map((_doc) => {
    const { password, ...userWithoutPassword } = _doc.toObject();
    return userWithoutPassword;
  })
  res.status(200).json(filteredUserData)
})
export const getStudents = catchAsync(async (req, res, next) => {
  const user = await User.find({ role: 'student', locked: false })
  res.status(200).json(user)
})
export const getVerifiedStaffs = catchAsync(async (req, res, next) => {
  const user = await User.find({ role: { $in: ['admin', 'staff'] }, verified: true, locked: false })
  res.status(200).json(user)
})
// export const getPendingStaffs = catchAsync(async (req, res, next) => {
//   const user = await User.find({ role: { $in: ['admin', 'staff'] }, verified: false, locked: false })
//   res.status(200).json(user)
// })
export const getPendingStaffs = catchAsync(async (req, res, next) => {
  let { page, pageSize } = req.query;

  try {
    // If "page" and "pageSize" are not sent we will default them to 1 and 50.
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 50;
    console.log(page, pageSize, 'pagination params');
    const users = await User.aggregate([
      { $match: { role: { $in: ['admin', 'staff'] }, verified: false, locked: false } },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{
            $sort: { createdAt: -1 }
          }, { $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        }
      }
    ]);
    console.log(users, 'paginated users');
    if (users.length === 0 || users[0].data.length === 0) {
      return res.status(200).json({
        success: true,
        metadata: { totalCount: 0, page, pageSize },
        pendingStaffs: [],
      });
    }
    return res.status(200).json({
      success: true,
      metadata: { totalCount: users[0].metadata[0].totalCount, page, pageSize },
      pendingStaffs: users[0].data,
    });
  } catch (error) {
    console.error('Error fetching paginated users:', error);
    return res.status(500).json(error);
  }
})
export const getLockedUsers = catchAsync(async (req, res, next) => {
  const user = await User.find({ locked: true })
  res.status(200).json(user)
})

export const getUsers = catchAsync(async (req, res, next) => {
  const user = await User.find(req.query?.role ? req.query : {})
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
  const user = await User.findByIdAndDelete(req.body.id)
  if(!user){
    return res.status(404).json({message:"No user found with the given id"})
  }

  res.status(200).json(user)
 
})

