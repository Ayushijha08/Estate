import Users from "../Models/Users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import User from "../Models/user";

export const createUser = async (req, res) => {
    try {
        const {  name,email,password} = req.body;
        if (!name|| !email|| !password )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }
const existingUser = await Users.findOne({email})
if(existingUser){
    return res.status(400).json({success:false,message:"user already exists"})
}

  const hashedPassword = await bcrypt.hash(password,10)



        await Users.create({ name,email,password:hashedPassword}) 
        res.status(201).json({
           success:true,
            message: 'user created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user', details: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        	}

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Password doesn't match" });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email},
            process.env.SECRET_KEY,
            { expiresIn: '1y' }
        );
  
        return res.json({
            success: true,
            message:'Login successful!',
            token: token,
            userId: user._id,
        });
  
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const User = await Users.find();
        res.json(User);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        const UserId = req.params.id; 

        const existingUser = await Users.findById(UserId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateData = {
            email,password  };

        const updatedUser = await Users.findByIdAndUpdate(
            UserId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,

            message: 'User updated successfully',
            User: updatedUser
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the User', details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const UserId = req.params.id; 
        const deletedUser = await Users.findByIdAndDelete(UserId); 
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ 
            success:true,
            message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


