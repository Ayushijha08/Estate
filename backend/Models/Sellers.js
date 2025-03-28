import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SellerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobileNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        PropertyId: {
            type: String,
            ref: 'Property',
            required: true,
        },
        ListedPrice: {
            type: Number,
            required: true,
        },
        Status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
    },
    { timestamps: true }
);

const Seller = model('Seller', SellerSchema);

export default Seller;
