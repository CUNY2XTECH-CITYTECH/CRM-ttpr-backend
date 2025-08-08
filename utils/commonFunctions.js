// common function for async and try, catch
// this is a higher order function
// which takes an async function as it's parameter and return an async function
import jwt from 'jsonwebtoken'
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      res.status(400).json({ message: err.message })
    )
  }
}

export const checkToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: "Login first" })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      console.log(process.env.ACCESS_TOKEN_SECRET_KEY)
    console.log('dc', err,decoded)
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate" })
    }
    next()
  })
}
