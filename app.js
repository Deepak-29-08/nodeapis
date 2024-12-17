import express from 'express'
import {config} from 'dotenv'
import routerRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
import { errormiddleware } from './middlewares/error.js';
import cors from 'cors'
export const app = express();

config({
    path:"./data/config.env"
});

app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1/users",routerRouter)
app.use("/api/v1/task",taskRouter)
app.use(errormiddleware)
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))




 