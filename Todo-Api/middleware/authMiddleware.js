const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }
}

module.exports = authMiddleware