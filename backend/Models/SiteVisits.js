import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SiteVisitsSchema = new Schema(
    {
        PropertyId: {
            type: String,
            required: true,
        },
        VisitorName: {
            type: String,
            required: true,
        },
        ContactNo: {
            type: String,
            required: true,
        },
        AgentId: {
            type: String,
            required: true,
        },
        SheduledDate: {
            type: Number,
            required: true,
        },
       
        status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Cancelled'],
        },
    },
    { timestamps: true }
);

const SiteVisits = model('SiteVisits', SiteVisitsSchema);

export default SiteVisits;
