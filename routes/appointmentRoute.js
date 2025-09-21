import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  sendInvite
} from "../controllers/appointmentController.js";

const appointmentRouter = Router()

appointmentRouter.get('/', getAppointments)
appointmentRouter.get('/:id', getAppointment)
appointmentRouter.post('/create', createAppointment)
appointmentRouter.patch('/:id', updateAppointment)
appointmentRouter.delete('/:id', deleteAppointment)
appointmentRouter.post('/:id/send-invite', sendInvite)

export default appointmentRouter