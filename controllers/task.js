import { ErrorHandler, errormiddleware } from '../middlewares/error.js';
import {Task} from '../models/task.js'

export const newtask =async(req,res,next)=>{
  
try {
    const {title,description} = req.body;

    await Task.create({
       title,description,
       user:req.user,
    })

    res.status(201).json({
       success:true,
       message:"task added successfully"
    })

} catch (error) {
    next(error)
}
  
}

export const getmytask=async(req,res,next)=>{
  
  try {
    const userid = req.user._id
   
    const tasks = await Task.find({user:userid})
 
 
    res.status(200).json({
     success:true,
     tasks,
    })
  } catch (error) {
     next(error)
  }
}

export const updatetask =async(req,res,next)=>{
  try {
    
     
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("invalid Id",404))
    task.IsCompleted=  !task.IsCompleted

    await task.save()
    res.status(201).json({
      success:true,
      message:"task updated successfully"
   })
    
  } catch (error) {
    next(error)
  }
  
}

export const deletetask =async(req,res,next)=>{
  
   try {
    const task = await Task.findById(req.params.id);
    
    if (!task) return next(new ErrorHandler('invalid id',404))

    await task.deleteOne()

     res.status(201).json({
        success:true,
        message:"task deleted successfully"
     })
   } catch (error) {
    next(error)
   }
  
}
