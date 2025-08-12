import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connection from './config/connection.js'
import UserRouter from './routes/userRoute.js'
import LoginRouter from './routes/loginRoute.js'
import RefreshRouter from './routes/refreshRoute.js'
import cookieParser from 'cookie-parser'
import { checkToken } from './middlewares/middleware.js'
const app = express()
dotenv.config()
const port = process.env.PORT
connection()

app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET_KEY))
app.use(express.json())
// routes
app.use('/api/users',checkToken,UserRouter)
app.use('/api/auth',LoginRouter)
app.use('/api/refresh',RefreshRouter)

app.listen(port, () => {
  console.log(`backend is running at localhost:${port}`)
})
