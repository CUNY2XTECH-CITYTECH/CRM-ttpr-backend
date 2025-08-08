import LoginCredentials from '../models/Login.js'
import User from '../models/User.js'
import { catchAsync } from '../utils/commonFunctions.js'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export const loginAttempt = catchAsync(async (req, res, next) => {
  const { email: req_email, password: req_pwd } = req.body;
  const user = await User.find({ email: req_email })
  if (user.length == 0) {
    res.status(201).json({ message: "you have to register first to log in" })
  }
  else {
    const { _id, name, email, password, role, verified, locked } = user[0]
    if (locked) {
      return res.status(403).json({ message: "Login is Forbidden" })
    }
    if (role === 'admin' && !verified) {
      return res.status(403).json({ message: "Please wait to be approved by school to login as admin" })
    }
    const match_pwd = await argon2.verify(password, req_pwd)
    if (!match_pwd) {
      res.status(401).json({ message: "Your password is incorrect" })
    }
    else {
      const payload = { name, email, role }
      const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' })
      const refresh_token = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' })
      const durationInSeconds = 7 * 24 * 60 * 60; // 7 days in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiresAtTimestamp = currentTimestamp + durationInSeconds;
      const data = {
        refresh_token: refresh_token,
        user_id: _id,
        email: email,
        created_at: currentTimestamp,
        expired_at: expiresAtTimestamp
      }
      let session_exists = await LoginCredentials.find({ email: email })
      if (session_exists.length > 0) {
        await LoginCredentials.deleteMany({ email: email })
      }
      await LoginCredentials.create(data)
      console.log('wtf', access_token)
      res.cookie('access_token', access_token, {
        secure: true,
        signed: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })
      res.status(200).json({
        message: {
          role: role,
          email: email,
        }
      })

    }
  }
})


