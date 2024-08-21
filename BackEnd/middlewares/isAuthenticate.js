const jwt=require('jsonwebtoken');
const user=require('../Modals/User');
exports.isAuthenticate=async(req,res,next)=>{
    const token=req.cookies;
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Please Login"
        })
    }
    const decoded=await jwt.verify(token,process.env.SECRET);
    req.user=await user.findById(decoded._id);
    next();
}