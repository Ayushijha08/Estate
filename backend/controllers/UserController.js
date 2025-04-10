import Users from "../Models/Users.js"
import bcrypt from 'bcrypt';
// import User from "../Models/user";

export const createUser = async (req, res) => {
    try {
        const {  EmailId,Password} = req.body;
        if (!EmailId|| !Password )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }
const existingUser = await Users.findOne({EmailId})
if(existingUser){
    return res.status(400).json({success:false,message:"user already exists"})
}

  const hashedPassword = await bcrypt.hash(Password,10)



        await Users.create({ EmailId,Password:hashedPassword}) 
        res.status(201).json({
           success:true,
            message: 'user created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the user', details: error.message });
    }
};

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
        const {EmailId,Password} = req.body;
        const UserId = req.params.id; 

        const existingUser = await Users.findById(UserId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateData = {
            EmailId,Password  };

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


