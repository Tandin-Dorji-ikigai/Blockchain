const { default: mongoose } = require("mongoose")
const userModel = require("./userModel")
const locationSchema =new mongoose.Schema({
    pickUpLocation:{
        type:String,
        require:[true,"Please provide car model"]
    },
    dropOffLocation:{
        type:String,
        require:[true,"Please provide car number"]
    },
    pickUpTime:{
        type:String,
        require:[true,"Please provide starting date "]
    },
    lon:{
        type:String,
        require:[true,"Please provide longitude"]
    },
    lat:{
        type:String,
        require:[true,"provide latitude"]
    },
    status:{
        type:String,
        default:"pending"
    },
    ownerData:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    driverId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }

})

const locationRecord =mongoose.model('locationRecord',locationSchema)
module.exports =locationRecord
