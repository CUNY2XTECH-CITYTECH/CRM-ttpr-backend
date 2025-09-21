// common function for async and try, catch
// this is a higher order function
// which takes an async function as it's parameter and return an async function

import jwt from 'jsonwebtoken'
import { promises as fs } from 'fs';



export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      res.status(400).json({ message: err.message })
    )
  }
}

export const generateTokenPair = (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h' })
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' })
  return { access_token, refresh_token }
}
export const readAndParseFileToJSON = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8')
  const jsonData = JSON.parse(data)
  return jsonData
}
