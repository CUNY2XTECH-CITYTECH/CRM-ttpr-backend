import { catchAsync } from '../utils/commonFunctions.js';
import Department from '../models/department.js';
import mongoose from 'mongoose';

export const createDepartment = catchAsync(async (req, res, next) => {
    const department = await Department.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            department,
        },
    });
});
export const getDepartment = catchAsync(async (req, res, next) => {
    const departments = await Department.find();
    res.body.status(200).json({
        status: 'success',
        results: departments.length,
        data: {
            departments,
        },
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
    res.status(200).json({
        status: 'success',
        data: {
            department,
        },
    });
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
    res.status(200).json({
        status: 'success',
        data: {
            department,
        },
    });
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
