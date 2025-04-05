import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AgentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique
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
    licenseNo: {
        type: String,
        required: true,
        unique: true, 
    },
    experience: {
        type: String,
        required: true,
       
    },
    commissionRate: {
        type: String,
        required: true,
        
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'], 
        default: 'Active',
    },
    
}, { timestamps: true }); 

const Agents = model('Agent', AgentSchema);

export default Agents;
