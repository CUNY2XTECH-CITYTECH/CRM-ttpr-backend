// register info for all users
// name, email, id, role(student or staff), locked, verified

import mongoose from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  email: {
    type: String, required: true,
    validate: {
      validator: function(val) {
        return emailRegex.test(val)
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  id: {
    type: String,
    required: true,
    validate: {
      validator: function(val) {
        return !isNaN(val) && val.length === 8
      },
      message: 'id must be number and must have 8 digits'
    }
  },
  password: {
    type: String,
    required: true,
    message: 'password must be longer than 8 characters and must include a digit, a letter, a special character'
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    required: true
  },
  locked: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  }
})
export default mongoose.model('User', UserSchema)
