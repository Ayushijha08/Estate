import Lease from "../Models/Lease.js";

export const createLease = async (req, res) => {
    try {
        const { name, Email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus} = req.body;
        if (!name || !Email|| ! mobileNo|| ! address|| ! LeaseStartDate|| ! LeaseEndDate|| ! MonthlyRent|| ! SecurityDeposit|| ! paymentStatus|| ! LeaseStatus )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Lease.create({ name, Email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus}) 
        res.status(201).json({
            message: 'lease created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the lease', details: error.message });
    }
};

export const getAllLeases = async (req, res) => {
    try {
        const leases = await lease.find();
        res.json(leases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getLeaseById = async (req, res) => {
    try {
        const leaseId = req.params.id;
        const lease = await lease.findById(leaseId);
        if (!lease) {
            return res.status(404).json({ message: 'lease id not found' });
        }
        res.json(lease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateLease = async (req, res) => {
    try {
        const { name, Email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus} = req.body;
        const leaseId = req.params.id; 

        const existingLease = await lease.findById(leaseId);
        if (!existingLease) {
            return res.status(404).json({ message: 'lease not found' });
        }

        const updateData = {
            name, Email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus
        };

        const updatedLease = await lease.findByIdAndUpdate(
            leaseId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'lease updated successfully',
            lease: updatedLease
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the lease', details: error.message });
    }
};

export const deleteLease = async (req, res) => {
    try {
        const leaseId = req.params.id; 
        const deletedLease = await lease.findByIdAndDelete(leaseId); 
        if (!deletedLease) {
            return res.status(404).json({ message: 'lease not found' });
        }
        res.json({ message: 'lease deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};