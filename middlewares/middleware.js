import jwt from 'jsonwebtoken'
export const checkToken = (req, res, next) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
  if (!token) { return res.status(401).json({ message: "Login first" }) } jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
    ignoreExpiration: true
  }, (err, decoded) => {

    if (err) {
      return res.status(403).json({ message: err.message })
    }
    if (decoded.exp < currentTimestamp) {
      return res.status(403)
        .json({ message: "TokenExpired", data: { userId: decoded.userId } })
    }
    else {
      req.UserData = decoded
      next()
    }
  })
}

