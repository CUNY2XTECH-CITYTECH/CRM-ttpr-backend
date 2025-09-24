import mongoose from 'mongoose';
const TrackSchema = new mongoose.Schema({
  track_name: { type: String, required: true, minLength: 2 },
  degree_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true },
  description: { type: String },
}, { timestamps: true });
export default mongoose.model('Track', TrackSchema);
