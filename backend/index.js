import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import theaterRoutes from './routes/theater.route.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(
    ()=> {console.log('Database is connected!')}
).catch((error)=>{console.log(error)})

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!');
});

app.use('/backend/auth',authRoutes);
app.use('/backend/user',userRoutes);
app.use('/backend/theater',theaterRoutes);

app.use(express.static(path.join(__dirname,'/frontend/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
});

app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
