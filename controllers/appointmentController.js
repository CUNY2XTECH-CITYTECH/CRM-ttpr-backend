import Appointment from '../models/Appointment.js';

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const {title, description, startTime, endTime, participant, staff, meetingType, location,
      notes, agenda,meetingLink} = req.body;

    // Basic validation
    if (!title || !description || !startTime || !endTime || !participant || !staff) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: title, description, startTime, endTime, participant, staff'
      });
    }

    // Validate end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({
        status: 'error',
        message: 'End time must be after start time'
      });
    }

    const appointmentData = {
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      participant,
      staff,
      meetingType: meetingType || 'in-person',
      location: location || '',
      notes: notes || '',
      agenda: agenda || '',
      meetingLink: meetingLink || ''
    };

    const appointment = await Appointment.create(appointmentData);

    res.status(201).json({
      status: 'success',
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create appointment',
      error: error.message
    });
  }
};

// Get all appointments with optional filtering
export const getAppointments = async (req, res) => {
  try {
    const { 
      participant, 
      staff, 
      status, 
      meetingType, 
      startDate, 
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    let filter = {};

    // Build filter based on query parameters
    if (participant) filter.participant = participant;
    if (staff) filter.staff = staff;
    if (status) filter.status = status;
    if (meetingType) filter.meetingType = meetingType;

    // Date range filtering
    if (startDate || endDate) {
      filter.startTime = {};
      if (startDate) filter.startTime.$gte = new Date(startDate);
      if (endDate) filter.startTime.$lte = new Date(endDate);
    }

    const appointments = await Appointment.find(filter)
      .sort({ startTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

// Get single appointment by ID
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch appointment',
      error: error.message
    });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      participant,
      staff,
      meetingType,
      location,
      status,
      notes,
      agenda,
      meetingLink,
      inviteSent,
      reminderSent
    } = req.body;

    // Validate end time is after start time if both are provided
    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({
        status: 'error',
        message: 'End time must be after start time'
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime && { endTime: new Date(endTime) }),
        ...(participant && { participant }),
        ...(staff && { staff }),
        ...(meetingType && { meetingType }),
        ...(location && { location }),
        ...(status && { status }),
        ...(notes && { notes }),
        ...(agenda && { agenda }),
        ...(meetingLink && { meetingLink }),
        ...(inviteSent !== undefined && { inviteSent }),
        ...(reminderSent !== undefined && { reminderSent })
      },
      {
        new: true, // Return updated document
        runValidators: true // Run model validators
      }
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update appointment',
      error: error.message
    });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Appointment deleted successfully',
      data: null
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete appointment',
      error: error.message
    });
  }
};

// Send invitation
export const sendInvite = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found with that ID'
      });
    }

    // Simulate sending email invitation
    console.log('Sending invitation email...');
    console.log(`To: Participant - ${appointment.participant}`);
    console.log(`To: Staff - ${appointment.staff}`);
    console.log(`Subject: Appointment Invitation: ${appointment.title}`);
    console.log(`Time: ${appointment.startTime}`);
    console.log(`Location: ${appointment.location}`);

    // Update appointment to mark invite as sent
    appointment.inviteSent = true;
    await appointment.save();

    res.status(200).json({
      status: 'success',
      message: 'Invitation sent successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error sending invitation:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send invitation',
      error: error.message
    });
  }
};

// Get appointments by student/participant
export const getStudentAppointments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { status, upcoming } = req.query;

    let filter = { participant: studentId };

    if (status) filter.status = status;
    if (upcoming === 'true') {
      filter.startTime = { $gte: new Date() };
    }

    const appointments = await Appointment.find(filter)
      .sort({ startTime: 1 })
      .exec();

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching student appointments:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch student appointments',
      error: error.message
    });
  }
};

// Get appointments by staff member
export const getStaffAppointments = async (req, res) => {
  try {
    const { staffId } = req.params;
    const { status, date, upcoming } = req.query;

    let filter = { staff: staffId };

    if (status) filter.status = status;
    if (upcoming === 'true') {
      filter.startTime = { $gte: new Date() };
    }

    // Filter by specific date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      filter.startTime = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const appointments = await Appointment.find(filter)
      .sort({ startTime: 1 })
      .exec();

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching staff appointments:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch staff appointments',
      error: error.message
    });
  }
};