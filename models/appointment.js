// import mongoose from 'mongoose'
//
// const appointmentSchema = new mongoose.Schema({
//                 title:
//                 {
//                     type : String,
//                     required: true
//                 },
//                 description:
//                 {
//                     type: String,
//                     required: true
//                 },
//                 startTime:
//                 {
//                     type: String,
//
//                 },
//                 endTime:
//                 {
//                     type:String,
//                     required: true
//                 },
//                 staff: 
//                 {
//                     mongoose:Schema.Types.OnjectId,
//                     ref: 'User'
//                 },
//                 student: 
//                 {
//                     mongoose:Schema.Types.OnjectId,
//                     ref: 'User'
//                 },
//                 status:
//                 {
//                     type: String,
//                     enum: ['scheduled','confirmed','cancelled','completed'],
//                     default: 'scheduled'
//                 },
//                 room:
//                 {
//                     type: String,
//                     required: true
//                 },
//                 inviteSent: 
//                 {
//                     type: Boolean,
//                     default: false
//                 }
// },      {timestamps: true})
//
// export default mongoose.model('Appointment', appointmentSchema)
