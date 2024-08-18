import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: false,
    },
    confirmPassword:{
        type: String,
        required: true,
        unique: false,
    },
    mobile:{
        type: Number,
        required:false,
        unique: true,
        default: null  
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;