import Student from '../models/Student.js';
import { catchAsync } from '../utils/commonFunctions.js';

export const createStudentProfile = catchAsync(async (req, res, next) => {
  // check if user with same email already exists
  const exist = await Student.find({ user_id: req.body.user_id });
  console.log('added data', req.body);
  if (exist.length == 0) {
    const data = req.body;
    const user = await Student.create(data);
    res.status(200).json(user);
  }
  else {
    const data = req.body;
    const { _id } = exist[0];
    const user = await Student.updateOne({ _id: _id }, { $set: data });
    res.status(200).json(user);
  }
}
);

export const getStudentProfile = catchAsync(async (req, res, next) => {
  // req.body should come as {id:'...'}
  const { userId } = req.UserData;
  const user = await Student.find({ user_id: userId });
  res.status(200).json(user);
});
export const updateStudentProfile = catchAsync(async (req, res, next) => {
  const { _id, data } = req.body;
  const user = await Student.updateOne({ _id: _id }, { $set: data });
  const check = await Student.find({ _id: _id });
  res.status(200).json(
    check
  );
}
);
export const deleteStudentProfile = catchAsync(async (req, res, next) => {
  const user = await Student.deleteOne(req.body);
  res.status(200).json({
    deleted: true
  });

}
)

