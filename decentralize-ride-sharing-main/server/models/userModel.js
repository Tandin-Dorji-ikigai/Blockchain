const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name!']
    },
    phoneNumber:{
        type:Number,
        unique:true,
        required:[true,"Please provide a phone Number"],

    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    photo:{
        type:String,
        default:"default.jpg"
    },
    role:{
        type:String,
        enum:['rider','driver'],
        default:'rider'
    },
    password:{
        type:String,
        required:[true,"Please provide a password!"],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        require:[true,"Please confirm password"],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:"Password are not same",
        }

    },
    address:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:"bio"
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    facebook:{
        type:String,
        default:""
    },
    instagram:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:""
    },
    dzongkhag:{
        type:String,
        default:""
    },
    gewog:{
        type:String,
        default:""
    },
    account:{
        require:[true,"account is required"],
        unique:true,
        type:String,
    }

})



userSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('findOneAndUpdate',async function(next){
    const update = this.getUpdate()
    if(update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm){
            this.getUpdate().password = await bcrypt.hash(update.password,12)
            update.passwordConfirm = undefined
            next()
        }else{
            next()
        }
})
userSchema.methods.correctPassword =async function(
    candidatePassword,
    userPassword,
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User',userSchema)
module.exports= User
