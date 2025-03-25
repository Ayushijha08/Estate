import Agent from "../Models/Agent.js";

export const createAgent = async (req, res) => {
    try {
        const {  name, email, mobileNo, address, licenseNo, experience, commissionRate, status } = req.body;
        if (!name|| !email|| ! mobileNo|| ! address|| ! licenseNo|| ! experience|| ! commissionRate|| ! status ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Agent.create({ name, email, mobileNo, address, licenseNo, experience, commissionRate, status}) 
        res.status(201).json({
            message: 'Agent created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Agent', details: error.message });
    }
};

export const getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAgentById = async (req, res) => {
    try {
        const AgentId = req.params.id;
        const Agent = await Agent.findById(AgentId);
        if (!Agent) {
            return res.status(404).json({ message: 'Agent id not found' });
        }
        res.json(Agent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAgent = async (req, res) => {
    try {
        const { name, email, mobileNo, address, lisenceNo, experience, commissionRate, status} = req.body;
        const AgentId = req.params.id; 

        const existingAgent = await Agent.findById(AgentId);
        if (!existingAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        const updateData = {
            name, email, mobileNo, address, lisenceNo, experience, commissionRate, status
        };

        const updatedAgent = await Agent.findByIdAndUpdate(
            AgentId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Agent updated successfully',
            Agent: updatedAgent
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Agent', details: error.message });
    }
};

export const deleteAgent = async (req, res) => {
    try {
        const AgentId = req.params.id; 
        const deletedAgent = await Agent.findByIdAndDelete(AgentId); 
        if (!deletedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json({ message: 'Agent deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};