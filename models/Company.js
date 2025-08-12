// models/Company.js
import mongoose from 'mongoose' 

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  contract: {
    type: String,
    required: true
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