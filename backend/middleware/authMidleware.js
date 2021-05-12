const jwt =require ('jsonwebtoken')
const AsyncHandler= require ('express-async-handler')
const User= require ('../models/user.js')

const guard = AsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SEC)
      console.log(decoded)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      res.status(401)
      throw new Error('not authorized , token failed!')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized , invalid token')
  }
})

//export { guard }
module.exports = {guard}