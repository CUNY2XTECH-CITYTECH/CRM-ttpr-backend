import { Router } from "express";
import {createAppointment,getAppointments, getAppointment,updateAppointment,
  deleteAppointment, sendInvite, getStudentAppointments,getStaffAppointments
} from "../controllers/appointmentController.js";

const AppointmentRouter = Router();
AppointmentRouter.post('/create', createAppointment);
AppointmentRouter.get('/', getAppointments);
AppointmentRouter.get('/:id', getAppointment);
AppointmentRouter.patch('/:id', updateAppointment);
AppointmentRouter.delete('/:id', deleteAppointment);
AppointmentRouter.post('/:id/send-invite', sendInvite);
AppointmentRouter.get('/student/:studentId', getStudentAppointments);
AppointmentRouter.get('/staff/:staffId', getStaffAppointments);

export default AppointmentRouter;