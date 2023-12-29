const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAdmin = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        // this attaches users id to the request
        const user = await User.findOne({ _id })
        if(user.role === 'admin'){
            next()
        } else {
            res.status(401).json({error: 'Only Admin can execute this action'})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorized'})
    }
}

module.exports = requireAdmin