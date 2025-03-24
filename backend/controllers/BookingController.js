import Booking from "../Models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const {  name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus} = req.body;
        if (!name ||  !Email || !mobileNo || !address || !check_in_date || !check_out_date || !TotalAmountUnit  ||    !paymentStatus || !Bookingstatus )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Booking.create({ name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus}) 
        res.status(201).json({
            message: 'booking created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the booking', details: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'booking id not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus} = req.body;
        const bookingId = req.params.id; 

        const existingBooking = await booking.findById(bookingId);
        if (!existingBooking) {
            return res.status(404).json({ message: 'booking not found' });
        }

        const updateData = {
            name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus
        };

        const updatedBooking = await booking.findByIdAndUpdate(
            bookingId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'booking updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the booking', details: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id; 
        const deletedBooking = await booking.findByIdAndDelete(bookingId); 
        if (!deletedBooking) {
            return res.status(404).json({ message: 'booking not found' });
        }
        res.json({ message: 'booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};