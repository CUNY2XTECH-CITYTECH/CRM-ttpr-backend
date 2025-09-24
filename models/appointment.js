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
    enum: [true, 'Location is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    trim: true
  },
  agenda: {
    type: String,
    trim: true
  },
  meetingLink: {
    type: String,
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
appointmentSchema.index({ student: 1, startTime: 1 });
appointmentSchema.index({ staff: 1, startTime: 1 });
appointmentSchema.index({ company: 1, startTime: 1 });

// Virtual for duration
appointmentSchema.virtual('duration').get(function() {
  return (this.endTime - this.startTime) / (1000 * 60); // duration in minutes
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;