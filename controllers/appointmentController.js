import Appointment from '../models/Appointment.js'
import { catchAsync } from '../utils/commonFunctions.js'
import { sendEmail } from '../utils/emailService.js'

export const createAppointment = catchAsync(async(req, res, next) => {
  const appointmentData = {
    title: req.body.title,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    company: req.body.company,
    staff: req.body.staff,
    client: req.body.client,
    location: req.body.location,
    notes: req.body.notes
  }

  const appointment = await Appointment.create(appointmentData)
  
  res.status(200).json({
    status: 'success',
    data: appointment
  })
})

export const getAppointments = catchAsync(async (req, res, next) => {
  const { company, staff, client, startDate, endDate } = req.query
  let filter = {}
  
  if (company) filter.company = company
  if (staff) filter.staff = staff
  if (client) filter.client = client
  if (startDate && endDate) {
    filter.startTime = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }

  const appointments = await Appointment.find(filter)
    .populate('company')
    .populate('staff')
    .populate('client')

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: appointments
  })
})

export const getAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('company')
    .populate('staff')
    .populate('client')

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: appointment
  })
})

export const updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('company').populate('staff').populate('client')

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: appointment
  })
})

export const deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id)

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})

export const sendInvite = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('company')
    .populate('staff')
    .populate('client')

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404))
  }

  // Send email invitation
  const emailContent = `
    <h2>Appointment Invitation</h2>
    <p>You have been invited to an appointment with ${appointment.company.name}</p>
    <p><strong>Title:</strong> ${appointment.title}</p>
    <p><strong>Description:</strong> ${appointment.description}</p>
    <p><strong>Time:</strong> ${appointment.startTime.toLocaleString()} - ${appointment.endTime.toLocaleString()}</p>
    <p><strong>Location:</strong> ${appointment.location}</p>
    <p><strong>Staff:</strong> ${appointment.staff.name}</p>
  `

  await sendEmail({
    to: appointment.client.email,
    subject: `Appointment Invitation: ${appointment.title}`,
    html: emailContent
  })

  // Update appointment to mark invite as sent
  appointment.inviteSent = true
  await appointment.save()

  res.status(200).json({
    status: 'success',
    message: 'Invitation sent successfully',
    data: appointment
  })
})