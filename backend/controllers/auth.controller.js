import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import {errorhandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req,res)=>{
    // request data from browser
    const {fullname,email,password} = req.body;
    
    if(!fullname || !email || !password  || fullname === '' || email === '' || password === '')
    return res.status(400).json({message: 'All fields are required'});

    const re = new RegExp(/^\S+@\S+\.\S+$/);
    if (!re.test(email))
        return res.status(400).json({message: 'Email is not valid'})

    
    const hashPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({fullname,email,password:hashPassword});
    try {
        await newUser.save();
        res.json('User added'); 
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
}

export const signin = async (req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorhandler(400,'All fields are required'));
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorhandler(404,'User Not Found!!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorhandler(404,'Invalid Password!!'));
        }
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    } catch (error) {
        next(error);
    }
}