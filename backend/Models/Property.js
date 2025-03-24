import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PropertySchema = new Schema(
    {
        propertyTitle: {
            type: String,
            required: true,
        },
        propertyType: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        areaSqft: {
            type: Number,
            required: true,
        },
        furnishing: {
            type: String,
            enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
            required: true,
        },
        status: {
            type: String,
            enum: ['Available', 'Sold', 'Rented'],
            default: 'Available',
        },
    },
    { timestamps: true }
);

const Property = model('Property', PropertySchema);

export default Property;
