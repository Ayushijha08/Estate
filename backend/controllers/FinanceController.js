import Finance from "../Models/Finance.js";

export const createFinance = async (req, res) => {
    try {
        const {  name, Amount, transactionType, category, paymentMode, transactionDate, status} = req.body;
if (!name || !Amount || !transactionType ||  !category||  !paymentMode ||  !transactionDate|| !status ) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Finance.create({ name, Amount, transactionType, category, paymentMode, transactionDate, status}) 
        res.status(201).json({
           success:true,
            message: 'Finance created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Finance', details: error.message });
    }
};

export const getAllFinances = async (req, res) => {
    try {
        const Finances = await Finance.find();
        res.json(Finances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getFinanceById = async (req, res) => {
    try {
        const FinanceId = req.params.id;
        const Finance = await Finance.findById(FinanceId);
        if (!Finance) {
            return res.status(404).json({ message: 'Finance id not found' });
        }
        res.json(Finance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateFinance = async (req, res) => {
    try {
        const { name, Amount, transactionType, category, paymentMode, transactionDate, status} = req.body;
        const FinanceId = req.params.id; 

        const existingFinance = await Finance.findById(FinanceId);
        if (!existingFinance) {
            return res.status(404).json({ message: 'Finance not found' });
        }

        const updateData = {
            name, Amount, transactionType, category, paymentMode, transactionDate, status
        };

        const updatedFinance = await Finance.findByIdAndUpdate(
            FinanceId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Finance updated successfully',
            Finance: updatedFinance
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Finance', details: error.message });
    }
};

export const deleteFinance = async (req, res) => {
    try {
        const FinanceId = req.params.id; 
        const deletedFinance = await Finance.findByIdAndDelete(FinanceId); 
        if (!deletedFinance) {
            return res.status(404).json({ message: 'Finance not found' });
        }
        res.json({ 
            success:true,
            message: 'Finance deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};