import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req,res)=>{
    // request data from browser
    const {fullname,email,password,confirmPassword} = req.body;
    
    if(!fullname || !email || !password || fullname === '' || email === '' || password === '')
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