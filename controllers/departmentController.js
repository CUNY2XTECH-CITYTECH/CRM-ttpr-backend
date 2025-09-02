import { catchAsync } from '../utils/commonFunctions.js';
import Department from '../models/department.js';
import mongoose from 'mongoose';

export const createDepartment = catchAsync(async (req, res, next) => {
  const exist = await Department.find({
    name: req.body.name,
  });
  console.log('it does exist', exist.length);
  console.log(req.body,'body');
  if (exist.length === 0) {
    const department = await Department.create(req.body);
    console.log('created department', department);
    res.status(200).json({
      departments: department,
    });
  }
  else {
    res.status(201).json({
      message: `Department already exists with name ${req.body.name}`,
      existingDepartment: exist[0]
    });
  }
});
export const getDepartment = catchAsync(async (req, res, next) => {
  const departments = await Department.find();
  res.status(200).json({
    departments: departments,
  });
});
export const getDepartmentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }
  const department = await Department.findById(id);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  res.status(200).json({ departments: department });
});
export const updateDepartment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }
  const department = await Department.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  res.status(200).json({ departments: department });
});
export const deleteDepartment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }
  const department = await Department.findByIdAndDelete(id);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
