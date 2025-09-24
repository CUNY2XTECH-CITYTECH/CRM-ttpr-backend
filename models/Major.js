import mongoose from 'mongoose';
const MajorSchema = new mongoose.Schema({
  major_name: { type: String, required: true, minLength: 2 },
  degree: { type: String, required: true, enum: ['associate', 'bachelor', 'master', 'phd'] },
  track: {
    type: [String],
  },
  department_id: { type: String, required: true, minLength: 3 },
  description: { type: String },
}, { timestamps: true });
export default mongoose.model('Major', MajorSchema);
