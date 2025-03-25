import Property from "../Models/Property.js";

export const createProperty = async (req, res) => {
    try {
        const {  propertyTitle, propertyType, address, price, areaSqft, furnishing, status } = req.body;
        if ( !propertyTitle || !propertyType || !address ||  !price ||  !areaSqft || !furnishing || !status ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Property.create({ propertyTitle, propertyType, address, price, areaSqft, furnishing, status}) 
        res.status(201).json({
            message: 'Property created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Property', details: error.message });
    }
};

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPropertyById = async (req, res) => {
    try {
        const PropertyId = req.params.id;
        const Property = await Property.findById(PropertyId);
        if (!Property) {
            return res.status(404).json({ message: 'Property id not found' });
        }
        res.json(Property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const { propertyTitle, propertyType, address, price, areaSqft, furnishing, status } = req.body;
        const PropertyId = req.params.id; 

        const existingProperty = await Property.findById(PropertyId);
        if (!existingProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const updateData = {
            propertyTitle, propertyType, address, price, areaSqft, furnishing, status
        };

        const updatedProperty = await Property.findByIdAndUpdate(
            PropertyId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Property updated successfully',
            Property: updatedProperty
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Property', details: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const PropertyId = req.params.id; 
        const deletedProperty = await Property.findByIdAndDelete(PropertyId); 
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};