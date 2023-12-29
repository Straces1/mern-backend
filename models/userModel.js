const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function (name, password, role) {
    
    // credentials validation
    if(!name || !password) {
        throw Error('Fillout all fileds')
    }
    if(!validator.isStrongPassword(password, {minSymbols: 0})){
        throw Error('Password is not strong enough (min legth is 8 characters and there have to be at least one number, one upprecase and one lower case letter')
    }
    if(!role){
        throw Error('Role has to be selected')
    }
    if(role !== 'test-admin' && role !== 'admin'){
        throw Error('Invalid user role')
    }

    // check for name in DB
    const exists = await this.findOne({ name })
    if(exists){
        throw Error('Name already in use')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create doc in DB
    const user = await this.create({ name, password: hash, role })

    return user
}

//login
userSchema.statics.login = async function (name, password) {
    if(!name || !password) {
        throw Error('Fillout all fileds')
    }

    const user = await this.findOne({ name })
    if(!user){
        throw Error('Incorrect name')
    }
    //compare passwords
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)