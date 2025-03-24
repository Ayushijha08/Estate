import Property from "../Models/Property.js";

export const createProperty = async (req, res) => {
    try {
        const {  propertyTitle, propertyType, address, price, areaSqft, furnishing, status } = req.body;
        if ( !propertyTitle || !propertyType || !address ||  !price ||  !areaSqft || !furnishing || !status ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Property.create({ propertyTitle, propertyType, address, price, areaSqft, furnishing, status}) 
        res.status(201).json({
            message: 'property created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the property', details: error.message });
    }
};

export const getAllProperties = async (req, res) => {
    try {
        const properties = await property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'property id not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProperty = async (req, res) => {
    try {
        const { propertyTitle, propertyType, address, price, areaSqft, furnishing, status } = req.body;
        const propertyId = req.params.id; 

        const existingProperty = await property.findById(propertyId);
        if (!existingProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const updateData = {
            propertyTitle, propertyType, address, price, areaSqft, furnishing, status
        };

        const updatedProperty = await property.findByIdAndUpdate(
            propertyId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'property updated successfully',
            property: updatedProperty
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the property', details: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id; 
        const deletedProperty = await property.findByIdAndDelete(propertyId); 
        if (!deletedProperty) {
            return res.status(404).json({ message: 'property not found' });
        }
        res.json({ message: 'property deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};