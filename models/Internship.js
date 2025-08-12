// models/Internship.js
import mongoose from 'mongoose'

const internshipSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  requirements: {
    type: [String], // Array of strings
    required: true
  },
  responsibility: {
    type: [String],
    required: true
  },
  details: {
    type: String,
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

// Index for better query performance on frequently accessed fields
internshipSchema.index({ company: 1, position: 1 })
internshipSchema.index({ tags: 1 })

export default mongoose.model('Internship', internshipSchema)