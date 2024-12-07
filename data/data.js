import mongoose from "mongoose";

export const connectDb= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname:"backendApi",
    }).then(()=>console.log("Database connected"))
    .catch((e)=>console.log(e))
}