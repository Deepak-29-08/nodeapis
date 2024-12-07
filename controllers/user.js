import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendCookie } from "../utils/features.js"
import { ErrorHandler } from "../middlewares/error.js"


  export const login = async(req,res,next)=>{

    try {

      const {email,password}= req.body;

    const user = await User.findOne({email}).select("+password");
    
    if (!user) return next(new ErrorHandler("invalid Id or Password",400))


      const ismatch = await bcrypt.compare(password,user.password)

      if (!ismatch) return next(new ErrorHandler("invalid Id or Password",400))


  sendCookie(user,res,`Welcome Back ${user.name}`,200)

      
    } catch (error) {
      next(error)
    }

    
  }
  

export const getMyProfile=(req,res)=>{
   

  res.status(200).json({
    success:true,
    user:req.user,
  })
}


  
export const register = async(req,res,next)=>{
     
 try {
  const {name,email,password}= req.body;

  let user = await User.findOne({email});

  if (user) return next(new ErrorHandler("User Already exist",400))

  const hashedpassword = await bcrypt.hash(password,10)
   
   user = await User.create({name,email,password:hashedpassword})
    ,201
   sendCookie(user,res,"Registered Successful")
 } 
   catch (error) {
   next(error)
 }
 

  }


  export const logout = (req,res)=>{
     
    res.status(200)
    .cookie("token","",{expires:new Date(Date.now()),
      sameSite:process.env.NODE_ENV === "Development" ? "lax":"none",
      secure: process.env.NODE_ENV === "Development"?false:true,
    }).json({
      success:true,
      user:req.user
    })
  }