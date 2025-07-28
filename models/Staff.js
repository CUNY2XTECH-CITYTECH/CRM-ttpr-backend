// model for db collections/ tables
import mongoose from "mongoose";
const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true })
export default mongoose.model('Staff', StaffSchema)
