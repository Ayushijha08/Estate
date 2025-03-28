//import Sellers from "../Models/Sellers.js";
import Sellers from "../Models/Sellers.js"

export const createSeller = async (req, res) => {
    try {
        const {  name, email, mobileNo, address, PropertyId, ListedPrice, Status} = req.body;
        if (!name|| !email|| !mobileNo|| !address|| !PropertyId|| !ListedPrice || !Status )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Sellers.create({ name, email, mobileNo, address, PropertyId, ListedPrice, Status}) 
        res.status(201).json({
            message: 'Seller created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Seller', details: error.message });
    }
};

export const getAllSellers = async (req, res) => {
    try {
        const Seller = await Sellers.find();
        res.json(Seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSellerById = async (req, res) => {
    try {
        const SellerId = req.params.id;
        const Seller = await Seller.findById(SellerId);
        if (!Seller) {
            return res.status(404).json({ message: 'Seller id not found' });
        }
        res.json(Sellers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSeller = async (req, res) => {
    try {
        const {name, email, mobileNo, address, PropertyId, ListedPrice, Status} = req.body;
        const SellerId = req.params.id; 

        const existingSeller = await Sellers.findById(SellerId);
        if (!existingSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const updateData = {
            name, email, mobileNo, address, PropertyId, ListedPrice, Status        };

        const updatedSeller = await Sellers.findByIdAndUpdate(
            SellerId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Seller updated successfully',
            Seller: updatedSeller
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Seller', details: error.message });
    }
};

export const deleteSeller = async (req, res) => {
    try {
        const SellerId = req.params.id; 
        const deletedSeller = await Sellers.findByIdAndDelete(SellerId); 
        if (!deletedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.json({ message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};