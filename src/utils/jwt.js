import jwt from 'jsonwebtoken'


const generateToken = (email) => {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  return payload
}

export { generateToken, verifyToken }