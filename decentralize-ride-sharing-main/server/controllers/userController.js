const User = require('./../models/userModel')
const multer = require('multer')
const path = require('path')
exports.getAllUser = async(req,res,next)=>{
    try{
        const user = await User.find()
        res.status(200).json({data:user,status:'success'})
    }catch(error){
        res.status(500).json({error:err.message})

    }
}
exports.createUser = async(req,res,next)=>{
    try{
        const user = await User.create(req.body)
        console.log("user => ",user)
        res.status(200).json({data:user,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})

    }
}

exports.getUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json({data:user,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}

exports.updateUser = async(req,res,next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body.nonEmptyUserData)

        res.status(200).json({data:user,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}
exports.deleteUser = async(req,res,next)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({data:user,status:'success'})
    }catch(error){
        res.status(500).json({error:error.message})


    }
}







const filterObj=(obj,...allowedFields)=>{
    const newObj = {}
    Object.keys(obj).forEach((el)=>{
        if(allowedFields.includes(el)) newObj[el]=obj[el]
    })
    return newObj
}



exports.updateMe =async(req,res,next)=>{
    try{
        const filteredBody = filterObj(req.body,'name','email')
        if(req.body.photo !== 'undefined'){
            filteredBody.photo = req.file.filename
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
            new:true,
            runValidators:true,
        })
        res.status(200).json({
            status:'success',
            data:{user:updatedUser}
        })


    }catch(err){
        res.status(500).json({error:err.message});

    }
}




// // uplodaing image
const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'views/user')
    },
    filename:(req,file,cb)=>{
        //user-id-currenttimestamp.extention
        // var obj = JSON.parse(req.cookies.token)
        const ext = file.mimetype.split('/')[1]
        cb(null,`user-${req.user?.id ? req.user.id:Math.random() }-${Date.now()}.${ext}`)
    }
})
// const multerFilter = (req,file,cb)=>{
//     if(file.mimetype.startsWith('image')){
//         cb(null,true)
//     }else{
//         cb(new AppError('Not an image! please upload only image',400),false)
//     }
// }
// /workspaces/RideSharing/decentralize-ride-sharing/client/public/images/aboutSecure.png
// uplodaing image
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, '../../client/public/images/user');
//         cb(null, uploadPath);
//     },
//     filename:(req,file,cb)=>{
//         //user-id-currenttimestamp.extention
//         // var obj = JSON.parse(req.cookies.token)
//         // const phoneNumber = req.body.phoneNumber
//         const ext = file.mimetype.split('/')[1]
//         cb(null,`user-${req.user?.id ? req.user.id:Math.random() }-${Date.now()}.${ext}`)
//     }
// })
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an image! please upload only image',400),false)
    }
}



const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
})
exports.uploadUserPhoto = upload.single('photo')


exports.searchAddress=async(req,res,next)=>{
    try{
        const user = await User.findOne({account:req.params.id})
        res.status(200).json({data:user,status:'success'})
    }catch(error){
        res.status(500).json({error:err.message})
    }

}
