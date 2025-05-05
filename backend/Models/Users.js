
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({

    Email: {type:String},
    Password:{type:String}
  
}, { timestamps: true }); // Correct placement of timestamps

const User = model('user', userSchema);
export default User;
