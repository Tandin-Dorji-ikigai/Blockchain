const Vehicle = require('../models/vehicleModel')


exports.getAllDriver = async(req,res,next)=>{
    try{
        const vehicle = await Vehicle.find()
        res.status(200).json({data:vehicle,status:'success'})
    }catch(error){
        res.status(500).json({error:err.message})

    }
}
exports.createDriver = async(req,res,next)=>{
    try{
        const vehicle = await Vehicle.create({...req.body,user:req.id})
        // console.log("vehicle => ",vehicle)
        res.status(200).json({data:vehicle,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})

    }
}

exports.getDriver = async(req,res,next)=>{
    try{
        const vehicle = await Vehicle.find({user:req.params.id}).populate("user")
        res.status(200).json({data:vehicle,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}

exports.updateDriver = async(req,res,next)=>{
    try{
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id,req.body)

        res.status(200).json({data:vehicle,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}
exports.deleteDriver = async(req,res,next)=>{
    try{
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id)
        res.status(200).json({data:vehicle,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}

