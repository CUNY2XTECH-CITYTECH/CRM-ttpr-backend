import { catchAsync } from '../utils/commonFunctions.js';
import Industry from '../models/industry.js';
import mongoose from 'mongoose';

export const createIndustry = catchAsync(async (req, res, next) => {
  const exist = await Industry.find({ name: req.body.name });
  if (exist.length === 0) {
    const industry = await Industry.create(req.body);
    res.status(200).json({industries:industry});
  }
  else {
    res.status(201).json({
      message: `Industry already exists with name ${req.body.name}`,
      existingIndustry: exist[0]
    });
  }
});

export const getIndustries = catchAsync(async (req, res, next) => {
  const industries = await Industry.find();
  res.status(200).json({industries:industries})
});

export const getIndustryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid industry ID' });
  }
  const industry = await Industry.findById(id);
  if (!industry) {
    return res.status(404).json({ message: 'Industry not found' });
  }
  res.status(200).json({industries:industry})
});

export const updateIndustry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid industry ID' });
  }
  const industry = await Industry.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!industry) {
    return res.status(404).json({ message: 'Industry not found' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      industry,
    },
  });
});
export const deleteIndustry = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid industry ID' });
  }
  const industry = await Industry.findByIdAndDelete(id);
  if (!industry) {
    return res.status(404).json({ message: 'Industry not found' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
