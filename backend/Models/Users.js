import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
    { 
       name: {
         type: String,
        required: true,
    },
        email: {
            type: String,
            required: true,
            lowercase: true

            
        },
        password: {
            type: String,
            required: true,
        },
        
    },
    { timestamps: true }
);

const User = model('User', UserSchema);

export default User;
