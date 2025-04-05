import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LeaseSchema = new Schema(
    {
        
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
        LeaseStartDate: {
            type: String,
            required: true,
        },
        LeaseEndDate: {
            type: String,
            required: true,
        },
        MonthlyRent: {
            type: String,
            required: true,
        },
        SecurityDeposit: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Unpaid', 'Partial'],
           // default: 'Unpaid',
        },
        LeaseStatus: {
            type: String,
            enum: ['Active', 'Expired', 'Terminated'],
            //default: 'Active',
        },
    },
    { timestamps: true }
);

const Lease = model('Leases', LeaseSchema);

export default Lease;
