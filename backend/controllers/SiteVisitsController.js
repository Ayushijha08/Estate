import SiteVisits from "../Models/SiteVisits.js";

export const createSiteVisits = async (req, res) => {
    try {
        const { PropertyId, VisitorName, ContactNo, AgentId, SheduledDate, status} = req.body;
        if (!PropertyId || !VisitorName|| ! ContactNo|| ! AgentId|| ! SheduledDate|| ! status )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await SiteVisits.create({ PropertyId, VisitorName, ContactNo, AgentId, SheduledDate, status}) 
        res.status(201).json({
           success:true,
            message: 'SiteVisits created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the SiteVisits', details: error.message });
    }
};

export const getAllSiteVisits = async (req, res) => {
    try {
        const SiteVisitss = await SiteVisits.find();
        res.json(SiteVisitss);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSiteVisitsById = async (req, res) => {
    try {
        const SiteVisitsId = req.params.id;
        const SiteVisits = await SiteVisits.findById(SiteVisitsId);
        if (!SiteVisits) {
            return res.status(404).json({ message: 'SiteVisits id not found' });
        }
        res.json(SiteVisits);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSiteVisits = async (req, res) => {
    try {
        const { PropertyId, VisitorName, ContactNo, AgentId, SheduledDate, status} = req.body;
        const SiteVisitsId = req.params.id; 

        const existingSiteVisits = await SiteVisits.findById(SiteVisitsId);
        if (!existingSiteVisits) {
            return res.status(404).json({ message: 'SiteVisits not found' });
        }

        const updateData = {
            PropertyId, VisitorName, ContactNo, AgentId, SheduledDate, status
        };

        const updatedSiteVisits = await SiteVisits.findByIdAndUpdate(
            SiteVisitsId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,

            message: 'SiteVisits updated successfully',
            SiteVisits: updatedSiteVisits
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the SiteVisits', details: error.message });
    }
};

export const deleteSiteVisits = async (req, res) => {
    try {
        const SiteVisitsId = req.params.id; 
        const deletedSiteVisits = await SiteVisits.findByIdAndDelete(SiteVisitsId); 
        if (!deletedSiteVisits) {
            return res.status(404).json({ message: 'SiteVisits not found' });
        }
        res.json({ 
            success:true,
            message: 'SiteVisits deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};