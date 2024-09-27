const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { username, password } = req.body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required. Please provide them in the request body.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username: username, password: hashedPassword})
        await newUser.save()
        res.status(201).json({message: 'User registered successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required. Please provide them in the request body.' });
    }

    try {
        const user = await User.findOne({username: username})
        console.log(user)

        if (!user) {
            return res.status(404).json({message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.status(200).json({token, username})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }
}