import mongoose from "mongoose";

const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+\/?$/
const AdminSchema = new mongoose.Schema({
  user_id: { type: String, required: true, minLength: 3 },
  department_id: { type: String, required: true, minLength: 3 },
  position: {
    type: String,
    enum: ['director', 'teacher', 'assistant teacher'],
    required: true
  },
  linkedin: {
    type: String,
    validate: {
      validator: function(val) {
        return linkedinRegex.test(val)
      },
      message: 'Invalid linkedin account'
    },
  },
  profileImage: {
    type: String
  }


})
export default mongoose.model('AdminProfile', AdminSchema)
