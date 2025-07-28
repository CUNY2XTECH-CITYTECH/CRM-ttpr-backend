import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connection from './config/connection.js'
import StaffRouter from './routes/staffRoute.js'
const app = express()
dotenv.config()
const port = process.env.PORT
connection()

app.use(cors())
app.use(express.json())
// routes
app.use('/api/staff', StaffRouter)

app.listen(port, () => {
  console.log(`backend is running at localhost:${port}`)
})
