import LoginCredentials from '../models/Login.js'
import User from '../models/User.js'
import { catchAsync, generateTokenPair } from '../utils/commonFunctions.js'
import * as argon2 from 'argon2'

export const loginAttempt = catchAsync(async (req, res, next) => {
  const { email: req_email, password: req_pwd } = req.body;
  const user = await User.find({ email: req_email })
  if (user.length == 0) {
    res.status(201).json({ message: "you have to register first to log in" })
  }
  else {
    const { _id, email, password, role, verified, locked } = user[0]
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
      const { access_token, refresh_token } = generateTokenPair({ userId: _id })
      const durationInSeconds = 7 * 24 * 60 * 60; // 7 days in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
      console.log(currentTimestamp)
      const expiresAtTimestamp = currentTimestamp + durationInSeconds;
      console.log(expiresAtTimestamp)
      const data = {
        refresh_token: refresh_token,
        user_id: _id,
        email: email,
        is_first_login: true,
        created_at: currentTimestamp,
        expired_at: expiresAtTimestamp
      }
      let session_exists = await LoginCredentials.find({ email: email })
      console.log(session_exists.length, 'session_exists')
      if (session_exists.length > 0) {
        data.is_first_login = false
        await LoginCredentials.deleteMany({ email: email })
      }
      const replace =await LoginCredentials.create(data)
      res.cookie('access_token', access_token, {
        secure: true,
        maxAge: 24 * 60 * 60 * 2000 // 1 day
      })
      res.status(200).json({
        message: {
          role: role,
          is_first_login: data.is_first_login
        }
      })
    }
  }
})

export const refreshAccessToken = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId, 'userId')
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const { access_token, refresh_token } = generateTokenPair({ userId: userId })

  let get_refresh_Tk = await LoginCredentials.find({ user_id: userId })
  // if not expired and refresh_token exists
  console.log(get_refresh_Tk, 'get_refresh_Tk')
  if (get_refresh_Tk[0]?.expired_at > currentTimestamp) {
    await LoginCredentials.updateOne({ user_id: userId }, { $set: { refresh_token: refresh_token } })
    res.cookie('access_token', access_token, {
      secure: true,
      maxAge: 24 * 60 * 60 * 2000
    })
    return res.status(200).json({ message: "Refreshed successfully" })
  }
  else {
    return res.status(401).json({ message: "Refresh token expired" })
  }
}
)
export const logoutAttempt = catchAsync(async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      secure: true,
      path: '/'
    })
    res.status(200).json({ message: "Logged out" });
  }
  catch (error) {
    console.log(error)
  }
}
)
