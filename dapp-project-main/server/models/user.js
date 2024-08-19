const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please tell us your name'],

    },
    phoneNumber:{
        type:Number,
        require:[true, "Please provide phone number"]
    },
    email: {
        type: String,
        require: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],

    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    active: {
        type: Boolean,
        default: true,
        select: false,

    },
    emailVerified:{
        type :Boolean,
        default:false,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: function (el) {
            //This only works on save
            return el === this.password
        },
        message: 'Password do not match',
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined
    next()
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm) {

        this.getUpdate().password = await bcrypt.hash(update.password, 12)

        update.passwordConfirm = undefined
        next()
    } else
        next()
})


const User = mongoose.model('User', userSchema)

module.exports = User