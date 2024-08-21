const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    avatar:{
        public_id:String,
        url:String
    },
    posts:[{
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]

    
})
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    

})
UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
UserSchema.methods.generateJwtToken=function(){
    return jwt.sign({_id:this._id},process.env.SECRET_KEY);
}
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
module.exports=mongoose.model("User",UserSchema);