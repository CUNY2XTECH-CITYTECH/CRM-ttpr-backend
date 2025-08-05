import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connection from './config/connection.js'
import UserRouter from './routes/userRoute.js'
const app = express()
dotenv.config()
const port = process.env.PORT
connection()

app.use(cors())
app.use(express.json())
// routes
app.use('/api/user',UserRouter)
app.listen(port, () => {
  console.log(`backend is running at localhost:${port}`)
})
