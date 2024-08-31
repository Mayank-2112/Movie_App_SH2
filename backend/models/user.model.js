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
    city:{
        type: String,
        required: false,
        unique: false,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    profilePicture:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    bookings:{
        movieId:{
            type: String,
            required: false,
            unique: false,
        },
        movieName:{
            type: String,
            required: false,
            unique: false,
        },
        theater:{
            type:String,
            required: false,
            unique: false,
        },
        time:{
            type:String,
            required: false,
            unique: false,
        },
        date:{
            type:String,
            required: false,
            unique: false,
        },
        seats:{
            type: Array,
            required: false,
            unique: false,
        }
    }
},{timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;