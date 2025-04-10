import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        EmailId: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
            unique: true,
        },
        
    },
    { timestamps: true }
);

const User = model('User', UserSchema);

export default User;
