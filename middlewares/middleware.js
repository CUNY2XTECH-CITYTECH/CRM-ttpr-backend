import jwt from 'jsonwebtoken'
export const checkToken = (req, res, next) => {
  console.log(req.headers, 'headers')
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
  console.log(token, 'token')
  if (!token) { return res.status(401).json({ message: "Login first" }) }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
    ignoreExpiration: true
  }, (err, decoded) => {
    console.log(decoded, err, 'decoded, error')
    if (err) {
      return res.status(403).json({ message: err.message })
    }
    if (decoded.exp < currentTimestamp) {
      res.clearCookie("access_token", {
        secure: true,
        path: '/'
      })
      res.status(200).json({ message: "Logged out" });
    }
    else {
      req.UserData = decoded
      next()
    }
  })
}

