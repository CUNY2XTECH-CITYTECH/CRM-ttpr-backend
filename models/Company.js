// models/Company.js
import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    //    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactDepartment: {
    type: String,
    required: true
  },
  contactPosition: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  mission: {
    type: String,
  },
  contract: {
    type: String,
    //    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Company', companySchema)
