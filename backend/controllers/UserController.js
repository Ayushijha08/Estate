import Users from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { Email, Password } = req.body;
    console.log('Login attempt with:', { Email, Password: '***' });

    try {
        let user = await Users.findOne({ Email });
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            // User doesn't exist — create and save new user
            const hashedPassword = await bcrypt.hash(Password, 10);
            user = new Users({ Email, Password: hashedPassword });
            await user.save();
            console.log('New user created and saved.');
        } else {
            // Validate password for existing user
            const isPasswordValid = await bcrypt.compare(Password, user.Password);
            console.log('Password valid:', isPasswordValid);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, email: user.Email },
            process.env.SECRET_KEY || 'your-secret-key',
            { expiresIn: '1y' }
        );

        console.log('Token generated:', token.substring(0, 20) + '...');

        return res.json({
            success: true,
            message: user.isNew ? 'User registered & logged in!' : 'Login successful!',
            token,
            userId: user._id,
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
};

export const getAlluser = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getuserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user id not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateuser = async (req, res) => {
    try {
        const { Password,Email } = req.body;
        const userId = req.params.id; 

        const existinguser = await Users.findById(userId);
        if (!existinguser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const updateData = {
            Password,Email
        };

        const updateduser = await Users.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'user updated successfully',
            user: updateduser
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteuser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const deleteduser = await Users.findByIdAndDelete(userId); 
        if (!deleteduser) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({
            success:true,
            message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 