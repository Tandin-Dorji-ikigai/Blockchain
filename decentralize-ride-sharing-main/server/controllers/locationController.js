const locationRecord = require('./../models/locationModel')
exports.addLocation = async(req,res,next)=>{
    const location = new locationRecord({...req.body,ownerData:req.params.id})
    try{
        const locationData = await location.save()
        res.json({data:locationData,status:"success"})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.getLocationById = async(req,res)=>{
    try{
        const locationData = await locationRecord.findById(req.params.id)
        const userWithLocation = await (await locationData.populate('ownerData')).populate('driverId')
        res.json({data:userWithLocation,status:"success"})
        console.log(userWithLocation)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}


exports.getLocationByUsingUserId = async(req,res)=>{
    try{
        const locationData = await locationRecord.find({ownerData:req.params.id})
        // const bookingDataAndUserData = await bookingData.populate('ownerData')
        res.json({data:locationData,status:"success"})
        console.log(locationData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}
exports.getLocationByUsingDriverId = async(req,res)=>{
    try{
        const locationData = await locationRecord.find({driverId:req.params.id})
        // const bookingDataAndUserData = await bookingData.populate('ownerData')
        res.json({data:locationData,status:"success"})
        console.log(locationData)
    }catch(err){
        res.status(500).json({error:err.message})
    }
    
}


exports.getAlllocationDetails = async(req,res,next)=>{
    try{
        const locationData = await locationRecord.find().populate('ownerData').populate('driverId')
        // const bookingDataAndUserData = await bookingData.populate('ownerData')
        res.status(200).json({data:locationData,status:"success"})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.deletelocationDataUsingId = async(req,res,next)=>{
    try {
        const location =await locationRecord.findByIdAndDelete(req.params.id);
        res.json({ data: location,status:"success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }

}


exports.updateLocationDataUsingId = async (req, res, next) => {
    try {
      const { driverId, status } = req.body;
      const location = await locationRecord.findByIdAndUpdate(
        req.params.id,
        { driverId, status },
        { new: true }
      );
  
      res.json({ data: location, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  




