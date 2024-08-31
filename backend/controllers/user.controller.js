import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'

export const update = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorhandler(403,'You are not allowed to update this user'))
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorhandler(400,'Password must be atleast 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    };
    if(req.body.fullname){
        if(req.body.fullname.length < 4 || req.body.fullname.length > 20){
            return next(errorhandler(400,'Username must be between 4 and 20 characters'));
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set: {
                    fullname : req.body.fullname,
                    email: req.body.email,
                    city: req.body.city,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },{new: true});
            const {password, ...rest} = updateUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    };

};

export const deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorhandler(403,'You are not allowed to delete the user'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}

export const signOut = async(req,res,next)=>{
    try {
        res.clearCookie('access_token').status(200).json('User have been signed out');
    } catch (error) {
        next(error);
    }
};