import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FinanceSchema = new Schema({
    name: {
        type: String,
        required: true,  
    },
    Amount: {
        type: String,
        required: true,  
        min: 0,          
    },
    transactionType: {
        type: String,
        enum: ['Credit', 'Debit'],  
        required: true,  
    },
    category: {
        type: String,
        required: true,  
    },
    paymentMode: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'Credit Card', 'Debit Card', 'Online'],  
        required: true,  
    },
    transactionDate: {
        type: String,
        required: true,  
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],  
        default: 'Pending', 
    },
    
}, { timestamps: true }); 

const Finance = model('Finance', FinanceSchema);

export default Finance; 
