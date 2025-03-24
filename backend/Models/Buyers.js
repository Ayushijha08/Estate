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
        match: /^[0-9]{10}$/,
    },
    address: {
        type: String,
        required: true,
    },
    roomNo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
    
}, { timestamps: true });

const Buyers = model('Buyers', BuyersSchema);

export default Buyers;
