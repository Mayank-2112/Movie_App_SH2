import mongoose, { mongo } from "mongoose";

const theaterSchema = new mongoose.Schema({
    theaterId: {
        type: Number,
        required: true,
        unique: true,
    },
    theaterName: {
        type: String,
        required: true,
        unique: false,
    },
    theaterAddress: {
        type: String,
        required: true,
        unique: false,
    },
    theaterCity: {
        type: String,
        required: true,
        unique: false,
    }
},{timestamps: true});

const Theater = mongoose.model('Theater',theaterSchema);

export default Theater;