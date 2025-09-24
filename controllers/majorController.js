import {catchAsync} from '../utils/commonFunctions.js';
import Major from '../models/Major.js';

export const createMajor = catchAsync(async (req, res, next) => {
  const exist = await Major.find({
    name: req.body.name.toLowerCase()
  });
  if (exist.length === 0) {
    const major = await Major.create({ name: req.body.name.toLowerCase() });
    console.log('created major', major);
    res.status(200).json({
      major: major
    });
  }
  else {
    res.status(201).json({
      message: `Major already exists with name ${req.body.name}`,
      existingMajor: exist[0]
    });
  }
}
);
export const getMajor = catchAsync(async (req, res, next) => {
  const majors = await Major.find();
  res.status(200).json({
    majors: majors
  });
}
);
export const getMajorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const major = await Major.findById(id);
  if (!major) {
    return res.status(404).json({ message: 'Major not found' });
  }
  res.status(200).json({ majors: major });
}
);
export const updateMajor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const major = await Major.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!major) {
    return res.status(404).json({ message: 'Major not found' });
  }
  res.status(200).json({ majors: major });
}
);
export const deleteMajor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const major = await Major.findByIdAndDelete(id);
  if (!major) {
    return res.status(404).json({ message: 'Major not found' });
  }
  res.status(200).json({
    deleted: true
  });

}
);

