import Booking from "../Models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const {  name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus} = req.body;
        if (!name ||  !email || !mobileNo || !address || !check_in_date || !check_out_date || !TotalAmountUnit  ||    !paymentStatus || !Bookingstatus )   {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Booking.create({ name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus}) 
        res.status(201).json({
            message: 'Booking created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the Booking', details: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const Bookings = await Booking.find();
        res.json(Bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getBookingById = async (req, res) => {
    try {
        const BookingId = req.params.id;
        const Booking = await Booking.findById(BookingId);
        if (!Booking) {
            return res.status(404).json({ message: 'Booking id not found' });
        }
        res.json(Booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus} = req.body;
        const BookingId = req.params.id; 

        const existingBooking = await Booking.findById(BookingId);
        if (!existingBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const updateData = {
            name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus
        };

        const updatedBooking = await Booking.findByIdAndUpdate(
            BookingId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'Booking updated successfully',
            Booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the Booking', details: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const BookingId = req.params.id; 
        const deletedBooking = await Booking.findByIdAndDelete(BookingId); 
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};