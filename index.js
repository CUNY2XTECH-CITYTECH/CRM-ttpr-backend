import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connection from './config/connection.js'
import UserRouter from './routes/userRoute.js'
import LoginRouter from './routes/loginRoute.js'
import RefreshRouter from './routes/refreshRoute.js'
import CompanyRouter from './routes/companyRoute.js'
import InternshipRouter from './routes/internshipRoute.js'
import cookieParser from 'cookie-parser'
import { checkToken } from './middlewares/middleware.js'
import AdminProfileRouter from './routes/adminRoute.js'
import DepartmentRouter from './routes/departmentRoute.js'
import IndustryRouter from './routes/industryRoute.js'
import StateRouter from './routes/stateRouter.js'
import CityRouter from './routes/CityRoute.js'
import PositionRouter from './routes/positionRoute.js'
import { emailRoute } from './routes/emailRoute.js'
import interestRouter from './routes/interestRoute.js'

import StudentRouter from './routes/studentRoute.js'
import MajorRouter from './routes/majorRoute.js'
// import AppointmentRouter from './routes/appointmentRoute.js'
const app = express()
dotenv.config()
const port = process.env.PORT
connection()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET_KEY))
app.use(express.json())
// routes
app.use('/api/interests',interestRouter)
app.use('/api/adminProfile', checkToken, AdminProfileRouter)
app.use('/api/refresh', RefreshRouter)
app.use('/api/internship', checkToken, InternshipRouter)
app.use('/api/company', checkToken, CompanyRouter)
app.use('/api/industry', IndustryRouter)
app.use('/api/users', UserRouter)
app.use('/api/auth', LoginRouter)
app.use('/api/refresh', RefreshRouter)
app.use('/api/internship', InternshipRouter)
app.use('/api/department', checkToken, DepartmentRouter)
app.use('/api/position', checkToken, PositionRouter)
app.use('/api/cities', CityRouter)
app.use('/api/states', StateRouter)
app.use('/api/email', checkToken, emailRoute)
app.use('/api/studentProfile', checkToken, StudentRouter)
app.use('/api/,major', checkToken, MajorRouter)
// app.use('/api/appointment', checkToken,AppointmentRouter)
// app.use('/api/email',checkToken,emailRoute)
app.listen(port, () => {

  console.log(`backend is running at localhost:${port}`)
})
