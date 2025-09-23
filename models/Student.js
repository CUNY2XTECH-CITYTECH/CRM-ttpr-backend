import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
  user_id: { type: String, required: true, minLength: 3 },
  major: { type: String, required: true, minLength: 2 },
  graduationYear: {
    type: Number,
    validate: {
      validator: function(val) {
        const currentYear = new Date().getFullYear();
        return !isNaN(val) && val >= currentYear && val <= currentYear + 10;
      }
      ,
      message: props => `${props.value} is not a valid graduation year`
    }
  },
  gpa: {
    type: Number,
    min: [0.0, 'GPA must be at least 0.0'],
    max: [4.0, 'GPA cannot exceed 4.0']
  },
  interests: {
    type: [String],
    default: []
  },
  desiredRoles: {
    type: [String],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  linkedin: {
    type: String,
    validate: {
      validator: function(val) {
        return /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+\/?$/.test(val);
      },
      message: 'Invalid linkedin account'
    }
  },
  gitHub: {
    type: String,
    validate: {
      validator: function(val) {
        return /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9._-]+\/?$/.test(val);
      },
      message: 'Invalid GitHub account'
    }
  },
  address: {
    type: String,
    minLength: 5
  },
  resumeFile: {
    type: String
  },
  profileImage: {
    type: String
  }
}, { timestamps: true });
export default mongoose.model('StudentProfile', studentSchema);
