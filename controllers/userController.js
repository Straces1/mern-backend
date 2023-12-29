const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//signup
const signupUser = async (req, res) => {
    const {name, password, role} = req.body

    try {
        const user = await User.signup(name, password, role)
        const token = createToken(user._id)
        res.status(200).json({name, role, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

//login
const loginUser = async (req, res) => {
    const {name, password} = req.body
    try {
        const user = await User.login(name, password)
        const token = createToken(user._id)
        res.status(200).json({name, token, role:user.role})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signupUser,
    loginUser
}