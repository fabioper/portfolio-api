const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        text: true,
        trim: true,
        minlength: 6,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

UserSchema.post('validate', async (user, next) => {
    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } catch (err) {
        next(err)
    }
})

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

UserSchema.methods.generateToken = function() {
    const data = {
        username: this.username,
        userid: this._id,
        admin: this.admin
    }

    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '2h' })
    return token
}

const User = mongoose.model('user', UserSchema)

module.exports = User
