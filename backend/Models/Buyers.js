import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BuyersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    RoomNo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        //default: 'Active',
        required:true,
    },
    
}, { timestamps: true });

const Buyers = model('Buyers', BuyersSchema);

export default Buyers;
