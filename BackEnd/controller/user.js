const User=require('../Modals/User');
const Post=require('../Modals/Post');
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.register=async (req,res)=>{
    const{name,email,password,avatar}=req.body;
    try{
        if(!name||!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
          });
        const new_user=await User.create({name,email,password,
            avatar: { public_id: myCloud.public_id, url: myCloud.secure_url }
        });
        await new_user.save();
        
        res.status(200).json({
            success:true,
            message:"user created"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"email and password are required"
            })
        }
        const user=await User.find({email}).select("+password");
        
        const isMatch=await User.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }
        const token=await User.generateJwtToken();
        res.status(200).cookie('token',token,new Date(Date.now+15*24*60*60*1000)).json({
            success:true,
            message:"User loggedin successfully",
            user
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.followAndunfollow=async (req,res)=>{
    try{
        const usertoFollow=await User.findById(req.params.id);
        const loggedInuser=await User.findById(req.user._id);
        if(!usertoFollow){
            return res.stataus(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(loggedInuser.followers.includes(usertoFollow.id)){
            const followedIndex=loggedInuser.followers.indexOf(req.user._id);
            loggedInuser.splice(followedIndex,1);
            await loggedInuser.save();
            const followingindex=usertoFollow.following.indexOf(loggedInuser);
            usertoFollow.splice(followingindex,1);
            await usertoFollow.save();
            res.status(200).json({
                success:true,
                message:"unfollowed successfully"
            })


        }
        else{
            usertoFollow.followers.push(loggedInuser._id);
            loggedInuser.following.push(usertoFollow.id);
            await usertoFollow.save();
            await loggedInuser.save();
            res.status(200).json({
                success:true,
                message:"Started Following"
            })
        }
        
    }
    catch(err){
        console.log(err);
    }
}
exports.updatePassword=async (req,res)=>{
    try{
        const {oldpassword,newpassword}=req.body;
        const user=await User.findById(req.user._id);
        const isMatch=await User.comparePassword(oldpassword);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Enter correct Password"
            })
        }
        user.password=newpassword;
        await user.save();
        res.status(200).json({
            success:true,
            message:"Password Updated"
        })

    }
    catch(err){
        console.log(err);
    }
}
exports.updateProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        const {name,email,avatar}=req.body;
        if(name){
            user.name=name;

        }
        if(email){
            user.email=email;
        }
        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
              folder: "avatars",
            });
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
          }
      
        res.status(200).json({
            success:true,
            message:"User Profile Updated"
        })
    }
    catch(err){
        console.log(err);
    }
}
exports.myProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err){
        console.log(err);
    }
}
exports.UserProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err){
        console.log(err);
    }
}
exports.getAlluser=async (req,res)=>{
    try{
        const Allusers=await User.find({});
        res.status(200).json({
            success:true,
            message:"All users founded"
        })
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        const posts=user.posts;
        const followers=user.followers;
        const follows=user.following;
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await user.remove();
        // deleting all post of user
        for(let i=0;i<posts.length();i++){
            const post=await Post.findById(posts[i]);
            await post.remove();
        }
        // removing user from  followers following 
        for(let i=0;i<followers.length();i++){
            const follower=await User.findById(followers[i]);
            const index=follower.following.indexOf(req.user._id);
            follower.following.splice(index,1);
            await follower.save();
        }
        // removing follower from user's following

        for(let i=0;i<follows.length();i++){
            const following_user=await User.findById(follows[i]);
            const index=following_user.followers.indexOf(req.user._id);
            following_user.followers.splice(index,1);
            await following_user.save();
        }
        res.cookie('token',null,cookieOptions);
        res.status(200).json({
            success:true,
            message:"Profile deleted"
        })
    }
    catch(err){
        console.log(err);
    }
}
exports.forgotPassword = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const resetPasswordToken = user.getResetPasswordToken();
  
      await user.save();
  
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetPasswordToken}`;
  
      const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;
  
      try {
        await sendEmail({
          email: user.email,
          subject: "Reset Password",
          message,
        });
  
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email}`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
  
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.resetPassword = async (req, res) => {
    try {
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
  
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid or has expired",
        });
      }
  
      user.password = req.body.password;
  
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Password Updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  