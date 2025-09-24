
import mongoose from 'mongoose';
const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Appointment title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Appointment description is required'],
    trim: true
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  participant: {
    type: String,
    ref: 'User',
    required: [true, 'Participant is required']
  },
  staff: {
    type: String,
    ref: 'User',

    required: [true, 'Staff member is required']
  },
  meetingType: {
    type: String,
    required: ['online', 'in-person', 'hybrid'],
    default: 'in-person'
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'noshow','rescheduled'],
    default: 'completed'

  },
   notes: {
    type: String,
    trim: true
  },
    meetingLink: {
    type: String,
    required: [true, 'Meeting link is required'],
    trim: true
  },
  inviteSent: {
    type: Boolean,
    default: false
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
// Index for better query performance

appointmentSchema.index({ company: 1, startTime: 1 });
// Virtual for duration

appointmentSchema.virtual('duration').get(function() {
  return (this.endTime - this.startTime) / (1000 * 60); // duration in minutes
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
