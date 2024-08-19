const Feedback = require('../models/feedbackModel')

exports.getAllFeedback = async(req,res,next)=>{
    try{
        const feedback = await Feedback.find().populate("ownerData")
        res.status(200).json({data:feedback,status:'success'})
    }catch(error){
        res.status(500).json({error:err.message})

    }
}
exports.createFeedback = async(req,res,next)=>{
    try{
        const feedback = await Feedback.create({...req.body,ownerData:req.params.id})
        // console.log("feedback => ",feedback)
        res.status(200).json({data:feedback,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})

    }
}

exports.getFeedback = async(req,res,next)=>{
    try{
        const feedback = await Feedback.findById(req.params.id)
        res.status(200).json({data:feedback,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}

exports.updateFeedback = async(req,res,next)=>{
    try{
        const feedback = await Feedback.findByIdAndUpdate(req.params.id,req.body)

        res.status(200).json({data:feedback,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}
exports.deleteFeedback = async(req,res,next)=>{
    try{
        const feedback = await Feedback.findByIdAndDelete(req.params.id)
        res.status(200).json({data:feedback,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}