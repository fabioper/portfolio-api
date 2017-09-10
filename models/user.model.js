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

UserSchema.post('validate', (user, next) => {
    bcrypt.genSalt((err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

UserSchema.methods.generateToken = function() {
    const data = {
        username: this.username,
        userid: this._id
    }

    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '2h' })
    return token
}

const User = mongoose.model('user', UserSchema)

module.exports = User
